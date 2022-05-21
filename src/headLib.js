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

const headMain = (readFileSync, ...args) => {
  const { fileName, options } = parseArgs(args);
  let content;
  try {
    content = readFileSync(fileName, 'utf8');
  } catch (error) {
    throw {
      type: 'readFileError',
      message: `can not read ${fileName}`
    };
  }
  return head(content, options);
};

exports.head = head;
exports.headMain = headMain;
