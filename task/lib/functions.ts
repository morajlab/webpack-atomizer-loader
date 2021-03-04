import { resolve } from 'path';
import {
  copyFileSync as fsCopyFileSync,
  readFileSync,
  writeFileSync,
  accessSync,
  constants,
} from 'fs';

let chalk: any;

export interface IFileObject {
  src: string;
  dest: string;
}

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
          `../../${(file as any)[value[0]]}`
        ))
    );

    return result;
  });

export const pathExist = (path: string, callback: Function) => {
  try {
    accessSync(path, constants.F_OK);
  } catch (error) {
    callback(error);
  }

  callback();
};

export const pathExistSync = (path: string): void => {
  pathExist(path, (error: any) => {
    if (error) {
      throw new Error(`Path ${path} doesn't exist`);
    }
  });
};

export const logError = (message: string): void =>
  console.log(importChalk()?.red(message));

export const logSuccess = (message: string): void =>
  console.log(importChalk()?.green(message));

export const copyFile = (src: string, dest: string): void =>
  fsCopyFileSync(src, dest);

export const getFileContent = (path: string): string =>
  readFileSync(path, 'utf8');

export const writeFileContent = (path: string, content: string): any =>
  writeFileSync(path, content, 'utf8');

export const replaceContent = (
  content: string,
  search: RegExp | string,
  replace: string
): string => content.replace(search, replace);
