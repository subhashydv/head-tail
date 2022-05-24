const { splitLines, joinLines, sliceLines } = require('./stringUtils.js');

const tail = (content, option) => {
  if (option.switch === 'byte') {
    return content.slice(content.length - option.count);
  }
  const lines = splitLines(content);
  const limit = lines.length - option.count;
  return joinLines(sliceLines(lines, limit));
};

exports.tail = tail;
