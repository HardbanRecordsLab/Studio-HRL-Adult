import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import {
  Camera,
  Check,
  Copy,
  ExternalLink,
  Mic,
  MicOff,
  Pencil,
  Plus,
  RefreshCw,
  Smartphone,
  Square,
  Play,
  Trash2,
} from 'lucide-react';
import { cn } from '@/utils/utils';
import { useMessages } from '@/i18n';
import { liveCopy } from '@/i18n/live';
import { DestinationDto, PLATFORM_PRESETS, WorkerState, WorkerStatus } from '@/lib/live';
import { QUALITY_PRESETS, mediaSupported } from '@/lib/whip';
import { useCameraPublisher } from '@/hooks/useCameraPublisher';
import CameraPreview from '@/components/live/CameraPreview';
import type { LiveOverview } from '@/lib/liveServer';

interface BroadcasterManagerProps {
  token?: string;
}

interface PartnerOption {
  id: string;
  name: string;
  handle: string;
}

interface DestinationForm {
  id: string | null;
  platform: string;
  label: string;
  rtmpUrl: string;
  streamKey: string;
  profileUrl: string;
}

const EMPTY_FORM: DestinationForm = { id: null, platform: 'chaturbate', label: 'Chaturbate', rtmpUrl: '', streamKey: '', profileUrl: '' };

const inputClass = 'w-full bg-black border border-white/10 px-4 py-3 text-xs text-white outline-none focus:border-[#c9a84c]/60';
const labelClass = 'block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2';
const cardClass = 'bg-[#0d0d0d] border border-white/5 rounded-3xl p-5 md:p-8 space-y-5';
const smallBtn = 'px-4 py-2 border border-white/15 text-[10px] font-bold uppercase tracking-widest hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors disabled:opacity-40';

const STATE_COLORS: Record<WorkerState, string> = {
  live: 'text-green-400 border-green-500/40',
  connecting: 'text-yellow-400 border-yellow-500/40',
  waiting_source: 'text-[#c9a84c] border-[#c9a84c]/40',
  error: 'text-red-400 border-red-500/40',
  stopped: 'text-gray-500 border-white/10',
};

async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(path, {
    method: init?.method ?? 'GET',
    credentials: 'include',
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || `Request failed (${res.status})`);
  return json as T;
}

const CopyField: React.FC<{ label: string; value: string; copyLabel: string; copiedLabel: string }> = ({ label, value, copyLabel, copiedLabel }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex gap-2">
        <input readOnly value={value} className={`${inputClass} font-mono`} />
        <button
          type="button"
          title={copied ? copiedLabel : copyLabel}
          onClick={() => {
            void navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
          className="px-3 border border-white/15 text-[#c9a84c] hover:bg-[#c9a84c]/10"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

const BroadcasterManager: React.FC<BroadcasterManagerProps> = () => {
  const { admin: t } = useMessages(liveCopy);
  const cam = useCameraPublisher('mid');

  const [partners, setPartners] = useState<PartnerOption[]>([]);
  const [partnerId, setPartnerId] = useState('');
  const [overview, setOverview] = useState<LiveOverview | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(null);
  const [form, setForm] = useState<DestinationForm | null>(null);
  const [qr, setQr] = useState('');
  const [cameraLink, setCameraLink] = useState('');
  const [supported, setSupported] = useState(true);

  useEffect(() => setSupported(mediaSupported()), []);

  const showError = (error: unknown) => setMessage({ kind: 'error', text: error instanceof Error ? error.message : t.loadError });

  // Profiles
  useEffect(() => {
    api<Array<PartnerOption & Record<string, unknown>>>('/api/admin/partners')
      .then((list) => setPartners(list.map(({ id, name, handle }) => ({ id, name, handle }))))
      .catch(showError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live overview (polled so worker states and a stopped broadcast show up)
  const refresh = useCallback(async () => {
    if (!partnerId) return;
    try {
      setOverview(await api<LiveOverview>(`/api/admin/live/overview?partnerId=${encodeURIComponent(partnerId)}`));
    } catch (error) {
      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerId]);

  useEffect(() => {
    setOverview(null);
    setSelected(new Set());
    setForm(null);
    void refresh();
    const timer = setInterval(() => void refresh(), 4000);
    return () => clearInterval(timer);
  }, [partnerId, refresh]);

  // Which platforms are ticked: follow the running broadcast, otherwise default to every enabled one.
  const destinationKey = overview?.destinations.map((d) => d.id + d.enabled).join(',');
  useEffect(() => {
    if (!overview) return;
    setSelected((prev) => {
      if (overview.session) return new Set(overview.session.destinationIds);
      if (prev.size) return new Set([...prev].filter((id) => overview.destinations.some((d) => d.id === id && d.enabled)));
      return new Set(overview.destinations.filter((d) => d.enabled).map((d) => d.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationKey, overview?.session?.id]);

  // Phone camera link + QR code
  useEffect(() => {
    const path = overview?.endpoints.cameraPath;
    if (!path) {
      setQr('');
      setCameraLink('');
      return;
    }
    const link = `${window.location.origin}${path}`;
    setCameraLink(link);
    void QRCode.toDataURL(link, { margin: 1, width: 220, color: { dark: '#000000', light: '#ffffff' } }).then(setQr);
  }, [overview?.endpoints.cameraPath]);

  // Warn before closing the tab while this tab is the camera.
  const sending = cam.status === 'connecting' || cam.status === 'sending' || cam.status === 'reconnecting';
  useEffect(() => {
    if (!sending) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = t.broadcast.leaveWarning;
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [sending, t.broadcast.leaveWarning]);

  const session = overview?.session ?? null;
  const workers = useMemo(() => {
    const byId = new Map<string, WorkerStatus>();
    overview?.restreamer.workers.forEach((w) => byId.set(w.id, w));
    return byId;
  }, [overview]);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setMessage(null);
    try {
      await fn();
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  };

  const goLive = () =>
    run(async () => {
      const next = await api<LiveOverview>('/api/admin/live/session', {
        method: 'POST',
        body: { partnerId, action: 'start', destinationIds: [...selected], title },
      });
      setOverview(next);
      if (cam.stream && next.endpoints.whipUrl) {
        try {
          await cam.publish(next.endpoints.whipUrl);
        } catch {
          await api('/api/admin/live/session', { method: 'POST', body: { partnerId, action: 'stop' } }).catch(() => undefined);
          await refresh();
          throw new Error(t.broadcast.publishFailed);
        }
      } else if (!cam.stream) {
        setMessage({ kind: 'info', text: t.broadcast.cameraFirst });
      }
    });

  const stopLive = () =>
    run(async () => {
      await cam.unpublish();
      setOverview(await api<LiveOverview>('/api/admin/live/session', { method: 'POST', body: { partnerId, action: 'stop' } }));
    });

  const toggleSelected = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    // Changing the list while on air updates the running broadcast.
    if (session) {
      void api<LiveOverview>('/api/admin/live/session', {
        method: 'POST',
        body: { partnerId, action: 'update', destinationIds: [...next], title },
      }).then(setOverview).catch(showError);
    }
  };

  const saveDestination = () =>
    run(async () => {
      if (!form) return;
      const body = {
        platform: form.platform,
        label: form.label,
        rtmpUrl: form.rtmpUrl,
        profileUrl: form.profileUrl,
        ...(form.streamKey ? { streamKey: form.streamKey } : {}),
      };
      if (form.id) await api(`/api/admin/live/destinations/${form.id}`, { method: 'PUT', body });
      else await api('/api/admin/live/destinations', { method: 'POST', body: { ...body, partnerId } });
      setForm(null);
      await refresh();
    });

  const removeDestination = (d: DestinationDto) =>
    run(async () => {
      if (!window.confirm(t.destinations.removeConfirm)) return;
      await api(`/api/admin/live/destinations/${d.id}`, { method: 'DELETE' });
      await refresh();
    });

  const createKey = (regenerate: boolean) =>
    run(async () => {
      if (regenerate && !window.confirm(t.connect.regenerateConfirm)) return;
      if (regenerate) await cam.unpublish();
      setOverview(await api<LiveOverview>('/api/admin/live/ingest', { method: 'POST', body: { partnerId, regenerate } }));
    });

  const stackStatus = !overview
    ? null
    : !overview.restreamer.configured || !overview.endpoints.configured
      ? { text: t.stack.notConfigured, color: 'text-red-400' }
      : !overview.restreamer.reachable
        ? { text: t.stack.unreachable, color: 'text-yellow-400' }
        : { text: t.stack.ready, color: 'text-green-400' };

  const partner = partners.find((p) => p.id === partnerId);
  const elapsed = session ? Math.max(0, Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000)) : 0;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-light italic text-[#c9a84c] uppercase tracking-tighter">
            {t.title} <span className="text-white text-base not-italic tracking-widest">· {t.subtitle}</span>
          </h2>
          {stackStatus && <p className={cn('text-[10px] tracking-[3px] uppercase font-bold mt-2', stackStatus.color)}>{stackStatus.text}</p>}
        </div>
        <label className="w-full md:w-72">
          <span className={labelClass}>{t.profile}</span>
          <select value={partnerId} onChange={(e) => setPartnerId(e.target.value)} className={inputClass}>
            <option value="">{partners.length ? t.selectProfile : t.noProfiles}</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (@{p.handle})</option>
            ))}
          </select>
        </label>
      </div>

      {stackStatus && stackStatus.color === 'text-red-400' && (
        <p className="p-4 border border-red-500/30 text-red-300 text-xs">{t.stack.configureHint}</p>
      )}
      {message && (
        <p className={cn('p-4 border text-xs', message.kind === 'error' ? 'border-red-500/30 text-red-300' : 'border-[#c9a84c]/30 text-[#c9a84c]')}>{message.text}</p>
      )}

      {overview && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Camera + broadcast */}
          <div className="xl:col-span-7 space-y-6">
            <section className={cardClass}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[12px] font-black uppercase tracking-widest text-white flex items-center gap-2"><Camera className="w-4 h-4 text-[#c9a84c]" />{t.camera.title}</h3>
                {session && (
                  <span className="text-[10px] uppercase tracking-widest text-red-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{t.broadcast.elapsed} {elapsed} min
                  </span>
                )}
              </div>

              <CameraPreview stream={cam.stream} mirror={cam.facing === 'user'} placeholder={supported ? t.camera.off : t.camera.needsHttps} className="aspect-video border border-white/10" />
              {cam.error === 'denied' && <p className="text-xs text-red-300">{t.camera.denied}</p>}

              <div className="flex flex-wrap gap-2">
                {!cam.stream ? (
                  <button disabled={!supported} onClick={() => void cam.startCamera().catch(() => undefined)} className={cn(smallBtn, 'bg-[#c9a84c] !text-black !border-[#c9a84c]')}>{t.camera.start}</button>
                ) : (
                  <>
                    <button onClick={() => void cam.flip().catch(() => undefined)} className={smallBtn}><RefreshCw className="w-3 h-3 inline mr-2" />{t.camera.flip}</button>
                    <button onClick={cam.toggleMute} className={smallBtn}>
                      {cam.muted ? <MicOff className="w-3 h-3 inline mr-2" /> : <Mic className="w-3 h-3 inline mr-2" />}
                      {cam.muted ? t.camera.unmute : t.camera.mute}
                    </button>
                    <button disabled={sending} onClick={cam.stopCamera} className={smallBtn}>{t.camera.stop}</button>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label>
                  <span className={labelClass}>{t.camera.video}</span>
                  <select
                    value={cam.videoDeviceId}
                    disabled={sending}
                    onChange={(e) => {
                      cam.setVideoDeviceId(e.target.value);
                      if (cam.stream) void cam.startCamera({ videoDeviceId: e.target.value }).catch(() => undefined);
                    }}
                    className={inputClass}
                  >
                    <option value="">{t.camera.defaultDevice}</option>
                    {cam.cameras.map((d, i) => <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${i + 1}`}</option>)}
                  </select>
                </label>
                <label>
                  <span className={labelClass}>{t.camera.audio}</span>
                  <select
                    value={cam.audioDeviceId}
                    disabled={sending}
                    onChange={(e) => {
                      cam.setAudioDeviceId(e.target.value);
                      if (cam.stream) void cam.startCamera({ audioDeviceId: e.target.value }).catch(() => undefined);
                    }}
                    className={inputClass}
                  >
                    <option value="">{t.camera.defaultDevice}</option>
                    {cam.microphones.map((d, i) => <option key={d.deviceId} value={d.deviceId}>{d.label || `Mic ${i + 1}`}</option>)}
                  </select>
                </label>
                <label>
                  <span className={labelClass}>{t.camera.quality}</span>
                  <select value={cam.quality} disabled={sending} onChange={(e) => cam.setQuality(e.target.value as typeof cam.quality)} className={inputClass}>
                    {QUALITY_PRESETS.map((p) => <option key={p.id} value={p.id}>{t.camera.qualities[p.id]}</option>)}
                  </select>
                </label>
              </div>
            </section>

            <section className={cardClass}>
              <h3 className="text-[12px] font-black uppercase tracking-widest text-white">{t.broadcast.title}</h3>
              <label>
                <span className={labelClass}>{t.broadcast.titleField}</span>
                <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} disabled={Boolean(session)} className={inputClass} />
              </label>

              <div className="flex items-center gap-3 p-3 border border-[#c9a84c]/20 bg-[#c9a84c]/5 text-xs">
                <Check className="w-4 h-4 text-[#c9a84c]" />
                <span className="flex-1">{t.broadcast.internal}</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-500">{t.broadcast.internalHint}</span>
                {workers.get('hrl') && <StateChip worker={workers.get('hrl') as WorkerStatus} labels={t.states} />}
              </div>

              <ul className="space-y-2">
                {overview.destinations.map((d) => {
                  const worker = workers.get(d.id);
                  return (
                    <li key={d.id} className={cn('flex items-center gap-3 p-3 border text-xs', d.enabled ? 'border-white/10' : 'border-white/5 opacity-50')}>
                      <input type="checkbox" checked={selected.has(d.id)} disabled={!d.enabled || busy} onChange={() => toggleSelected(d.id)} className="accent-[#c9a84c] w-4 h-4" aria-label={`${t.destinations.useInBroadcast}: ${d.label}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{d.label}</p>
                        <p className="text-[10px] text-gray-500 font-mono truncate">{d.rtmpUrl} · {d.keyHint ?? '••••'}</p>
                        {worker?.lastError && worker.state !== 'live' && <p className="text-[10px] text-red-400 truncate">{worker.lastError}</p>}
                      </div>
                      {!d.enabled && <span className="text-[9px] uppercase tracking-widest text-gray-500">{t.destinations.disabled}</span>}
                      {worker && selected.has(d.id) && <StateChip worker={worker} labels={t.states} />}
                    </li>
                  );
                })}
              </ul>

              <button
                disabled={busy || (!session && overview.restreamer.configured === false)}
                onClick={() => void (session ? stopLive() : goLive())}
                className={cn(
                  'w-full flex items-center justify-center gap-3 py-4 text-[11px] font-black uppercase tracking-[4px] transition-all disabled:opacity-40',
                  session ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#9b1f35] text-white hover:bg-[#b0243c]',
                )}
              >
                {session ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {busy ? t.broadcast.starting : session ? t.broadcast.stopLive : t.broadcast.goLive}
              </button>
              {session && (
                <Link href={overview.endpoints.viewerPath} target="_blank" className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#c9a84c]">
                  <ExternalLink className="w-3 h-3" /> {t.viewer.title}
                </Link>
              )}
            </section>
          </div>

          {/* Platforms + other inputs */}
          <div className="xl:col-span-5 space-y-6">
            <section className={cardClass}>
              <div className="flex items-center justify-between">
                <h3 className="text-[12px] font-black uppercase tracking-widest text-white">{t.destinations.title}</h3>
                <button onClick={() => setForm({ ...EMPTY_FORM })} className={smallBtn}><Plus className="w-3 h-3 inline mr-1" />{t.destinations.add}</button>
              </div>

              {overview.destinations.length === 0 && !form && <p className="text-xs text-gray-500">{t.destinations.empty}</p>}

              {overview.destinations.map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-2 p-3 border border-white/5 text-xs">
                  <span className="truncate">{d.label}</span>
                  <span className="flex gap-2 shrink-0">
                    <button
                      title={t.destinations.edit}
                      onClick={() => setForm({ id: d.id, platform: d.platform, label: d.label, rtmpUrl: d.rtmpUrl, streamKey: '', profileUrl: d.profileUrl ?? '' })}
                      className="p-2 text-gray-400 hover:text-white"
                    ><Pencil className="w-4 h-4" /></button>
                    <button title={t.destinations.remove} onClick={() => void removeDestination(d)} className="p-2 text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </span>
                </div>
              ))}

              {form && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void saveDestination();
                  }}
                  className="space-y-4 p-4 border border-[#c9a84c]/20"
                >
                  <label>
                    <span className={labelClass}>{t.destinations.platform}</span>
                    <select
                      value={form.platform}
                      onChange={(e) => {
                        const preset = PLATFORM_PRESETS.find((p) => p.id === e.target.value);
                        const wasPreset = PLATFORM_PRESETS.some((p) => p.name === form.label) || !form.label;
                        setForm({ ...form, platform: e.target.value, label: wasPreset && preset ? preset.name : form.label });
                      }}
                      className={inputClass}
                    >
                      {PLATFORM_PRESETS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className={labelClass}>{t.destinations.label}</span>
                    <input required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} maxLength={80} className={inputClass} />
                  </label>
                  <label>
                    <span className={labelClass}>{t.destinations.rtmpUrl}</span>
                    <input required value={form.rtmpUrl} onChange={(e) => setForm({ ...form, rtmpUrl: e.target.value })} placeholder="rtmp://…" className={`${inputClass} font-mono`} />
                  </label>
                  <label>
                    <span className={labelClass}>{t.destinations.streamKey}</span>
                    <input
                      required={!form.id}
                      type="password"
                      autoComplete="off"
                      value={form.streamKey}
                      onChange={(e) => setForm({ ...form, streamKey: e.target.value })}
                      placeholder={form.id ? t.destinations.keepKey : ''}
                      className={`${inputClass} font-mono`}
                    />
                  </label>
                  <label>
                    <span className={labelClass}>{t.destinations.profileUrl}</span>
                    <input type="url" value={form.profileUrl} onChange={(e) => setForm({ ...form, profileUrl: e.target.value })} placeholder="https://…" className={inputClass} />
                    <span className="block mt-1 text-[10px] text-gray-500">{t.destinations.profileUrlHint}</span>
                  </label>
                  <div className="flex gap-2">
                    <button type="submit" disabled={busy} className={cn(smallBtn, 'bg-[#c9a84c] !text-black !border-[#c9a84c]')}>{t.destinations.save}</button>
                    <button type="button" onClick={() => setForm(null)} className={smallBtn}>{t.destinations.cancel}</button>
                  </div>
                </form>
              )}
            </section>

            <section className={cardClass}>
              <h3 className="text-[12px] font-black uppercase tracking-widest text-white">{t.connect.title}</h3>

              {overview.ingestKey ? (
                <>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] flex items-center gap-2"><Smartphone className="w-4 h-4" />{t.connect.phoneTitle}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{t.connect.phoneText}</p>
                    <div className="flex flex-wrap items-start gap-4">
                      {qr && <img src={qr} alt="QR" width={160} height={160} className="bg-white p-1" />}
                      <div className="flex-1 min-w-[12rem]">
                        <CopyField label="URL" value={cameraLink} copyLabel={t.connect.copyLink} copiedLabel={t.connect.copied} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">{t.connect.obsTitle}</h4>
                    {overview.endpoints.rtmpUrl && <CopyField label={t.connect.server} value={overview.endpoints.rtmpUrl} copyLabel={t.connect.copyLink} copiedLabel={t.connect.copied} />}
                    <CopyField label={t.connect.key} value={overview.ingestKey} copyLabel={t.connect.copyLink} copiedLabel={t.connect.copied} />
                    <button onClick={() => void createKey(true)} disabled={busy} className={smallBtn}>{t.connect.regenerate}</button>
                  </div>
                </>
              ) : (
                <button onClick={() => void createKey(false)} disabled={busy} className={smallBtn}>{t.connect.createKey}</button>
              )}
            </section>

            {partner && (
              <Link href={overview.endpoints.viewerPath} target="_blank" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#c9a84c]">
                <ExternalLink className="w-3 h-3" /> {t.viewer.title}: /live/{partner.handle}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const StateChip: React.FC<{ worker: WorkerStatus; labels: Record<WorkerState, string> }> = ({ worker, labels }) => (
  <span className={cn('px-2 py-1 border text-[9px] font-bold uppercase tracking-widest whitespace-nowrap', STATE_COLORS[worker.state])}>
    {labels[worker.state]}
    {worker.state === 'live' && worker.bitrate ? ` · ${worker.bitrate.replace('kbits/s', 'kbps')}` : ''}
  </span>
);

export default BroadcasterManager;
