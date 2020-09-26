import { PathsI } from './models/paths.model';
const { argv } = require('yargs');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const Configstore = require('configstore');
const pkg = require('../package.json');

const config = new Configstore(pkg.name);
let { appPath, zipPath } = config.all;

import { log } from './log';
import { ngBuild } from './ng-build';
import { ngZip } from './zip';
import { upload, filesystems, refresh } from './requests';
import { directoryExists } from './files';
import { getPaths, validateCurrentPaths } from './inquirer';

async function initProcess() {
  clear();
  console.log(
    chalk.yellow(figlet.textSync('CI/CD', { horizontalLayout: 'full' }))
  );
  // Si falta algún path se obtienen
  if (!appPath || !zipPath) {
    const paths = await getPaths();
    setPaths(paths);
  }
  logPaths();
  // Si están definidos los paths se pregunta si son correctos
  const { valid } = await validateCurrentPaths(
    'Son correctos los paths (s/n):',
    'Por favor, indica si es correcto con una "s" o incorrecto con una "n".'
  );
  // Si no son correctos se obtienen
  if (valid === 'n') {
    const paths = await getPaths();
    setPaths(paths);
    logPaths();
  }
  // Verifica si los paths son válidos
  const { validAppPath, validZipPath } = verifyPaths();
  if (!validAppPath || !validZipPath) {
    if (!validAppPath) {
      log(`App path inválido `, 'error');
    }
    if (!validZipPath) {
      log(`Zip path inválido `, 'error');
    }
    log(`Saliendo de aplicación por error `, 'error');
    process.exit(0);
  }
  const build = await buildProcess();
  if (!build) {
    log(`Saliendo de aplicación por error `, 'error');
    process.exit(0);
  } else if (!directoryExists(`${appPath}\\dist\\banorte`)) {
    log('No se encontró la carpeta con la aplicación compilada ', 'error');
    log(`Saliendo de aplicación por error `, 'error');
    process.exit(0);
  }
  const zip = await zipProcess()
    .then()
    .catch((err) => console.log(err));
  if (!zip) {
    log(`Saliendo de aplicación por error `, 'error');
    process.exit(0);
  }
  // const upload = await uploadProcess();
  // !!upload ? process.exit(0) : process.exit(1);
  process.exit(0);
}

function setPaths(paths: PathsI): void {
  config.set('appPath', paths.app);
  config.set('zipPath', paths.zip);
  appPath = paths.app;
  zipPath = paths.zip;
}

function verifyPaths(): { validAppPath: boolean; validZipPath: boolean } {
  return {
    validAppPath: directoryExists(appPath),
    validZipPath: directoryExists(zipPath),
  };
}

function logPaths(): void {
  log(`App path: ${appPath} `, 'minor');
  log(`Zip path: ${zipPath} `, 'minor');
}

function buildProcess(): Promise<boolean> {
  log('Comenzando proceso ng build.... ', 'info');
  return ngBuild(appPath);
}

function zipProcess(): Promise<boolean> {
  log('Comenzando proceso 7zip.... ', 'info');
  return ngZip(appPath, zipPath);
}

async function uploadProcess(): Promise<boolean> {
  log('Comenzando proceso upload de zip... ', 'info');
  const uploadRes = await upload();
  let filesystemsR: boolean;
  let refreshR: boolean;
  if (!!!uploadRes) {
    return false;
  }
  filesystemsR = await filesystems(uploadRes);
  refreshR = await refresh();
  return !!filesystemsR || !!refreshR ? true : false;
}

initProcess();
