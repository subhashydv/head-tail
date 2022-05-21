const NEWLINE = '\n';

exports.splitLines = (lines) => lines.split(NEWLINE);
exports.joinLines = (lines) => lines.join(NEWLINE);
exports.extractLines = (lines, limit) => lines.slice(0, limit);
exports.extractBytes = (content, limit) => content.slice(0, limit);
