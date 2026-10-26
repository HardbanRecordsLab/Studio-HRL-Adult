// Browser-side camera capture and WHIP publishing (WebRTC -> MediaMTX). Works on desktop and phones
// (Chrome/Android, Safari/iOS 15+); getUserMedia needs HTTPS (or localhost).

export type QualityId = 'low' | 'mid' | 'high';

export interface QualityPreset {
  id: QualityId;
  width: number;
  height: number;
  fps: number;
  /** Video bitrate cap in kbit/s. */
  kbps: number;
}

export const QUALITY_PRESETS: QualityPreset[] = [
  { id: 'low', width: 854, height: 480, fps: 24, kbps: 1200 },
  { id: 'mid', width: 1280, height: 720, fps: 30, kbps: 2500 },
  { id: 'high', width: 1920, height: 1080, fps: 30, kbps: 4500 },
];

export const presetById = (id: QualityId) => QUALITY_PRESETS.find((p) => p.id === id) ?? QUALITY_PRESETS[1];

export type CameraFacing = 'user' | 'environment';

export interface CaptureOptions {
  quality: QualityId;
  /** Specific camera; when omitted `facing` decides (front/rear camera on phones). */
  videoDeviceId?: string;
  facing?: CameraFacing;
  audioDeviceId?: string;
  audio?: boolean;
}

export const mediaSupported = () =>
  typeof window !== 'undefined' && window.isSecureContext && !!navigator.mediaDevices?.getUserMedia && typeof RTCPeerConnection !== 'undefined';

export const isMobileDevice = () =>
  typeof navigator !== 'undefined' && /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);

export async function captureCamera(options: CaptureOptions): Promise<MediaStream> {
  const preset = presetById(options.quality);
  const video: MediaTrackConstraints = {
    width: { ideal: preset.width },
    height: { ideal: preset.height },
    frameRate: { ideal: preset.fps, max: preset.fps },
  };
  if (options.videoDeviceId) video.deviceId = { exact: options.videoDeviceId };
  else video.facingMode = { ideal: options.facing ?? 'user' };

  const audio: MediaTrackConstraints | boolean =
    options.audio === false ? false : options.audioDeviceId ? { deviceId: { exact: options.audioDeviceId } } : true;

  return navigator.mediaDevices.getUserMedia({ video, audio });
}

export const stopStream = (stream: MediaStream | null | undefined) => stream?.getTracks().forEach((t) => t.stop());

/** Lists cameras and microphones (labels are only available after the user granted permission). */
export async function listDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return {
    cameras: devices.filter((d) => d.kind === 'videoinput'),
    microphones: devices.filter((d) => d.kind === 'audioinput'),
  };
}

/** Keeps the screen awake while broadcasting (phones otherwise lock and kill the stream). */
export class ScreenWakeLock {
  private sentinel: WakeLockSentinel | null = null;
  private wanted = false;
  private onVisible = () => {
    if (this.wanted && document.visibilityState === 'visible') void this.request();
  };

  async acquire() {
    this.wanted = true;
    document.addEventListener('visibilitychange', this.onVisible);
    await this.request();
  }

  release() {
    this.wanted = false;
    document.removeEventListener('visibilitychange', this.onVisible);
    void this.sentinel?.release().catch(() => undefined);
    this.sentinel = null;
  }

  private async request() {
    try {
      if ('wakeLock' in navigator) this.sentinel = await navigator.wakeLock.request('screen');
    } catch {
      // Not supported or denied: the broadcast still works, the screen may just dim.
    }
  }
}

const waitForIce = (pc: RTCPeerConnection, timeoutMs = 2500) =>
  new Promise<void>((resolve) => {
    if (pc.iceGatheringState === 'complete') return resolve();
    const done = () => {
      pc.removeEventListener('icegatheringstatechange', check);
      clearTimeout(timer);
      resolve();
    };
    const check = () => pc.iceGatheringState === 'complete' && done();
    const timer = setTimeout(done, timeoutMs);
    pc.addEventListener('icegatheringstatechange', check);
  });

export class WhipError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

/** Publishes a MediaStream to a WHIP endpoint and keeps the connection state observable. */
export class WhipPublisher {
  private pc: RTCPeerConnection | null = null;
  private resourceUrl: string | null = null;

  constructor(private onState?: (state: RTCPeerConnectionState) => void) {}

  get active() {
    return this.pc !== null;
  }

  async start(stream: MediaStream, whipUrl: string, quality: QualityId) {
    await this.stop();
    const preset = presetById(quality);
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    this.pc = pc;
    pc.addEventListener('connectionstatechange', () => this.onState?.(pc.connectionState));

    for (const track of stream.getTracks()) {
      const sender = pc.addTrack(track, stream);
      if (track.kind === 'video') {
        const params = sender.getParameters();
        params.encodings = [{ ...(params.encodings?.[0] ?? {}), maxBitrate: preset.kbps * 1000, maxFramerate: preset.fps }];
        params.degradationPreference = 'maintain-framerate';
        await sender.setParameters(params).catch(() => undefined);
      }
    }

    // The platforms ingest H.264, so ask the browser for it explicitly (baseline first: widest support).
    const videoTx = pc.getTransceivers().find((t) => t.sender.track?.kind === 'video');
    const codecs = typeof RTCRtpSender !== 'undefined' ? RTCRtpSender.getCapabilities?.('video')?.codecs : undefined;
    if (videoTx && codecs && 'setCodecPreferences' in videoTx) {
      const h264 = codecs.filter((c) => c.mimeType.toLowerCase() === 'video/h264');
      const rank = (c: RTCRtpCodec) => (/profile-level-id=42/i.test(c.sdpFmtpLine || '') ? 0 : 1) + (/packetization-mode=1/.test(c.sdpFmtpLine || '') ? 0 : 2);
      h264.sort((a, b) => rank(a) - rank(b));
      if (h264.length) videoTx.setCodecPreferences([...h264, ...codecs.filter((c) => !h264.includes(c))]);
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await waitForIce(pc);

    let response: Response;
    try {
      response = await fetch(whipUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/sdp' },
        body: pc.localDescription?.sdp,
      });
    } catch {
      await this.stop();
      throw new WhipError('Cannot reach the live server');
    }
    if (!response.ok) {
      await this.stop();
      throw new WhipError(
        response.status === 401 || response.status === 403 ? 'This camera link is no longer valid' : `Live server refused the stream (${response.status})`,
        response.status,
      );
    }
    const location = response.headers.get('Location');
    this.resourceUrl = location ? new URL(location, whipUrl).toString() : null;
    await pc.setRemoteDescription({ type: 'answer', sdp: await response.text() });
  }

  /** Switches the camera (front/rear) without dropping the broadcast. */
  async replaceVideoTrack(track: MediaStreamTrack) {
    const sender = this.pc?.getSenders().find((s) => s.track?.kind === 'video');
    if (!sender) throw new WhipError('Not broadcasting');
    await sender.replaceTrack(track);
  }

  async stop() {
    const pc = this.pc;
    const resource = this.resourceUrl;
    this.pc = null;
    this.resourceUrl = null;
    if (resource) await fetch(resource, { method: 'DELETE' }).catch(() => undefined);
    pc?.close();
  }
}
