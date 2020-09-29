var seven = require('node-7z');

import { log } from './log';

export function ngZip(
  appPath: string,
  zipPath: string,
  version: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const name = `${zipPath}\\${version}.zip`;
    const app = `${appPath}\\dist\\banorte`;
    const myStream = seven.add(name, app + '/*', {
      recursive: true,
    });
    myStream.on('end', function () {
      log('Proceso 7zip completado ', 'success');
      resolve(true);
    });
    myStream.on('error', () => {
      log('Error en proceso 7zip ', 'error');
      reject(false);
    });
  });
}
