import { fs, path, JSZip } from './electron';
import { getGameDirectory } from './directories';
import Config from './Config';
import File from './types/File';
import Mod, { zipRegex } from './types/Mod';

const { readFile } = fs.promises;

export async function readZips(): Promise<Mod[]> {
  const modsPath = Config.getConfig().modsPath as string;

  // get a list of supported files from the mods folder
  const items: string[] = fs.readdirSync(modsPath);
  const zipPaths = items.filter((item) => zipRegex.test(item.toLowerCase()));

  const gameDir = getGameDirectory();
  const mods: Mod[] = [];

  for (const zipPath of zipPaths) {
    const zip = new JSZip();

    // read zip file
    const data = await readFile(path.join(modsPath, zipPath));
    await zip.loadAsync(data);

    // create a list of files in the zip (excluding directories)
    const filePaths = Object.keys(zip.files).filter(
      (filePath) => filePath.charAt(filePath.length - 1) !== '/'
    );

    const files: File[] = [];

    // check if the files exist in the game directory
    for (const filePath of filePaths) {
      files.push({
        exists: fs.existsSync(path.join(gameDir, filePath)),
        path: filePath
      });
    }

    mods.push({
      active: files.every((file) => file.exists),
      files,
      name: zipPath,
      zip
    });
  }

  return mods;
}

export function sortModsByColumn(
  mods: Mod[],
  column: string,
  dir: boolean
): void {
  switch (column) {
    case 'active':
      mods.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
      break;

    case 'filename':
      mods.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'num-files':
      mods.sort((a, b) =>
        a.files.length === b.files.length
          ? 0
          : a.files.length > b.files.length
          ? 1
          : -1
      );
      break;
  }

  if (!dir) mods.reverse();
}

export async function activateMod(mod: Mod): Promise<void> {
  const gameDir = getGameDirectory();

  for (const file of mod.files) {
    const buffer = await mod.zip.file(file.path).async('nodebuffer');
    fs.outputFileSync(path.join(gameDir, file.path), buffer);
    file.exists = true;
  }

  mod.active = true;
}

export function deactivateMod(mod: Mod): void {
  const gameDir = getGameDirectory();

  for (const file of mod.files) {
    fs.unlinkSync(path.join(gameDir, file.path));
    file.exists = false;
  }

  mod.active = false;
}

export async function addMods(files: FileList): Promise<void> {
  const modsPath = Config.getConfig().modsPath as string;

  for (const file of files) {
    await fs.copyFile(file.path, path.join(modsPath, file.name));
  }
}
