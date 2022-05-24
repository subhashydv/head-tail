const NEWLINE = '\n';

exports.splitLines = (content) => content.split(NEWLINE);
exports.joinLines = (content) => content.join(NEWLINE);
exports.sliceLines = (lines, fromLast) => lines.slice(-fromLast);
exports.sliceByte = (content, count) => content.slice(-count);
