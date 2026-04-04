import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

const ALL_PLATFORMS = [
  // LIVE CAM
  { id: 'chaturbate', name: 'Chaturbate', cat: 'live', ico: '🔴', commission: '50%', payout: 'Paxum, Wire', minPayout: '$50', schedule: 'Tygodniowo', traffic: 'Globalny', tokenRate: '$0.05/token', desc: 'Największa platforma live cam na świecie z systemem tokenów' },
  { id: 'stripchat', name: 'Stripchat', cat: 'live', ico: '🎭', commission: '80%', payout: 'Paxum, Wire, Crypto', minPayout: '$50', schedule: 'Tygodniowo', traffic: 'Globalny', tokenRate: '$0.055/token', desc: 'Nowoczesna platforma z VR i wysokimi wypłatami' },
  { id: 'livejasmin', name: 'LiveJasmin', cat: 'live', ico: '💎', commission: '60%', payout: 'Wire, Payoneer', minPayout: '$100', schedule: '2x miesiąc', traffic: 'Premium USA/EU', tokenRate: '$0.98-4.98/min', desc: 'Premium live cam z klientami high-end' },
  { id: 'bongacams', name: 'BongaCams', cat: 'live', ico: '🌟', commission: '60%', payout: 'WebMoney, Paxum, Wire', minPayout: '$30', schedule: 'Tygodniowo', traffic: 'Europa Wschodnia', tokenRate: '$0.05/token', desc: 'Popularna w Europie z wielojęzykowym supportem' },
  { id: 'myfreecams', name: 'MyFreeCams', cat: 'live', ico: '🎪', commission: '50%', payout: 'Check, Wire, Payoneer', minPayout: '$100', schedule: '2x miesiąc', traffic: 'USA', tokenRate: '$0.05/token', desc: 'Klasyczna platforma live z systemem camscore' },
  { id: 'cam4', name: 'Cam4', cat: 'live', ico: '🎨', commission: '60%', payout: 'Paxum, Wire', minPayout: '$50', schedule: 'Tygodniowo', traffic: 'USA/EU', tokenRate: '$0.10/token', desc: 'Przyjazna dla początkujących z aplikacją mobilną' },
  { id: 'flirt4free', name: 'Flirt4Free', cat: 'live', ico: '🎯', commission: '35%', payout: 'Check, Wire, Payoneer', minPayout: '$100', schedule: '2x miesiąc', traffic: 'USA Premium', tokenRate: '$2.99-9.99/min', desc: 'Premium live experience z klientami VIP' },
  { id: 'streamate', name: 'Streamate', cat: 'live', ico: '🌙', commission: '70%', payout: 'Check, Wire, Payoneer', minPayout: '$50', schedule: 'Tygodniowo', traffic: 'USA/Kanada', tokenRate: '$2.99-9.99/min', desc: 'Duża platforma amerykańska z różnymi kategoriami' },
  { id: 'cams', name: 'Cams.com', cat: 'live', ico: '🎬', commission: '60%', payout: 'Check, Wire, Paxum', minPayout: '$50', schedule: 'Tygodniowo', traffic: 'Globalny', tokenRate: '$2-8/min', desc: 'Nowoczesna platforma z zaawansowanymi funkcjami' },
  { id: 'imlive', name: 'ImLive', cat: 'live', ico: '🎭', commission: '60%', payout: 'Check, Wire, Payoneer', minPayout: '$50', schedule: '2x miesiąc', traffic: 'Globalny', tokenRate: '$0.98-4.98/min', desc: 'Jedna z najstarszych platform z lojalną społecznością' },
  // FANSITE
  { id: 'onlyfans', name: 'OnlyFans', cat: 'fansite', ico: '🔥', commission: '80%', payout: 'Bank, Paxum', minPayout: '$20', schedule: 'Tygodniowo', traffic: 'Globalny', tokenRate: '$5-50/sub', desc: 'Najpopularniejsza platforma fansite z subskrypcjami' },
  { id: 'fansly', name: 'Fansly', cat: 'fansite', ico: '💫', commission: '80%', payout: 'Bank, Crypto', minPayout: '$25', schedule: 'Tygodniowo', traffic: 'Globalny', tokenRate: '$5-25/sub', desc: 'Rosnąca konkurencja OnlyFans z tier subscriptions' },
  { id: 'manyvids', name: 'ManyVids', cat: 'fansite', ico: '📹', commission: '80%', payout: 'Paxum, Wire, Check', minPayout: '$50', schedule: '2x miesiąc', traffic: 'USA/Kanada', tokenRate: 'VOD + Sub', desc: 'Platforma treści wideo z custom videos i contests' },
  { id: 'admireme', name: 'AdmireMe', cat: 'fansite', ico: '💎', commission: '80%', payout: 'Bank, PayPal', minPayout: '$20', schedule: 'Tygodniowo', traffic: 'Europa', tokenRate: '$5-30/sub', desc: 'Europejska alternatywa przyjazna twórcom' },
  { id: 'fancentro', name: 'FanCentro', cat: 'fansite', ico: '🌟', commission: '75%', payout: 'Paxum, Wire', minPayout: '$50', schedule: '2x miesiąc', traffic: 'USA/EU', tokenRate: '$5-20/sub', desc: 'Social media integration z bundle subscriptions' },
  { id: 'justforfans', name: 'JustForFans', cat: 'fansite', ico: '👑', commission: '80%', payout: 'Paxum, Wire', minPayout: '$50', schedule: '2x miesiąc', traffic: 'USA', tokenRate: '$5-25/sub', desc: 'Platforma stworzona przez twórców dla twórców' },
  { id: 'avnstars', name: 'AVN Stars', cat: 'fansite', ico: '💰', commission: '80%', payout: 'Wire, Payoneer', minPayout: '$100', schedule: '2x miesiąc', traffic: 'USA Premium', tokenRate: '$5-50/sub', desc: 'Platforma od AVN z integracją z branżą' },
  { id: 'ismygirl', name: 'IsMyGirl', cat: 'fansite', ico: '🎯', commission: '75%', payout: 'Paxum, Wire', minPayout: '$50', schedule: '2x miesiąc', traffic: 'USA/EU', tokenRate: '$5-20/sub', desc: 'Platforma z focus na girlfriend experience' },
  { id: 'clips4sale', name: 'Clips4Sale', cat: 'fansite', ico: '📼', commission: '65%', payout: 'Check, Wire', minPayout: '$100', schedule: 'Miesięcznie', traffic: 'Niszowy globalny', tokenRate: 'VOD clips', desc: 'Gigantyczna baza nisz fetyszowych' },
  { id: 'fanvue', name: 'Fanvue', cat: 'fansite', ico: '🌐', commission: '85%', payout: 'Bank, Crypto', minPayout: '$20', schedule: 'Tygodniowo', traffic: 'Globalny', tokenRate: '$5-30/sub', desc: 'Najniższa prowizja (15%) z narzędziami AI' },
  // TUBE
  { id: 'pornhub', name: 'Pornhub (ModelHub)', cat: 'tube', ico: '🖤', commission: '65%', payout: 'Paxum, Wire', minPayout: '$50', schedule: '2x miesiąc', traffic: 'Globalny #1', tokenRate: 'Rev share + VOD', desc: 'Największy darmowy lejek ruchu na świecie' },
  { id: 'xhamster', name: 'xHamster Creator', cat: 'tube', ico: '🐹', commission: '60%', payout: 'Paxum, Wire', minPayout: '$50', schedule: '2x miesiąc', traffic: 'Globalny', tokenRate: 'Rev share', desc: 'Silny ruch organiczny i dobre SEO' },
  { id: 'xvideos', name: 'xVideos RED', cat: 'tube', ico: '❌', commission: '70%', payout: 'Wire', minPayout: '$100', schedule: 'Miesięcznie', traffic: 'Globalny #2', tokenRate: 'Sub revenue', desc: 'Zarabiaj na członkach premium oglądających treści' },
  { id: 'xhamsterlive', name: 'xHamster Live', cat: 'tube', ico: '📹', commission: '60%', payout: 'Paxum, Wire', minPayout: '$50', schedule: 'Tygodniowo', traffic: 'xHamster users', tokenRate: 'Token system', desc: 'Live cam w ramach xHamster - dostęp do milionów' },
  // MARKETING
  { id: 'twitter', name: 'Twitter / X', cat: 'marketing', ico: '🐦', commission: 'N/A', payout: 'N/A', minPayout: 'N/A', schedule: 'N/A', traffic: 'Globalny', tokenRate: 'Funnel', desc: 'Główna arteria ruchu - bez Twittera jesteś niewidzialny' },
  { id: 'reddit', name: 'Reddit', cat: 'marketing', ico: '🤖', commission: 'N/A', payout: 'N/A', minPayout: 'N/A', schedule: 'N/A', traffic: 'USA/EU', tokenRate: 'Organic', desc: 'Najlepsze źródło darmowego ruchu organicznego' },
  { id: 'telegram', name: 'Telegram VIP', cat: 'marketing', ico: '✈️', commission: 'N/A', payout: 'TON/Crypto', minPayout: 'N/A', schedule: 'N/A', traffic: 'Lojalni fani', tokenRate: 'PPV bots', desc: 'Ekosystem dla najlojalniejszych fanów - PPV bez cenzury' },
  { id: 'tiktok', name: 'TikTok / Instagram', cat: 'marketing', ico: '📱', commission: 'N/A', payout: 'N/A', minPayout: 'N/A', schedule: 'N/A', traffic: 'Masowy', tokenRate: 'Awareness', desc: 'Budowanie marki osobistej SFW - przyciąganie do bio' },
];

const CATS = [
  { id: 'all', label: 'Wszystkie', count: ALL_PLATFORMS.length },
  { id: 'live', label: '🎥 Live Cam', count: ALL_PLATFORMS.filter(p => p.cat === 'live').length },
  { id: 'fansite', label: '👑 Fansite', count: ALL_PLATFORMS.filter(p => p.cat === 'fansite').length },
  { id: 'tube', label: '🖥️ Tube', count: ALL_PLATFORMS.filter(p => p.cat === 'tube').length },
  { id: 'marketing', label: '📣 Marketing', count: ALL_PLATFORMS.filter(p => p.cat === 'marketing').length },
];

type PlatformStatus = 'connected' | 'disconnected' | 'pending';

const initialStatuses: Record<string, PlatformStatus> = {
  chaturbate: 'connected', onlyfans: 'connected', fansly: 'connected',
  stripchat: 'connected', bongacams: 'connected', pornhub: 'connected',
  twitter: 'connected', telegram: 'connected',
};

const initialRevenue: Record<string, number> = {
  chaturbate: 12400, onlyfans: 28600, fansly: 8900, stripchat: 5200,
  bongacams: 3100, pornhub: 1800, livejasmin: 9400, manyvids: 2300,
};

const initialPartners: Record<string, string[]> = {
  chaturbate: ['@annarose', '@marek_studio'],
  onlyfans: ['@annarose', '@sophia_lee', '@marek_studio'],
  fansly: ['@annarose', '@sophia_lee'],
  stripchat: ['@marek_studio'],
  bongacams: ['@annarose'],
  livejasmin: ['@sophia_lee'],
};

export const PlatformsSection: React.FC = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [statuses, setStatuses] = useState<Record<string, PlatformStatus>>(initialStatuses);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [credentials, setCredentials] = useState<Record<string, { apiKey: string; username: string }>>({});
  const [editCreds, setEditCreds] = useState<string | null>(null);
  const [tempCreds, setTempCreds] = useState({ apiKey: '', username: '' });

  const filtered = ALL_PLATFORMS.filter(p =>
    (activeCat === 'all' || p.cat === activeCat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const connected = Object.values(statuses).filter(s => s === 'connected').length;
  const totalRevenue = Object.values(initialRevenue).reduce((a, b) => a + b, 0);

  const toggleStatus = (id: string) => {
    setStatuses(prev => ({
      ...prev,
      [id]: prev[id] === 'connected' ? 'disconnected' : prev[id] === 'disconnected' ? 'pending' : 'connected',
    }));
  };

  const saveCreds = (id: string) => {
    setCredentials(prev => ({ ...prev, [id]: tempCreds }));
    setEditCreds(null);
  };

  const statusColor = (s?: PlatformStatus) => {
    if (s === 'connected') return 'text-green-500 border-green-500/30 bg-green-500/10';
    if (s === 'pending') return 'text-gold border-gold/30 bg-gold/10';
    return 'text-dim border-dim/20 bg-dim/5';
  };
  const statusLabel = (s?: PlatformStatus) => s === 'connected' ? 'Połączona' : s === 'pending' ? 'Oczekuje' : 'Rozłączona';

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="font-cormorant text-4xl text-white italic">Platform Manager</h2>
          <p className="text-dim text-xs tracking-widest uppercase mt-1">Zarządzaj wszystkimi {ALL_PLATFORMS.length} platformami z jednego miejsca</p>
        </div>
        <div className="flex gap-4">
          <div className="border border-gold/10 bg-dark-2 px-6 py-3 text-center">
            <div className="font-cormorant text-2xl text-green-500">{connected}</div>
            <div className="text-[8px] text-dim uppercase tracking-widest">Połączone</div>
          </div>
          <div className="border border-gold/10 bg-dark-2 px-6 py-3 text-center">
            <div className="font-cormorant text-2xl text-gold">€{(totalRevenue / 1000).toFixed(1)}K</div>
            <div className="text-[8px] text-dim uppercase tracking-widest">Przychód/mies.</div>
          </div>
          <div className="border border-gold/10 bg-dark-2 px-6 py-3 text-center">
            <div className="font-cormorant text-2xl text-white">{ALL_PLATFORMS.length}</div>
            <div className="text-[8px] text-dim uppercase tracking-widest">Wszystkich</div>
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {CATS.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className={cn('px-4 py-2 text-[9px] tracking-widest uppercase border transition-all',
                activeCat === cat.id ? 'bg-gold text-dark border-gold font-bold' : 'bg-dark-3/40 text-dim border-gold/10 hover:border-gold/30'
              )}>
              {cat.label} <span className="ml-1 opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Szukaj platformy..."
          className="bg-dark-2 border border-gold/10 px-4 py-2 text-[11px] text-white outline-none focus:border-gold/40 transition-colors w-64" />
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => {
          const status = statuses[p.id];
          const rev = initialRevenue[p.id];
          const partners = initialPartners[p.id] || [];
          const creds = credentials[p.id];
          const isSelected = selected === p.id;

          return (
            <motion.div key={p.id} layout
              className={cn('bg-dark-2 border transition-all duration-300 overflow-hidden',
                isSelected ? 'border-gold/40' : 'border-gold/10 hover:border-gold/25'
              )}>
              {/* Card Header */}
              <div className="p-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-2xl flex-shrink-0">{p.ico}</div>
                  <div className="min-w-0">
                    <div className="font-cormorant text-lg text-white italic truncate">{p.name}</div>
                    <div className="text-[9px] text-dim truncate">{p.desc}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={cn('text-[7px] px-2 py-0.5 border uppercase tracking-widest font-bold', statusColor(status))}>
                    {statusLabel(status)}
                  </span>
                  {status === 'connected' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="px-5 pb-4 grid grid-cols-3 gap-2 border-t border-gold/5 pt-4">
                <div>
                  <div className="text-[8px] text-dim uppercase tracking-widest">Prowizja</div>
                  <div className="text-xs text-gold font-bold mt-0.5">{p.commission}</div>
                </div>
                <div>
                  <div className="text-[8px] text-dim uppercase tracking-widest">Wypłata min.</div>
                  <div className="text-xs text-white mt-0.5">{p.minPayout}</div>
                </div>
                <div>
                  <div className="text-[8px] text-dim uppercase tracking-widest">Przychód</div>
                  <div className="text-xs text-gold font-bold mt-0.5">{rev ? `€${rev.toLocaleString()}` : '—'}</div>
                </div>
              </div>

              {/* Partners */}
              {partners.length > 0 && (
                <div className="px-5 pb-3">
                  <div className="text-[8px] text-dim uppercase tracking-widest mb-1.5">Aktywne partnerki</div>
                  <div className="flex flex-wrap gap-1">
                    {partners.map(partner => (
                      <span key={partner} className="text-[8px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5">{partner}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="px-5 pb-4 flex gap-2 flex-wrap">
                <button onClick={() => toggleStatus(p.id)}
                  className={cn('text-[8px] uppercase tracking-widest px-3 py-1.5 border transition-all',
                    status === 'connected'
                      ? 'border-crimson/30 text-crimson hover:bg-crimson/10'
                      : 'border-green-500/30 text-green-500 hover:bg-green-500/10'
                  )}>
                  {status === 'connected' ? 'Rozłącz' : 'Połącz'}
                </button>
                <button onClick={() => { setSelected(isSelected ? null : p.id); setEditCreds(null); }}
                  className="text-[8px] uppercase tracking-widest px-3 py-1.5 border border-gold/20 text-gold hover:bg-gold/10 transition-all">
                  {isSelected ? 'Zwiń' : 'Szczegóły'}
                </button>
                <button onClick={() => { setEditCreds(p.id); setSelected(p.id); setTempCreds(creds || { apiKey: '', username: '' }); }}
                  className="text-[8px] uppercase tracking-widest px-3 py-1.5 border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-all">
                  Credentials
                </button>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-gold/10 bg-dark-3/50 px-5 py-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div><span className="text-dim">Metody wypłat:</span><br /><span className="text-white">{p.payout}</span></div>
                    <div><span className="text-dim">Harmonogram:</span><br /><span className="text-white">{p.schedule}</span></div>
                    <div><span className="text-dim">Traffic:</span><br /><span className="text-white">{p.traffic}</span></div>
                    <div><span className="text-dim">Stawka:</span><br /><span className="text-gold">{p.tokenRate}</span></div>
                  </div>

                  {/* Credentials Form */}
                  {editCreds === p.id && (
                    <div className="space-y-3 border-t border-gold/10 pt-4">
                      <div className="text-[9px] text-gold uppercase tracking-widest font-bold">API Credentials</div>
                      <input value={tempCreds.username} onChange={e => setTempCreds(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="Username / Login"
                        className="w-full bg-dark-4 border border-gold/10 px-3 py-2 text-[11px] text-white outline-none focus:border-gold/30" />
                      <input value={tempCreds.apiKey} onChange={e => setTempCreds(prev => ({ ...prev, apiKey: e.target.value }))}
                        placeholder="API Key / Token"
                        type="password"
                        className="w-full bg-dark-4 border border-gold/10 px-3 py-2 text-[11px] text-white outline-none focus:border-gold/30" />
                      <div className="flex gap-2">
                        <button onClick={() => saveCreds(p.id)} className="btn-gold text-[8px] py-1.5 px-4">Zapisz</button>
                        <button onClick={() => setEditCreds(null)} className="text-[8px] text-dim hover:text-white transition-colors px-3">Anuluj</button>
                      </div>
                      {creds && (
                        <div className="text-[9px] text-green-500 flex items-center gap-1.5">
                          <span>✓</span> Credentials zapisane
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Overview Table */}
      <div className="bg-dark-2 border border-gold/10 overflow-hidden">
        <div className="p-6 border-b border-gold/5 flex justify-between items-center">
          <h3 className="font-cormorant text-2xl text-gold italic">Przychody według platformy</h3>
          <span className="text-[9px] text-dim uppercase tracking-widest">Bieżący miesiąc</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-dark-3/50">
                <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Platforma</th>
                <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Kategoria</th>
                <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Status</th>
                <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Partnerki</th>
                <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Przychód</th>
                <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Udział %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {ALL_PLATFORMS.filter(p => initialRevenue[p.id]).sort((a, b) => (initialRevenue[b.id] || 0) - (initialRevenue[a.id] || 0)).map(p => {
                const rev = initialRevenue[p.id] || 0;
                const pct = Math.round((rev / totalRevenue) * 100);
                const status = statuses[p.id];
                return (
                  <tr key={p.id} className="hover:bg-gold/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{p.ico}</span>
                        <span className="text-xs text-white font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[9px] text-dim uppercase tracking-widest">{p.cat}</td>
                    <td className="px-6 py-4">
                      <span className={cn('text-[7px] px-2 py-0.5 border uppercase tracking-widest font-bold', statusColor(status))}>
                        {statusLabel(status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-dim">{(initialPartners[p.id] || []).length || '—'}</td>
                    <td className="px-6 py-4 font-cormorant text-lg text-gold">€{rev.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-dark-4 max-w-[80px]">
                          <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[9px] text-dim">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlatformsSection;
