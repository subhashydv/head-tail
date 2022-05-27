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

const formatWithHead = ({ name, content }) => `==> ${name} <==\n${content}`;

const formatWithoutHead = ({ content }) => content;

const formatContent = (files) =>
  files.length > 1 ? formatWithHead : formatWithoutHead;

const printOutput = (formatter, logger, file) => {
  if (file.error) {
    logger.error(`head: ${file.name}: No such file or directory`);
  } else {
    logger.log(formatter(file));
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

const exitCode = files => files.some((file) => file.error) ? 1 : 0;

const headMain = (readFileSync, logger, args) => {
  const { fileName, options } = parseArgs(args);
  const files = fileName.map((file) => fileReader(readFileSync, file));

  const headOfFiles = headFiles(files, options);
  const format = formatContent(headOfFiles);
  headOfFiles.forEach((file) => printOutput(format, logger, file));
  return exitCode(files);
};

exports.head = head;
exports.headMain = headMain;
exports.printOutput = printOutput;
exports.fileReader = fileReader;
exports.headFiles = headFiles;
exports.formatContent = formatContent;
