import { createReadStream } from 'fs';
import { join } from 'path';
import axios, { AxiosResponse, AxiosError } from 'axios';
import FormData from 'form-data';

import { log } from './log';
import { writeLog } from './log-file';

const dev = 'http://lnxsapl1d.dev.unix.banorte.com:9080';
const int = 'https://lnxsapl1i.qa.unix.banorte.com:9443';

export function upload(filePath: string, env: string): Promise<string> {
  const file = createReadStream(filePath);
  const server = env === 'dev' ? dev : int;
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
      >(`${server}/wconfig-services/version/uploadZip/editor/version/2`, form, {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
      })
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

export function filesystems(id: string, env: string): Promise<boolean> {
  const server = env === 'dev' ? dev : int;
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}/uf-ui-editor/load/${id}/v/2`)
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

export function refresh(env: string): Promise<boolean> {
  const server = env === 'dev' ? dev : int;
  return new Promise((resolve, reject) => {
    axios
      .get(`${server}/uf-ui-editor/refreshall`)
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
