const { splitLines, joinLines, sliceLines } = require('./stringUtils.js');

const tail = (content, count) => {
  const lines = splitLines(content);
  const limit = lines.length - count;
  return joinLines(sliceLines(lines, limit));
};

exports.tail = tail;
