import { cwd, dialog, fs, path } from './electron';
import Config from './Config';
import Alert from './types/Alert';
import { closeApp, showAlert } from './utils';

export function getModsDirectory(): void {
  // try to get modsPath from config
  const { modsPath } = Config.getConfig();

  if (!modsPath) {
    // create mods directory in app directory
    const defaultModsPath = path.join(cwd, 'mods');
    fs.ensureDirSync(defaultModsPath);
    console.log('Created mods directory.');

    // write modsPath to config
    Config.writeConfig({ modsPath: defaultModsPath });
    return;
  }

  // close app if the mods directory does not exist
  if (!fs.existsSync(modsPath)) {
    showAlert('Mods directory not found.', Alert.Error);
    closeApp();
    return;
  }

  // success
  console.log('Found mods directory.');
}

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
      await dialog.showOpenDialog({
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
      showAlert('No binary selected.', Alert.Error);
      closeApp();
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
