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

export function validateCurrentPaths(
  question: string,
  error: string
): Promise<{ valid: string }> {
  const questions = [
    {
      name: 'valid',
      type: 'input',
      message: question,
      validate: function (value: string) {
        if (value.toLowerCase() === 's' || value.toLowerCase() === 'n') {
          return true;
        } else {
          return error;
        }
      },
    },
  ];
  return inquirer.prompt(questions);
}
