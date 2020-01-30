import { electron } from './electron';
import Config from './Config';

export function getGameDirectory(): string {
  const { binPath } = Config.getConfig();
  return binPath ? binPath.replace('MonsterHunterWorld.exe', '') : '';
}

export async function locateGameBinary(): Promise<void> {
  // try to get binPath from config
  let { binPath } = Config.getConfig();

  if (!binPath) {
    // ask user to locate game binary
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

    // close app if no binary was selected
    if (!binPath) {
      electron.remote.getCurrentWindow().close();
      return;
    }

    // write binPath to config
    Config.writeConfig({
      binPath
    });
  }

  // success
  console.log('Game binary located.');
}

export function createClassString(...classes: string[]): string {
  return classes
    .map((c) => (c ? c.trim() : c))
    .filter((c) => c)
    .join(' ');
}
