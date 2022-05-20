const assert = require('assert');
const { head, extractLines, } = require('../src/headLib.js');

describe('head', () => {
  it('Should return single line', () => {
    assert.strictEqual(head('hello', { lineLimit: 1 }), 'hello');
    assert.strictEqual(head('world', { lineLimit: 1 }), 'world');
    assert.strictEqual(head('hello world', { lineLimit: 1 }), 'hello world');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld', {
      lineLimit: 2
    }), 'hello\nworld');

    assert.strictEqual(head('hello\n\nworld', {
      lineLimit: 3
    }), 'hello\n\nworld');
  });

  it('Should return given line count', () => {
    assert.strictEqual(head('hello\nworld', { lineLimit: 1 }), 'hello');

    assert.strictEqual(head('hello\nworld\nhi', {
      lineLimit: 2
    }), 'hello\nworld');

    assert.strictEqual(head('hello\n\nhi', { lineLimit: 2 }), 'hello\n');
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
