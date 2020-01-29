import { fs, path, JSZip } from './electron';
const { readFile } = fs.promises;

const modsDir = 'mods';

export async function readZips() {
  // get a list of supported files from the mods folder
  const items = fs.readdirSync(modsDir);
  const zipPaths = items.filter((item) =>
    /^.*\.(zip|rar|7z)$/.test(item.toLowerCase())
  );

  const zips = [];

  for (const zipPath of zipPaths) {
    const zip = new JSZip();

    // read zip file
    const data = await readFile(path.join(modsDir, zipPath));
    await zip.loadAsync(data);

    // create a list of files in the zip (excluding directories)
    const files = Object.keys(zip.files).filter(
      (filePath) => filePath.charAt(filePath.length - 1) !== '/'
    );

    zips.push({ files, name: zipPath, zip });
  }

  return zips;
}
