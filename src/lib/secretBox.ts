import crypto from 'crypto';

/**
 * Encrypts secrets that must be recoverable (platform stream keys) before they reach the database.
 * AES-256-GCM, key derived from STREAM_KEY_SECRET (falls back to JWT_SECRET so existing setups work).
 * Stored format:  v1:<iv>:<auth tag>:<ciphertext>  (all base64url).
 */

function getKey(): Buffer {
  const secret = process.env.STREAM_KEY_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('STREAM_KEY_SECRET (or JWT_SECRET) must be set to store stream keys');
  }
  return Buffer.from(crypto.hkdfSync('sha256', secret, 'hrl-live', 'stream-keys', 32));
}

export function encryptSecret(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return ['v1', iv, tag, ciphertext].map((part) => (typeof part === 'string' ? part : part.toString('base64url'))).join(':');
}

export function decryptSecret(stored: string): string {
  const [version, iv, tag, ciphertext] = stored.split(':');
  if (version !== 'v1' || !iv || !tag || !ciphertext) {
    throw new Error('Unsupported secret format');
  }
  const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, 'base64url')), decipher.final()]).toString('utf8');
}

/** Short, non-sensitive hint so the UI can show which key is stored (e.g. "••••a1b2"). */
export function keyHint(secret: string): string {
  return secret.length <= 6 ? '••••' : `••••${secret.slice(-4)}`;
}
