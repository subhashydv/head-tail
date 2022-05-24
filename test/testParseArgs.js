const assert = require('assert');
const {
  parseArgs, fileList, splitArgs, validateOptions, getOption
} = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should return object with line option and file name', () => {
    assert.deepStrictEqual(parseArgs(['-n', 1, 'a.txt']), {
      options: {
        value: 1,
        switch: 'line'
      },
      fileName: ['a.txt']
    });
  });

  it('Should return object with byte option and file name', () => {
    assert.deepStrictEqual(parseArgs(['-c', 1, 'a.txt']), {
      options: {
        value: 1,
        switch: 'byte'
      },
      fileName: ['a.txt']
    });
  });

  it('Should return line option with default value if option not given', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      options: {
        value: 10,
        switch: 'line'
      },
      fileName: ['a.txt']
    });
  });

  it('Should return last line option when multiple line option given', () => {
    assert.deepEqual(parseArgs(['-n', 1, '-n', 3, 'a.txt']), {
      options: {
        value: 3,
        switch: 'line'
      },
      fileName: ['a.txt']
    });
  });

  it('Should return last byte option when multiple byte option given', () => {
    assert.deepStrictEqual(parseArgs(['-c', 1, '-c', 3, 'a.txt']), {
      options: {
        value: 3,
        switch: 'byte'
      },
      fileName: ['a.txt']
    });
  });

  it('Should throw error when both option parsed', () => {
    assert.throws(() => parseArgs(['-n', 1, '-c', 3, 'a.txt']), {
      message: 'head: can\'t combine line and byte counts'
    });
  });

  it('Should return multiple file list', () => {
    assert.deepStrictEqual(parseArgs(['-c', 1, '-c', 3, 'a.txt', 'b.txt']), {
      options: {
        value: 3,
        switch: 'byte'
      },
      fileName: ['a.txt', 'b.txt']
    });
  });

  it('Should return content when switch and value are combine(-n1)', () => {
    assert.deepStrictEqual(parseArgs(['-n1', 'a.txt']), {
      options: {
        value: 1,
        switch: 'line'
      },
      fileName: ['a.txt']
    });
  });

  it('Should return content with -n switch when only value is given', () => {
    assert.deepStrictEqual(parseArgs(['-1', 'a.txt']), {
      options: {
        value: 1,
        switch: 'line'
      },
      fileName: ['a.txt']
    });
  });
});

describe('fileList', () => {
  it('Should return file name', () => {
    assert.deepEqual(fileList(['-n', 1, 'a.txt'], 2), ['a.txt']);
  });
  it('Should return list of file names', () => {
    assert.deepEqual(fileList(['-c', 8, 'a.txt', 'b.txt'], 2), ['a.txt', 'b.txt']);
  });
  it('Should throw error when file is not present', () => {
    assert.throws(() => fileList(['-c', 3], 2), {
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
});

describe('splitArgs', () => {
  it('Should return switch and value separated list', () => {
    assert.deepStrictEqual(splitArgs(['-n1']), ['-n', 1]);
    assert.deepStrictEqual(splitArgs(['-n1', 'a.txt']), ['-n', 1, 'a.txt']);
    assert.deepStrictEqual(splitArgs(['-n', 1, 'a.txt']), ['-n', 1, 'a.txt']);
  });

  it('Should return list when numbers are mixed', () => {
    assert.deepStrictEqual(splitArgs(['-n1', 2]), ['-n', 1, 2]);
    assert.deepStrictEqual(splitArgs(['-c1', 2, 'a']), ['-c', 1, 2, 'a']);
  });

  it('Should return list when switch and value are already separated', () => {
    assert.deepStrictEqual(splitArgs(['-n', 1]), ['-n', 1]);
    assert.deepStrictEqual(splitArgs(['-c1', 2, 'a']), ['-c', 1, 2, 'a']);
  });

  it('Should return value with option -n when only value given', () => {
    assert.deepStrictEqual(splitArgs([1]), ['-n', 1]);
    assert.deepStrictEqual(splitArgs(['-1', '-n', 2]), ['-n', 1, '-n', 2]);
  });
});

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

describe('getOption', () => {
  it('Should return options when file is given', () => {
    assert.deepStrictEqual(getOption(['-n', 5, 'a.txt']), ['-n', 5]);
    assert.deepStrictEqual(getOption(['-n', 5, 3, 'a.txt']), ['-n', 5]);
    assert.deepStrictEqual(getOption(['-n', 5, -3, 'a.txt']), ['-n', 5, -3, 'a.txt']);
  });
});
