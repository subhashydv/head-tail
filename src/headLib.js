const { splitLines, joinLines } = require('./stringUtils');

const sliceFromStart = (lines, limit) => lines.slice(0, limit);

const head = (content, { limit, separator }) => {
  const lines = splitLines(content, separator);
  return joinLines(sliceFromStart(lines, limit), separator);
};

const headMain = (readFileSync, fileName) => {
  const content = readFileSync(fileName, 'utf8');
  return head(content, { limit: 1, separator: '\n' });
};

exports.head = head;
exports.sliceFromStart = sliceFromStart;
exports.headMain = headMain;
