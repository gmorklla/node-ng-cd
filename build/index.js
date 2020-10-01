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
var path_1 = require("path");
var clear = require('clear');
var chalk = require('chalk');
var figlet = require('figlet');
var log_1 = require("./log");
var ng_build_1 = require("./ng-build");
var zip_1 = require("./zip");
var requests_1 = require("./requests");
var files_1 = require("./files");
var inquirer_1 = require("./inquirer");
var utilities_1 = require("./utilities");
function initProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var paths, valid, paths, _a, validAppPath, validZipPath, cmd, build, zip, versionToUpload, upload_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    clear();
                    console.log(chalk.yellow(figlet.textSync('CI/CD', { horizontalLayout: 'full' })));
                    if (!(!utilities_1.appPath || !utilities_1.zipPath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1.getPaths()];
                case 1:
                    paths = _b.sent();
                    utilities_1.setPaths(paths);
                    _b.label = 2;
                case 2:
                    utilities_1.logPaths();
                    return [4 /*yield*/, inquirer_1.validateCurrentPaths()];
                case 3:
                    valid = (_b.sent()).valid;
                    if (!!valid) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer_1.getPaths()];
                case 4:
                    paths = _b.sent();
                    utilities_1.setPaths(paths);
                    utilities_1.logPaths();
                    _b.label = 5;
                case 5:
                    _a = utilities_1.verifyPaths(), validAppPath = _a.validAppPath, validZipPath = _a.validZipPath;
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
                    return [4 /*yield*/, inquirer_1.processToExec()];
                case 6:
                    cmd = (_b.sent()).cmd;
                    if (!(cmd === 'Build' || cmd === 'Todos')) return [3 /*break*/, 8];
                    return [4 /*yield*/, buildProcess()];
                case 7:
                    build = _b.sent();
                    _b.label = 8;
                case 8:
                    if (!(cmd === 'Zip' || cmd === 'Todos')) return [3 /*break*/, 10];
                    return [4 /*yield*/, zipProcess()];
                case 9:
                    zip = _b.sent();
                    _b.label = 10;
                case 10:
                    if (!(cmd === 'Upload' || cmd === 'Todos')) return [3 /*break*/, 14];
                    versionToUpload = null;
                    if (!(cmd === 'Upload')) return [3 /*break*/, 12];
                    return [4 /*yield*/, utilities_1.getVersionToUpload()];
                case 11:
                    versionToUpload = _b.sent();
                    _b.label = 12;
                case 12: return [4 /*yield*/, uploadProcess(versionToUpload)];
                case 13:
                    upload_1 = _b.sent();
                    _b.label = 14;
                case 14:
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
// Proceso build
function buildProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var build;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.log('Comenzando proceso ng build.... ', 'info');
                    return [4 /*yield*/, ng_build_1.ngBuild(utilities_1.appPath)];
                case 1:
                    build = _a.sent();
                    if (!build) {
                        log_1.log("Saliendo de aplicaci\u00F3n por error en build process ", 'error');
                        process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Proceso zip
function zipProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var zip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Comprobar que exista carpeta dist\banorte
                    if (!files_1.directoryExists(utilities_1.appPath + "\\dist\\banorte")) {
                        log_1.log('No se encontró la carpeta con la aplicación compilada ', 'error');
                        log_1.log("Saliendo de aplicaci\u00F3n por error en zip process ", 'error');
                        process.exit(0);
                    }
                    log_1.log('Comenzando proceso 7zip.... ', 'info');
                    utilities_1.setVersion();
                    log_1.log("Version: " + utilities_1.version + " ", 'minor');
                    return [4 /*yield*/, zip_1.ngZip(utilities_1.appPath, utilities_1.zipPath, utilities_1.version)];
                case 1:
                    zip = _a.sent();
                    if (!zip) {
                        log_1.log("Saliendo de aplicaci\u00F3n por error en zip process ", 'error');
                        process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Proceso upload
function uploadProcess(savedVersion) {
    if (savedVersion === void 0) { savedVersion = null; }
    return __awaiter(this, void 0, void 0, function () {
        var env, filePath, validPath, uploadRes, filesystemsR, refreshR;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_1.log('Comenzando proceso upload de aplicación... ', 'info');
                    return [4 /*yield*/, inquirer_1.getEnvironment()];
                case 1:
                    env = (_a.sent()).env;
                    filePath = !!savedVersion
                        ? path_1.join(utilities_1.zipPath, "" + savedVersion)
                        : path_1.join(utilities_1.zipPath, utilities_1.version + ".zip");
                    validPath = utilities_1.verifyVersion(filePath);
                    if (!validPath) {
                        log_1.log("No se encontr\u00F3 el archivo especificado " + savedVersion + ".zip ", 'error');
                        log_1.log("Saliendo de aplicaci\u00F3n por error en upload process ", 'error');
                        process.exit(0);
                    }
                    return [4 /*yield*/, requests_1.upload(filePath, env)];
                case 2:
                    uploadRes = _a.sent();
                    if (!!!uploadRes) {
                        log_1.log("Saliendo de aplicaci\u00F3n por error en upload process ", 'error');
                        process.exit(0);
                    }
                    return [4 /*yield*/, requests_1.filesystems(uploadRes, env)];
                case 3:
                    filesystemsR = _a.sent();
                    return [4 /*yield*/, requests_1.refresh(env)];
                case 4:
                    refreshR = _a.sent();
                    if (!filesystemsR || !refreshR) {
                        log_1.log("Saliendo de aplicaci\u00F3n por error en upload process ", 'error');
                        process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
initProcess();
