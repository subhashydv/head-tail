const isOption = (option) => option.startsWith('-');

const parser = (optionsInfo, cmdLineArgs) => {
  let index = 0;
  const option = [];
  while (index < cmdLineArgs.length) {
    const arg = cmdLineArgs[index];

    if (isOption(arg)) {
      const matchedOption = optionsInfo[arg];
      index += matchedOption.needValue ? 1 : 0;
      option.push(matchedOption.parser(cmdLineArgs[index]));
    }
    index++;
  }
  return { option };
};

exports.parser = parser;
