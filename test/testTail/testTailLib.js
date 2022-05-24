const assert = require('assert');
const tail = (content) => content;

describe('tail', () => {
  it('Should return same given line', () => {
    assert.strictEqual(tail('hello'), 'hello');
  });
});
