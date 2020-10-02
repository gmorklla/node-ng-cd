"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = exports.versionToUpload = exports.processToExec = exports.getEnvironment = exports.validateCurrentPaths = exports.getPaths = void 0;
var inquirer = require('inquirer');
function getPaths() {
    var questions = [
        {
            name: 'app',
            type: 'input',
            message: 'Ruta absoluta de la aplicación angular (uf-ui-managment):',
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Por favor, ingresa la ruta de la aplicación.';
                }
            },
        },
        {
            name: 'zip',
            type: 'input',
            message: 'Ruta absoluta en donde se colocará el zip con la aplicación compilada:',
            validate: function (value) {
                if (value.length) {
                    return true;
                }
                else {
                    return 'Por favor, ingresa la ruta en donde se colocará el zip de la aplicación.';
                }
            },
        },
    ];
    return inquirer.prompt(questions);
}
exports.getPaths = getPaths;
function validateCurrentPaths() {
    var questions = [
        {
            name: 'valid',
            type: 'confirm',
            message: '¿Son correctos los paths?',
        },
    ];
    return inquirer.prompt(questions);
}
exports.validateCurrentPaths = validateCurrentPaths;
function getEnvironment() {
    var questions = [
        {
            name: 'env',
            type: 'list',
            message: '¿En qué ambiente se desplegará la aplicación?',
            choices: ['dev', 'int'],
            default: 'dev',
        },
    ];
    return inquirer.prompt(questions);
}
exports.getEnvironment = getEnvironment;
function processToExec() {
    var questions = [
        {
            name: 'cmd',
            type: 'list',
            message: '¿Qué procesos quieres realizar?',
            choices: ['Build', 'Zip', 'Upload', 'Todos'],
            default: 'Todos',
        },
    ];
    return inquirer.prompt(questions);
}
exports.processToExec = processToExec;
function versionToUpload(files) {
    var questions = [
        {
            name: 'version',
            type: 'list',
            message: '¿Qué archivo quieres utilizar?',
            choices: files,
        },
    ];
    return inquirer.prompt(questions);
}
exports.versionToUpload = versionToUpload;
function confirm(msg) {
    var questions = [
        {
            name: 'ok',
            type: 'list',
            message: msg,
            choices: ['Ok'],
        },
    ];
    return inquirer.prompt(questions);
}
exports.confirm = confirm;
