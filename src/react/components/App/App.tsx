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
import {
  activateMod,
  deactivateMod,
  addMods,
  readZips,
  sortModsByColumn
} from '../../mods';
import Config from '../../Config';
import Mod from '../../types/Mod';

import './App.scss';

function App() {
  const { darkMode } = Config.getConfig();

  const [activating, setActivating] = useState(false);
  const [copying, setCopying] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [gameDir, setGameDir] = useState<string>();
  const [mods, setMods] = useState<Mod[]>([]);
  const [modsDir, setModsDir] = useState<string>();
  const [orderBy, setOrderBy] = useState('filename');
  const [sortDir, setSortDir] = useState(true);
  const [selected, setSelected] = useState(new Set<number>());

  async function loadMods(): Promise<void> {
    sortMods(orderBy, sortDir, await readZips());
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

  function sortMods(column: string, dir: boolean, _mods = mods): void {
    sortModsByColumn(_mods, column, dir);
    setOrderBy(column);
    setSortDir(dir);
    setMods(_mods);
  }

  async function onFileDrop(files: FileList): Promise<void> {
    setCopying(true);
    await addMods(files);
    setCopying(false);

    loadMods();
  }

  // on app start
  useEffect(() => {
    setModsDir(getModsDirectory());

    locateGameBinary().then(() => {
      setGameDir(getGameDirectory());
      loadMods();
    });

    // eslint-disable-next-line
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
          <div className="directory-locations">
            <div className="game-dir">
              <span className="game-dir-label">Game Directory:</span>{' '}
              {gameDir ? gameDir.replace(/\\/g, '/') : ''}
            </div>

            <div className="mods-dir">
              <span className="mods-dir-label">Mods Directory:</span>{' '}
              {modsDir ? `${modsDir.replace(/\\/g, '/')}/` : ''}
            </div>
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
            orderBy={orderBy}
            selected={selected}
            sortDir={sortDir}
            sortMods={sortMods}
          />
        </Grid>
      </Grid>

      {/* Drag and Drop */}
      <DragAndDropOverlay onFileDrop={onFileDrop} />
    </div>
  );
}

export default App;
