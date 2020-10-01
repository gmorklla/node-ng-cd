"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.filesystems = exports.upload = void 0;
var fs_1 = require("fs");
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var log_1 = require("./log");
var log_file_1 = require("./log-file");
var dev = 'http://lnxsapl1d.dev.unix.banorte.com:9080';
var int = 'https://lnxsapl1i.qa.unix.banorte.com:9443';
function upload(filePath, env) {
    var file = fs_1.createReadStream(filePath);
    var server = env === 'dev' ? dev : int;
    var form = new form_data_1.default();
    form.append('file', file);
    return new Promise(function (resolve, reject) {
        axios_1.default
            .post(server + "/wconfig-services/version/uploadZip/editor/version/2", form, {
            headers: form.getHeaders(),
            maxContentLength: Infinity,
        })
            .then(function (val) {
            var id = val.data.id;
            log_file_1.writeLog('uploadZip-success', id);
            log_1.log('Proceso upload de zip completado ', 'success');
            resolve(id);
        })
            .catch(function (err) {
            var _a;
            log_file_1.writeLog('uploadZip-error', (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            log_1.log('Error en proceso uploadZip ', 'error');
            reject(null);
        });
    });
}
exports.upload = upload;
function filesystems(id, env) {
    var server = env === 'dev' ? dev : int;
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get(server + "/uf-ui-editor/load/" + id + "/v/2")
            .then(function (_) {
            log_1.log('Proceso filesystems completado ', 'success');
            resolve(true);
        })
            .catch(function (err) {
            var _a;
            log_file_1.writeLog('filesystems-error', (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            log_1.log('Error en proceso filesystems ', 'error');
            reject(false);
        });
    });
}
exports.filesystems = filesystems;
function refresh(env) {
    var server = env === 'dev' ? dev : int;
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get(server + "/uf-ui-editor/refreshall")
            .then(function (_) {
            log_1.log('Proceso refresh completado ', 'success');
            resolve(true);
        })
            .catch(function (err) {
            var _a;
            log_file_1.writeLog('refresh-error', (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            log_1.log('Error en proceso refresh ', 'error');
            reject(false);
        });
    });
}
exports.refresh = refresh;
