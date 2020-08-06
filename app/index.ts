import { existsSync } from "fs";
import { ngPath } from "./config";
import { log } from "./log";
import { ngBuild } from "./ng-build";
import { ngZip } from "./zip";

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
  uploadProcess();
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

function uploadProcess() {
  log("Comensando proceso upload de archivos... ", "info");
}

initProcess();
