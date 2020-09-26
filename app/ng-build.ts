import { exec } from 'child_process';

import { log } from './log';
import { writeLog } from './log-file';

export function ngBuild(appPath: string): Promise<boolean> {
  const cdCmd = `cd ${appPath}`;
  const buildCmd = `node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build banorte --prod --base-href "/uf-ui-editor/v2/" --deploy-url "/uf-ui-editor/v2/" && gzipper --verbose dist/banorte`;
  const fullCmd = `${cdCmd} && ${buildCmd}`;
  return new Promise((resolve, reject) => {
    exec(fullCmd, (error, stdout, stderr) => {
      if (error || stderr) {
        writeLog('ngBuild-error', error?.message || stderr);
        log('Error en proceso ng build ', 'error');
        reject(false);
      }
      writeLog('ngBuild-success', stdout);
      log('Proceso ng build completado ', 'success');
      resolve(true);
    });
  });
}
