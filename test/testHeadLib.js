const assert = require('assert');
const { head } = require('../src/headLib.js');

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
