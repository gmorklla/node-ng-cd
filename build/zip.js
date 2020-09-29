"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngZip = void 0;
var seven = require('node-7z');
var log_1 = require("./log");
function ngZip(appPath, zipPath, version) {
    return new Promise(function (resolve, reject) {
        var name = zipPath + "\\" + version + ".zip";
        var app = appPath + "\\dist\\banorte";
        var myStream = seven.add(name, app + '/*', {
            recursive: true,
        });
        myStream.on('end', function () {
            log_1.log('Proceso 7zip completado ', 'success');
            resolve(true);
        });
        myStream.on('error', function () {
            log_1.log('Error en proceso 7zip ', 'error');
            reject(false);
        });
    });
}
exports.ngZip = ngZip;
