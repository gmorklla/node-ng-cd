"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngZip = void 0;
var seven = require("node-7z");
var config_1 = require("./config");
var log_1 = require("./log");
function ngZip() {
    return new Promise(function (resolve, reject) {
        var name = "./banorte-versiones/v2.zip";
        var myStream = seven.add(name, config_1.ngPath + "/*", {
            recursive: true,
        });
        myStream.on("end", function () {
            log_1.log("Proceso 7zip completado ", "success");
            log_1.log("Path: " + config_1.distPath, "minor");
            resolve(true);
        });
        myStream.on("error", function () {
            log_1.log("Error en proceso 7zip ", "error");
            reject(false);
        });
    });
}
exports.ngZip = ngZip;
