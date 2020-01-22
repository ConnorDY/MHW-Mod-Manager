import React from 'react';
import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import { CheckCircle as ActiveIcon } from '@material-ui/icons';

import './ModRows.scss';

export default function ModRows({ active, onSelectOne, selected, zips }) {
  return zips.map(([name, zip], index) => {
    return (
      <TableRow key={`zip-${index}`}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected.has(index)}
            onChange={() => onSelectOne(index)}
          />
        </TableCell>

        <TableCell className="cell-active" padding="checkbox">
          {active.has(index) ? <ActiveIcon /> : <></>}
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{Object.keys(zip.files).length}</TableCell>
      </TableRow>
    );
  });
}
