import { DateTime } from 'luxon';

export const parse = (s: string): DateTime => {
  return DateTime.fromISO(s).setZone('America/New_York');
};

export const isFriday = (): boolean => utc().weekday === 5;

export const utc = (): DateTime => DateTime.fromObject({ zone: 'America/New_York' });
