"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var colors_1 = __importDefault(require("colors"));
var logTheme = {
    success: function (txt) { return console.log(colors_1.default.bold.green(txt)); },
    error: function (txt) { return console.log(colors_1.default.bold.red(txt)); },
    info: function (txt) { return console.log(colors_1.default.bold.blue(txt)); },
    minor: function (txt) { return console.log(colors_1.default.bold.cyan(txt)); },
};
function log(txt, type) {
    var txtF = "[ng-cd] " + txt;
    // logTheme[type](txtF.padEnd(70));
    logTheme[type](txtF);
}
exports.log = log;
