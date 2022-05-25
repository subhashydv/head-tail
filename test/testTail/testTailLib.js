const assert = require('assert');
const { tail, tailMain } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('Should return same given line', () => {
    assert.strictEqual(tail('hello', { switch: 'line', count: 1 }), 'hello');
  });

  it('Should return same given two lines', () => {
    assert.strictEqual(tail('hello\nworld', {
      switch: 'line', count: 2
    }), 'hello\nworld');
  });

  it('Should return given number of lines from last', () => {
    assert.strictEqual(tail('hello\nworld', {
      switch: 'line', count: 1
    }), 'world');
    assert.strictEqual(tail('a\nb\nc\nd', {
      switch: 'line', count: 2
    }), 'c\nd');
    assert.strictEqual(tail('a\nb\nc\nd\ne', {
      switch: 'line', count: 3
    }), 'c\nd\ne');
    assert.strictEqual(tail('a\nb\nc\nd\ne', { switch: 'line', count: 0 }), '');
  });

  it('Should return all lines when count is more than lines', () => {
    assert.strictEqual(tail('a\nb\nc', {
      switch: 'line', count: 5
    }), 'a\nb\nc');
  });

  it('Should return given number of bytes from last', () => {
    assert.strictEqual(tail('hello', { switch: 'byte', count: 2 }), 'lo');
    assert.strictEqual(tail('hello', { switch: 'byte', count: 5 }), 'hello');
  });

  it('Should return empty string when count is 0', () => {
    assert.strictEqual(tail('hello', { switch: 'byte', count: 0 }), '');
  });

  it('Should return whole content when count is more than given string', () => {
    assert.strictEqual(tail('hello', { switch: 'byte', count: 8 }), 'hello');
  });
});

const shouldReturn = (content, fileName, expectedEncoding) => {
  return function (file, encoding) {
    assert.equal(file, fileName);
    assert.equal(encoding, expectedEncoding);
    return content;
  };
};

describe('tailMain', () => {
  it('Should return file content', () => {
    const mockRead = shouldReturn('hello', 'a.txt', 'utf8');
    assert.strictEqual(tailMain(mockRead, 'a.txt'), 'hello');
  });

  it('Should return last 10 lines file content', () => {
    const mockRead = shouldReturn('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11', 'b.txt', 'utf8');
    assert.strictEqual(tailMain(mockRead, 'b.txt'), '2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
  });

  it('Should throw error when file is not present', () => {
    const mockRead = shouldReturn('hello', 'a.txt', 'utf8');
    assert.throws(() => tailMain(mockRead, 'b.txt'));
  });
});
