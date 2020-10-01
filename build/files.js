"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesFromPath = exports.directoryExists = exports.getCurrentDirectoryBase = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
function getCurrentDirectoryBase() {
    return path_1.basename(process.cwd());
}
exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
function directoryExists(filePath) {
    return fs_1.existsSync(filePath);
}
exports.directoryExists = directoryExists;
function getFilesFromPath(zipPath) {
    return fs_1.readdirSync(zipPath);
}
exports.getFilesFromPath = getFilesFromPath;
