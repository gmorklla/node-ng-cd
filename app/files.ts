import { basename } from 'path';
import { existsSync, readdirSync } from 'fs';

export function getCurrentDirectoryBase(): string {
  return basename(process.cwd());
}

export function directoryExists(filePath: string): boolean {
  return existsSync(filePath);
}

export function getFilesFromPath(zipPath: string): string[] {
  return readdirSync(zipPath);
}
