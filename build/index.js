"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var argv = require('yargs').argv;
var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
var Configstore = require('configstore');
var pkg = require('../package.json');
var config = new Configstore(pkg.name);
var _a = config.all, appPath = _a.appPath, zipPath = _a.zipPath;
var log_1 = require("./log");
var ng_build_1 = require("./ng-build");
var zip_1 = require("./zip");
var requests_1 = require("./requests");
var files_1 = require("./files");
var inquirer_1 = require("./inquirer");
function initProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var paths, valid, paths, _a, validAppPath, validZipPath, build, zip;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    clear();
                    console.log(chalk.yellow(figlet.textSync('CI/CD', { horizontalLayout: 'full' })));
                    if (!(!appPath || !zipPath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1.getPaths()];
                case 1:
                    paths = _b.sent();
                    setPaths(paths);
                    _b.label = 2;
                case 2:
                    logPaths();
                    return [4 /*yield*/, inquirer_1.validateCurrentPaths('Son correctos los paths (s/n):', 'Por favor, indica si es correcto con una "s" o incorrecto con una "n".')];
                case 3:
                    valid = (_b.sent()).valid;
                    if (!(valid === 'n')) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer_1.getPaths()];
                case 4:
                    paths = _b.sent();
                    setPaths(paths);
                    logPaths();
                    _b.label = 5;
                case 5:
                    _a = verifyPaths(), validAppPath = _a.validAppPath, validZipPath = _a.validZipPath;
                    if (!validAppPath || !validZipPath) {
                        if (!validAppPath) {
                            log_1.log("App path inv\u00E1lido ", 'error');
                        }
                        if (!validZipPath) {
                            log_1.log("Zip path inv\u00E1lido ", 'error');
                        }
                        log_1.log("Saliendo de aplicaci\u00F3n por error ", 'error');
                        process.exit(0);
                    }
                    return [4 /*yield*/, buildProcess()];
                case 6:
                    build = _b.sent();
                    if (!build) {
                        log_1.log("Saliendo de aplicaci\u00F3n por error ", 'error');
                        process.exit(0);
                    }
                    else if (!files_1.directoryExists(appPath + "\\dist\\banorte")) {
                        log_1.log('No se encontró la carpeta con la aplicación compilada ', 'error');
                        log_1.log("Saliendo de aplicaci\u00F3n por error ", 'error');
                        process.exit(0);
                    }
                    return [4 /*yield*/, zipProcess()
                            .then()
                            .catch(function (err) { return console.log(err); })];
                case 7:
                    zip = _b.sent();
                    if (!zip) {
                        log_1.log("Saliendo de aplicaci\u00F3n por error ", 'error');
                        process.exit(0);
                    }
                    // const upload = await uploadProcess();
                    // !!upload ? process.exit(0) : process.exit(1);
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
function setPaths(paths) {
    config.set('appPath', paths.app);
    config.set('zipPath', paths.zip);
    appPath = paths.app;
    zipPath = paths.zip;
}
function verifyPaths() {
    return {
        validAppPath: files_1.directoryExists(appPath),
        validZipPath: files_1.directoryExists(zipPath),
    };
}
function logPaths() {
    log_1.log("App path: " + appPath + " ", 'minor');
    log_1.log("Zip path: " + zipPath + " ", 'minor');
}
function buildProcess() {
    log_1.log('Comenzando proceso ng build.... ', 'info');
    return ng_build_1.ngBuild(appPath);
}
function zipProcess() {
    log_1.log('Comenzando proceso 7zip.... ', 'info');
    return zip_1.ngZip(appPath, zipPath);
}
function uploadProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var uploadRes, filesystemsR, refreshR;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.log('Comenzando proceso upload de zip... ', 'info');
                    return [4 /*yield*/, requests_1.upload()];
                case 1:
                    uploadRes = _a.sent();
                    if (!!!uploadRes) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, requests_1.filesystems(uploadRes)];
                case 2:
                    filesystemsR = _a.sent();
                    return [4 /*yield*/, requests_1.refresh()];
                case 3:
                    refreshR = _a.sent();
                    return [2 /*return*/, !!filesystemsR || !!refreshR ? true : false];
            }
        });
    });
}
initProcess();
