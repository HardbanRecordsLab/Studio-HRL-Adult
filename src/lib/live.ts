// Shared (browser + server) definitions for the live multistream.

export interface PlatformPreset {
  id: string;
  name: string;
}

/**
 * Platforms a profile can broadcast to. Every platform hands out its own RTMP URL and stream key
 * in its broadcast settings; we deliberately do not hard-code those URLs here.
 */
export const PLATFORM_PRESETS: PlatformPreset[] = [
  { id: 'chaturbate', name: 'Chaturbate' },
  { id: 'stripchat', name: 'Stripchat' },
  { id: 'bongacams', name: 'BongaCams' },
  { id: 'myfreecams', name: 'MyFreeCams' },
  { id: 'cam4', name: 'Cam4' },
  { id: 'camsoda', name: 'CamSoda' },
  { id: 'flirt4free', name: 'Flirt4Free' },
  { id: 'streamate', name: 'Streamate' },
  { id: 'livejasmin', name: 'LiveJasmin' },
  { id: 'imlive', name: 'ImLive' },
  { id: 'custom', name: 'Custom RTMP' },
];

export const isPlatformId = (id: string) => PLATFORM_PRESETS.some((p) => p.id === id);

export type WorkerState = 'connecting' | 'live' | 'waiting_source' | 'error' | 'stopped';

export interface WorkerStatus {
  id: string;
  name: string;
  kind: 'internal' | 'external';
  state: WorkerState;
  lastError: string | null;
  restarts: number;
  bitrate: string | null;
  fps: number | null;
  frames: number;
  since: string;
}

export interface DestinationDto {
  id: string;
  platform: string;
  label: string;
  rtmpUrl: string;
  keyHint: string | null;
  profileUrl: string | null;
  enabled: boolean;
}

/** Name of the public HLS path (public/<name>) for a profile handle. */
export function publicNameFor(handle: string): string {
  const slug = handle
    .toLowerCase()
    .replace(/^@/, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^[^a-z0-9]+/, '')
    .slice(0, 64);
  return slug || 'live';
}

const trimSlash = (value: string) => value.replace(/\/+$/, '');

/** Public endpoints of the live stack, derived from NEXT_PUBLIC_LIVE_URL (e.g. https://live.example.com). */
export function liveEndpoints(ingestKey?: string | null, handle?: string) {
  const base = trimSlash(process.env.NEXT_PUBLIC_LIVE_URL || '');
  if (!base) return null;
  let host = '';
  try {
    host = new URL(base).hostname;
  } catch {
    return null;
  }
  const rtmpBase = trimSlash(process.env.NEXT_PUBLIC_LIVE_RTMP_URL || `rtmp://${host}:1935/live`);
  return {
    baseUrl: base,
    rtmpUrl: rtmpBase,
    whipUrl: ingestKey ? `${base}/live/${ingestKey}/whip` : null,
    hlsUrl: handle ? `${base}/public/${publicNameFor(handle)}/index.m3u8` : null,
  };
}

/** Validates an RTMP(S) URL typed into the admin form. Returns an error message or null. */
export function validateRtmpUrl(value: string): string | null {
  if (!value || value.length > 512 || /\s/.test(value)) return 'Invalid URL';
  try {
    const url = new URL(value);
    if (url.protocol !== 'rtmp:' && url.protocol !== 'rtmps:') return 'URL must start with rtmp:// or rtmps://';
  } catch {
    return 'Invalid URL';
  }
  return null;
}

/** Validates an optional public profile link. Returns an error message or null. */
export function validateProfileUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return 'Profile link must be http(s)';
  } catch {
    return 'Invalid profile link';
  }
  return null;
}
