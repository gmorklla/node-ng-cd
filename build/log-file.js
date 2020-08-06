"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = void 0;
var fs_1 = require("fs");
function writeLog(name, content) {
    if (!fs_1.existsSync("log")) {
        fs_1.mkdirSync("log");
    }
    fs_1.writeFileSync("log/" + name + ".txt", content);
}
exports.writeLog = writeLog;
