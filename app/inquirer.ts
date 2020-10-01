const inquirer = require('inquirer');
import { PathsI } from './models/paths.model';

export function getPaths(): Promise<PathsI> {
  const questions = [
    {
      name: 'app',
      type: 'input',
      message: 'Ruta en donde se encuentra la aplicación:',
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Por favor, ingresa la ruta de la aplicación.';
        }
      },
    },
    {
      name: 'zip',
      type: 'input',
      message: 'Ruta en donde se colocará el zip con la aplicación:',
      validate: function (value: string) {
        if (value.length) {
          return true;
        } else {
          return 'Por favor, ingresa la ruta en donde se colocará el zip de la aplicación.';
        }
      },
    },
  ];
  return inquirer.prompt(questions);
}

export function validateCurrentPaths(): Promise<{ valid: string }> {
  const questions = [
    {
      name: 'valid',
      type: 'confirm',
      message: '¿Son correctos los paths?',
    },
  ];
  return inquirer.prompt(questions);
}

export function getEnvironment(): Promise<{ env: string }> {
  const questions = [
    {
      name: 'env',
      type: 'list',
      message: '¿En qué ambiente se desplegará la aplicación?',
      choices: ['dev', 'int'],
      default: 'dev',
    },
  ];
  return inquirer.prompt(questions);
}

export function processToExec(): Promise<{ cmd: string }> {
  const questions = [
    {
      name: 'cmd',
      type: 'list',
      message: '¿Qué procesos quieres realizar?',
      choices: ['Build', 'Zip', 'Upload', 'Todos'],
      default: 'Todos',
    },
  ];
  return inquirer.prompt(questions);
}

export function versionToUpload(files: string[]): Promise<{ version: string }> {
  const questions = [
    {
      name: 'version',
      type: 'list',
      message: '¿Qué archivo quieres utilizar?',
      choices: files,
    },
  ];
  return inquirer.prompt(questions);
}

export function confirm(msg: string): Promise<{ ok: string }> {
  const questions = [
    {
      name: 'ok',
      type: 'list',
      message: msg,
      choices: ['Ok'],
    },
  ];
  return inquirer.prompt(questions);
}
