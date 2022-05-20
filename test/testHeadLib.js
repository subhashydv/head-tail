const assert = require('assert');
const { head, extractLines, headMain } = require('../src/headLib.js');

describe('head', () => {
  it('Should return single line', () => {
    assert.strictEqual(head('hello', 1), 'hello');
    assert.strictEqual(head('world', 1), 'world');
    assert.strictEqual(head('hello world', 1), 'hello world');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld', 2), 'hello\nworld');
    assert.strictEqual(head('hello\n\nworld', 3), 'hello\n\nworld');
  });

  it('Should return given line count', () => {
    assert.strictEqual(head('hello\nworld', 1), 'hello');
    assert.strictEqual(head('hello\nworld\nhi', 2), 'hello\nworld');
    assert.strictEqual(head('hello\n\nhi', 2), 'hello\n');
  });
});

describe('extractLines', () => {
  it('Should return first element of list', () => {
    assert.deepStrictEqual(extractLines([1], 1), [1]);
    assert.deepStrictEqual(extractLines([2, 3], 1), [2]);
    assert.deepStrictEqual(extractLines(['2', '3'], 1), ['2']);
  });

  it('Should return specified number of element from list', () => {
    assert.deepStrictEqual(extractLines([1, 2, 3], 2), [1, 2]);
    assert.deepStrictEqual(extractLines([1, 2, 3], 5), [1, 2, 3]);
    assert.deepStrictEqual(extractLines([1, 2, 3], 0), []);
  });

  it('Should return list if specified number is more than element', () => {
    assert.deepStrictEqual(extractLines([1, 2, 3], 5), [1, 2, 3]);
  });
});

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
    assert.strictEqual(headMain(mocker, 'content.txt'), 'hello');
  });
});
