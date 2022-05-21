const isContainsBothOption = args => {
  return args.includes('-n') && args.includes('-c');
};

const parseArgs = args => {
  if (isContainsBothOption(args)) {
    throw { message: 'can not combine line and byte counts' };
  }

  const keys = { '-n': 'line', '-c': 'byte' };
  const options = { switch: 'line', value: 10 };

  for (let index = 0; index < args.length - 1; index += 2) {
    const [option, value] = args.slice(index, index + 2);
    options.switch = keys[option];
    options.value = value;
  }
  return { options, fileName: args[args.length - 1] };
};

exports.parseArgs = parseArgs;
