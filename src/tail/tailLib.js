const {
  splitLines, joinLines, sliceLines, sliceByte } = require('./stringUtils.js');

const tail = (content, option) => {
  if (option.switch === 'byte') {
    return sliceByte(content, option.count);
  }
  const lines = splitLines(content);
  const limit = lines.length - option.count;
  return joinLines(sliceLines(lines, limit));
};

exports.tail = tail;
