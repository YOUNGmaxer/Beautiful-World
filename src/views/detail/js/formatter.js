function axisLabelFormatter(value) {
  value = value.toString();
  const MAX_LENGTH = 4;
  if (value.length > MAX_LENGTH) {
    return `${value.slice(0, MAX_LENGTH)}...`;
  }
  return value;
}

export {
  axisLabelFormatter
};
