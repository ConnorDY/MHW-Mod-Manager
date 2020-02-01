import React, { useState } from 'react';
import {
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core';

import ModRows from '../ModRows';
import NoModsFound from '../NoModsFound';
import Mod from '../../types/Mod';

import './ModsTable.scss';

export default function ModsTable({
  mods,
  onSelectAll,
  onSelectOne,
  orderBy,
  selected,
  sortDir,
  sortMods
}: {
  onSelectAll: () => void;
  onSelectOne: (index: number) => void;
  orderBy: string;
  selected: Set<number>;
  sortDir: boolean;
  sortMods: (column: string, dir: boolean) => void;
  mods: Mod[];
}) {
  const [expanded, setExpanded] = useState('');

  const headerCells = [
    {
      align: 'center',
      key: 'active',
      text: 'Active?'
    },
    {
      align: 'left',
      key: 'filename',
      text: 'Filename'
    },
    {
      align: 'center',
      key: 'num-files',
      text: '# of Files'
    },
    {
      align: 'center',
      key: 'size',
      text: 'Size'
    }
  ];

  function createSortHandler(key: string): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      event.preventDefault();

      if (orderBy !== key) sortMods(key, true);
      else sortMods(key, !sortDir);
    };
  }

  return (
    <TableContainer
      id="mods-table-container"
      className={mods.length === 0 ? 'no-mods' : undefined}
    >
      <Table stickyHeader>
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell className="cell-header-checkbox" padding="checkbox">
              <Checkbox
                indeterminate={selected.size > 0 && selected.size < mods.length}
                checked={selected.size > 0 && selected.size === mods.length}
                onChange={onSelectAll}
              />
            </TableCell>

            {headerCells.map(({ align, key, text }) => (
              <TableCell
                align={align as any}
                className={`cell-header-${key}`}
                key={key}
                sortDirection={
                  orderBy === key ? (sortDir ? 'asc' : 'desc') : false
                }
              >
                <TableSortLabel
                  active={orderBy === key}
                  direction={
                    orderBy === key ? (sortDir ? 'asc' : 'desc') : 'asc'
                  }
                  onClick={createSortHandler(key) as any}
                >
                  {text}
                </TableSortLabel>
              </TableCell>
            ))}

            <TableCell className="cell-header-expand"></TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {mods.length ? (
            <ModRows
              expanded={expanded}
              mods={mods}
              onExpand={setExpanded}
              onSelectOne={onSelectOne}
              selected={selected}
            />
          ) : (
            <NoModsFound />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
