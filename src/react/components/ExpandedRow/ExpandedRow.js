import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

import './ExpandedRow.scss';

export default function ExpandedRow({ files, zipIndex }) {
  return (
    <TableRow className="mod-row-expanded" key="expanded-row">
      <TableCell></TableCell>

      <TableCell className="files-label">Files:</TableCell>

      <TableCell className="files-list" colSpan={3}>
        <ul>
          {files.map((file, fileIndex) => (
            <li key={`file-${zipIndex}-${fileIndex}`}>{file}</li>
          ))}
        </ul>
      </TableCell>
    </TableRow>
  );
}
