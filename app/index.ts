import { existsSync } from "fs";

import { ngPath } from "./config";
import { log } from "./log";
import { ngBuild } from "./ng-build";
import { ngZip } from "./zip";
import { upload, filesystems, refresh } from "./requests";

let id: string;

async function initProcess() {
  const build = await buildProcess();
  if (!build) {
    return;
  } else if (!existsSync(ngPath)) {
    log("Path especificado no existe ", "error");
    return;
  }
  const zip = await zipProcess();
  if (!zip) {
    return;
  }
  const upload = await uploadProcess();
  !!upload ? process.exit(0) : process.exit(1);
}

function buildProcess(): Promise<boolean> {
  log("Comenzando proceso ng build.... ", "info");
  return ngBuild();
}

function zipProcess(): Promise<boolean> {
  log("Comenzando proceso 7zip.... ", "info");
  log(`Path: ${ngPath}`, "minor");
  return ngZip();
}

async function uploadProcess(): Promise<boolean> {
  log("Comenzando proceso upload de zip... ", "info");
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
