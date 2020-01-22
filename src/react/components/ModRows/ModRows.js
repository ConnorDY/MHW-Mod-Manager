import React from 'react';
import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

export default function ModRows({ onSelectOne, selected, zips }) {
  return zips.map(([name, zip], index) => {
    const active = selected.has(index);

    return (
      <TableRow key={`zip-${index}`}>
        <TableCell padding="checkbox">
          <Checkbox checked={active} onChange={() => onSelectOne(index)} />
        </TableCell>

        <TableCell>{active ? <CheckIcon /> : <></>}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{Object.keys(zip.files).length}</TableCell>
      </TableRow>
    );
  });
}
