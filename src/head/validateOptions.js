const isContainsBothOption = args => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      type: 'combineOptionError',
      message: 'head: can\'t combine line and byte counts'
    };
  }
};

const validateOption = (option) => {
  if (option !== '-n' && option !== '-c') {
    throw {
      // eslint-disable-next-line max-len
      message: `head: illegal option -- ${option}\nusage: head [-n lines | -c bytes] [file ...]`
    };
  }
};

const validateValue = (value, key) => {
  const options = { '-n': 'line', '-c': 'byte' };
  if (!isFinite(value) || value < 1) {
    throw {
      message: `head: illegal ${options[key]} count -- ${value}`
    };
  }
};

const validateOptions = args => {
  let index = 0;
  while (index < args.length) {
    validateOption(args[index]);
    validateValue(args[index + 1], args[index]);
    index += 2;
  }
  isContainsBothOption(args);
};

exports.validateOptions = validateOptions;
