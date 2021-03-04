import { resolve } from 'path';
import { files, pathExist, resolvePath } from '../task/copy';

describe('Testing copy task', () => {
  it('Testing pathExist() function', () => {
    expect(pathExist(resolve(__dirname, '../dist/index.js'))).toBeTruthy();
    expect(
      pathExist(resolve(__dirname, '../dist/wrongFileName.js'))
    ).toBeFalsy();
  });

  /*it('Testing resolvePath() function', () => {
    expect(resolvePath(files)).toEqual([]);
  });*/
});
