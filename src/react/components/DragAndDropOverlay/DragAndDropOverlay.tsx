import React from 'react';
import FileDrop from 'react-file-drop';
import { Archive as ArchiveIcon } from '@material-ui/icons';

import { zipRegex } from '../../types/Mod';
import './DragAndDropOverlay.scss';

export default function DragAndDropOverlay({
  onFileDrop
}: {
  onFileDrop: (event: DragEvent) => void;
}) {
  function onDrop(event: DragEvent) {
    if (!event.dataTransfer || !event.dataTransfer.files.length) return;

    for (const file of event.dataTransfer.files) {
      if (!zipRegex.test(file.name)) return;
    }

    onFileDrop(event);
  }

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
