const assert = require('assert');
const { parser } = require('../../src/tail/parser.js');

const lineParser = (value) => {
  return { switch: 'line', count: +value };
};

const optionsInfo = {
  '-n': {
    switch: '-n',
    parser: lineParser,
    needValue: true
  }
};

describe.only('parser', () => {
  it('Should return object of -n switch', () => {
    assert.deepEqual(parser(optionsInfo, ['-n', '2']), {
      switch: 'line', count: 2
    });
    assert.deepEqual(parser(optionsInfo, ['-n', '3', '4']), {
      switch: 'line', count: 3
    });
  });

  it('Should return last -n value when multiple -n switch present', () => {
    assert.deepEqual(parser(optionsInfo, ['-n', '3', '-n', '4']), {
      switch: 'line', count: 4
    });
  });
});
