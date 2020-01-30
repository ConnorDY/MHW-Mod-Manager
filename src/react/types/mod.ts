import JSZip from 'jszip';
import file from './file';

export default interface mod {
  active: boolean;
  files: file[];
  name: string;
  zip: JSZip;
}
