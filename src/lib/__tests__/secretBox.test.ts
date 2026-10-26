import { decryptSecret, encryptSecret, keyHint } from '@/lib/secretBox';

describe('secretBox', () => {
  const original = { ...process.env };
  beforeEach(() => {
    process.env.STREAM_KEY_SECRET = 'a-long-test-secret-value';
  });
  afterAll(() => {
    process.env = original;
  });

  it('round-trips a stream key', () => {
    const stored = encryptSecret('live_abc123XYZ');
    expect(stored.startsWith('v1:')).toBe(true);
    expect(stored).not.toContain('live_abc123XYZ');
    expect(decryptSecret(stored)).toBe('live_abc123XYZ');
  });

  it('uses a fresh IV every time', () => {
    expect(encryptSecret('same')).not.toBe(encryptSecret('same'));
  });

  it('rejects tampered ciphertext', () => {
    const [v, iv, tag, ct] = encryptSecret('secret').split(':');
    const flipped = Buffer.from(ct, 'base64url');
    flipped[0] ^= 1;
    expect(() => decryptSecret([v, iv, tag, flipped.toString('base64url')].join(':'))).toThrow();
  });

  it('cannot be decrypted with a different secret', () => {
    const stored = encryptSecret('secret');
    process.env.STREAM_KEY_SECRET = 'another-secret-entirely';
    expect(() => decryptSecret(stored)).toThrow();
  });

  it('falls back to JWT_SECRET and fails loudly with no secret at all', () => {
    delete process.env.STREAM_KEY_SECRET;
    process.env.JWT_SECRET = 'jwt-secret-for-test';
    expect(decryptSecret(encryptSecret('x'))).toBe('x');
    delete process.env.JWT_SECRET;
    expect(() => encryptSecret('x')).toThrow(/STREAM_KEY_SECRET/);
  });

  it('only reveals the tail of a key as a hint', () => {
    expect(keyHint('abcdefghij')).toBe('••••ghij');
    expect(keyHint('abc')).toBe('••••');
  });
});
