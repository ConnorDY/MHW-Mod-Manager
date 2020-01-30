import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import ModsTable from '../ModsTable';
import mod from '../../types/mod';
import { getGameDirectory, locateGameBinary } from '../../utils';
import { readZips } from '../../mod-loader';

import './App.scss';

function App() {
  const [gameDir, setGameDir] = useState<string>();
  const [selected, setSelected] = useState(new Set<number>());
  const [mods, setMods] = useState<mod[]>([]);

  function updateSelected(): void {
    setSelected(new Set(selected));
  }

  async function loadMods(): Promise<void> {
    setMods(await readZips());
  }

  function onSelectAll(): void {
    if (selected.size === mods.length) {
      selected.clear();
    } else {
      for (let i = 0; i < mods.length; i++) {
        selected.add(i);
      }
    }

    updateSelected();
  }

  function onSelectOne(index: number): void {
    selected.has(index) ? selected.delete(index) : selected.add(index);
    updateSelected();
  }

  function onActivate(): void {
    for (const mod of selected.values()) {
      // activate mod
    }

    selected.clear();
    updateSelected();
  }

  // on app start
  useEffect(() => {
    locateGameBinary().then(() => {
      setGameDir(getGameDirectory());
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
            onClick={() => loadMods()}
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
      <Grid container id="mods-table">
        <Grid item xs={12}>
          <ModsTable
            mods={mods}
            onSelectAll={onSelectAll}
            onSelectOne={onSelectOne}
            selected={selected}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
