import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { TableCell, TableRow } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import File from '../../types/file';
import './ExpandedRow.scss';

export default function ExpandedRow({
  expanded,
  files,
  zipIndex
}: {
  expanded: boolean;
  files: File[];
  zipIndex: number;
}) {
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
            {files.map(({ installed, path }, fileIndex) => (
              <li key={`file-${zipIndex}-${fileIndex}`}>
                {path} {installed && <CheckIcon />}
              </li>
            ))}
          </ul>
        </TableCell>
      </TableRow>
    </CSSTransition>
  );
}
