import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core';

import { readZips } from '../../mod-reader';
import './App.scss';
import ModRows from '../ModRows/ModRows';

function App() {
  const [zips, setZips] = useState([]);
  const [selected, setSelected] = useState(new Set());

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

    setSelected(selected);
  }

  function onSelectOne(index) {
    selected.has(index) ? selected.delete(index) : selected.add(index);
    setSelected(selected);
    console.log(selected);
  }

  useEffect(() => {
    loadMods();
  }, []);

  return (
    <>
      {/* Toolbar */}
      <Grid container spacing={2}>
        <Grid item>
          <Button onClick={loadMods}>Refresh</Button>
        </Grid>
      </Grid>

      {/* Mod List */}
      <Grid container>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.size > 0 && selected.size < zips.length
                      }
                      checked={selected.size === zips.length}
                      onChange={onSelectAll}
                    />
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>Active?</TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>Filename</TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel># of Files</TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <ModRows
                  onSelectOne={onSelectOne}
                  selected={selected}
                  zips={zips}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
