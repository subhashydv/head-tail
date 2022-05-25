const isOption = (option) => option.startsWith('-');

// eslint-disable-next-line max-statements
const parser = (optionsInfo, cmdLineArgs) => {
  let index = 0;
  let option;
  while (index < cmdLineArgs.length) {
    const arg = cmdLineArgs[index];

    if (isOption(arg)) {
      const matchedOption = optionsInfo[arg];
      if (matchedOption.needValue) {
        index++;
        option = matchedOption.parser(cmdLineArgs[index]);
      }
    }
    index++;
  }
  return option;
};

exports.parser = parser;
