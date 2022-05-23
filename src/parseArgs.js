const isContainsBothOption = args => {
  if (args.includes('-n') && args.includes('-c')) {
    throw {
      type: 'combineOptionError',
      message: 'head: can\'t combine line and byte counts'
    };
  }
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

const fileList = args => {
  const firstFile = args.find((element) => /^[^-\d]/.test(element));
  if (!firstFile) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
  }

  const indexOfFirstFile = args.indexOf(firstFile);
  return args.slice(indexOfFirstFile);
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

const popArgs = (args, argsToPop) => {
  const limit = args.length - argsToPop.length;
  return args.slice(0, limit);
};

const parseArgs = args => {
  const splittedArgs = splitArgs(args);
  const files = fileList(splittedArgs);
  const option = popArgs(splittedArgs, files);
  validateOptions(option);

  const structuredOptions = structureOption(option);
  return { options: structuredOptions, fileName: files };
};

exports.parseArgs = parseArgs;
exports.fileList = fileList;
exports.formatArgs = splitArgs;
exports.validateOptions = validateOptions;
