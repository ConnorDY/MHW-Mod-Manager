import React, { useEffect, useState } from 'react';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import ModsTable from '../ModsTable';
import {
  getModsDirectory,
  locateGameBinary,
  getGameDirectory
} from '../../directories';
import { readZips, activateMod, deactivateMod } from '../../mods';
import mod from '../../types/mod';

import './App.scss';

function App() {
  const [activating, setActivating] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [gameDir, setGameDir] = useState<string>();
  const [selected, setSelected] = useState(new Set<number>());
  const [mods, setMods] = useState<mod[]>([]);

  async function loadMods(): Promise<void> {
    setMods(await readZips());
  }

  function updateSelected(): void {
    setSelected(new Set(selected));
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

  function canActivate(): boolean {
    if (activating || deactivating) return false;

    for (const modIndex of selected.values()) {
      if (mods[modIndex].active) return false;
    }

    return true;
  }

  function canDeactivate(): boolean {
    if (activating || deactivating) return false;

    for (const modIndex of selected.values()) {
      if (!mods[modIndex].active) return false;
    }

    return true;
  }

  async function onActivate(): Promise<void> {
    setActivating(true);

    for (const modIndex of selected.values()) {
      await activateMod(mods[modIndex]);
    }

    setMods(mods);
    selected.clear();
    updateSelected();

    setActivating(false);
  }

  function onDeactivate(): void {
    setDeactivating(true);

    for (const modIndex of selected.values()) {
      deactivateMod(mods[modIndex]);
    }

    setMods(mods);
    selected.clear();
    updateSelected();

    setDeactivating(false);
  }

  function sortMods(column: string, dir: boolean): void {
    switch (column) {
      case 'active':
        mods.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
        break;

      case 'filename':
        mods.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'num-files':
        mods.sort((a, b) =>
          a.files.length === b.files.length
            ? 0
            : a.files.length > b.files.length
            ? 1
            : -1
        );
        break;
    }

    if (!dir) mods.reverse();
    setMods(mods);
  }

  // on app start
  useEffect(() => {
    getModsDirectory();
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
          <Button
            color="secondary"
            disabled={activating || deactivating}
            onClick={() => loadMods()}
            variant="contained"
          >
            <RefreshIcon />
          </Button>

          <Button
            color="primary"
            disabled={!canActivate()}
            onClick={onActivate}
            variant="contained"
          >
            {activating ? <CircularProgress /> : 'Activate'}
          </Button>

          <Button
            color="primary"
            disabled={!canDeactivate()}
            onClick={onDeactivate}
            variant="contained"
          >
            {deactivating ? <CircularProgress /> : 'Deactivate'}
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
            sortMods={sortMods}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
