const assert = require('assert');
const { headMain } = require('../../src/head/headLib.js');

const mockReadFile = function (content, expectedEncoding) {
  let count = -1;
  return function (fileName, encoding) {
    count++;
    assert.equal(fileName, content[count].file);
    assert.equal(encoding, expectedEncoding);
    return content[count].content;
  };
};

const mockLog = function (expectedContent) {
  return function (content) {
    this.logCount++;
    assert.equal(content, expectedContent);
  };
};

const mockError = function (expectedContent) {
  return function (content) {
    this.errorCount++;
    assert.equal(content, expectedContent);
  };
};

describe('headMain', () => {
  it('Should print content of given file', () => {
    const content = [{ file: 'a.txt', content: 'hello' }];
    const readMocker = mockReadFile(content, 'utf8');
    const logMocker = { log: mockLog('hello'), logCount: 0 };

    headMain(readMocker, logMocker, 'a.txt');
    assert.equal(logMocker.logCount, 1);
  });

  it('Should print error message', () => {
    const content = [{ file: 'a.txt', content: 'world' }];
    const readMocker = mockReadFile(content, 'utf8');
    const logMocker = {
      error: mockError('head: b.txt: No such file or directory'),
      errorCount: 0
    };

    headMain(readMocker, logMocker, 'b.txt');
    assert.equal(logMocker.errorCount, 1);
  });
});
