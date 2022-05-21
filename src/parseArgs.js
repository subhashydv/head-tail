const parseArgs = args => {
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
