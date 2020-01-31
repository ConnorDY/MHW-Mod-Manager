import JSZip from 'jszip';
import File from './File';

export default interface Mod {
  active: boolean;
  files: File[];
  name: string;
  zip: JSZip;
}

export const zipRegex = /^.*\.(zip)$/;
