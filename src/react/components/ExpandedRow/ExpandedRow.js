import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { TableCell, TableRow } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { filesPropType } from '../../shared-prop-types';
import './ExpandedRow.scss';

const propTypes = {
  files: filesPropType,
  expanded: PropTypes.bool.isRequired,
  zipIndex: PropTypes.number.isRequired
};

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

ExpandedRow.propTypes = propTypes;
