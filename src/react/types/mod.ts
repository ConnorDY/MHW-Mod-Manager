import JSZip from 'jszip';
import File from './file';

export default interface Mod {
  files: File[];
  name: string;
  zip: JSZip;
}
