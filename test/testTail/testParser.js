const assert = require('assert');
const { parser } = require('../../src/tail/parser.js');

const lineParser = (value) => {
  return { switch: 'line', count: +value };
};
const byteParser = value => {
  return { switch: 'byte', count: +value };
};

const optionsInfo = {
  '-n': {
    switch: '-n',
    parser: lineParser,
    needValue: true
  },
  '-c': {
    switch: '-c',
    parser: byteParser,
    needValue: true
  }
};

describe.only('parser', () => {
  it('Should return object of -n switch', () => {
    assert.deepStrictEqual(parser(optionsInfo, ['-n', '2']), {
      option: [{ switch: 'line', count: 2 }]
    });
    assert.deepStrictEqual(parser(optionsInfo, ['-n', '3', '4']), {
      option: [{ switch: 'line', count: 3 }]
    });
  });

  it('Should return last -n value when multiple -n switch present', () => {
    assert.deepStrictEqual(parser(optionsInfo, ['-n', '3', '-n', '4']), {
      option: [{ switch: 'line', count: 3 }, { switch: 'line', count: 4 }]
    });
  });

  it('Should return object of -c switch', () => {
    assert.deepStrictEqual(parser(optionsInfo, ['-c', '2']), {
      option: [{ switch: 'byte', count: 2 }]
    });
  });
});
