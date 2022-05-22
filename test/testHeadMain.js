const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = function (content, expectedEncoding) {
  let count = -1;
  return function (fileName, encoding) {
    count++;
    assert.equal(fileName, content[count].file);
    assert.equal(encoding, expectedEncoding);
    return content[count].content;
  };
};

describe('headMain', () => {
  it('Should return content of given file', () => {
    let content = [{
      file: 'a.txt',
      content: 'hello'
    }];
    let mocker = mockReadFile(content, 'utf8');
    assert.strictEqual(headMain(mocker, 'a.txt'), 'hello');

    content = [{
      file: 'a.txt',
      content: 'hello\nworld'
    }];
    mocker = mockReadFile(content, 'utf8');
    assert.strictEqual(headMain(mocker, 'a.txt'), 'hello\nworld');
  });

  it('Should throw error if unable to read file', () => {
    const mocker = mockReadFile('hello', 'content.txt', 'utf8');
    assert.throws(() => headMain(mocker, 'abc.txt'), {
      type: 'readFileError',
      message: 'head: abc.txt: No such file or directory'
    });
  });
});
