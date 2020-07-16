import colors from "colors";

const logTheme: { [key: string]: Function } = {
  success: (txt: string) => console.log(colors.bold.green(txt)),
  error: (txt: string) => console.log(colors.bold.red(txt)),
  info: (txt: string) => console.log(colors.bold.blue(txt)),
  minor: (txt: string) => console.log(colors.bold.cyan(txt)),
};

export function log(txt: string, type: string) {
  const txtF = `[ng-cd] ${txt}`;
  // logTheme[type](txtF.padEnd(70));
  logTheme[type](txtF);
}
