import {
  IFileObject,
  resolvePath,
  pathExistSync,
  logError,
  logSuccess,
  getFileContent,
  writeFileContent,
  replaceContent,
} from './lib/functions';

const files: IFileObject[] = [
  {
    src: 'dist/index.js',
    dest: '',
  },
];

try {
  resolvePath(files).forEach(({ src }) => {
    pathExistSync(src);
    writeFileContent(
      src,
      replaceContent(getFileContent(src), /\.\//g, './dist/')
    );
    logSuccess('Content task completed successfully !');
  });
} catch (error) {
  logError(error.message);
}
