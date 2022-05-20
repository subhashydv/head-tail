const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('world'), 'world');
    assert.strictEqual(head('hello world'), 'hello world');
  });

  it('Should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('hello\n\nworld'), 'hello\n\nworld');
  });
});
