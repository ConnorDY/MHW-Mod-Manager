import { fs, path, JSZip } from './electron';
const { readFile } = fs.promises;

const modsDir = 'mods';

export async function readZips() {
  const items = fs.readdirSync(modsDir);
  const zipPaths = items.filter(item =>
    /^.*\.(zip|rar|7z)$/.test(item.toLowerCase())
  );

  const zips = [];

  for (const zipPath of zipPaths) {
    const zip = new JSZip();

    const data = await readFile(path.join(modsDir, zipPath));
    await zip.loadAsync(data);

    zips.push([zipPath, zip]);
  }

  return zips;
}
