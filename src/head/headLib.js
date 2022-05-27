const { parseArgs } = require('./parseArgs');
const {
  splitLines, joinLines, extractLines, extractBytes
} = require('./stringUtils');

const head = (content, option) => {
  if (option.switch === 'byte') {
    return extractBytes(content, option.value);
  }
  const lines = splitLines(content);
  return joinLines(extractLines(lines, option.value));
};

const fileReader = function (readFileSync, file) {
  let content;
  let errorStatus = false;
  try {
    content = readFileSync(file, 'utf8');
  } catch (error) {
    errorStatus = true;
  }
  return {
    name: file,
    content,
    error: errorStatus
  };
};

const formatHeader = (numberOfFiles, file) => {
  return numberOfFiles > 1 ? `==> ${file.name} <==\n` : '';
};

const selectSeparator = (filesToPrint) => {
  return filesToPrint > 1 ? '\n' : '';
};

const printOutput = (logger, files) => {
  for (let index = 0; index < files.length; index++) {
    const header = formatHeader(files.length, files[index]);
    const separator = selectSeparator(files.length - index);

    if (files[index].error) {
      logger.error(`head: ${files[index].name}: No such file or directory`);
    } else {
      logger.log(`${header}${files[index].content}${separator}`);
    }
  }
};

const headFiles = (files, options) => {
  return files.map((file) => {
    if (!file.error) {
      file.content = head(file.content, options);
    }
    return file;
  });
};

const exitCode = (files) => {
  return files.some((file) => file.error) ? 1 : 0;
};

const headMain = (readFileSync, logger, ...args) => {
  const { fileName, options } = parseArgs(args);
  const files = fileName.map((file) => fileReader(readFileSync, file));

  const headOfFIles = headFiles(files, options);
  printOutput(logger, headOfFIles);
  return exitCode(files);
};

exports.head = head;
exports.headMain = headMain;
exports.printOutput = printOutput;
exports.fileReader = fileReader;
exports.headFiles = headFiles;
