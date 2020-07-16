var seven = require("node-7z");

import { ngPath, name } from "./config";

export function ngZip() {
  const myStream = seven.add(name, ngPath + "/*", {
    recursive: true,
  });
  return myStream;
}
