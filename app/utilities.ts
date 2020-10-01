const Configstore = require('configstore');

const pkg = require('../package.json');
import { directoryExists, getFilesFromPath } from './files';
import { log } from './log';
import { PathsI } from './models/paths.model';
import { versionToUpload } from './inquirer';

const config = new Configstore(pkg.name);
export let { appPath, zipPath, version } = config.all;

export function setPaths(paths: PathsI): void {
  config.set('appPath', paths.app);
  config.set('zipPath', paths.zip);
  appPath = paths.app;
  zipPath = paths.zip;
}

export function setVersion(): void {
  const date = new Date();
  const dateF = date
    .toLocaleDateString('es-MX', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/\//g, '')
    .replace(/-/g, '')
    .replace(' ', '-')
    .replace(':', '');
  const versionI = `v2-${dateF}`;
  config.set('version', versionI);
  version = versionI;
}

export function verifyPaths(): {
  validAppPath: boolean;
  validZipPath: boolean;
} {
  return {
    validAppPath: directoryExists(appPath),
    validZipPath: directoryExists(zipPath),
  };
}

export function verifyVersion(version: string): boolean {
  return directoryExists(version);
}

export function logPaths(): void {
  log(`App path: ${appPath} `, 'info');
  log(`* Carpeta raíz del proyecto Angular `, 'minor');
  log(`Zip path: ${zipPath} `, 'info');
  log(`* Carpeta donde se colocará el zip de la aplicación `, 'minor');
}

export async function getVersionToUpload(): Promise<string> {
  const files = getFilesFromPath(zipPath);
  const { version } = await versionToUpload(files);
  return version;
}
