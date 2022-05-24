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

describe('headMain', () => {
  it('Should return content of given file', () => {
    let content = [{
      file: 'a.txt',
      content: 'hello'
    }];
    let mocker = mockReadFile(content, 'utf8');
    assert.deepStrictEqual(headMain(mocker, 'a.txt'), [{
      name: 'a.txt', content: 'hello',
      error: false
    }]);

    content = [{
      file: 'a.txt',
      content: 'hello\nworld'
    }];
    mocker = mockReadFile(content, 'utf8');
    assert.deepStrictEqual(headMain(mocker, 'a.txt'), [{
      name: 'a.txt', content: 'hello\nworld',
      error: false
    }]);
  });

  it('Should set error status as true when unable to read file', () => {
    const content = [{
      file: 'a.txt',
      content: 'hello'
    }];
    const mocker = mockReadFile(content, 'utf8');
    assert.deepStrictEqual(headMain(mocker, 'c.txt'), [{
      name: 'c.txt', content: undefined,
      error: true
    }]);
  });

  it('Should return the multiple files content', () => {
    const content = [{
      file: 'a.txt',
      content: 'hello'
    }, {
      file: 'b.txt',
      content: 'world'
    }];
    const mocker = mockReadFile(content, 'utf8');
    assert.deepStrictEqual(headMain(mocker, 'a.txt', 'b.txt'), [{
      name: 'a.txt', content: 'hello',
      error: false
    }, {
      name: 'b.txt', content: 'world',
      error: false
    }]);
  });

  it('Should return the multiple files content if files exist', () => {
    const content = [{
      file: 'a.txt',
      content: 'hello'
    }];
    const mocker = mockReadFile(content, 'utf8');
    assert.deepStrictEqual(headMain(mocker, 'a.txt', 'c.txt'), [{
      name: 'a.txt', content: 'hello',
      error: false
    }, {
      name: 'c.txt', content: undefined,
      error: true
    }]);
  });
});
