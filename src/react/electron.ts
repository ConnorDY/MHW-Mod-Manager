import FsExtraNameSpace from 'fs-extra';
import PathNameSpace from 'path';
import JSZipNameSpace from 'jszip';

const electron: typeof Electron = window.require('electron');

const cwd: string = electron.remote.process.cwd();
const dialog = electron.remote.dialog;

const fs: typeof FsExtraNameSpace = electron.remote.require('fs-extra');
const path: typeof PathNameSpace = electron.remote.require('path');
const JSZip: typeof JSZipNameSpace = electron.remote.require('jszip');

export { cwd, dialog, electron, fs, path, JSZip };
