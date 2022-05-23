const isContainsBothOption = args => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      type: 'combineOptionError',
      message: 'head: can\'t combine line and byte counts'
    };
  }
};

const isOption = (value) => /^-./.test(value);

const getOption = function (args) {
  let index = 0;
  const option = [];
  while (index < args.length && isOption(args[index])) {
    option.push(args[index]);
    if (args[index + 1]) {
      option.push(args[index + 1]);
    }
    index += 2;
  };
  return option;
};

const isValidOption = (option) => {
  return option === '-n' || option === '-c';
};

const isValidValue = (value) => {
  return isFinite(value) && value > 0;
};

const validateOptions = args => {
  let index = 0;
  while (index < args.length) {
    if (!isValidOption(args[index])) {
      throw {
        // eslint-disable-next-line max-len
        message: `head: illegal option -- ${args[index]}\nusage: head [-n lines | -c bytes] [file ...]`
      };
    }
    if (!isValidValue(args[index + 1])) {
      throw {
        message: `head: illegal line count -- ${args[index + 1]}`
      };
    }
    index += 2;
  }
  isContainsBothOption(args);
};

const fileList = (args, index) => {
  const files = args.slice(index);
  if (files.length === 0) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
  return files;
};

const structureOption = args => {
  const keys = { '-n': 'line', '-c': 'byte' };
  const options = { switch: 'line', value: 10 };

  const lastIndex = args.length - 1;
  options.switch = keys[args[lastIndex - 1]] || options.switch;
  options.value = args[lastIndex] || options.value;
  return options;
};

const splitArgs = args => {
  return args.flatMap((arg) => {
    return /^-../.test(arg) ? [arg.slice(0, 2), +arg.slice(2)] : arg;
  });
};

const parseArgs = args => {
  const splittedArgs = splitArgs(args);
  const option = getOption(splittedArgs);
  const files = fileList(splittedArgs, option.length);
  validateOptions(option);

  const structuredOptions = structureOption(option);
  return { options: structuredOptions, fileName: files };
};

exports.parseArgs = parseArgs;
exports.fileList = fileList;
exports.formatArgs = splitArgs;
exports.validateOptions = validateOptions;
