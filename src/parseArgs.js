const parseArgs = args => {
  const fileName = args[args.length - 1];
  const option = args[0] === '-n' ? 'line' : 'byte';
  const options = {
    value: args[1], switch: option, fileName
  };
  return options;
};

exports.parseArgs = parseArgs;
