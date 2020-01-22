import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import ModTable from '../ModTable';
import { readZips } from '../../mod-reader';
import './App.scss';

function App() {
  const [zips, setZips] = useState([]);
  const [selected, setSelected] = useState(new Set());

  function updateSelected() {
    setSelected(new Set(selected));
  }

  async function loadMods() {
    setZips(await readZips());
  }

  function onSelectAll() {
    if (selected.size === zips.length) {
      selected.clear();
    } else {
      for (const index of zips.keys()) {
        selected.add(index);
      }
    }

    updateSelected();
  }

  function onSelectOne(index) {
    selected.has(index) ? selected.delete(index) : selected.add(index);
    updateSelected();
  }

  useEffect(() => {
    loadMods();
  }, []);

  return (
    <>
      {/* Toolbar */}
      <Grid container id="toolbar">
        <Grid item>
          <Button onClick={loadMods}>Refresh</Button>
        </Grid>
      </Grid>

      {/* Mod List */}
      <Grid container id="mod-table">
        <Grid item xs={12}>
          <ModTable
            onSelectAll={onSelectAll}
            onSelectOne={onSelectOne}
            selected={selected}
            zips={zips}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
