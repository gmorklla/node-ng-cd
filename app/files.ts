import { basename } from "path";
import { existsSync } from "fs";

export function getCurrentDirectoryBase(): string {
  return basename(process.cwd());
}

export function directoryExists(filePath: string): boolean {
  return existsSync(filePath);
}
