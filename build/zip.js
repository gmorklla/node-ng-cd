"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngZip = void 0;
var seven = require("node-7z");
var config_1 = require("./config");
function ngZip() {
    var myStream = seven.add(config_1.name, config_1.ngPath + "/*", {
        recursive: true,
    });
    return myStream;
}
exports.ngZip = ngZip;
