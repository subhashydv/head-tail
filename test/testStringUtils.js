const assert = require('assert');
const { extractLines, splitLines, joinLines } = require('../src/stringUtils.js');

describe('extractLines', () => {
  it('Should return first element of list', () => {
    assert.deepStrictEqual(extractLines([1], 1), [1]);
    assert.deepStrictEqual(extractLines([2, 3], 1), [2]);
    assert.deepStrictEqual(extractLines(['2', '3'], 1), ['2']);
  });

  it('Should return specified number of element from list', () => {
    assert.deepStrictEqual(extractLines([1, 2, 3], 2), [1, 2]);
    assert.deepStrictEqual(extractLines([1, 2, 3], 5), [1, 2, 3]);
    assert.deepStrictEqual(extractLines([1, 2, 3], 0), []);
  });

  it('Should return list if specified number is more than element', () => {
    assert.deepStrictEqual(extractLines([1, 2, 3], 5), [1, 2, 3]);
  });
});

describe('splitLines', () => {
  it('Should return splitted list', () => {
    assert.deepEqual(splitLines('a\nb'), ['a', 'b']);
    assert.deepEqual(splitLines('cb'), ['cb']);
  });
});

describe('joinLines', () => {
  it('Should return joined list as string', () => {
    assert.strictEqual(joinLines(['a', 'b']), 'a\nb');
    assert.strictEqual(joinLines(['cb']), 'cb');
  });
});
