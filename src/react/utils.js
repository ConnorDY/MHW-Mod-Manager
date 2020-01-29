import { electron } from './electron';
import Config from './config';

export function getGameDirectoryFromBinPath() {
  const { binPath } = Config.getConfig();
  return binPath.replace('MonsterHunterWorld.exe', '');
}

export async function locateGameBinary() {
  let { binPath } = Config.getConfig();

  if (!binPath) {
    binPath = (
      await electron.remote.dialog.showOpenDialog({
        defaultPath: 'C:\\Program Files (x86)\\Steam\\steamapps\\common',
        filters: [
          {
            extensions: ['exe'],
            name: 'MonsterHunterWorld.exe'
          }
        ],
        properties: ['openFile'],
        title: 'Where is MonsterHunterWorld.exe located?'
      })
    ).filePaths[0];

    Config.writeConfig({
      binPath
    });
  }

  console.log('Game binary located.');

  return binPath;
}

export function createClassString(...classes) {
  return classes
    .map((c) => (c ? c.trim() : c))
    .filter((c) => c)
    .join(' ');
}
