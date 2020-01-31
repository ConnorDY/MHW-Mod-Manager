import React, { useEffect, useState } from 'react';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import {
  AddCircleOutline as ActivateIcon,
  RemoveCircleOutline as DeactivateIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import DragAndDropOverlay from '../DragAndDropOverlay';
import ModsTable from '../ModsTable';
import {
  getModsDirectory,
  locateGameBinary,
  getGameDirectory
} from '../../directories';
import { activateMod, deactivateMod, addMods, readZips } from '../../mods';
import Config from '../../Config';
import Mod from '../../types/Mod';

import './App.scss';

function App() {
  const { darkMode } = Config.getConfig();

  const [activating, setActivating] = useState(false);
  const [copying, setCopying] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [gameDir, setGameDir] = useState<string>();
  const [selected, setSelected] = useState(new Set<number>());
  const [mods, setMods] = useState<Mod[]>([]);

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
    if (activating || deactivating || copying) return false;

    for (const modIndex of selected.values()) {
      if (mods[modIndex].active) return false;
    }

    return true;
  }

  function canDeactivate(): boolean {
    if (activating || deactivating || copying) return false;

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

  async function onFileDrop(event: DragEvent) {
    setCopying(true);

    if (!event.dataTransfer || !event.dataTransfer.files) return;
    await addMods(event.dataTransfer.files);

    setCopying(false);
    loadMods();
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
    <div id="app" className={darkMode ? 'theme-dark' : undefined}>
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
            {activating ? (
              <CircularProgress />
            ) : (
              <>
                <ActivateIcon />
                <span className="buttonText">Activate</span>
              </>
            )}
          </Button>

          <Button
            color="primary"
            disabled={!canDeactivate()}
            onClick={onDeactivate}
            variant="contained"
          >
            {deactivating ? (
              <CircularProgress />
            ) : (
              <>
                <DeactivateIcon />
                <span className="buttonText">Deactivate</span>
              </>
            )}
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

      {/* Drag and Drop */}
      <DragAndDropOverlay onDrop={onFileDrop} />
    </div>
  );
}

export default App;
