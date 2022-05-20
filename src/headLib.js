const { splitLines, joinLines } = require('./stringUtils');

const extractLines = (lines, limit) => lines.slice(0, limit);

const head = (content, { lineLimit }) => {
  const lines = splitLines(content);
  return joinLines(extractLines(lines, lineLimit));
};

const headMain = (readFileSync, fileName) => {
  const content = readFileSync(fileName, 'utf8');
  return head(content, { lineLimit: 1 });
};

exports.head = head;
exports.extractLines = extractLines;
exports.headMain = headMain;
