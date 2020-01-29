const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { createModsDirectory } = require('./utils');

let window;

async function createWindow() {
  createModsDirectory();

  window = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startUrl = process.env.DEV
    ? 'http://localhost:3000'
    : url.format({
        pathname: path.join(__dirname, '/../../build/index.html'),
        protocol: 'file:',
        slashes: true
      });

  window.loadURL(startUrl);

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (window === null) createWindow();
});
