const assert = require('assert');
const { head } = require('../src/headLib.js');

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
