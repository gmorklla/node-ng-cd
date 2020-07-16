"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.distPath = exports.ngPath = void 0;
var path_1 = require("path");
var moment_1 = __importDefault(require("moment"));
exports.ngPath = path_1.join(process.cwd(), "../", "UF-V2/uf-ui-managment/dist/banorte");
exports.distPath = path_1.join(process.cwd(), "../", "banorte-versiones");
var date = moment_1.default().format("YYYYMMDD-kkmm");
exports.name = "../banorte-versiones/v2-" + date + ".zip";
