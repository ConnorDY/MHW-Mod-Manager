import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import './NoModsFound.scss';

export default function NoModsFound() {
  return (
    <TableRow className="no-mods-found">
      <TableCell colSpan={5}>
        <p>No mods found...</p>
        <p>Drag and drop mods onto this window to add them.</p>
      </TableCell>
    </TableRow>
  );
}
