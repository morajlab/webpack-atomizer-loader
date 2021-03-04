import { resolve } from 'path';
import fs from 'fs';

let chalk: any;

interface IFileObject {
  src: string;
  dest: string;
}

export const files: IFileObject[] = [
  {
    src: 'dist/index.d.ts',
    dest: 'index.d.ts',
  },
  {
    src: 'dist/index.js',
    dest: 'index.js',
  },
];

export const importChalk = (): any => {
  if (!chalk) {
    chalk = require('chalk');
  }

  return chalk;
};

export const resolvePath = (f: IFileObject[]) =>
  f.map((file: { src: string; dest: string }) => {
    let result = file;

    Object.entries(file).forEach(
      value =>
        ((result as any)[value[0]] = resolve(
          __dirname,
          `../${(file as any)[value[0]]}`
        ))
    );

    return result;
  });

export const pathExist = (path: string): boolean => {
  let result: boolean = true;

  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (error) {
    result = false;
  }

  return result;
};

export const logError = (message: string): void =>
  console.log(importChalk()?.red(message));

export const logSuccess = (message: string): void =>
  console.log(importChalk()?.green(message));

export const copyFile = (src: string, dest: string): void =>
  fs.copyFile(src, dest, (error: any) => {
    if (error) {
      logError(error.message);
    }
  });

try {
  resolvePath(files).forEach(file => {
    if (pathExist(file.src)) {
      copyFile(file.src, file.dest);
    } else {
      throw new Error(`File ${file.src} doesn't exist`);
    }
  });

  logSuccess('Copy task completed successfully !');
} catch (error) {
  logError(error.message);
}
