const electron = window.require('electron');

const cwd: string = electron.remote.process.cwd();
const dialog = electron.remote.dialog;

const fs = electron.remote.require('fs-extra');
const path = electron.remote.require('path');
const JSZip = electron.remote.require('jszip');

export { cwd, dialog, electron, fs, path, JSZip };
