const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

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

  it('Should return given number of bytes from last', () => {
    assert.strictEqual(tail('hello', { switch: 'byte', count: 2 }), 'lo');
    assert.strictEqual(tail('hello', { switch: 'byte', count: 5 }), 'hello');
  });

  it('Should return empty string when count is 0', () => {
    assert.strictEqual(tail('hello', { switch: 'byte', count: 0 }), '');
  });
});
