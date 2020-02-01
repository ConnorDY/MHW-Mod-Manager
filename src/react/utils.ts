import { dialog, electron } from './electron';
import Alert from './types/Alert';

export function closeApp(): void {
  electron.app.quit();
}

export function showAlert(message: string, type = Alert.Info): void {
  dialog.showMessageBoxSync({
    message,
    title: 'MHW Mod Manager',
    type
  });
}

export function createClassString(...classes: string[]): string {
  return classes
    .map((c) => (c ? c.trim() : c))
    .filter((c) => c)
    .join(' ');
}

export function formatSizeString(size: number): string {
  const kb = size / 1000;
  let units = 'KB';
  let num = kb;

  if (kb > 9999) {
    units = 'MB';
    num = kb / 1000;
  }

  return `${num.toLocaleString('en', {
    maximumFractionDigits: 2
  })} ${units}`;
}
