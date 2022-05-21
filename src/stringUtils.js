const NEWLINE = '\n';

exports.splitLines = (lines) => lines.split(NEWLINE);
exports.joinLines = (lines) => lines.join(NEWLINE);
exports.sliceFromStart = (lines, limit) => lines.slice(0, limit);
