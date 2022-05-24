const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('Should return same given line', () => {
    assert.strictEqual(tail('hello'), 'hello');
  });
});
