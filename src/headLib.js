const head = (content, limit) => {
  const lines = content.split('\n');
  return lines.slice(0, limit).join('\n');
};

exports.head = head;
