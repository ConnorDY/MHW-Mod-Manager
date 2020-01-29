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
import './ModTable.scss';

export default function ModTable({
  active,
  onSelectAll,
  onSelectOne,
  selected,
  zips
}) {
  const [expanded, setExpanded] = useState();

  return (
    <TableContainer id="mod-table-container">
      <Table stickyHeader>
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell className="cell-header-checkbox" padding="checkbox">
              <Checkbox
                indeterminate={selected.size > 0 && selected.size < zips.length}
                checked={selected.size === zips.length}
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
            onExpand={setExpanded}
            onSelectOne={onSelectOne}
            selected={selected}
            zips={zips}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
