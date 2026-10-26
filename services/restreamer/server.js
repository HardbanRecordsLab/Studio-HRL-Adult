'use strict';

/**
 * HRL restreamer - control API for the live multistream.
 *
 * Flow: ONE camera feed is published to MediaMTX at  live/<ingestKey>  - from the browser
 * (WebRTC/WHIP, the admin "Live Studio" page) or from OBS (RTMP). For every active session
 * this service runs one ffmpeg process per destination that pulls that stream from MediaMTX
 * over RTSP and pushes it to the destination's RTMP(S) URL (video copied, audio re-encoded
 * to AAC because browsers send Opus). One extra "internal" worker republishes the stream
 * to MediaMTX under  public/<publicName>  - that is what our own /live/<handle> page
 * plays over HLS, so the ingest key is never exposed to viewers.
 *
 * No third-party npm dependencies; needs Node 18+ and an ffmpeg binary.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const PORT = Number(process.env.PORT || 8080);
const TOKEN = process.env.RESTREAMER_TOKEN || '';
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
// Where ffmpeg reaches MediaMTX from inside this deployment (not the public URL).
const MEDIA_RTMP = (process.env.MEDIAMTX_RTMP || 'rtmp://127.0.0.1:1935').replace(/\/$/, '');
const MEDIA_RTSP = (process.env.MEDIAMTX_RTSP || 'rtsp://127.0.0.1:8554').replace(/\/$/, '');
// `copy` passes the camera's H.264 through untouched (cheapest). Use `transcode` if a platform
// rejects the browser's keyframe interval; note that every destination then runs its own encoder.
const VIDEO_MODE = process.env.VIDEO_MODE === 'transcode' ? 'transcode' : 'copy';
const VIDEO_BITRATE = process.env.VIDEO_BITRATE || '4000k';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const ALLOW_PRIVATE = process.env.ALLOW_PRIVATE_DESTINATIONS === '1';
const MAX_DESTINATIONS = 12;
const MAX_BODY = 64 * 1024;
const INTERNAL_ID = 'hrl';

if (!TOKEN || TOKEN.length < 16) {
  console.error('RESTREAMER_TOKEN is required and must be at least 16 characters.');
  process.exit(1);
}

const log = (...args) => console.log(new Date().toISOString(), ...args);

// ---------------------------------------------------------------------------
// Ingest registry: which stream keys may publish to MediaMTX (persisted on disk).
// ---------------------------------------------------------------------------

const INGEST_FILE = path.join(DATA_DIR, 'ingest.json');
/** @type {Map<string, {publicName: string}>} */
const ingest = new Map();

function loadIngest() {
  try {
    const raw = JSON.parse(fs.readFileSync(INGEST_FILE, 'utf8'));
    for (const [key, value] of Object.entries(raw)) ingest.set(key, value);
    log(`loaded ${ingest.size} ingest key(s)`);
  } catch (err) {
    if (err.code !== 'ENOENT') log('could not read ingest registry:', err.message);
  }
}

function saveIngest() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${INGEST_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(Object.fromEntries(ingest)), { mode: 0o600 });
  fs.renameSync(tmp, INGEST_FILE);
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const KEY_RE = /^[A-Za-z0-9_-]{16,128}$/;
const NAME_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

function isPrivateHost(hostname) {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') || h === '::1' || h === '[::1]') return true;
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
}

function validateDestination(d) {
  if (!d || typeof d !== 'object') return 'destination must be an object';
  if (!ID_RE.test(String(d.id || ''))) return 'destination.id is invalid';
  if (d.id === INTERNAL_ID) return `destination.id "${INTERNAL_ID}" is reserved`;
  const url = String(d.url || '');
  if (url.length > 512 || /\s/.test(url)) return `destination ${d.id}: url is invalid`;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return `destination ${d.id}: url is not a valid URL`;
  }
  if (parsed.protocol !== 'rtmp:' && parsed.protocol !== 'rtmps:') return `destination ${d.id}: only rtmp:// and rtmps:// are allowed`;
  if (!ALLOW_PRIVATE && isPrivateHost(parsed.hostname)) return `destination ${d.id}: private/internal hosts are not allowed`;
  const streamKey = String(d.streamKey || '');
  if (streamKey.length > 512 || /\s/.test(streamKey)) return `destination ${d.id}: streamKey is invalid`;
  return null;
}

const fullOutputUrl = (d) => `${d.url.replace(/\/+$/, '')}${d.streamKey ? `/${d.streamKey}` : ''}`;

// ---------------------------------------------------------------------------
// Workers: one ffmpeg process per destination, restarted with backoff.
// ---------------------------------------------------------------------------

const VIDEO_ARGS = VIDEO_MODE === 'transcode'
  ? ['-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency', '-pix_fmt', 'yuv420p',
     '-b:v', VIDEO_BITRATE, '-maxrate', VIDEO_BITRATE, '-bufsize', VIDEO_BITRATE, '-g', '60']
  : ['-c:v', 'copy'];

class Worker {
  constructor(session, spec) {
    this.session = session;
    this.id = spec.id;
    this.name = spec.name || spec.id;
    this.internal = Boolean(spec.internal);
    this.output = spec.output;
    // Anything that must never leave this process (stream keys, passwords).
    this.secrets = spec.secrets.filter(Boolean);
    this.fingerprint = spec.fingerprint;
    this.state = 'connecting'; // connecting | live | waiting_source | error | stopped
    this.lastError = null;
    this.restarts = 0;
    this.bitrate = null;
    this.fps = null;
    this.frames = 0;
    this.since = Date.now();
    this.everLive = false;
    this.sourceProblem = false;
    this.backoff = 2000;
    this.proc = null;
    this.timer = null;
    this.stopped = false;
  }

  mask(text) {
    let out = String(text);
    for (const secret of this.secrets) out = out.split(secret).join('***');
    out = out.split(this.session.input).join('<ingest>');
    return out;
  }

  start() {
    if (this.stopped) return;
    const args = [
      '-hide_banner', '-nostdin', '-loglevel', 'warning',
      '-progress', 'pipe:1', '-stats_period', '2',
      '-rtsp_transport', 'tcp',
      '-i', this.session.input,
      '-map', '0:v:0', '-map', '0:a:0?',
      ...VIDEO_ARGS,
      '-c:a', 'aac', '-b:a', '160k', '-ar', '44100', '-ac', '2',
      '-f', 'flv',
      this.output,
    ];
    const startedAt = Date.now();
    this.frames = 0;
    this.bitrate = null;
    this.fps = null;
    this.proc = spawn(FFMPEG, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let outBuf = '';
    this.proc.stdout.on('data', (chunk) => {
      outBuf += chunk.toString();
      let nl;
      while ((nl = outBuf.indexOf('\n')) >= 0) {
        this.onProgressLine(outBuf.slice(0, nl).trim());
        outBuf = outBuf.slice(nl + 1);
      }
    });

    let errBuf = '';
    this.proc.stderr.on('data', (chunk) => {
      errBuf += chunk.toString();
      let nl;
      while ((nl = errBuf.indexOf('\n')) >= 0) {
        this.onErrorLine(errBuf.slice(0, nl).trim());
        errBuf = errBuf.slice(nl + 1);
      }
    });

    this.proc.on('error', (err) => {
      this.state = 'error';
      this.lastError = `cannot run ffmpeg: ${err.message}`;
    });

    this.proc.on('close', (code) => {
      this.proc = null;
      if (this.stopped) return;
      const ranFor = Date.now() - startedAt;
      if (this.state === 'live') {
        this.state = 'error';
        this.lastError = this.lastError || `ffmpeg exited (code ${code})`;
      } else {
        this.state = this.sourceProblem ? 'waiting_source' : 'error';
      }
      this.restarts += 1;
      if (ranFor > 30000) this.backoff = 2000;
      const delay = this.backoff;
      this.backoff = Math.min(this.backoff * 2, 30000);
      log(`[${this.session.shortKey}] ${this.id} exited (code ${code}, state ${this.state}); retry in ${delay}ms`);
      this.timer = setTimeout(() => {
        this.timer = null;
        this.sourceProblem = false;
        this.start();
      }, delay);
    });
  }

  onProgressLine(line) {
    const eq = line.indexOf('=');
    if (eq < 0) return;
    const key = line.slice(0, eq);
    const value = line.slice(eq + 1);
    if (key === 'frame') {
      this.frames = Number(value) || 0;
    } else if (key === 'fps') {
      this.fps = Number(value) || null;
    } else if (key === 'bitrate') {
      this.bitrate = value.trim() === 'N/A' ? null : value.trim();
    } else if (key === 'progress' && this.frames > 0 && this.state !== 'live') {
      this.state = 'live';
      this.everLive = true;
      this.lastError = null;
      this.since = Date.now();
    }
  }

  onErrorLine(line) {
    if (!line) return;
    // An error that mentions the input URL means the creator is not publishing (yet).
    if (line.includes(this.session.input)) this.sourceProblem = true;
    this.lastError = this.mask(line).slice(0, 300);
  }

  stop() {
    this.stopped = true;
    this.state = 'stopped';
    if (this.timer) clearTimeout(this.timer);
    if (this.proc) {
      this.proc.kill('SIGTERM');
      const proc = this.proc;
      setTimeout(() => { if (proc.exitCode === null) proc.kill('SIGKILL'); }, 3000).unref();
    }
  }

  status() {
    return {
      id: this.id,
      name: this.name,
      kind: this.internal ? 'internal' : 'external',
      state: this.state,
      lastError: this.state === 'live' ? null : this.lastError,
      restarts: this.restarts,
      bitrate: this.bitrate,
      fps: this.fps,
      frames: this.frames,
      since: new Date(this.since).toISOString(),
    };
  }
}

/** @type {Map<string, {key: string, shortKey: string, input: string, publicName: string, startedAt: number, workers: Map<string, Worker>}>} */
const sessions = new Map();

function buildWorkerSpecs(session, destinations) {
  const specs = [
    {
      id: INTERNAL_ID,
      name: 'HRL Live',
      internal: true,
      output: `${MEDIA_RTMP}/public/${session.publicName}?user=restreamer&pass=${encodeURIComponent(TOKEN)}`,
      secrets: [TOKEN, encodeURIComponent(TOKEN)],
      fingerprint: `internal:${session.publicName}`,
    },
  ];
  for (const d of destinations) {
    const output = fullOutputUrl(d);
    specs.push({
      id: d.id,
      name: d.name || d.id,
      internal: false,
      output,
      secrets: [output, d.streamKey],
      fingerprint: crypto.createHash('sha256').update(output).digest('hex'),
    });
  }
  return specs;
}

/** Makes the running workers match the requested destinations (start / replace / stop). */
function reconcileSession(key, publicName, destinations) {
  let session = sessions.get(key);
  if (!session) {
    session = {
      key,
      shortKey: key.slice(0, 6),
      input: `${MEDIA_RTSP}/live/${key}`,
      publicName,
      startedAt: Date.now(),
      workers: new Map(),
    };
    sessions.set(key, session);
  }
  session.publicName = publicName;

  const specs = buildWorkerSpecs(session, destinations);
  const wanted = new Set(specs.map((s) => s.id));

  for (const [id, worker] of session.workers) {
    if (!wanted.has(id)) {
      worker.stop();
      session.workers.delete(id);
    }
  }
  for (const spec of specs) {
    const existing = session.workers.get(spec.id);
    if (existing && existing.fingerprint === spec.fingerprint) {
      existing.name = spec.name;
      continue;
    }
    if (existing) existing.stop();
    const worker = new Worker(session, spec);
    session.workers.set(spec.id, worker);
    worker.start();
  }
  log(`[${session.shortKey}] session reconciled: ${[...session.workers.keys()].join(', ')}`);
  return session;
}

function stopSession(key) {
  const session = sessions.get(key);
  if (!session) return false;
  for (const worker of session.workers.values()) worker.stop();
  sessions.delete(key);
  log(`[${session.shortKey}] session stopped`);
  return true;
}

const sessionStatus = (session) => ({
  running: true,
  publicName: session.publicName,
  startedAt: new Date(session.startedAt).toISOString(),
  workers: [...session.workers.values()].map((w) => w.status()),
});

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) });
  res.end(payload);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(Object.assign(new Error('body too large'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(Object.assign(new Error('invalid JSON'), { status: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function authorized(req) {
  const header = String(req.headers.authorization || '');
  const given = Buffer.from(header.startsWith('Bearer ') ? header.slice(7) : '');
  const expected = Buffer.from(TOKEN);
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

/** MediaMTX external-auth callback: only registered keys may publish; our own relay publishes to public/*. */
function mediamtxAuth(body) {
  if (body.action !== 'publish') return true;
  const p = String(body.path || '');
  if (p.startsWith('live/')) return ingest.has(p.slice(5));
  if (p.startsWith('public/')) {
    const given = Buffer.from(String(body.password || ''));
    const expected = Buffer.from(TOKEN);
    return body.user === 'restreamer' && given.length === expected.length && crypto.timingSafeEqual(given, expected);
  }
  return false;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x');
    const parts = url.pathname.split('/').filter(Boolean);

    if (req.method === 'POST' && url.pathname === '/mediamtx/auth') {
      const body = await readJson(req);
      return send(res, mediamtxAuth(body) ? 200 : 401, { ok: mediamtxAuth(body) });
    }

    if (parts[0] !== 'v1') return send(res, 404, { error: 'not found' });
    if (!authorized(req)) return send(res, 401, { error: 'unauthorized' });

    // GET /v1/health
    if (req.method === 'GET' && parts[1] === 'health' && parts.length === 2) {
      return send(res, 200, { ok: true, sessions: sessions.size, ingestKeys: ingest.size });
    }

    // PUT|DELETE /v1/ingest/:key
    if (parts[1] === 'ingest' && parts.length === 3) {
      const key = parts[2];
      if (!KEY_RE.test(key)) return send(res, 400, { error: 'invalid ingest key' });
      if (req.method === 'PUT') {
        const body = await readJson(req);
        if (!NAME_RE.test(String(body.publicName || ''))) return send(res, 400, { error: 'invalid publicName' });
        ingest.set(key, { publicName: body.publicName });
        saveIngest();
        return send(res, 200, { ok: true });
      }
      if (req.method === 'DELETE') {
        ingest.delete(key);
        saveIngest();
        stopSession(key);
        return send(res, 200, { ok: true });
      }
    }

    // GET /v1/sessions
    if (req.method === 'GET' && parts[1] === 'sessions' && parts.length === 2) {
      return send(res, 200, { sessions: [...sessions.values()].map((s) => ({ shortKey: s.shortKey, ...sessionStatus(s) })) });
    }

    // GET|PUT|DELETE /v1/sessions/:key
    if (parts[1] === 'sessions' && parts.length === 3) {
      const key = parts[2];
      if (!KEY_RE.test(key)) return send(res, 400, { error: 'invalid session key' });

      if (req.method === 'GET') {
        const session = sessions.get(key);
        return send(res, 200, session ? sessionStatus(session) : { running: false, workers: [] });
      }
      if (req.method === 'PUT') {
        const body = await readJson(req);
        const entry = ingest.get(key);
        if (!entry) return send(res, 409, { error: 'ingest key is not registered' });
        const destinations = Array.isArray(body.destinations) ? body.destinations : [];
        if (destinations.length > MAX_DESTINATIONS) return send(res, 400, { error: `at most ${MAX_DESTINATIONS} destinations` });
        const ids = new Set();
        for (const d of destinations) {
          const problem = validateDestination(d);
          if (problem) return send(res, 400, { error: problem });
          if (ids.has(d.id)) return send(res, 400, { error: `duplicate destination id ${d.id}` });
          ids.add(d.id);
        }
        const session = reconcileSession(key, entry.publicName, destinations);
        return send(res, 200, sessionStatus(session));
      }
      if (req.method === 'DELETE') {
        return send(res, 200, { ok: true, wasRunning: stopSession(key) });
      }
    }

    return send(res, 404, { error: 'not found' });
  } catch (err) {
    const status = err.status || 500;
    if (status === 500) log('request failed:', err);
    return send(res, status, { error: status === 500 ? 'internal error' : err.message });
  }
});

function shutdown() {
  log('shutting down');
  for (const key of [...sessions.keys()]) stopSession(key);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 4000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

loadIngest();
server.listen(PORT, () => log(`restreamer listening on :${PORT} (ffmpeg: ${FFMPEG}, mediamtx: ${MEDIA_RTSP}, video: ${VIDEO_MODE})`));
