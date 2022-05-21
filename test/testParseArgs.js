const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should return object with line option and file name', () => {
    assert.deepStrictEqual(parseArgs(['-n', 1, 'a.txt']), {
      value: 1,
      switch: 'line',
      fileName: 'a.txt'
    });
  });
});
