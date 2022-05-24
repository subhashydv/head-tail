const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('Should return same given line', () => {
    assert.strictEqual(tail('hello', 1), 'hello');
  });

  it('Should return same given two lines', () => {
    assert.strictEqual(tail('hello\nworld', 2), 'hello\nworld');
  });

  it('Should return given number of lines from last', () => {
    assert.strictEqual(tail('hello\nworld', 1), 'world');
    assert.strictEqual(tail('a\nb\nc\nd', 2), 'c\nd');
    assert.strictEqual(tail('a\nb\nc\nd\ne', 3), 'c\nd\ne');
    assert.strictEqual(tail('a\nb\nc\nd\ne', 0), '');
  });
});
