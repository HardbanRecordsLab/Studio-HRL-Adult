import { liveEndpoints, publicNameFor, validateProfileUrl, validateRtmpUrl } from '@/lib/live';

describe('publicNameFor', () => {
  it.each([
    ['@Luna_Star', 'luna_star'],
    ['Anna & Marek', 'anna-marek'],
    ['---weird', 'weird'],
    ['', 'live'],
    ['Zażółć', 'za-'],
  ])('%s -> %s', (input, expected) => {
    expect(publicNameFor(input)).toBe(expected);
  });

  it('always yields something the restreamer accepts', () => {
    const accepted = /^[a-z0-9][a-z0-9_-]{0,63}$/;
    for (const handle of ['@A', 'x'.repeat(200), 'Ünï-cödé', '__init__']) expect(publicNameFor(handle)).toMatch(accepted);
  });
});

describe('validators', () => {
  it('accepts only rtmp(s) destinations', () => {
    expect(validateRtmpUrl('rtmp://live.example.com/app')).toBeNull();
    expect(validateRtmpUrl('rtmps://live.example.com:443/app')).toBeNull();
    expect(validateRtmpUrl('http://example.com')).not.toBeNull();
    expect(validateRtmpUrl('rtmp://a b')).not.toBeNull();
    expect(validateRtmpUrl('')).not.toBeNull();
  });

  it('accepts only http(s) profile links, and allows empty', () => {
    expect(validateProfileUrl('')).toBeNull();
    expect(validateProfileUrl('https://chaturbate.com/someone')).toBeNull();
    expect(validateProfileUrl('javascript:alert(1)')).not.toBeNull();
  });
});

describe('liveEndpoints', () => {
  const original = { ...process.env };
  afterEach(() => {
    process.env = { ...original };
  });

  it('is null until NEXT_PUBLIC_LIVE_URL is set', () => {
    delete process.env.NEXT_PUBLIC_LIVE_URL;
    expect(liveEndpoints('key', 'luna')).toBeNull();
  });

  it('derives WHIP, HLS and RTMP URLs', () => {
    process.env.NEXT_PUBLIC_LIVE_URL = 'https://live.example.com/';
    expect(liveEndpoints('K', '@Luna')).toEqual({
      baseUrl: 'https://live.example.com',
      rtmpUrl: 'rtmp://live.example.com:1935/live',
      whipUrl: 'https://live.example.com/live/K/whip',
      hlsUrl: 'https://live.example.com/public/luna/index.m3u8',
    });
  });
});
