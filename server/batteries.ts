export const isSpam = (x: string) => {
  if (x.indexOf('[url=') !== -1) {
    return true;
  }
  if (x.indexOf('\r\n') !== -1) {
    return true;
  }
  return false;
};
