"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCurrentPaths = exports.getPaths = void 0;
var inquirer = require('inquirer');
function getPaths() {
    var questions = [
        {
            name: 'app',
            type: 'input',
            message: 'Ruta en donde se encuentra la aplicación:',
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
            message: 'Ruta en donde se colocará el zip con la aplicación:',
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
function validateCurrentPaths(question, error) {
    var questions = [
        {
            name: 'valid',
            type: 'input',
            message: question,
            validate: function (value) {
                if (value.toLowerCase() === 's' || value.toLowerCase() === 'n') {
                    return true;
                }
                else {
                    return error;
                }
            },
        },
    ];
    return inquirer.prompt(questions);
}
exports.validateCurrentPaths = validateCurrentPaths;
