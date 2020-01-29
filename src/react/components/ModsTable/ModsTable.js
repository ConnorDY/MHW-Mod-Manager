import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import { zipsPropType } from '../../shared-prop-types';
import './ModsTable.scss';

const propTypes = {
  active: PropTypes.instanceOf(Set).isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Set).isRequired,
  zips: zipsPropType
};

export default function ModsTable({
  active,
  onSelectAll,
  onSelectOne,
  selected,
  zips
}) {
  const [expanded, setExpanded] = useState();

  return (
    <TableContainer id="mods-table-container">
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

ModsTable.propTypes = propTypes;
