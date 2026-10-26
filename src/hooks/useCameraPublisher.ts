import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CameraFacing,
  QualityId,
  ScreenWakeLock,
  WhipPublisher,
  captureCamera,
  listDevices,
  stopStream,
} from '@/lib/whip';

export type PublisherStatus = 'off' | 'ready' | 'connecting' | 'sending' | 'reconnecting' | 'failed';

const MAX_RECONNECTS = 5;

/**
 * Camera + WHIP publishing for the admin Live Studio and the phone camera page.
 * Handles front/rear camera switching (without dropping the broadcast), mute, screen wake lock
 * and automatic reconnects when the network hiccups.
 */
export function useCameraPublisher(initialQuality: QualityId = 'mid') {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<PublisherStatus>('off');
  const [error, setError] = useState<'denied' | 'unsupported' | 'connect' | null>(null);
  const [quality, setQuality] = useState<QualityId>(initialQuality);
  const [facing, setFacing] = useState<CameraFacing>('user');
  const [muted, setMuted] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [videoDeviceId, setVideoDeviceId] = useState('');
  const [audioDeviceId, setAudioDeviceId] = useState('');

  const streamRef = useRef<MediaStream | null>(null);
  const publisherRef = useRef<WhipPublisher | null>(null);
  const wakeLockRef = useRef<ScreenWakeLock>(new ScreenWakeLock());
  const whipUrlRef = useRef<string | null>(null);
  const reconnectsRef = useRef(0);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshDevices = useCallback(async () => {
    try {
      const devices = await listDevices();
      setCameras(devices.cameras);
      setMicrophones(devices.microphones);
    } catch {
      /* labels/devices are a nicety, not required */
    }
  }, []);

  const adopt = useCallback((next: MediaStream) => {
    streamRef.current = next;
    setStream(next);
    next.getAudioTracks().forEach((t) => (t.enabled = !muted));
  }, [muted]);

  const startCamera = useCallback(async (opts?: { facing?: CameraFacing; videoDeviceId?: string; audioDeviceId?: string }) => {
    setError(null);
    try {
      const next = await captureCamera({
        quality,
        facing: opts?.facing ?? facing,
        videoDeviceId: opts?.videoDeviceId ?? (videoDeviceId || undefined),
        audioDeviceId: opts?.audioDeviceId ?? (audioDeviceId || undefined),
      });
      const old = streamRef.current;
      adopt(next);
      // Switching while live: hand the new picture to the existing connection, then free the old camera.
      if (publisherRef.current?.active) {
        const track = next.getVideoTracks()[0];
        if (track) await publisherRef.current.replaceVideoTrack(track).catch(() => undefined);
      }
      stopStream(old);
      setStatus((s) => (s === 'off' || s === 'failed' ? 'ready' : s));
      await refreshDevices();
    } catch (e: any) {
      setError(e?.name === 'NotAllowedError' || e?.name === 'SecurityError' ? 'denied' : 'unsupported');
      throw e;
    }
  }, [quality, facing, videoDeviceId, audioDeviceId, adopt, refreshDevices]);

  const stopCamera = useCallback(() => {
    stopStream(streamRef.current);
    streamRef.current = null;
    setStream(null);
    setStatus('off');
  }, []);

  const flip = useCallback(async () => {
    const next: CameraFacing = facing === 'user' ? 'environment' : 'user';
    setFacing(next);
    setVideoDeviceId('');
    await startCamera({ facing: next, videoDeviceId: '' });
  }, [facing, startCamera]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      streamRef.current?.getAudioTracks().forEach((t) => (t.enabled = m));
      return !m;
    });
  }, []);

  const clearTimer = () => {
    if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    reconnectTimer.current = null;
  };

  /** One connection attempt; throws when the live server cannot be reached or refuses the stream. */
  const attempt = useCallback(async () => {
    const url = whipUrlRef.current;
    const current = streamRef.current;
    if (!url || !current) return;
    setStatus(reconnectsRef.current > 0 ? 'reconnecting' : 'connecting');
    await publisherRef.current?.start(current, url, quality);
  }, [quality]);

  /** Reconnect attempt after a dropped connection: failures are retried with backoff. */
  const connect = useCallback(async () => {
    try {
      await attempt();
    } catch {
      scheduleReconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const scheduleReconnect = useCallback(() => {
    if (!whipUrlRef.current) return;
    if (reconnectsRef.current >= MAX_RECONNECTS) {
      setStatus('failed');
      setError('connect');
      return;
    }
    reconnectsRef.current += 1;
    setStatus('reconnecting');
    clearTimer();
    reconnectTimer.current = setTimeout(() => void connect(), 2000 * reconnectsRef.current);
  }, [connect]);

  const publish = useCallback(async (whipUrl: string) => {
    if (!streamRef.current) throw new Error('Camera is not started');
    setError(null);
    whipUrlRef.current = whipUrl;
    reconnectsRef.current = 0;
    publisherRef.current ??= new WhipPublisher((state) => {
      if (state === 'connected') {
        reconnectsRef.current = 0;
        setStatus('sending');
      } else if (state === 'failed' || state === 'disconnected') {
        scheduleReconnect();
      }
    });
    await wakeLockRef.current.acquire();
    try {
      // The first attempt fails fast so the caller can tell the operator; only a connection that
      // was working and then dropped is retried automatically.
      await attempt();
    } catch (error) {
      whipUrlRef.current = null;
      wakeLockRef.current.release();
      setStatus('failed');
      setError('connect');
      throw error;
    }
  }, [attempt, scheduleReconnect]);

  const unpublish = useCallback(async () => {
    whipUrlRef.current = null;
    clearTimer();
    await publisherRef.current?.stop();
    wakeLockRef.current.release();
    setStatus(streamRef.current ? 'ready' : 'off');
  }, []);

  useEffect(() => {
    const wakeLock = wakeLockRef.current;
    return () => {
      whipUrlRef.current = null;
      clearTimer();
      void publisherRef.current?.stop();
      wakeLock.release();
      stopStream(streamRef.current);
    };
  }, []);

  return {
    stream, status, error, quality, setQuality, facing, muted,
    cameras, microphones, videoDeviceId, setVideoDeviceId, audioDeviceId, setAudioDeviceId,
    startCamera, stopCamera, flip, toggleMute, publish, unpublish,
  };
}
