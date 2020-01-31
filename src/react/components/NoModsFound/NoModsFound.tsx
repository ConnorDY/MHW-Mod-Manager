import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import './NoModsFound.scss';

export default function NoModsFound() {
  return (
    <TableRow className="no-mods-found">
      <TableCell colSpan={5}>No mods found...</TableCell>
    </TableRow>
  );
}
