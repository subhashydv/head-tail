const isContainsBothOption = args => {
  return args.includes('-n') && args.includes('-c');
};

const fileList = args => {
  const firstFile = args.find((element) => /^[^-\d]/.test(element));
  if (!firstFile) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
  }

  const indexOfFirstFile = args.indexOf(firstFile);
  return args.slice(indexOfFirstFile);
};

const option = args => {
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

const parseArgs = args => {
  if (isContainsBothOption(args)) {
    throw {
      type: 'optionError',
      message: 'head: can\'t combine line and byte counts'
    };
  }

  const options = option(args);
  const files = fileList(args);
  return { options, fileName: files };
};

exports.parseArgs = parseArgs;
exports.fileList = fileList;
exports.formatArgs = formatArgs;
