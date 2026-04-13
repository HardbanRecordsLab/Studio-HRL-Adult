import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  BarChart3, 
  Settings2, 
  Plus, 
  Search, 
  Activity, 
  ShieldCheck, 
  Lock, 
  ChevronRight,
  TrendingUp,
  CreditCard,
  Layers,
  Zap,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock4,
  ExternalLink,
  DollarSign,
  PieChart
} from 'lucide-react';
import { cn } from '@/utils/utils';

// PEŁNA LISTA PLATFORM (Przywrócona)
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
  { id: 'live', label: 'Live Cam', count: ALL_PLATFORMS.filter(p => p.cat === 'live').length },
  { id: 'fansite', label: 'Fansite', count: ALL_PLATFORMS.filter(p => p.cat === 'fansite').length },
  { id: 'tube', label: 'Tube', count: ALL_PLATFORMS.filter(p => p.cat === 'tube').length },
  { id: 'marketing', label: 'Marketing', count: ALL_PLATFORMS.filter(p => p.cat === 'marketing').length },
];

const initialStatuses: Record<string, 'connected' | 'disconnected' | 'pending'> = {
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
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [statuses, setStatuses] = useState(initialStatuses);
  const [credentials, setCredentials] = useState<Record<string, { apiKey: string; username: string }>>({});
  const [editCreds, setEditCreds] = useState<string | null>(null);
  const [tempCreds, setTempCreds] = useState({ apiKey: '', username: '' });

  const filtered = ALL_PLATFORMS.filter(p =>
    (activeCat === 'all' || p.cat === activeCat) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const connectedCount = Object.values(statuses).filter(s => s === 'connected').length;
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

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      {/* Premium Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter text-glow">Platform <span className="text-white">COMMAND</span></h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase font-bold">Infrastruktura Dystrybucji // Pełne zestawienie {ALL_PLATFORMS.length} węzłów</p>
        </div>
        <div className="flex gap-8">
           <div className="text-right">
              <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-1">Połączone</span>
              <span className="text-2xl font-bold text-white tracking-tighter">{connectedCount} <span className="text-gray-600">/ {ALL_PLATFORMS.length}</span></span>
           </div>
           <div className="text-right">
              <span className="text-[9px] font-black text-[#c9a84c] uppercase tracking-widest block mb-1">Est. Revenue</span>
              <span className="text-2xl font-bold text-[#c9a84c] tracking-tighter">€{(totalRevenue / 1000).toFixed(1)}K</span>
           </div>
        </div>
      </div>

      {/* Dynamic Tabs & Search Container */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-[#0d0d0d] border border-white/5 p-4 rounded-[40px] shadow-2xl">
         <div className="flex gap-2 p-1.5 bg-white/5 rounded-full overflow-x-auto no-scrollbar">
            {CATS.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCat(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeCat === cat.id ? "bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20" : "text-gray-500 hover:text-white"
                )}
              >
                {cat.label} <span className="ml-1 opacity-40">({cat.count})</span>
              </button>
            ))}
         </div>
         <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input 
              type="text" 
              placeholder="Wyszukaj platformę w bazie..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-14 pr-6 text-[10px] text-white focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-700 uppercase tracking-widest font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const status = statuses[p.id] || 'disconnected';
              const rev = initialRevenue[p.id];
              const isSelected = selected === p.id;
              const hasCreds = !!credentials[p.id];

              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "group bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#c9a84c]/30 transition-all shadow-2xl relative",
                    isSelected && "ring-2 ring-[#c9a84c]/30 border-[#c9a84c]/50"
                  )}
                >
                  <div className="p-8 space-y-8 relative z-10">
                     <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center">
                           <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                              {p.ico}
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white font-georgia italic mb-0.5 group-hover:text-[#c9a84c] transition-colors">{p.name}</h3>
                              <div className="flex items-center gap-2">
                                 <div className={cn("w-1.5 h-1.5 rounded-full", status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-gray-700')} />
                                 <span className="text-[7px] font-black text-gray-500 uppercase tracking-[2px]">
                                    {status === 'connected' ? 'LIVE Connection' : status === 'pending' ? 'Authenticating...' : 'Node Inactive'}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <button onClick={() => toggleStatus(p.id)} className={cn(
                          "px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest border transition-all",
                          status === 'connected' ? "border-green-500/20 text-green-500 bg-green-500/5 hover:bg-green-500/10" : "border-gray-800 text-gray-500 hover:text-white"
                        )}>{status === 'connected' ? 'Linked' : 'Link Node'}</button>
                     </div>

                     <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-6">
                        <div className="space-y-1">
                           <p className="text-[7px] text-gray-600 uppercase tracking-widest font-black">Commission</p>
                           <p className="text-sm font-bold text-white font-mono">{p.commission}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[7px] text-gray-600 uppercase tracking-widest font-black">Min Payout</p>
                           <p className="text-sm font-bold text-white font-mono">{p.minPayout}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[7px] text-gray-600 uppercase tracking-widest font-black">Est. Monthly</p>
                           <p className="text-sm font-bold text-[#c9a84c] font-mono">{rev ? `€${rev.toLocaleString()}` : '—'}</p>
                        </div>
                     </div>

                     <div className="flex gap-2">
                        <button 
                          onClick={() => setSelected(isSelected ? null : p.id)}
                          className="flex-1 py-3 bg-white/5 text-[9px] font-black text-white/50 uppercase tracking-widest rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/5"
                        >
                          {isSelected ? 'Zwiń Detale' : 'Specyfikacja'}
                        </button>
                        <button 
                          onClick={() => { setEditCreds(p.id); setSelected(p.id); setTempCreds(credentials[p.id] || { apiKey: '', username: '' }); }}
                          className={cn(
                            "px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all border",
                            hasCreds ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-white/5 text-gray-500 border-white/5 hover:text-[#c9a84c]"
                          )}
                        >
                           <Lock className="w-4 h-4" />
                        </button>
                     </div>

                     {isSelected && (
                       <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-6 space-y-6 border-t border-white/5 shadow-inner bg-black/20 -mx-8 -mb-8 p-8">
                          <div className="grid grid-cols-2 gap-6 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                             <div className="space-y-1.5"><p className="text-gray-600">Payout System</p><p className="text-white bg-white/5 px-4 py-2 rounded-xl border border-white/5">{p.payout}</p></div>
                             <div className="space-y-1.5"><p className="text-gray-600">Sync Schedule</p><p className="text-white bg-white/5 px-4 py-2 rounded-xl border border-white/5">{p.schedule}</p></div>
                             <div className="space-y-1.5"><p className="text-gray-600">Traffic Node</p><p className="text-white bg-white/5 px-4 py-2 rounded-xl border border-white/5">{p.traffic}</p></div>
                             <div className="space-y-1.5"><p className="text-gray-600">Token Rate</p><p className="text-[#c9a84c] bg-[#c9a84c]/5 px-4 py-2 rounded-xl border border-[#c9a84c]/10">{p.tokenRate}</p></div>
                          </div>

                          {editCreds === p.id && (
                             <div className="space-y-4 pt-4 border-t border-white/5 animate-fadeIn">
                                <p className="text-[10px] font-black text-[#c9a84c] uppercase tracking-widest flex items-center gap-2"><Lock className="w-3 h-3" /> Secure Access Credentials</p>
                                <div className="space-y-3">
                                   <input value={tempCreds.username} onChange={e => setTempCreds(prev => ({ ...prev, username: e.target.value }))} placeholder="Platform Username" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white focus:border-[#c9a84c]/40 outline-none font-mono" />
                                   <input value={tempCreds.apiKey} onChange={e => setTempCreds(prev => ({ ...prev, apiKey: e.target.value }))} placeholder="API / Private Key" type="password" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[10px] text-[#c9a84c] focus:border-[#c9a84c]/40 outline-none font-mono" />
                                </div>
                                <div className="flex gap-2">
                                   <button onClick={() => saveCreds(p.id)} className="flex-1 py-3 bg-[#c9a84c] text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-[#c9a84c]/10 text-center">Update Secret</button>
                                   <button onClick={() => setEditCreds(null)} className="flex-1 py-3 bg-white/5 text-white/50 text-[9px] font-black uppercase tracking-widest rounded-xl hover:text-white">Cancel</button>
                                </div>
                             </div>
                          )}
                       </motion.div>
                     )}
                  </div>
                </motion.div>
              );
            })}
         </AnimatePresence>
      </div>

      {/* Revenue Performance Table (Przywrócona i Ulepszona) */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
           <div>
              <h3 className="text-2xl font-bold font-georgia italic text-white flex items-center gap-3"><DollarSign className="w-6 h-6 text-[#c9a84c]" /> Analiza Rentowności Platform</h3>
              <p className="text-[9px] text-gray-500 uppercase tracking-[2px] mt-1 font-bold">Zestawienie udziału rynkowego w portfelu HRL Studio</p>
           </div>
           <PieChart className="w-8 h-8 text-gray-700" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="px-8 py-5 text-[8px] text-gray-500 font-black tracking-widest uppercase">Node Engine</th>
                <th className="px-8 py-5 text-[8px] text-gray-500 font-black tracking-widest uppercase">Category</th>
                <th className="px-8 py-5 text-[8px] text-gray-500 font-black tracking-widest uppercase">Partners</th>
                <th className="px-8 py-5 text-[8px] text-gray-500 font-black tracking-widest uppercase text-right">Revenue Share</th>
                <th className="px-8 py-5 text-[8px] text-gray-500 font-black tracking-widest uppercase text-right">Portfolio %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ALL_PLATFORMS.filter(p => initialRevenue[p.id]).sort((a, b) => (initialRevenue[b.id] || 0) - (initialRevenue[a.id] || 0)).map(p => {
                const rev = initialRevenue[p.id] || 0;
                const pct = Math.round((rev / totalRevenue) * 100);
                const partnersCount = (initialPartners[p.id] || []).length;
                return (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{p.ico}</span>
                        <span className="text-xs text-white font-bold group-hover:text-[#c9a84c] transition-colors">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 tracking-widest font-bold">
                       <span className="text-[9px] text-gray-500 uppercase border border-white/10 px-3 py-1 rounded-full group-hover:border-[#c9a84c]/20 transition-all">{p.cat}</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-white font-black">{partnersCount || '—'}</span>
                          <span className="text-[8px] text-gray-600 uppercase font-bold tracking-tight">Active Accounts</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right font-mono text-xs text-[#c9a84c] font-bold">€{rev.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-4">
                        <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden hidden md:block">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e6c15c]" />
                        </div>
                        <span className="text-[10px] text-white font-black w-8 text-right font-mono">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.3); }
      `}</style>
    </div>
  );
};

export default PlatformsSection;
