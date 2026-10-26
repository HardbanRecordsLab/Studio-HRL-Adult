// The profile model shared by every creator page (/profile/<handle>).
// Every field except the basics is optional: the template only renders the sections a profile has data for,
// so one template serves a bare-bones profile and the fully loaded demo (/profile/demo) alike.

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export const DAY_KEYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export interface ScheduleSlot {
  day: DayKey;
  /** 24h "HH:MM" in the profile's timezone. */
  from: string;
  to: string;
  /** Platform id the show happens on (informational). */
  platform?: string;
  note?: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating?: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface VideoItem {
  title: string;
  url: string;
  poster?: string;
  duration?: string;
}

export interface MilestoneItem {
  year: string | number;
  title: string;
  desc?: string;
}

export interface PlatformLink {
  username?: string;
  url?: string;
}

export interface ProfileStats {
  subscribers?: string | number;
  content?: string | number;
  satisfaction?: string | number;
  sessions?: string | number;
}

export interface ProfileModel {
  id: string;
  name: string;
  handle: string;
  bio: string;
  type?: string;
  height?: string | number;
  weight?: string | number;
  measurements?: string;
  avatar?: string;
  heroImage?: string;
  characteristics?: string;
  stats?: ProfileStats;
  /** { chaturbate: { username, url }, … } - where else to find the creator. */
  platforms?: Record<string, PlatformLink>;
  liveSchedule?: ScheduleSlot[];
  testimonials?: Testimonial[];
  profileData?: {
    likes?: string[];
    boundaries?: string[];
    bestInMe?: string[];
    whyWatchMe?: string[];
    gallery?: string[];
    videos?: VideoItem[];
    /** Professional profile: experience and specialisations. */
    experience?: string;
    /** Career highlights, newest first or in any order (shown newest first). */
    milestones?: MilestoneItem[];
    age?: string | number;
    nationality?: string;
    faq?: FaqItem[];
    tags?: string[];
    badges?: string[];
    languages?: string[];
    location?: string;
    timezone?: string;
    size?: string;
  };
}

// ---------------------------------------------------------------------------
// Live schedule
// ---------------------------------------------------------------------------

const WEEK = 7 * 1440;
const SHORT_DAYS: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return (h % 24) * 60 + (m || 0);
};

/** Minutes since Monday 00:00 in the given timezone. */
function minutesIntoWeek(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return (SHORT_DAYS[get('weekday')] ?? 0) * 1440 + (Number(get('hour')) % 24) * 60 + Number(get('minute'));
}

export interface NextSlot {
  slot: ScheduleSlot;
  /** The show is on right now. */
  live: boolean;
  /** Minutes until it starts (0 when live). */
  startsInMinutes: number;
}

/** The show that is on now, or else the next one to start. Handles shows that run past midnight. */
export function nextSlot(schedule: ScheduleSlot[] | undefined, timeZone = 'Europe/Warsaw', now = new Date()): NextSlot | null {
  if (!schedule?.length) return null;
  const nowMin = minutesIntoWeek(now, timeZone);
  let best: NextSlot | null = null;

  for (const slot of schedule) {
    const day = DAY_KEYS.indexOf(slot.day);
    if (day < 0) continue;
    const start = day * 1440 + toMinutes(slot.from);
    let length = toMinutes(slot.to) - toMinutes(slot.from);
    if (length <= 0) length += 1440;

    const sinceStart = (nowMin - start + WEEK) % WEEK;
    if (sinceStart < length) return { slot, live: true, startsInMinutes: 0 };

    const startsIn = (start - nowMin + WEEK) % WEEK;
    if (!best || startsIn < best.startsInMinutes) best = { slot, live: false, startsInMinutes: startsIn };
  }
  return best;
}

const DAY_BY_INDEX = DAY_KEYS;

/** Day + "HH:MM" of an instant as seen in a timezone. */
function zonedParts(instant: Date, timeZone: string): { day: DayKey; time: string } {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return {
    day: DAY_BY_INDEX[SHORT_DAYS[get('weekday')] ?? 0],
    time: `${String(Number(get('hour')) % 24).padStart(2, '0')}:${get('minute').padStart(2, '0')}`,
  };
}

/**
 * Re-expresses a weekly slot (given in `fromTz`) in another timezone, e.g. the viewer's.
 * Uses the next occurrence of the slot, so a change of daylight-saving time between now and then
 * can shift the result by an hour.
 */
export function convertSlot(slot: ScheduleSlot, fromTz: string, toTz: string, now = new Date()): { day: DayKey; from: string; to: string } {
  const day = DAY_KEYS.indexOf(slot.day);
  const start = day * 1440 + toMinutes(slot.from);
  const untilStart = (((start - minutesIntoWeek(now, fromTz)) % WEEK) + WEEK) % WEEK;
  let length = toMinutes(slot.to) - toMinutes(slot.from);
  if (length <= 0) length += 1440;

  const startInstant = new Date(Math.floor(now.getTime() / 60000) * 60000 + untilStart * 60000);
  const endInstant = new Date(startInstant.getTime() + length * 60000);
  const from = zonedParts(startInstant, toTz);
  return { day: from.day, from: from.time, to: zonedParts(endInstant, toTz).time };
}

/** Average star rating (default 5 for unrated entries) rounded to one decimal. */
export function averageRating(reviews: Testimonial[] | undefined): { average: number; count: number } | null {
  if (!reviews?.length) return null;
  const total = reviews.reduce((sum, r) => sum + (r.rating ?? 5), 0);
  return { average: Math.round((total / reviews.length) * 10) / 10, count: reviews.length };
}

/** "2 h 15 min" style countdown, locale-neutral. */
export function formatCountdown(minutes: number): string {
  const d = Math.floor(minutes / 1440);
  const h = Math.floor((minutes % 1440) / 60);
  const m = minutes % 60;
  return [d ? `${d} d` : '', h ? `${h} h` : '', !d && m ? `${m} min` : ''].filter(Boolean).join(' ') || '0 min';
}
