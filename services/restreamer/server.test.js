'use strict';

// Run with:  node --test server.test.js   (from services/restreamer, or `npm test` there)
// Exercises the control API and the MediaMTX auth callback. ffmpeg is deliberately replaced by a
// missing binary so the test needs neither ffmpeg nor MediaMTX.

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const PORT = 18080 + Math.floor(Math.random() * 500);
const TOKEN = 'unit-test-token-0123456789';
const KEY = 'unitTestKey_0123456789abcdef';
const SECRET_STREAM_KEY = 'super-secret-platform-key';
let server;
let dataDir;

const call = async (method, url, body, token = TOKEN) => {
  const res = await fetch(`http://127.0.0.1:${PORT}${url}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: res.status, json: await res.json().catch(() => ({})) };
};

before(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'restreamer-'));
  server = spawn('node', [path.join(__dirname, 'server.js')], {
    env: { ...process.env, PORT: String(PORT), RESTREAMER_TOKEN: TOKEN, DATA_DIR: dataDir, FFMPEG_PATH: 'definitely-not-ffmpeg' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.output = '';
  server.stdout.on('data', (d) => (server.output += d));
  server.stderr.on('data', (d) => (server.output += d));
  for (let i = 0; i < 50 && !server.output.includes('listening'); i++) await new Promise((r) => setTimeout(r, 100));
  assert.ok(server.output.includes('listening'), `server did not start: ${server.output}`);
});

after(() => {
  server.kill();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test('control API requires the bearer token', async () => {
  assert.equal((await call('GET', '/v1/health', undefined, null)).status, 401);
  assert.equal((await call('GET', '/v1/health', undefined, 'wrong-token-wrong-token')).status, 401);
  assert.equal((await call('GET', '/v1/health')).status, 200);
});

test('ingest keys are validated and registered', async () => {
  assert.equal((await call('PUT', '/v1/ingest/short', { publicName: 'luna' })).status, 400);
  assert.equal((await call('PUT', `/v1/ingest/${KEY}`, { publicName: 'Bad Name!' })).status, 400);
  assert.equal((await call('PUT', `/v1/ingest/${KEY}`, { publicName: 'luna' })).status, 200);
});

test('MediaMTX auth: only registered keys publish; read is open; our relay needs the password', async () => {
  const auth = (body) => call('POST', '/mediamtx/auth', body, null).then((r) => r.status);
  assert.equal(await auth({ action: 'publish', path: `live/${KEY}` }), 200);
  assert.equal(await auth({ action: 'publish', path: 'live/someoneelseskey000000000' }), 401);
  assert.equal(await auth({ action: 'publish', path: 'other/path' }), 401);
  assert.equal(await auth({ action: 'publish', path: 'public/luna' }), 401);
  assert.equal(await auth({ action: 'publish', path: 'public/luna', user: 'restreamer', password: 'nope' }), 401);
  assert.equal(await auth({ action: 'publish', path: 'public/luna', user: 'restreamer', password: TOKEN }), 200);
  assert.equal(await auth({ action: 'read', path: 'public/luna' }), 200);
});

test('session requests are validated', async () => {
  const put = (destinations, key = KEY) => call('PUT', `/v1/sessions/${key}`, { destinations });
  const ok = { id: 'cb', name: 'CB', url: 'rtmp://example.com/live', streamKey: 'abc' };

  assert.equal((await put([ok], 'unregisteredKey_0123456789')).status, 409);
  assert.equal((await put([{ ...ok, url: 'http://example.com' }])).status, 400);
  assert.equal((await put([{ ...ok, url: 'rtmp://127.0.0.1/live' }])).status, 400); // private host
  assert.equal((await put([{ ...ok, url: 'rtmp://192.168.1.5/live' }])).status, 400);
  assert.equal((await put([{ ...ok, id: 'hrl' }])).status, 400); // reserved
  assert.equal((await put([ok, ok])).status, 400); // duplicate id
  assert.equal((await put([{ ...ok, streamKey: 'has space' }])).status, 400);
  assert.equal((await put(Array.from({ length: 13 }, (_, i) => ({ ...ok, id: `d${i}` })))).status, 400);
});

test('a session starts, never exposes stream keys, can be edited and stopped', async () => {
  const dest = { id: 'cb', name: 'Chaturbate', url: 'rtmp://platform.example.com/live', streamKey: SECRET_STREAM_KEY };

  const started = await call('PUT', `/v1/sessions/${KEY}`, { destinations: [dest] });
  assert.equal(started.status, 200);
  assert.deepEqual(started.json.workers.map((w) => w.id).sort(), ['cb', 'hrl']);

  await new Promise((r) => setTimeout(r, 400)); // let the (missing) ffmpeg fail
  const status = await call('GET', `/v1/sessions/${KEY}`);
  assert.equal(status.json.running, true);
  const dump = JSON.stringify(status.json) + server.output;
  assert.ok(!dump.includes(SECRET_STREAM_KEY), 'stream key leaked');
  assert.ok(!dump.includes(TOKEN), 'token leaked');
  assert.ok(status.json.workers.every((w) => w.state === 'error' && /cannot run ffmpeg/.test(w.lastError)));

  // Dropping a destination keeps the session and the internal relay.
  const edited = await call('PUT', `/v1/sessions/${KEY}`, { destinations: [] });
  assert.deepEqual(edited.json.workers.map((w) => w.id), ['hrl']);

  const stopped = await call('DELETE', `/v1/sessions/${KEY}`);
  assert.deepEqual(stopped.json, { ok: true, wasRunning: true });
  assert.equal((await call('GET', `/v1/sessions/${KEY}`)).json.running, false);
});

test('removing an ingest key revokes publishing', async () => {
  assert.equal((await call('DELETE', `/v1/ingest/${KEY}`)).status, 200);
  assert.equal((await call('POST', '/mediamtx/auth', { action: 'publish', path: `live/${KEY}` }, null)).status, 401);
});
