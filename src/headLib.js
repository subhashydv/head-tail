const { splitLines, joinLines } = require('./stringUtils');

const extractLines = (lines, limit) => lines.slice(0, limit);

const head = (content, limit) => {
  const lines = splitLines(content);
  return joinLines(extractLines(lines, limit));
};

exports.head = head;
exports.extractLines = extractLines;
