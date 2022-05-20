const NEWLINE = '\n';

const splitLines = lines => lines.split(NEWLINE);
const joinLines = lines => lines.join(NEWLINE);

const head = (content, limit) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, limit));
};

exports.head = head;
