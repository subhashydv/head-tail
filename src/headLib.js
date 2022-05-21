const { splitLines, joinLines, sliceFromStart } = require('./stringUtils');

const head = (content, option) => {
  if (option.switch === 'byte') {
    return content.slice(0, option.value);
  }

  const lines = splitLines(content);
  return joinLines(sliceFromStart(lines, option.value));
};

const headMain = (readFileSync, fileName) => {
  const content = readFileSync(fileName, 'utf8');
  return head(content, { switch: 'line', value: 10 });
};

exports.head = head;
exports.headMain = headMain;
