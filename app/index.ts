import { join } from 'path';
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const CLI = require('clui');

import { log } from './log';
import { ngBuild } from './ng-build';
import { ngZip } from './zip';
import { upload, filesystems, refresh } from './requests';
import { directoryExists } from './files';
import {
  getPaths,
  validateCurrentPaths,
  getEnvironment,
  processToExec,
} from './inquirer';
import {
  appPath,
  zipPath,
  version,
  setPaths,
  setVersion,
  verifyPaths,
  verifyVersion,
  logPaths,
  getVersionToUpload,
  exitApp,
} from './utilities';

const Spinner = CLI.Spinner;

async function initProcess() {
  clear();
  console.log(
    chalk.yellow(figlet.textSync('EDITOR', { horizontalLayout: 'full' }))
  );
  // Si falta algún path se obtienen
  if (!appPath || !zipPath) {
    const paths = await getPaths();
    setPaths(paths);
  }
  logPaths();
  // Si están definidos los paths se pregunta si son correctos
  const { valid } = await validateCurrentPaths();
  // Si no son correctos se obtienen
  if (!valid) {
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
    await exitApp(`Saliendo de aplicación por error `, 'error');
  }
  // Elige qué proceso(s) ejecutar
  const { cmd } = await processToExec();
  // Proceso build
  if (cmd === 'Build' || cmd === 'Todos') {
    const status = new Spinner(
      'Comenzando proceso build, por favor espera...',
      ['◜', '◠', '◝', '◞', '◡', '◟']
    );
    status.start();
    const build = await buildProcess();
    status.stop();
  }
  // Proceso zip
  if (cmd === 'Zip' || cmd === 'Todos') {
    const zip = await zipProcess();
  }
  // Proceso upload
  if (cmd === 'Upload' || cmd === 'Todos') {
    let versionToUpload: string | null = null;
    if (cmd === 'Upload') {
      versionToUpload = await getVersionToUpload();
    }
    const upload = await uploadProcess(versionToUpload);
  }
  if (process.exitCode !== 1) {
    await exitApp(`Saliendo de aplicación con éxito `, 'success');
  }
  process.exit();
}

// Proceso build
async function buildProcess(): Promise<void> {
  // log('Comenzando proceso ng build.... ', 'info');
  const build = await ngBuild(appPath);
  if (!build) {
    await exitApp(
      `Saliendo de aplicación por error en build process `,
      'error'
    );
  }
}
// Proceso zip
async function zipProcess(): Promise<void> {
  // Comprobar que exista carpeta dist\banorte
  if (!directoryExists(`${appPath}\\dist\\banorte`)) {
    log('No se encontró la carpeta con la aplicación compilada ', 'error');
    await exitApp(`Saliendo de aplicación por error en zip process `, 'error');
  }
  log('Comenzando proceso 7zip.... ', 'info');
  setVersion();
  log(`Version: ${version} `, 'minor');
  // Proceso zip
  const zip = await ngZip(appPath, zipPath, version);
  if (!zip) {
    await exitApp(`Saliendo de aplicación por error en zip process `, 'error');
  }
}
// Proceso upload
async function uploadProcess(
  savedVersion: string | null = null
): Promise<void> {
  log('Comenzando proceso upload de aplicación... ', 'info');
  const { env } = await getEnvironment();
  const filePath = !!savedVersion
    ? join(zipPath, `${savedVersion}`)
    : join(zipPath, `${version}.zip`);
  const validPath = verifyVersion(filePath);
  if (!validPath) {
    log(`No se encontró el archivo especificado ${savedVersion}.zip `, 'error');
    await exitApp(
      `Saliendo de aplicación por error en upload process `,
      'error'
    );
    return;
  }
  try {
    const uploadRes = await upload(filePath, env);
    await filesystems(uploadRes, env);
    await refresh(env);
  } catch (error) {
    await exitApp(
      `Saliendo de aplicación por error en upload process `,
      'error'
    );
  }
}

initProcess();
