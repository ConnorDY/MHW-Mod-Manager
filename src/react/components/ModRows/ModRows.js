import React from 'react';
import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import { CheckCircleOutline as CheckIcon } from '@material-ui/icons';

import './ModRows.scss';

export default function ModRows({ onSelectOne, selected, zips }) {
  return zips.map(([name, zip], index) => {
    const active = selected.has(index);

    return (
      <TableRow key={`zip-${index}`}>
        <TableCell padding="checkbox">
          <Checkbox checked={active} onChange={() => onSelectOne(index)} />
        </TableCell>

        <TableCell className="cell-active" padding="checkbox">
          {active ? <CheckIcon /> : <></>}
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{Object.keys(zip.files).length}</TableCell>
      </TableRow>
    );
  });
}
