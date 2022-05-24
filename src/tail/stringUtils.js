const NEWLINE = '\n';

exports.splitLines = (content) => content.split(NEWLINE);
exports.joinLines = (content) => content.join(NEWLINE);
exports.sliceLines = (lines, from) => lines.slice(from);
