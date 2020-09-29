import { createReadStream } from 'fs';
import { join } from 'path';
import axios, { AxiosResponse, AxiosError } from 'axios';
import FormData from 'form-data';

import { distPath } from './config';
import { log } from './log';
import { writeLog } from './log-file';

export function upload(zipPath: string, version: string): Promise<string> {
  const filePath = join(zipPath, `${version}.zip`);
  const file = createReadStream(filePath);
  const form = new FormData();
  form.append('file', file);
  return new Promise((resolve, reject) => {
    axios
      .post<
        any,
        AxiosResponse<{
          id: string;
          application: string;
          version: number;
          creationDate: number;
        }>
      >(
        'http://lnxsapl1d.dev.unix.banorte.com:9080/wconfig-services/version/uploadZip/editor/version/2',
        form,
        {
          headers: form.getHeaders(),
          maxContentLength: Infinity,
        }
      )
      .then((val) => {
        const id = val.data.id;
        writeLog('uploadZip-success', id);
        log('Proceso upload de zip completado ', 'success');
        resolve(id);
      })
      .catch((err: AxiosError) => {
        writeLog('uploadZip-error', err.response?.data);
        log('Error en proceso uploadZip ', 'error');
        reject(null);
      });
  });
}

export function filesystems(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-editor/load/${id}/v/2`
      )
      .then((_) => {
        log('Proceso filesystems completado ', 'success');
        resolve(true);
      })
      .catch((err: AxiosError) => {
        writeLog('filesystems-error', err.response?.data);
        log('Error en proceso filesystems ', 'error');
        reject(false);
      });
  });
}

export function refresh(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-editor/refreshall`)
      .then((_) => {
        log('Proceso refresh completado ', 'success');
        resolve(true);
      })
      .catch((err: AxiosError) => {
        writeLog('refresh-error', err.response?.data);
        log('Error en proceso refresh ', 'error');
        reject(false);
      });
  });
}
