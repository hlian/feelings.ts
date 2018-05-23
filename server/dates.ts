export { parse } from 'date-fns';
import * as isDateFriday from 'date-fns/is_friday';

export const isFriday = (): boolean => {
  return isDateFriday(new Date());
};
