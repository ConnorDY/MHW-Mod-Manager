const electron = window.require('electron');
const fs = electron.remote.require('fs');
const path = electron.remote.require('path');
const JSZip = electron.remote.require('jszip');

export { electron, fs, path, JSZip };
