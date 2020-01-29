import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import ModsTable from '../ModsTable';
import { getGameDirectoryFromBinPath, locateGameBinary } from '../../utils';
import { readZips } from '../../mod-reader';
import './App.scss';

function App() {
  const [active, setActive] = useState(new Set());
  const [gameDir, setGameDir] = useState();
  const [selected, setSelected] = useState(new Set());
  const [zips, setZips] = useState([]);

  function updateSelected() {
    setSelected(new Set(selected));
  }

  function updateActive() {
    setActive(new Set(active));
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

  function onActivate() {
    for (const mod of selected.values()) {
      active.add(mod);
    }
    selected.clear();

    updateSelected();
    updateActive();
  }

  // on app start:
  useEffect(() => {
    locateGameBinary().then((binPath) => {
      setGameDir(getGameDirectoryFromBinPath(binPath));
      loadMods();
    });
  }, []);

  return (
    <>
      {/* Toolbar */}
      <Grid container id="toolbar">
        <Grid item>
          <Button color="primary" onClick={onActivate} variant="contained">
            Activate
          </Button>
          <Button
            color="secondary"
            onClick={() => loadMods(gameDir)}
            variant="contained"
          >
            <RefreshIcon />
          </Button>
        </Grid>

        <Grid item>
          <div className="game-dir">
            <span className="game-dir-label">Game Directory:</span>{' '}
            {gameDir ? gameDir.replace(/\\/g, '/') : ''}
          </div>
        </Grid>
      </Grid>

      {/* Mod List */}
      <Grid container id="mod-table">
        <Grid item xs={12}>
          <ModsTable
            active={active}
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
