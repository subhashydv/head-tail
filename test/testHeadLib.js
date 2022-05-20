const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return single line', () => {
    assert.deepEqual(head('hello'), 'hello');
    assert.deepEqual(head('world'), 'world');
    assert.deepEqual(head('hello world'), 'hello world');
  });
});
