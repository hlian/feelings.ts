export const isSpam = ({ ooga: text, text: spamCatcher }: { ooga: string; text: string }) => {
  if (spamCatcher) {
    return true;
  }
  if (text.indexOf('[url=') !== -1) {
    return true;
  }
  if (text.indexOf('\r\n') !== -1) {
    return true;
  }
  return false;
};
