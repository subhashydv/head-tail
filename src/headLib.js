const { splitLines, joinLines, sliceFromStart } = require('./stringUtils');

const head = (content, option) => {
  const separator = option.switch === 'line' ? '\n' : '';
  const lines = splitLines(content, separator);
  return joinLines(sliceFromStart(lines, option.value), separator);
};

const headMain = (readFileSync, fileName) => {
  const content = readFileSync(fileName, 'utf8');
  return head(content, { switch: 'line', value: 1 });
};

exports.head = head;
exports.headMain = headMain;
