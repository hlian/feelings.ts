import { parse } from '../server/dates';

it('must work', () => {
  const dt = parse('2019-07-13T00:32:09.950Z');
  expect(dt.weekday === 5);
});
