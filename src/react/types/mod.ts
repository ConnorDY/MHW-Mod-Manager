import JSZip from 'jszip';
import file from './file';

export default interface mod {
  files: file[];
  name: string;
  zip: JSZip;
}
