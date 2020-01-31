import React from 'react';
import FileDrop from 'react-file-drop';
import { Archive as ArchiveIcon } from '@material-ui/icons';

import { zipRegex } from '../../types/Mod';
import './DragAndDropOverlay.scss';
import { showAlert } from '../../utils';
import Alert from '../../types/Alert';

export default function DragAndDropOverlay({
  onFileDrop
}: {
  onFileDrop: (files: FileList) => void;
}) {
  function onDrop(event: DragEvent) {
    if (!event.dataTransfer || !event.dataTransfer.files.length) return;

    for (const file of event.dataTransfer.files) {
      if (!zipRegex.test(file.name)) {
        // invalid file dropped
        showAlert(
          'Invalid file type. Only zip files are supported.',
          Alert.Warning
        );
        return;
      }
    }

    onFileDrop(event.dataTransfer.files);
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
