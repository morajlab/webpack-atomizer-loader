import {
  IFileObject,
  resolvePath,
  pathExistSync,
  copyFile,
  logError,
  logSuccess,
} from './lib/functions';

const files: IFileObject[] = [
  {
    src: 'dist/index.d.ts',
    dest: 'index.d.ts',
  },
  {
    src: 'dist/index.js',
    dest: 'index.js',
  },
];

try {
  resolvePath(files).forEach(({ src, dest }) => {
    pathExistSync(src);
    copyFile(src, dest);
  });

  logSuccess('Copy task completed successfully !');
} catch (error) {
  logError(error.message);
}
