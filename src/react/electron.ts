import FsExtraNameSpace from 'fs-extra';
import PathNameSpace from 'path';
import JSZipNameSpace from 'jszip';

const electronMain: typeof Electron = window.require('electron');
const electron = electronMain.remote;

const cwd = electron.process.cwd();
const dialog = electron.dialog;

const fs: typeof FsExtraNameSpace = electron.require('fs-extra');
const path: typeof PathNameSpace = electron.require('path');
const JSZip: typeof JSZipNameSpace = electron.require('jszip');

export { cwd, dialog, electron, fs, path, JSZip };
