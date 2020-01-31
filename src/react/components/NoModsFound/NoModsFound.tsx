import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import './NoModsFound.scss';

export default function NoModsFound() {
  return (
    <TableRow>
      <TableCell className="no-mods-found" colSpan={5}>
        No mods found...
      </TableCell>
    </TableRow>
  );
}
