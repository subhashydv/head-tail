const assert = require('assert');
const { headMain } = require('../src/headLib.js');

const mockReadFile = function (content, file, expectedEncoding) {
  return function (fileName, encoding) {
    assert.equal(fileName, file);
    assert.equal(encoding, expectedEncoding);
    return content;
  };
};
describe('headMain', () => {
  it('Should return file first line of file content', () => {
    let mocker = mockReadFile('hello', 'content.txt', 'utf8');
    assert.strictEqual(headMain(mocker, 'content.txt'), 'hello');

    mocker = mockReadFile('hello\nworld', 'content.txt', 'utf8');
    assert.strictEqual(headMain(mocker, 'content.txt'), 'hello\nworld');
  });
});
