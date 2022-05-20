const assert = require('assert');
const { head, sliceFromStart, } = require('../src/headLib.js');

describe('head', () => {
  it('Should return single line', () => {
    assert.strictEqual(head('hello', { limit: 1 }), 'hello');
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
    assert.strictEqual(head('hello\nworld', {
      limit: 1, separator: '\n'
    }), 'hello');

    assert.strictEqual(head('hello\nworld\nhi', {
      limit: 2, separator: '\n'
    }), 'hello\nworld');

    assert.strictEqual(head('hello\n\nhi', {
      limit: 2, separator: '\n'
    }), 'hello\n');
  });

  it('Should return specified count of characters', () => {
    assert.strictEqual(head('hello', { limit: 1, separator: '' }), 'h');
    assert.strictEqual(head('hello', { limit: 5, separator: '' }), 'hello');
    assert.strictEqual(head('hello\nworld', {
      limit: 8, separator: ''
    }), 'hello\nwo');
  });
});

describe('extractLines', () => {
  it('Should return first element of list', () => {
    assert.deepStrictEqual(sliceFromStart([1], 1), [1]);
    assert.deepStrictEqual(sliceFromStart([2, 3], 1), [2]);
    assert.deepStrictEqual(sliceFromStart(['2', '3'], 1), ['2']);
  });

  it('Should return specified number of element from list', () => {
    assert.deepStrictEqual(sliceFromStart([1, 2, 3], 2), [1, 2]);
    assert.deepStrictEqual(sliceFromStart([1, 2, 3], 5), [1, 2, 3]);
    assert.deepStrictEqual(sliceFromStart([1, 2, 3], 0), []);
  });

  it('Should return list if specified number is more than element', () => {
    assert.deepStrictEqual(sliceFromStart([1, 2, 3], 5), [1, 2, 3]);
  });
});
