var seven = require("node-7z");

import { ngPath, distPath } from "./config";
import { log } from "./log";

export function ngZip(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const name = "./banorte-versiones/v2.zip";
    const myStream = seven.add(name, ngPath + "/*", {
      recursive: true,
    });
    myStream.on("end", function () {
      log("Proceso 7zip completado ", "success");
      log(`Path: ${distPath}`, "minor");
      resolve(true);
    });
    myStream.on("error", () => {
      log("Error en proceso 7zip ", "error");
      reject(false);
    });
  });
}
