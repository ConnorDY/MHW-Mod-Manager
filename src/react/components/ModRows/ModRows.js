import React from 'react';
import { Checkbox, TableCell, TableRow, IconButton } from '@material-ui/core';
import {
  CheckCircle as ActiveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@material-ui/icons';

import './ModRows.scss';

export default function ModRows({
  active,
  expanded,
  onExpand,
  onSelectOne,
  selected,
  zips
}) {
  return zips.map(([zip, name, files], zipIndex) => {
    const isExpanded = expanded === zipIndex;

    return (
      <React.Fragment key={`zip-${zipIndex}`}>
        <TableRow aria-expanded={isExpanded} className="mod-row">
          <TableCell className="cell-checkbox" padding="checkbox">
            <Checkbox
              checked={selected.has(zipIndex)}
              onChange={() => onSelectOne(zipIndex)}
            />
          </TableCell>

          <TableCell className="cell-active" padding="checkbox">
            {active.has(zipIndex) ? <ActiveIcon /> : <></>}
          </TableCell>

          <TableCell className="cell-filename">{name}</TableCell>

          <TableCell align="center" className="cell-num-files">
            {files.length}
          </TableCell>

          <TableCell className="cell-expand">
            {isExpanded ? (
              <IconButton onClick={() => onExpand()}>
                <ExpandLessIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => onExpand(zipIndex)}>
                <ExpandMoreIcon />
              </IconButton>
            )}
          </TableCell>
        </TableRow>

        <TableRow aria-expanded={isExpanded} className="mod-row-expanded">
          <TableCell colSpan={5}>
            <ul>
              {files.map((file, fileIndex) => (
                <li key={`file-${zipIndex}-${fileIndex}`}>{file}</li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  });
}
