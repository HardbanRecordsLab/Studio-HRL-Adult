import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Video, 
  DollarSign, 
  Wifi, 
  BookOpen, 
  Settings, 
  Shield, 
  History,
  Sparkles,
  Zap,
  TrendingUp,
  BarChart3,
  Search
} from 'lucide-react';
import PartnersManager from './PartnersManager';
import CastingManager from './CastingManager';
import PlatformsManager from './PlatformsManager';
import FinanceManager from './FinanceManager';
import ContentManagementSystem from './ContentManagementSystem';
import AcademyManager from './AcademyManager';

// We'll import the AI Workshop logic directly here instead of an iframe
// For now, we'll keep it as a tab that renders a placeholder that we'll fill
import AICreatorWorkshop from '@/pages/admin/workshop/ai-creator';

interface AdminDashboardProps {
  token: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    partners: 0,
    platforms: 18,
    revenue: 'EUR 0.00',
    courses: 12
  });

  useEffect(() => {
    // Fetch real stats
    fetch('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setStats({
          partners: data.partnersCount,
          platforms: 18, // Fixed logic for now
          revenue: `EUR ${(data.revenue || 0).toLocaleString()}`,
          courses: 12
        });
      }
    }).catch(e => console.error("Stats fetch error:", e));
  }, [token]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Statystyki i przegląd' },
    { id: 'partners', label: 'Partnerzy', icon: Users, description: 'Baza modelek i umów' },
    { id: 'casting', label: 'Casting', icon: UserCheck, description: 'Weryfikacja zgłoszeń' },
    { id: 'platforms', label: 'Platformy', icon: Wifi, description: 'Dystrybucja 18+' },
    { id: 'workshop', label: 'AI Workshop', icon: Sparkles, description: 'Produkcja Contentu AI' },
    { id: 'finance', label: 'Finanse', icon: DollarSign, description: 'Rozliczenia i zyski' },
    { id: 'content', label: 'Content', icon: Video, description: 'Zarządzanie mediami' },
    { id: 'academy', label: 'Akademia', icon: BookOpen, description: 'Kursy i progres' },
    { id: 'settings', label: 'Ustawienia', icon: Settings, description: 'Konfiguracja systemu' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-georgia selection:bg-[#c9a84c]/30">
      {/* Header */}
      <header className="sticky top-0 z-[100] border-b border-[#c9a84c]/10 bg-black/80 backdrop-blur-xl px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-[#c9a84c]/30 p-2 bg-[#111] flex items-center justify-center">
              <img src="/logo/studio hrl adultbezła logo.png" className="w-full h-full object-contain" alt="HRL" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-[4px] uppercase font-arial">Control <span className="text-[#c9a84c]">Center</span></h1>
              <p className="text-[10px] text-gray-500 tracking-[2px] uppercase">HRL Industrial Production Suite</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end border-r border-white/10 pr-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">System Status</span>
                <span className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Operational
                </span>
             </div>
             <button className="bg-[#9b1f35] hover:bg-[#b0243c] px-6 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-900/20">Wyloguj</button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Sidebar Mini */}
        <aside className="w-20 border-r border-white/5 bg-black/40 min-h-[calc(100vh-80px)] flex flex-col items-center py-8 gap-6 pt-12">
           {tabs.map(tab => (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
                className={`p-4 rounded-xl transition-all group relative ${activeTab === tab.id ? 'bg-[#c9a84c] text-black shadow-xl shadow-[#c9a84c]/20 scale-110' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
             >
                <tab.icon className="w-6 h-6" />
                {activeTab === tab.id && <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[#c9a84c] rounded-r-full shadow-[0_0_15px_#c9a84c]" />}
             </button>
           ))}
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-10 overflow-y-auto custom-scrollbar h-[calc(100vh-80px)]">
           <AnimatePresence mode="wait">
             {activeTab === 'dashboard' && (
               <motion.div key="db" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10">
                  <header>
                    <h2 className="text-4xl font-light italic mb-2 tracking-tight">Witaj w centrum <span className="text-[#c9a84c]">dowodzenia</span></h2>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">Oto aktualny stan Twojego imperium contentu.</p>
                  </header>

                  {/* Top Stats */}
                  <div className="grid grid-cols-4 gap-6">
                     {[
                       { label: 'Aktywne Partnerki', value: stats.partners, icon: Users, color: '#c9a84c' },
                       { label: 'Platformy', value: stats.platforms, icon: Wifi, color: '#c9a84c' },
                       { label: 'Miesięczny Przychód', value: stats.revenue, icon: BarChart3, color: '#22c55e' },
                       { label: 'Zasoby Akademii', value: stats.courses, icon: BookOpen, color: '#ef4444' }
                     ].map((s, i) => (
                       <div key={i} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#c9a84c]/30 transition-all">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                             <s.icon className="w-20 h-20" style={{ color: s.color }} />
                          </div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-[3px] mb-4 font-arial">{s.label}</p>
                          <p className="text-4xl font-bold font-georgia">{s.value}</p>
                          <div className="mt-4 flex items-center gap-2 text-[10px] text-green-500 uppercase font-black">
                             <TrendingUp className="w-3 h-3" /> +12.5% vs Last Month
                          </div>
                       </div>
                     ))}
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-3 gap-8">
                     <div className="col-span-2 bg-[#0d0d0d] border border-white/5 rounded-3xl p-10">
                        <div className="flex justify-between items-center mb-10">
                           <h3 className="text-xl font-light uppercase tracking-[4px]">Szybka <span className="text-[#c9a84c]">Produkcja</span></h3>
                           <button className="text-[9px] text-[#c9a84c] border border-[#c9a84c]/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest hover:bg-[#c9a84c] hover:text-black transition-all">Pełny Warsztat</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           {tabs.slice(1, 7).map(t => (
                             <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-4 p-6 bg-black/40 border border-white/5 rounded-2xl hover:bg-black/80 hover:border-[#c9a84c]/20 transition-all text-left">
                                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                                   <t.icon className="w-6 h-6" />
                                </div>
                                <div>
                                   <p className="text-[11px] font-black uppercase tracking-widest mb-0.5">{t.label}</p>
                                   <p className="text-[9px] text-gray-500 uppercase tracking-wider">{t.description}</p>
                                </div>
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-10">
                        <h3 className="text-xl font-light uppercase tracking-[4px] mb-10 text-crimson-btn">System <span className="text-white">Alerts</span></h3>
                        <div className="space-y-6">
                           {[
                             { d: '2m ago', t: 'Wykryto nową partnerkę w Castingu', s: 'info' },
                             { d: '1h ago', t: 'Przychód OnlyFans przekroczył EUR 5K', s: 'success' },
                             { d: '4h ago', t: 'Błąd synchronizacji MyFreeCams (API)', s: 'error' },
                             { d: '1d ago', t: 'Nowa lekcja w Akademii oczekuje na publikację', s: 'info' }
                           ].map((a, i) => (
                             <div key={i} className="flex gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                <div className={`w-1 h-12 rounded-full ${a.s === 'error' ? 'bg-red-500 shadow-[0_0_10px_red]' : a.s === 'success' ? 'bg-green-500 shadow-[0_0_10px_green]' : 'bg-[#c9a84c]'}`} />
                                <div>
                                   <p className="text-[11px] leading-relaxed mb-1">{a.t}</p>
                                   <p className="text-[9px] text-gray-600 uppercase tracking-widest">{a.d}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                        <button className="w-full mt-10 p-4 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[3px] hover:bg-white/10 transition-all text-gray-400">Zobacz Pełne Logi Systemowe</button>
                     </div>
                  </div>
               </motion.div>
             )}

             {/* Dynamic Tab Rendering (Fixing Iframes Issue) */}
             {activeTab === 'partners' && <motion.div key="pt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><PartnersManager token={token} /></motion.div>}
             {activeTab === 'casting' && <motion.div key="ca" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CastingManager token={token} /></motion.div>}
             {activeTab === 'platforms' && <motion.div key="pl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><PlatformsManager token={token} /></motion.div>}
             {activeTab === 'finance' && <motion.div key="fn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><FinanceManager token={token} /></motion.div>}
             {activeTab === 'content' && <motion.div key="cn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ContentManagementSystem token={token} /></motion.div>}
             {activeTab === 'academy' && <motion.div key="ac" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><AcademyManager token={token} /></motion.div>}
             
             {/* AI WORKSHOP - NATIVE INTEGRATION */}
             {activeTab === 'workshop' && (
                <motion.div key="ws" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                   <AICreatorWorkshop embedded={true} />
                </motion.div>
             )}

             {activeTab === 'settings' && (
                <motion.div key="st" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-10 h-full">
                   <h2 className="text-3xl font-light italic text-[#c9a84c] mb-10 pb-6 border-b border-white/10 uppercase tracking-tighter">System Configuration</h2>
                   <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <label className="block">
                           <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Site Name</span>
                           <input type="text" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm" defaultValue="Studio HRL Adult" />
                        </label>
                        <label className="block">
                           <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block">Production Mode</span>
                           <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-sm">
                              <option>Industrial Suite (Full)</option>
                              <option>Minimalist (Fast)</option>
                           </select>
                        </label>
                      </div>
                      <div className="p-8 bg-red-900/10 border border-red-900/20 rounded-2xl">
                         <h4 className="text-red-500 font-bold uppercase text-xs mb-4">Strefa Niebezpieczna</h4>
                         <p className="text-[11px] text-gray-400 mb-6 italic">Restart systemowych usług, czyszczenie cache, lub całkowity reset bazy danych.</p>
                         <button className="px-6 py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Wymuś Restart Systemu</button>
                      </div>
                   </div>
                </motion.div>
             )}

           </AnimatePresence>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201, 168, 76, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(201, 168, 76, 0.4); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
