import React, { useEffect, useMemo, useState } from 'react';
import { DAY_KEYS, DayKey, NextSlot, ScheduleSlot, convertSlot } from '@/lib/profileModel';

interface ScheduleCardProps {
  slots: ScheduleSlot[];
  /** Timezone the slots are defined in (the studio's). */
  timezone: string;
  upcoming: NextSlot | null;
  now: Date;
  dayLabels: Record<DayKey, string>;
  platformName: (id?: string) => string;
  labels: { title: string; studioTime: string; myTime: string; note: string };
}

/** Weekly live schedule; viewers can switch from the studio's timezone to their own. */
const ScheduleCard: React.FC<ScheduleCardProps> = ({ slots, timezone, upcoming, now, dayLabels, platformName, labels }) => {
  const [mode, setMode] = useState<'studio' | 'mine'>('studio');
  const [viewerTz, setViewerTz] = useState<string | null>(null);

  // Read after mount: the server does not know the visitor's timezone.
  useEffect(() => {
    setViewerTz(Intl.DateTimeFormat().resolvedOptions().timeZone || null);
  }, []);

  const canConvert = Boolean(viewerTz) && viewerTz !== timezone;
  const shownTz = mode === 'mine' && canConvert ? (viewerTz as string) : timezone;

  const byDay = useMemo(() => {
    const groups = new Map<DayKey, Array<{ slot: ScheduleSlot; from: string; to: string }>>();
    for (const slot of slots) {
      const shown = mode === 'mine' && canConvert ? convertSlot(slot, timezone, viewerTz as string, now) : { day: slot.day, from: slot.from, to: slot.to };
      const list = groups.get(shown.day) ?? [];
      list.push({ slot, from: shown.from, to: shown.to });
      groups.set(shown.day, list);
    }
    groups.forEach((list) => list.sort((a, b) => a.from.localeCompare(b.from)));
    return groups;
  }, [slots, mode, canConvert, timezone, viewerTz, now]);

  const todayKey = useMemo(() => {
    const weekday = new Intl.DateTimeFormat('en-US', { timeZone: shownTz, weekday: 'short' }).format(now);
    return DAY_KEYS[['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(weekday)];
  }, [shownTz, now]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 md:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      {canConvert && (
        <div className="flex justify-end mb-6">
          <div role="group" aria-label={labels.title} className="flex border border-white/15 text-[10px] uppercase tracking-[0.2em]">
            {(['studio', 'mine'] as const).map((value) => (
              <button
                key={value}
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`px-3 py-1.5 transition-colors ${mode === value ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {value === 'studio' ? labels.studioTime : labels.myTime}
              </button>
            ))}
          </div>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
        {DAY_KEYS.map((day) => {
          const entries = byDay.get(day) ?? [];
          return (
            <li
              key={day}
              className={`flex items-start justify-between gap-3 px-4 py-3 border text-sm ${
                day === todayKey ? 'border-purple-400/40 bg-purple-500/5' : 'border-white/5'
              } ${entries.length ? '' : 'opacity-40'}`}
            >
              <span className={day === todayKey ? 'text-white font-medium' : 'text-gray-300'}>{dayLabels[day]}</span>
              <span className="text-right space-y-1">
                {entries.length === 0 && <span className="text-gray-600">—</span>}
                {entries.map(({ slot, from, to }) => {
                  const isNext = upcoming?.slot === slot;
                  return (
                    <span key={slot.from + slot.day} className={`flex items-center justify-end gap-2 ${isNext ? 'text-white' : 'text-gray-300'}`}>
                      {slot.platform && <span className="text-[9px] uppercase tracking-widest text-gray-500">{platformName(slot.platform)}</span>}
                      <span className="font-mono">{from} – {to}</span>
                      {isNext && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
                    </span>
                  );
                })}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[11px] text-gray-500">{labels.note} {shownTz.replace(/_/g, ' ')}</p>
    </div>
  );
};

export default ScheduleCard;
