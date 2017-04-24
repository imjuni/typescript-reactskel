export function logger(level: string = 'log') {
  if (process.env.NODE_ENV === 'develop') {
    return console[level];
  } else {
    return () => {};
  }
}
