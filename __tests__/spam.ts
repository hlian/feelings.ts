import { isSpam } from '../server/batteries';

test('url bbcode is spam', () => {
  const spam = 'research paper <a href=\"http://example.com\">research paper help sites</a> subject for research paper [url=http://example.com]research paper[/url]';
  expect(isSpam(spam)).toBe(true);
});

test('windows newline character is spam', () => {
  const spam = 'hey\r\nthere';
  expect(isSpam(spam)).toBe(true);
});
