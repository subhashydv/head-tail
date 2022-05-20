const NEWLINE = '\n';

const splitLines = lines => lines.split(NEWLINE);
const joinLines = lines => lines.join(NEWLINE);

const extractLines = (lines, limit) => lines.slice(0, limit);

const head = (content, limit) => {
  const lines = splitLines(content);
  return joinLines(extractLines(lines, limit));
};

exports.head = head;
