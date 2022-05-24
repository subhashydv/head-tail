const tail = (content, count) => {
  const lines = content.split('\n');
  const reqLine = lines.slice(lines.length - count);
  return reqLine.join('\n');
};

exports.tail = tail;
