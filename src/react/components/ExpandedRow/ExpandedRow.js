import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { TableCell, TableRow } from '@material-ui/core';

import './ExpandedRow.scss';

export default function ExpandedRow({ files, expanded, zipIndex }) {
  const expandTime = 150;

  return (
    <CSSTransition
      classNames="expand"
      in={expanded}
      timeout={expandTime}
      mountOnEnter
      unmountOnExit
    >
      <TableRow
        className="mod-row-expanded"
        key="expanded-row"
        style={{ transition: `opacity ${expandTime}ms ease-in` }}
      >
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
    </CSSTransition>
  );
}
