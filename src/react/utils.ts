import { dialog, electron } from './electron';
import Alert from './types/Alert';

export function closeApp(): void {
  electron.remote.getCurrentWindow().close();
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
