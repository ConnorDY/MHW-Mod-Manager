import file from './types/file';
import mod from './types/mod';
import { getGameDirectory } from './utils';
import { fs, path, JSZip } from './electron';

const { readFile } = fs.promises;

const modsDir = 'mods';

export async function readZips(): Promise<mod[]> {
  // get a list of supported files from the mods folder
  const items: string[] = fs.readdirSync(modsDir);
  const zipPaths = items.filter((item) =>
    /^.*\.(zip|rar|7z)$/.test(item.toLowerCase())
  );

  const gameDir = getGameDirectory();
  const mods: mod[] = [];

  for (const zipPath of zipPaths) {
    const zip = new JSZip();

    // read zip file
    const data = await readFile(path.join(modsDir, zipPath));
    await zip.loadAsync(data);

    // create a list of files in the zip (excluding directories)
    const filePaths = Object.keys(zip.files).filter(
      (filePath) => filePath.charAt(filePath.length - 1) !== '/'
    );

    const files: file[] = [];

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

  mods.sort((a, b) => a.name.localeCompare(b.name));

  return mods;
}
