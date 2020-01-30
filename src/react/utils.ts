import { electron } from './electron';

export function closeApp(): void {
  electron.remote.getCurrentWindow().close();
}

export function createClassString(...classes: string[]): string {
  return classes
    .map((c) => (c ? c.trim() : c))
    .filter((c) => c)
    .join(' ');
}
