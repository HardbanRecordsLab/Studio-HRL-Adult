import { averageRating, convertSlot, formatCountdown, nextSlot, ScheduleSlot } from '@/lib/profileModel';

// 2026-03-04 is a Wednesday. Europe/Warsaw is UTC+1 in early March (before DST on the 29th).
const at = (iso: string) => new Date(iso);

const schedule: ScheduleSlot[] = [
  { day: 'wed', from: '20:00', to: '23:00' },
  { day: 'fri', from: '22:00', to: '02:00' }, // runs past midnight into Saturday
  { day: 'sun', from: '15:00', to: '18:00' },
];

describe('nextSlot', () => {
  it('returns null without a schedule', () => {
    expect(nextSlot(undefined)).toBeNull();
    expect(nextSlot([])).toBeNull();
  });

  it('finds the next show and the minutes until it starts', () => {
    // Wed 18:00 Warsaw -> Wed 20:00 show in 120 min
    const result = nextSlot(schedule, 'Europe/Warsaw', at('2026-03-04T17:00:00Z'));
    expect(result).toMatchObject({ live: false, startsInMinutes: 120, slot: { day: 'wed' } });
  });

  it('reports a show that is on right now', () => {
    const result = nextSlot(schedule, 'Europe/Warsaw', at('2026-03-04T20:30:00Z')); // Wed 21:30 Warsaw
    expect(result).toMatchObject({ live: true, startsInMinutes: 0, slot: { day: 'wed' } });
  });

  it('treats a show that crosses midnight as live after midnight', () => {
    const result = nextSlot(schedule, 'Europe/Warsaw', at('2026-03-06T23:30:00Z')); // Sat 00:30 Warsaw
    expect(result).toMatchObject({ live: true, slot: { day: 'fri' } });
  });

  it('wraps around the end of the week', () => {
    const result = nextSlot(schedule, 'Europe/Warsaw', at('2026-03-08T18:00:00Z')); // Sun 19:00 Warsaw, after the Sunday show
    expect(result).toMatchObject({ live: false, slot: { day: 'wed' } });
    expect(result!.startsInMinutes).toBe(3 * 1440 + 60); // Wed 20:00 is 3 days and 1 h away
  });

  it('uses the profile timezone, not the viewer\'s', () => {
    // 19:30 UTC = 20:30 Warsaw (live) but 14:30 New York (not live)
    expect(nextSlot(schedule, 'Europe/Warsaw', at('2026-03-04T19:30:00Z'))!.live).toBe(true);
    expect(nextSlot(schedule, 'America/New_York', at('2026-03-04T19:30:00Z'))!.live).toBe(false);
  });
});

describe('formatCountdown', () => {
  it.each([
    [0, '0 min'],
    [45, '45 min'],
    [135, '2 h 15 min'],
    [1440 + 120, '1 d 2 h'],
  ])('%i -> %s', (minutes, text) => {
    expect(formatCountdown(minutes)).toBe(text);
  });
});

describe('convertSlot', () => {
  const now = at('2026-03-04T10:00:00Z'); // Wednesday, before any DST change in March

  it("shows the same show in the viewer's timezone", () => {
    // Wed 20:00-23:00 Warsaw (UTC+1) = 14:00-17:00 in New York (UTC-5)
    expect(convertSlot({ day: 'wed', from: '20:00', to: '23:00' }, 'Europe/Warsaw', 'America/New_York', now)).toEqual({ day: 'wed', from: '14:00', to: '17:00' });
  });

  it('moves the weekday when the offset crosses midnight and keeps the length', () => {
    // Fri 22:00-02:00 Warsaw = Sat 06:00-10:00 in Tokyo (UTC+9)
    expect(convertSlot({ day: 'fri', from: '22:00', to: '02:00' }, 'Europe/Warsaw', 'Asia/Tokyo', now)).toEqual({ day: 'sat', from: '06:00', to: '10:00' });
  });

  it('is the identity in the same timezone', () => {
    const slot: ScheduleSlot = { day: 'sun', from: '15:00', to: '18:00' };
    expect(convertSlot(slot, 'Europe/Warsaw', 'Europe/Warsaw', now)).toEqual({ day: 'sun', from: '15:00', to: '18:00' });
  });
});

describe('averageRating', () => {
  it('is null without reviews', () => {
    expect(averageRating(undefined)).toBeNull();
    expect(averageRating([])).toBeNull();
  });

  it('averages to one decimal and counts unrated reviews as 5', () => {
    expect(averageRating([{ name: 'a', text: '', rating: 5 }, { name: 'b', text: '', rating: 4 }, { name: 'c', text: '' }])).toEqual({ average: 4.7, count: 3 });
  });
});
