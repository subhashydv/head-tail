const {
  splitLines, joinLines, sliceLines, sliceByte } = require('./stringUtils.js');

const tail = (content, option) => {
  if (option.switch === 'byte') {
    return option.count ? sliceByte(content, option.count) : '';
  }
  const lines = splitLines(content);
  const lastNLines = option.count ? sliceLines(lines, option.count) : [];
  return joinLines(lastNLines);
};

const tailMain = function (readFile, fileName) {
  const content = readFile(fileName, 'utf8');
  const option = { switch: 'line', count: 10 };
  return tail(content, option);
};

exports.tail = tail;
exports.tailMain = tailMain;
