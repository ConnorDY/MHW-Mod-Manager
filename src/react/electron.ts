const electron = window.require('electron');

const cwd: string = electron.remote.process.cwd();

const fs = electron.remote.require('fs');
const path = electron.remote.require('path');
const JSZip = electron.remote.require('jszip');

export { cwd, electron, fs, path, JSZip };
