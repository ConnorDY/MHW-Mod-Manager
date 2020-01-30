import React from 'react';
import { Checkbox, TableCell, TableRow, IconButton } from '@material-ui/core';
import {
  CheckCircle as ActiveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@material-ui/icons';

import ExpandedRow from '../ExpandedRow';
import Mod from '../../types/mod';
import { createClassString } from '../../utils';
import './ModRows.scss';

export default function ModRows({
  active,
  expanded,
  onExpand,
  onSelectOne,
  selected,
  mods
}: {
  active: Set<number>;
  expanded: number | undefined;
  onExpand: (index?: number) => void;
  onSelectOne: (index: number) => void;
  selected: Set<number>;
  mods: Mod[];
}) {
  return (
    <>
      {mods.map(({ files, name }, modIndex) => {
        const isExpanded = expanded === modIndex;

        return (
          <React.Fragment key={`zip-${modIndex}`}>
            {/* Mod Row */}
            <TableRow
              aria-expanded={isExpanded}
              className={createClassString(
                'mod-row',
                isExpanded ? 'expanded' : ''
              )}
            >
              <TableCell className="cell-checkbox" padding="checkbox">
                <Checkbox
                  checked={selected.has(modIndex)}
                  onChange={() => onSelectOne(modIndex)}
                />
              </TableCell>

              <TableCell className="cell-active" padding="checkbox">
                {active.has(modIndex) ? <ActiveIcon /> : <></>}
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
                  <IconButton onClick={() => onExpand(modIndex)}>
                    <ExpandMoreIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>

            {/* Expanded Row */}
            <ExpandedRow
              expanded={isExpanded}
              files={files}
              zipIndex={modIndex}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}
