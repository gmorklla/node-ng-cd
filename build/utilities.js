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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersionToUpload = exports.logPaths = exports.verifyVersion = exports.verifyPaths = exports.setVersion = exports.setPaths = exports.version = exports.zipPath = exports.appPath = void 0;
var Configstore = require('configstore');
var pkg = require('../package.json');
var files_1 = require("./files");
var log_1 = require("./log");
var inquirer_1 = require("./inquirer");
var config = new Configstore(pkg.name);
exports.appPath = (_a = config.all, _a.appPath), exports.zipPath = _a.zipPath, exports.version = _a.version;
function setPaths(paths) {
    config.set('appPath', paths.app);
    config.set('zipPath', paths.zip);
    exports.appPath = paths.app;
    exports.zipPath = paths.zip;
}
exports.setPaths = setPaths;
function setVersion() {
    var date = new Date();
    var dateF = date
        .toLocaleDateString('es-MX', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
        .replace(/\//g, '')
        .replace(/-/g, '')
        .replace(' ', '-')
        .replace(':', '');
    var versionI = "v2-" + dateF;
    config.set('version', versionI);
    exports.version = versionI;
}
exports.setVersion = setVersion;
function verifyPaths() {
    return {
        validAppPath: files_1.directoryExists(exports.appPath),
        validZipPath: files_1.directoryExists(exports.zipPath),
    };
}
exports.verifyPaths = verifyPaths;
function verifyVersion(version) {
    return files_1.directoryExists(version);
}
exports.verifyVersion = verifyVersion;
function logPaths() {
    log_1.log("App path: " + exports.appPath + " ", 'info');
    log_1.log("* Carpeta ra\u00EDz del proyecto Angular ", 'minor');
    log_1.log("Zip path: " + exports.zipPath + " ", 'info');
    log_1.log("* Carpeta donde se colocar\u00E1 el zip de la aplicaci\u00F3n ", 'minor');
}
exports.logPaths = logPaths;
function getVersionToUpload() {
    return __awaiter(this, void 0, void 0, function () {
        var files, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = files_1.getFilesFromPath(exports.zipPath);
                    return [4 /*yield*/, inquirer_1.versionToUpload(files)];
                case 1:
                    version = (_a.sent()).version;
                    return [2 /*return*/, version];
            }
        });
    });
}
exports.getVersionToUpload = getVersionToUpload;
