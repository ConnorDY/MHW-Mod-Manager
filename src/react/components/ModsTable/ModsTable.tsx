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
import mod from '../../types/mod';

import './ModsTable.scss';

export default function ModsTable({
  active,
  onSelectAll,
  onSelectOne,
  selected,
  mods
}: {
  active: Set<number>;
  onSelectAll: () => void;
  onSelectOne: (index: number) => void;
  selected: Set<number>;
  mods: mod[];
}) {
  const [expanded, setExpanded] = useState<number | undefined>();

  return (
    <TableContainer id="mods-table-container">
      <Table stickyHeader>
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell className="cell-header-checkbox" padding="checkbox">
              <Checkbox
                indeterminate={selected.size > 0 && selected.size < mods.length}
                checked={selected.size === mods.length}
                onChange={onSelectAll}
              />
            </TableCell>

            <TableCell className="cell-header-active">
              <TableSortLabel>Active?</TableSortLabel>
            </TableCell>

            <TableCell className="cell-header-filename">
              <TableSortLabel>Filename</TableSortLabel>
            </TableCell>

            <TableCell className="cell-header-num-files">
              <TableSortLabel># of Files</TableSortLabel>
            </TableCell>

            <TableCell className="cell-header-expand"></TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          <ModRows
            active={active}
            expanded={expanded}
            mods={mods}
            onExpand={(index?: number) => setExpanded(index)}
            onSelectOne={onSelectOne}
            selected={selected}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
