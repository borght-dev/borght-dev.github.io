// Pure helpers — tested directly. DOM runtime at the bottom.

export function formatUptime(sinceISO, now = new Date()) {
  const since = new Date(sinceISO + 'T00:00:00Z');
  let diffMs = now.getTime() - since.getTime();
  if (diffMs <= 0) return '0d 0h';

  const HOUR = 3600 * 1000;
  const DAY = 24 * HOUR;
  const YEAR = 365 * DAY;

  const years = Math.floor(diffMs / YEAR);
  diffMs -= years * YEAR;
  const days = Math.floor(diffMs / DAY);
  diffMs -= days * DAY;
  const hours = Math.floor(diffMs / HOUR);

  return years > 0
    ? `${years}y ${days}d ${hours}h`
    : `${days}d ${hours}h`;
}
