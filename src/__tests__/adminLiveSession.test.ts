import type { NextApiRequest, NextApiResponse } from 'next';

// The database and the restreamer are mocked: this checks the session logic, not the infrastructure.
jest.mock('@/lib/prisma', () => {
  const client = {
    partner: { findUnique: jest.fn() },
    liveChannel: { findUnique: jest.fn(), create: jest.fn() },
    liveSession: { findFirst: jest.fn(), create: jest.fn(), update: jest.fn(), updateMany: jest.fn() },
    liveDestination: { findMany: jest.fn() },
  };
  return { __esModule: true, default: client, prisma: client };
});
jest.mock('@/lib/adminSession', () => ({ requireAdminSession: jest.fn(() => ({ email: 'admin@test.dev', role: 'admin' })) }));
jest.mock('@/lib/adminLog', () => ({ logAdminAction: jest.fn() }));
jest.mock('@/lib/secretBox', () => ({ decryptSecret: (s: string) => `decrypted(${s})`, encryptSecret: jest.fn(), keyHint: jest.fn() }));
jest.mock('@/lib/restreamer', () => {
  class RestreamerError extends Error {
    constructor(message: string, public status: number) {
      super(message);
    }
  }
  return {
    RestreamerError,
    restreamerConfigured: jest.fn(() => true),
    restreamer: {
      registerIngest: jest.fn().mockResolvedValue({ ok: true }),
      sync: jest.fn().mockResolvedValue({ running: true, workers: [] }),
      stop: jest.fn().mockResolvedValue({ ok: true, wasRunning: true }),
      status: jest.fn().mockResolvedValue({ running: true, workers: [] }),
    },
  };
});

import handler from '@/pages/api/admin/live/session';
import { restreamer, restreamerConfigured } from '@/lib/restreamer';

const prisma = jest.requireMock('@/lib/prisma').default;

const KEY = 'k'.repeat(32);

function call(body: unknown, method = 'POST') {
  const req = { method, body, headers: {}, socket: { remoteAddress: '127.0.0.1' }, query: {} } as unknown as NextApiRequest;
  const out: { status: number; json: any } = { status: 0, json: undefined };
  const res = {
    status(code: number) {
      out.status = code;
      return this;
    },
    json(payload: unknown) {
      out.json = payload;
      return this;
    },
  } as unknown as NextApiResponse;
  return handler(req, res).then(() => out);
}

beforeEach(() => {
  jest.clearAllMocks();
  (restreamerConfigured as jest.Mock).mockReturnValue(true);
  prisma.partner.findUnique.mockResolvedValue({ id: 'p1', name: 'Luna', handle: 'luna' });
  prisma.liveChannel.findUnique.mockResolvedValue({ partnerId: 'p1', ingestKey: KEY });
  prisma.liveSession.findFirst.mockResolvedValue(null);
  prisma.liveSession.create.mockResolvedValue({});
  prisma.liveDestination.findMany.mockResolvedValue([]);
});

describe('POST /api/admin/live/session', () => {
  it('rejects non-POST and malformed requests', async () => {
    expect((await call({}, 'GET')).status).toBe(405);
    expect((await call({ partnerId: 'p1', action: 'explode' })).status).toBe(400);
    expect((await call({ action: 'start' })).status).toBe(400);
  });

  it('reports 503 when the live stack is not configured', async () => {
    (restreamerConfigured as jest.Mock).mockReturnValue(false);
    const out = await call({ partnerId: 'p1', action: 'start', destinationIds: [] });
    expect(out.status).toBe(503);
    expect(restreamer.sync).not.toHaveBeenCalled();
  });

  it('start sends decrypted destinations to the restreamer and records the session', async () => {
    prisma.liveDestination.findMany
      .mockResolvedValueOnce([{ id: 'd1', label: 'Chaturbate', rtmpUrl: 'rtmp://x/live', streamKeyEnc: 'ENC' }]) // restreamerDestinations
      .mockResolvedValue([]); // later overview lookups
    prisma.liveSession.findFirst.mockResolvedValueOnce(null).mockResolvedValue({ id: 's1', title: 'Hi', startedAt: new Date(), destinationIds: ['d1'] });

    const out = await call({ partnerId: 'p1', action: 'start', destinationIds: ['d1'], title: 'Hi' });

    expect(out.status).toBe(200);
    expect(restreamer.sync).toHaveBeenCalledWith(KEY, [{ id: 'd1', name: 'Chaturbate', url: 'rtmp://x/live', streamKey: 'decrypted(ENC)' }]);
    expect(prisma.liveSession.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ partnerId: 'p1', title: 'Hi', startedBy: 'admin@test.dev', destinationIds: ['d1'] }),
    });
  });

  it('refuses destinations that are disabled or belong to another profile', async () => {
    prisma.liveDestination.findMany.mockResolvedValueOnce([]); // none of the requested ids match
    const out = await call({ partnerId: 'p1', action: 'start', destinationIds: ['foreign'] });
    expect(out.status).toBe(400);
    expect(restreamer.sync).not.toHaveBeenCalled();
    expect(prisma.liveSession.create).not.toHaveBeenCalled();
  });

  it('start while already live updates the open session instead of creating another', async () => {
    prisma.liveSession.findFirst.mockResolvedValue({ id: 's1', title: null, startedAt: new Date(), destinationIds: [] });
    await call({ partnerId: 'p1', action: 'update', destinationIds: [] });
    expect(prisma.liveSession.create).not.toHaveBeenCalled();
    expect(prisma.liveSession.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 's1' } }));
  });

  it('stop halts the restreamer and ends open sessions', async () => {
    const out = await call({ partnerId: 'p1', action: 'stop' });
    expect(out.status).toBe(200);
    expect(restreamer.stop).toHaveBeenCalledWith(KEY);
    expect(prisma.liveSession.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { partnerId: 'p1', status: 'live' }, data: expect.objectContaining({ status: 'ended' }) }),
    );
  });

  it('returns 404 for an unknown profile and surfaces restreamer failures', async () => {
    prisma.partner.findUnique.mockResolvedValueOnce(null);
    expect((await call({ partnerId: 'nope', action: 'stop' })).status).toBe(404);

    const { RestreamerError } = jest.requireMock('@/lib/restreamer');
    (restreamer.stop as jest.Mock).mockRejectedValueOnce(new RestreamerError('Restreamer unreachable: boom', 502));
    const out = await call({ partnerId: 'p1', action: 'stop' });
    expect(out.status).toBe(502);
    expect(out.json.error).toMatch(/unreachable/);
  });
});
