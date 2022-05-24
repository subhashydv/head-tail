const assert = require('assert');
const { validateOptions } = require('../src/validateOptions.js');

describe('validateOptions', () => {
  it('Should not return anything if options are valid', () => {
    assert.strictEqual(validateOptions(['-n', 2]), undefined);
    assert.strictEqual(validateOptions(['-n', 2, '-n', 4]), undefined);
    assert.strictEqual(validateOptions(['-n', '2']), undefined);
  });

  it('Should throw error when illegal option is given', () => {
    assert.throws(() => validateOptions(['-n', 2, '-v', 4]), {
      message: 'head: illegal option -- -v\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should throw error when illegal option is given', () => {
    assert.throws(() => validateOptions(['-v', 4]), {
      message: 'head: illegal option -- -v\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });

  it('Should throw error when illegal value is given', () => {
    assert.throws(() => validateOptions(['-n', '-v']), {
      message: 'head: illegal line count -- -v'
    });

    assert.throws(() => validateOptions(['-n', 'hello']), {
      message: 'head: illegal line count -- hello'
    });

    assert.throws(() => validateOptions(['-n', '-4']), {
      message: 'head: illegal line count -- -4'
    });

    assert.throws(() => validateOptions(['-n', '0']), {
      message: 'head: illegal line count -- 0'
    });
  });
});
