# HRL restreamer - one camera, many platforms

Sends **one** camera feed to several live platforms at once, plus our own public page (`/live/<handle>`).

```
 studio / phone camera ──WebRTC (WHIP)──┐
 OBS ───────────────────RTMP────────────┤
                                        ▼
                                    MediaMTX  live/<ingestKey>
                                        │ RTSP (internal)
                                        ▼
                               restreamer (ffmpeg per destination)
                  ┌─────────────┬───────┴───────┬──────────────┐
                  ▼             ▼               ▼              ▼
             Chaturbate     Stripchat   …other platforms   public/<handle>
                                                            (HLS → /live/<handle>)
```

* The **admin panel → Live Studio** (`/admin`, tab *broadcaster*) is the operator's console: pick a profile,
  start the camera of the laptop or phone you are on, tick the platforms, press *Go live*.
* A **phone** can be the camera for a profile: scan the QR code in Live Studio (opens `/studio/camera#<key>`).
  Works on iOS Safari and Android Chrome over HTTPS; the page keeps the screen awake and can flip cameras.
* **OBS** still works: server `rtmp://<live host>:1935/live`, stream key = the profile's connection key.
* The camera's picture is received once; the restreamer copies the video to every platform (no re-encoding)
  and converts the audio to AAC. Set `VIDEO_MODE=transcode` if a platform rejects the stream.

## Deploy

Needs a server with a public IP, Docker and DNS for `LIVE_DOMAIN` (Vercel cannot run this part).

```bash
cd services/restreamer
cp .env.example .env     # RESTREAMER_TOKEN (openssl rand -hex 32), LIVE_DOMAIN, LIVE_PUBLIC_IP
docker compose up -d --build
```

Open ports: 80/443 (HTTPS), 8189 tcp+udp (WebRTC media), 1935 (RTMP, only if you use OBS).

Then set in the Next.js app (Vercel env) - see `.env.example`:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_LIVE_URL` | `https://<LIVE_DOMAIN>` |
| `RESTREAMER_URL` | `https://<LIVE_DOMAIN>` |
| `RESTREAMER_TOKEN` | the same token as in `services/restreamer/.env` |
| `STREAM_KEY_SECRET` | random secret that encrypts platform stream keys (falls back to `JWT_SECRET`) |

Create the new tables once: `npx prisma db push` (SQL for reference: `prisma/live_streaming.sql`).

## Platforms

For every platform add its **RTMP URL and stream key** (from the platform's own broadcast / OBS settings) in
Live Studio. Keys are encrypted (AES-256-GCM) before they are stored and are never sent back to the browser.

## Security notes

* Only registered ingest keys may publish to MediaMTX; the key is the credential, so treat camera links like
  stream keys. *Regenerate key* revokes all old links and stops the current broadcast.
* The control API needs `Authorization: Bearer $RESTREAMER_TOKEN`; destination URLs must be `rtmp(s)://` and
  may not point at private/internal addresses.
* Stream keys and the token are masked in logs and status output.

## Tests

```bash
cd services/restreamer && npm test   # control API + auth callback; needs neither ffmpeg nor MediaMTX
```
