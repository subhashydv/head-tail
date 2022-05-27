const assert = require('assert');
const {
  head, printOutput, fileReader, headFiles
} = require('../../src/head/headLib.js');

describe('head', () => {
  it('Should return single line', () => {
    assert.strictEqual(head('hello', { switch: 'line', value: 1 }), 'hello');
    assert.strictEqual(head('world', { switch: 'line', value: 1 }), 'world');
    assert.strictEqual(head('hello world', {
      switch: 'line', value: 1
    }), 'hello world');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld', {
      switch: 'line', value: 2
    }), 'hello\nworld');

    assert.strictEqual(head('hello\n\nworld', {
      switch: 'line', value: 3
    }), 'hello\n\nworld');
  });

  it('Should return given line count', () => {
    assert.strictEqual(head('hello\nworld', {
      switch: 'line', value: 1
    }), 'hello');

    assert.strictEqual(head('hello\nworld\nhi', {
      switch: 'line', value: 2
    }), 'hello\nworld');

    assert.strictEqual(head('hello\n\nhi', {
      switch: 'line', value: 2
    }), 'hello\n');
  });

  it('Should return specified count of characters', () => {
    assert.strictEqual(head('hello', { switch: 'byte', value: 1 }), 'h');
    assert.strictEqual(head('hello', {
      switch: 'byte', value: 5
    }), 'hello');
    assert.strictEqual(head('hello\nworld', {
      switch: 'byte', value: 8
    }), 'hello\nwo');
  });
});

const mockLog = function (expectedArgs) {
  return function (args) {
    assert.equal(args, expectedArgs);
  };
};

const mockError = function (expectedArgs) {
  return function (args) {
    assert.equal(args, expectedArgs);
  };
};

describe('printOutput', () => {
  it('Should print the file content on stdOut', () => {
    const logger = {
      log: mockLog('hello'),
      error: mockError('abc')
    };
    const formatter = file => file.content;
    assert.equal(printOutput(formatter, logger, {
      name: 'a.txt', content: 'hello', error: false
    }), undefined);
  });

  it('Should print the file content on stdError', () => {
    const logger = {
      log: mockLog('hello'),
      error: mockError('head: a.txt: No such file or directory')
    };
    const formatter = file => file;
    assert.equal(printOutput(formatter, logger, {
      name: 'a.txt', content: 'abc', error: true
    }), undefined);
  });
});

const shouldReturn = (fileName, content, expectedEncoding) => {
  return function (file, encoding) {
    assert.equal(encoding, expectedEncoding);
    assert.equal(file, fileName);
    return content;
  };
};

describe('fileReader', () => {
  it('Should return fileName,content and error status in object', () => {
    const mockReadFile = shouldReturn('a.txt', 'hello', 'utf8');
    assert.deepStrictEqual(fileReader(mockReadFile, 'a.txt'), {
      name: 'a.txt', content: 'hello', error: false
    });
  });

  it('Should return content as undefined when unable to read file', () => {
    const mockReadFile = shouldReturn('a.txt', 'hello', 'utf8');
    assert.deepStrictEqual(fileReader(mockReadFile, 'b.txt'), {
      name: 'b.txt', content: undefined, error: true
    });
  });
});

describe('headFiles', () => {
  it('Should return files after head', () => {
    const files = [{ fileName: 'a.txt', content: 'a\nb', error: false }];
    const options = { switch: 'line', value: 1 };
    const expected = [{ fileName: 'a.txt', content: 'a', error: false }];
    assert.deepEqual(headFiles(files, options), expected);
  });

  it('Should not head file if error is true', () => {
    const files = [{ fileName: 'a.txt', content: 'a\nb', error: true }];
    const options = { switch: 'line', value: 1 };
    const expected = [{ fileName: 'a.txt', content: 'a\nb', error: true }];
    assert.deepEqual(headFiles(files, options), expected);
  });
});
