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
import { cn } from '@/utils/utils';
import PartnersManager from './PartnersManager';
import CastingManager from './CastingManager';
import PlatformsManager from './PlatformsManager';
import FinanceManager from './FinanceManager';
import ContentManagementSystem from './ContentManagementSystem';
import AcademyManager from './AcademyManager';
import SystemSettings from './SystemSettings';
import AICreatorWorkshop from '@/pages/admin/workshop/ai-creator';

interface AdminDashboardProps {
  token: string;
  onLogout?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    partners: 0,
    platforms: 38,
    revenue: 'EUR 0.00',
    courses: 12
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    setLoadingStats(true);
    fetch('/api/admin/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setStats({
          partners: data.partnersCount,
          platforms: data.platformsCount || 38,
          revenue: `EUR ${(data.revenue || 0).toLocaleString()}`,
          courses: data.coursesCount || 12
        });
      }
    }).catch(e => console.error("Stats fetch error:", e))
    .finally(() => setLoadingStats(false));
  }, [token]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Statystyki i przegląd' },
    { id: 'partners', label: 'Partnerzy', icon: Users, description: 'Baza modelek i umów' },
    { id: 'casting', label: 'Casting', icon: UserCheck, description: 'Weryfikacja zgłoszeń' },
    { id: 'platforms', label: 'Platformy', icon: Wifi, description: 'Dystrybucja i sieci' },
    { id: 'workshop', label: 'AI Workshop', icon: Sparkles, description: 'Produkcja Contentu AI' },
    { id: 'finance', label: 'Finanse', icon: DollarSign, description: 'Rozliczenia i zyski' },
    { id: 'content', label: 'Content', icon: Video, description: 'Zarządzanie mediami' },
    { id: 'academy', label: 'Akademia', icon: BookOpen, description: 'Kursy i progres' },
    { id: 'settings', label: 'System', icon: Settings, description: 'Konfiguracja serwerów' },
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
              <p className="text-[10px] text-gray-500 tracking-[2px] uppercase">HRL Industrial Automation v3.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end border-r border-white/10 pr-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">System Engine</span>
                <span className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-1.5 font-mono">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" /> Online / Encrypted
                </span>
             </div>
             <button 
               onClick={onLogout}
               className="bg-white/5 hover:bg-red-900/40 hover:text-red-500 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5"
             >
               Wyloguj
             </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-24 border-r border-white/5 bg-black/40 min-h-[calc(100vh-81px)] flex flex-col items-center py-8 gap-4">
           {tabs.map(tab => (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group relative",
                  activeTab === tab.id ? "bg-[#c9a84c] text-black shadow-2xl shadow-[#c9a84c]/30 scale-110" : "text-gray-600 hover:text-white hover:bg-white/5"
                )}
             >
                <tab.icon className="w-5 h-5" />
                <div className={cn(
                  "absolute left-full ml-4 px-3 py-1.5 bg-[#c9a84c] text-black text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all z-[200] whitespace-nowrap translate-x-4 group-hover:translate-x-0 shadow-2xl",
                  activeTab === tab.id && "hidden"
                )}>
                   {tab.label}
                </div>
             </button>
           ))}
        </aside>

        {/* Dynamic content viewport */}
        <main className="flex-1 p-10 overflow-y-auto custom-scrollbar h-[calc(100vh-81px)]">
           <AnimatePresence mode="wait">
             {activeTab === 'dashboard' && (
               <motion.div key="db" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
                  <header>
                    <h2 className="text-4xl font-light italic mb-2 tracking-tight">Status Operacyjny <span className="text-[#c9a84c]">HRL Academy</span></h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[4px] font-bold">Zestawienie analityczne czasu rzeczywistego // node_12</p>
                  </header>

                  {/* Core KPI Grid */}
                  <div className="grid grid-cols-4 gap-8">
                     {[
                       { label: 'Aktywne Kontrakty', value: stats.partners, icon: Users, color: '#c9a84c' },
                       { label: 'Active Nodes', value: stats.platforms, icon: Wifi, color: '#c9a84c' },
                       { label: 'Total Equity', value: stats.revenue, icon: BarChart3, color: '#22c55e' },
                       { label: 'System Assets', value: stats.courses, icon: BookOpen, color: '#c9a84c' }
                     ].map((s, i) => (
                       <div key={i} className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[32px] relative overflow-hidden group hover:border-[#c9a84c]/40 transition-all shadow-2xl">
                          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-700">
                             <s.icon className="w-24 h-24" style={{ color: s.color }} />
                          </div>
                          <p className="text-[9px] text-gray-600 uppercase tracking-[2px] mb-4 font-black">{s.label}</p>
                          <p className="text-3xl font-bold font-georgia italic">{loadingStats ? '...' : s.value}</p>
                          <div className="mt-4 flex items-center gap-2 text-[9px] text-green-500/60 uppercase font-black tracking-widest">
                             <TrendingUp className="w-3 h-3" /> Sync Active
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="grid grid-cols-3 gap-8">
                     <div className="col-span-2 bg-[#0d0d0d] border border-white/5 rounded-[40px] p-10 shadow-2xl">
                        <div className="flex justify-between items-center mb-10">
                           <h3 className="text-xl font-bold font-georgia italic text-white uppercase tracking-tighter">Szybkie <span className="text-[#c9a84c]">Działania</span></h3>
                           <Zap className="w-5 h-5 text-[#c9a84c] animate-pulse" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           {tabs.slice(1, 7).map(t => (
                             <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-[#c9a84c]/30 transition-all text-left group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#c9a84c] group-hover:scale-110 transition-transform shadow-inner">
                                   <t.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                   <p className="text-xs font-bold font-georgia text-white italic group-hover:text-[#c9a84c] transition-colors">{t.label}</p>
                                   <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{t.description}</p>
                                </div>
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="bg-[#0d0d0d] border border-white/5 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                           <Shield className="w-40 h-40 text-white" />
                        </div>
                        <h3 className="text-xl font-bold font-georgia italic text-white uppercase tracking-tighter mb-10">Security <span className="text-red-500">Alerts</span></h3>
                        <div className="space-y-8 relative z-10">
                           {[
                             { d: 'NOW', t: 'Nowa partnerka w Castingu', s: 'info' },
                             { d: '1H AGO', t: 'Przychód OF przekroczył EUR 5K', s: 'success' },
                             { d: '4H AGO', t: 'API Sync Error: MyFreeCams', s: 'error' }
                           ].map((a, i) => (
                             <div key={i} className="flex gap-6 border-b border-white/5 pb-6 last:border-0">
                                <div className={cn(
                                   "w-1 h-12 rounded-full",
                                   a.s === 'error' ? 'bg-red-500 shadow-[0_0_12px_#ef4444]' : a.s === 'success' ? 'bg-green-500' : 'bg-[#c9a84c]'
                                )} />
                                <div className="space-y-1">
                                   <p className="text-[11px] font-bold text-gray-200">{a.t}</p>
                                   <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{a.d}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                        <button className="w-full mt-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[4px] hover:bg-white/10 transition-all text-gray-400">Archiwum Systemowe</button>
                     </div>
                  </div>
               </motion.div>
             )}

             {activeTab === 'partners' && <motion.div key="pt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><PartnersManager token={token} /></motion.div>}
             {activeTab === 'casting' && <motion.div key="ca" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CastingManager token={token} /></motion.div>}
             {activeTab === 'platforms' && <motion.div key="pl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><PlatformsManager token={token} /></motion.div>}
             {activeTab === 'finance' && <motion.div key="fn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><FinanceManager token={token} /></motion.div>}
             {activeTab === 'content' && <motion.div key="cn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ContentManagementSystem token={token} /></motion.div>}
             {activeTab === 'academy' && <motion.div key="ac" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><AcademyManager token={token} /></motion.div>}
             {activeTab === 'settings' && <motion.div key="st" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><SystemSettings token={token} /></motion.div>}
             
             {activeTab === 'workshop' && (
                <motion.div key="ws" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
                   <AICreatorWorkshop embedded={true} token={token} />
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.3); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
