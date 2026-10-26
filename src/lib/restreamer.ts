import type { WorkerStatus } from '@/lib/live';

// Server-side client for services/restreamer (the fan-out control API).

export interface RestreamerDestination {
  id: string;
  name: string;
  url: string;
  streamKey: string;
}

export interface RestreamerSessionStatus {
  running: boolean;
  publicName?: string;
  startedAt?: string;
  workers: WorkerStatus[];
}

export class RestreamerError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

const baseUrl = () => (process.env.RESTREAMER_URL || '').replace(/\/+$/, '');

export const restreamerConfigured = () => Boolean(baseUrl() && process.env.RESTREAMER_TOKEN);

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  if (!restreamerConfigured()) {
    throw new RestreamerError('RESTREAMER_URL and RESTREAMER_TOKEN are not configured', 503);
  }
  let res: Response;
  try {
    res = await fetch(`${baseUrl()}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${process.env.RESTREAMER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error: any) {
    throw new RestreamerError(`Restreamer unreachable: ${error?.message || 'network error'}`, 502);
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new RestreamerError(json?.error || `Restreamer returned ${res.status}`, res.status === 401 ? 502 : res.status);
  }
  return json as T;
}

export const restreamer = {
  registerIngest: (key: string, publicName: string) =>
    call<{ ok: boolean }>('PUT', `/v1/ingest/${encodeURIComponent(key)}`, { publicName }),
  removeIngest: (key: string) => call<{ ok: boolean }>('DELETE', `/v1/ingest/${encodeURIComponent(key)}`),
  /** Starts the session, or makes the running one match `destinations`. */
  sync: (key: string, destinations: RestreamerDestination[]) =>
    call<RestreamerSessionStatus>('PUT', `/v1/sessions/${encodeURIComponent(key)}`, { destinations }),
  stop: (key: string) => call<{ ok: boolean; wasRunning: boolean }>('DELETE', `/v1/sessions/${encodeURIComponent(key)}`),
  status: (key: string) => call<RestreamerSessionStatus>('GET', `/v1/sessions/${encodeURIComponent(key)}`),
};
