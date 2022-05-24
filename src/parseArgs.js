const { validateOptions } = require('./validateOptions.js');
const isOption = (value) => /^-.$/.test(value);

const getOption = function (args) {
  let index = 0;
  const option = [];
  while (index < args.length && isOption(args[index])) {
    option.push(args[index]);
    if (args[index + 1]) {
      option.push(args[index + 1]);
    }
    index += 2;
  }
  return option;
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
  const splittedArgs = [...args];
  if (isFinite(splittedArgs[0])) {
    splittedArgs.splice(0, 1, '-n', Math.abs(args[0]));
  }

  return splittedArgs.flatMap((arg) => {
    return /^-../.test(arg) ? [arg.slice(0, 2), +arg.slice(2)] : arg;
  });
};

const parseArgs = args => {
  const splittedArgs = splitArgs(args);
  const option = getOption(splittedArgs);
  validateOptions(option);
  const files = fileList(splittedArgs, option.length);

  const structuredOptions = structureOption(option);
  return { options: structuredOptions, fileName: files };
};

exports.parseArgs = parseArgs;
exports.fileList = fileList;
exports.splitArgs = splitArgs;
exports.getOption = getOption;
