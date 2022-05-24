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

exports.tail = tail;
