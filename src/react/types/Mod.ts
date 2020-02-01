import JSZip from 'jszip';
import File from './File';

export default interface Mod {
  active: boolean;
  files: File[];
  name: string;
  size: number;
  zip: JSZip;
}

export const zipRegex = /^.*\.(zip)$/;
