const assert = require('assert');
const usage = 'usage: head [-n lines | -c bytes] [file ...]';

const { parser } = require('../../src/tail/parser.js');

const optionsInfo = {
  '-n': {
    switch: '-n',
    needValue: true
  },
  '-c': {
    switch: '-c',
    needValue: true
  }
};

describe('parser', () => {
  it('Should return object of -n switch', () => {
    assert.deepStrictEqual(parser(optionsInfo, ['-n', '2']), {
      option: [{ switch: '-n', count: 2 }], needValue: false
    });
    assert.deepStrictEqual(parser(optionsInfo, ['-n', '3', '4']), {
      option: [{ switch: '-n', count: 3 }], needValue: false
    });
  });

  it('Should return last -n value when multiple -n switch present', () => {
    assert.deepStrictEqual(parser(optionsInfo, ['-n', '3', '-n', '4']), {
      option: [{
        switch: '-n', count: 3
      },
      { switch: '-n', count: 4 }],
      needValue: false
    });
  });

  it('Should return object of -c switch', () => {
    assert.deepStrictEqual(parser(optionsInfo, ['-c', '2']), {
      option: [{ switch: '-c', count: 2 }], needValue: false
    });
  });

  it('Should throw error when invalid options passed', () => {
    assert.throws(() => parser(optionsInfo, ['-p', '4']), {
      type: 'illegalOption',
      message: 'illegal option -- -p\n' + usage
    });
  });
});
