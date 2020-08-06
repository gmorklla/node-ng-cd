import { writeFileSync, existsSync, mkdirSync } from "fs";

export function writeLog(name: string, content: string) {
  if (!existsSync("log")) {
    mkdirSync("log");
  }
  writeFileSync(`log/${name}.txt`, content);
}
