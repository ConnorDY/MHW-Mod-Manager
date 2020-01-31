import React from 'react';
import FileDrop from 'react-file-drop';
import { Archive as ArchiveIcon } from '@material-ui/icons';

import './DragAndDropOverlay.scss';

export default function DragAndDropOverlay({
  onDrop
}: {
  onDrop: (event: DragEvent) => void;
}) {
  return (
    <FileDrop
      className="drop-zone-outer"
      draggingOverFrameClassName="drop-zone-active"
      onFrameDrop={onDrop}
      targetClassName="drop-zone-inner"
    >
      <ArchiveIcon />

      <div className="drop-zone-text">drop mods here to add them</div>
    </FileDrop>
  );
}
