const usage = 'usage: head [-n lines | -c bytes] [file ...]';

const isOption = (option) => option.startsWith('-');

const isValueNeeded = ({ needValue }) => needValue;

const isValidOption = (optionInfo, option) =>
  Object.keys(optionInfo).includes(option);

const getOption = (optionInfo, option) => {
  if (!isValidOption(optionInfo, option)) {
    throw {
      type: 'illegalOption',
      message: `illegal option -- ${option}\n` + usage
    };
  }
  return { switch: option };
};

const parser = (optionInfo, cmdArgs) => {
  return cmdArgs.reduce((args, cmdArg) => {
    const { option } = args;
    const lastIndex = option.length - 1;

    if (isValueNeeded(args)) {
      option[lastIndex].count = +cmdArg;
      args.needValue = false;
    }

    if (isOption(cmdArg)) {
      option.push(getOption(optionInfo, cmdArg));
      args.needValue = optionInfo[cmdArg].needValue;
    }
    return args;
  }, { option: [], needValue: false });
};

exports.parser = parser;
