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

const fileReader = function (file) {
  let content;
  let errorStatus = false;
  try {
    content = this(file, 'utf8');
  } catch (error) {
    errorStatus = true;
  }
  return {
    fileName: file,
    content,
    error: errorStatus
  };
};

const headMain = (readFileSync, ...args) => {
  const { fileName, options } = parseArgs(args);
  const readFile = fileReader.bind(readFileSync);
  const files = fileName.map(readFile);

  return files.map((file) => {
    if (!file.error) {
      file.content = head(file.content, options);
    }
    return file;
  });
};

exports.head = head;
exports.headMain = headMain;
