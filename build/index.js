"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var log_1 = require("./log");
var zip_1 = require("./zip");
var config_1 = require("./config");
function initProcess() {
    if (fs_1.existsSync(config_1.ngPath)) {
        log_1.log("Comenzando proceso 7zip.... ", "info");
        log_1.log("Path: " + config_1.ngPath, "minor");
        zipProcess();
    }
    else {
        log_1.log("Path especificado no existe ", "error");
    }
}
function zipProcess() {
    var myStream = zip_1.ngZip();
    myStream.on("end", function () {
        log_1.log("Proceso 7zip completado ", "success");
        log_1.log("Path: " + config_1.distPath, "minor");
    });
    myStream.on("error", function () { return log_1.log("Proceso 7zip no completado ", "error"); });
}
initProcess();
