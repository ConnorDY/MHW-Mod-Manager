import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TableCell, TableRow, IconButton } from '@material-ui/core';
import {
  CheckCircle as ActiveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@material-ui/icons';

import ExpandedRow from '../ExpandedRow';
import { createClassString } from '../../utils';
import './ModRows.scss';

const propTypes = {
  active: PropTypes.instanceOf(Set).isRequired,
  expanded: PropTypes.number,
  onExpand: PropTypes.func.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Set).isRequired,
  zips: PropTypes.arrayOf(
    PropTypes.shape({
      files: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      zip: PropTypes.object.isRequired
    })
  ).isRequired
};

export default function ModRows({
  active,
  expanded,
  onExpand,
  onSelectOne,
  selected,
  zips
}) {
  return zips.map(({ files, name }, zipIndex) => {
    const isExpanded = expanded === zipIndex;

    return (
      <React.Fragment key={`zip-${zipIndex}`}>
        {/* Mod Row */}
        <TableRow
          aria-expanded={isExpanded}
          className={createClassString('mod-row', isExpanded ? 'expanded' : '')}
        >
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

        {/* Expanded Row */}
        <ExpandedRow expanded={isExpanded} files={files} zipIndex={zipIndex} />
      </React.Fragment>
    );
  });
}

ModRows.propTypes = propTypes;
