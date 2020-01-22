import React from 'react';
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

export default function ModTable({
  active,
  onSelectAll,
  onSelectOne,
  selected,
  zips
}) {
  return (
    <TableContainer id="mod-table-container">
      <Table stickyHeader>
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.size > 0 && selected.size < zips.length}
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

        {/* Body */}
        <TableBody>
          <ModRows
            active={active}
            onSelectOne={onSelectOne}
            selected={selected}
            zips={zips}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
