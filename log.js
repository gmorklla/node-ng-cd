var colors = require("colors");

const logTheme = {
  success: (txt) => console.log(colors.bold.green(txt)),
  error: (txt) => console.log(colors.bold.red(txt)),
  info: (txt) => console.log(colors.bold.blue(txt)),
  minor: (txt) => console.log(colors.bold.cyan(txt)),
};

function log(txt, type) {
  const txtF = `[ng-cd] ${txt}`;
  // logTheme[type](txtF.padEnd(70));
  logTheme[type](txtF);
}

module.exports = log;
