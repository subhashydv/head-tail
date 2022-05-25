const parser = (optionsInfo, cmdLineArgs) => {
  let index = 0;
  let option;
  while (index < cmdLineArgs.length) {
    const matchedOption = optionsInfo[cmdLineArgs[index]];

    if (matchedOption.needValue) {
      index++;
      option = matchedOption.parser(cmdLineArgs[index]);
    }
    index++;
    return option;
  }
};

exports.parser = parser;
