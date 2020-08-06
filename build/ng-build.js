"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngBuild = void 0;
var child_process_1 = require("child_process");
var log_1 = require("./log");
var log_file_1 = require("./log-file");
function ngBuild() {
    var cmd = 'cd C:\\Users\\cioca\\Documents\\UF-V2\\uf-ui-managment && node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build banorte --prod --base-href "/uf-ui-editor/v2/" --deploy-url "/uf-ui-editor/v2/" && gzipper --verbose dist/banorte';
    return new Promise(function (resolve, reject) {
        child_process_1.exec(cmd, function (error, stdout, stderr) {
            if (error || stderr) {
                log_file_1.writeLog("ngBuild-error", (error === null || error === void 0 ? void 0 : error.message) || stderr);
                log_1.log("Error en proceso ng build ", "error");
                reject(false);
            }
            log_file_1.writeLog("ngBuild-success", stdout);
            log_1.log("Proceso ng build completado ", "success");
            resolve(true);
        });
    });
}
exports.ngBuild = ngBuild;
