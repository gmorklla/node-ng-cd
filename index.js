var fs = require("fs");

const log = require("./log");
const zip = require("./zip");
const {
  ngPath,
  distPath
} = require("./config");

function initProcess() {
  if (fs.existsSync(ngPath)) {
    log("Comenzando proceso 7zip... ", "info");
    log(`Path: ${ngPath}`, "minor");
    zipProcess();
  } else {
    log("Path especificado no existe ", "error");
  }
}

function zipProcess() {
  const myStream = zip();
  myStream.on("end", function () {
    log("Proceso 7zip completado ", "success");
    log(`Path: ${distPath}`, "minor");
  });
  myStream.on("error", () => log("Proceso 7zip no completado ", "error"));
}

initProcess();
