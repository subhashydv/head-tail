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
  for (let index = 0; index < args.length; index += 2) {
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
  }
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

  let index = 0;
  while (args[index] === '-n' || args[index] === '-c') {
    options.switch = keys[args[index]];
    options.value = args[index + 1];
    index += 2;
  }
  return options;
};

const formatArgs = args => {
  return args.flatMap((arg) => {
    return /^-../.test(arg) ? [arg.slice(0, 2), +arg.slice(2)] : arg;
  });
};

const popArgs = (args, argsToPop) => {
  const limit = args.length - argsToPop.length;
  return args.slice(0, limit);
};

const parseArgs = args => {
  const formatedArgs = formatArgs(args);
  const files = fileList(formatedArgs);
  const option = popArgs(formatedArgs, files);
  validateOptions(option);

  isContainsBothOption(option);
  const structuredOptions = structureOption(formatedArgs);
  return { options: structuredOptions, fileName: files };
};

exports.parseArgs = parseArgs;
exports.fileList = fileList;
exports.formatArgs = formatArgs;
exports.validateOptions = validateOptions;
