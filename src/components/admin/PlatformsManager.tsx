import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Settings, 
  Activity, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  Wifi, 
  WifiOff,
  Globe,
  Zap,
  Shield,
  Terminal,
  Server,
  X
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  type: 'livecam' | 'fansite';
  category: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync?: string;
  apiKey?: string;
  apiSecret?: string;
  webhookUrl?: string;
  syncFrequency: number; // minutes
  isActive: boolean;
  errorCount: number;
  lastError?: string;
  stats?: {
    totalRevenue: number;
    monthlyRevenue: number;
    activeModels: number;
    totalSessions: number;
  };
  config?: {
    commissionRate: number;
    payoutThreshold: number;
    autoSync: boolean;
    notifications: boolean;
  };
}

interface PlatformsManagerProps {
  token: string;
}

const PlatformsManager: React.FC<PlatformsManagerProps> = ({ token }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [syncingPlatforms, setSyncingPlatforms] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/platforms', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPlatforms(data);
      }
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    let filtered = platforms;
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (typeFilter !== 'all') filtered = filtered.filter(p => p.type === typeFilter);
    setFilteredPlatforms(filtered);
  }, [platforms, searchTerm, typeFilter]);

  const handleSync = (platformId: string) => {
    setSyncingPlatforms(prev => new Set(prev).add(platformId));
    setTimeout(() => {
      setSyncingPlatforms(prev => {
        const next = new Set(prev);
        next.delete(platformId);
        return next;
      });
    }, 2000);
  };

  if (loading) {
    return (
       <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="w-12 h-12 border-2 border-[#c9a84c]/20 border-t-[#c9a84c] rounded-full animate-spin" />
          <p className="text-[10px] text-gray-500 uppercase tracking-[5px] animate-pulse">Inicjalizacja Sieci Platform...</p>
       </div>
    );
  }

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">HRL <span className="text-white">Platform</span> CONNECT</h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase">Integracja API, synchronizacja danych i monitoring połączeń cam/fansite</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setShowModal(true)} className="flex items-center gap-3 px-6 py-2.5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/10">
              <PlusIcon className="w-4 h-4" /> Dodaj Nową Platformę
           </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: 'Aktywne Nody', val: platforms.length, growth: 'Stable Connection', icon: Server, color: '#c9a84c' },
           { label: 'Uptime (24h)', val: '99.9%', growth: 'Network OK', icon: Globe, color: '#22c55e' },
           { label: 'Sync Requests', val: '1.2k', growth: '+250 dzisiaj', icon: Activity, color: '#ffffff' },
           { label: 'API Health', val: 'Excelent', growth: 'Ready', icon: Shield, color: '#c9a84c' }
         ].map((s, i) => (
           <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#c9a84c]/20 transition-all cursor-default relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl font-bold font-georgia">{s.val}</p>
                <p className="text-[8px] text-[#c9a84c] mt-1 font-black uppercase tracking-widest">{s.growth}</p>
              </div>
              <s.icon className="w-10 h-10 opacity-5 group-hover:opacity-20 transition-opacity absolute right-4 bottom-4" style={{ color: s.color }} />
           </div>
         ))}
      </div>

      {/* Filters & Content */}
      <div className="space-y-6">
         <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex gap-4">
               {['all', 'livecam', 'fansite'].map((f) => (
                 <button 
                   key={f}
                   onClick={() => setTypeFilter(f)}
                   className={`text-[9px] font-black uppercase tracking-[2px] px-4 py-2 rounded-full transition-all ${typeFilter === f ? 'bg-[#c9a84c] text-black' : 'text-gray-500 hover:text-white'}`}
                 >
                   {f === 'all' ? 'Wszystkie' : f}
                 </button>
               ))}
            </div>
            <div className="relative w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
               <input 
                 type="text" 
                 placeholder="Szukaj platformy..." 
                 className="w-full bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-[9px] text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 uppercase tracking-[2px]" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlatforms.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-[#c9a84c]/30 transition-all group"
              >
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-bold text-white group-hover:text-[#c9a84c] transition-colors">
                          {p.name.charAt(0)}
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#c9a84c] transition-colors">{p.name}</h4>
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest">{p.category}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${p.status === 'connected' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                       <span className="text-[8px] font-black text-white uppercase tracking-widest">{p.status}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                    <div>
                       <p className="text-[7px] text-gray-500 uppercase tracking-widest mb-1">Miesięczny Przychod</p>
                       <p className="text-sm font-bold font-georgia text-white">€{p.stats?.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-[7px] text-gray-500 uppercase tracking-widest mb-1">Aktywne Modelki</p>
                       <p className="text-sm font-bold font-georgia text-white">{p.stats?.activeModels}</p>
                    </div>
                 </div>

                 <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-3">
                       <button 
                         onClick={() => handleSync(p.id)}
                         className={`p-2 bg-white/5 rounded-lg text-gray-500 hover:text-[#c9a84c] transition-all ${syncingPlatforms.has(p.id) ? 'animate-spin text-[#c9a84c]' : ''}`}
                       >
                         <RefreshCw className="w-4 h-4" />
                       </button>
                       <button onClick={() => { setSelectedPlatform(p); setShowLogsModal(true); }} className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"><Terminal className="w-4 h-4" /></button>
                    </div>
                    <button className="flex items-center gap-2 text-[8px] font-black text-white hover:text-[#c9a84c] uppercase tracking-widest transition-all">
                       Konfiguracja <Settings className="w-3 h-3" />
                    </button>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>

      {/* Logs Modal */}
      <AnimatePresence>
         {showLogsModal && selectedPlatform && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogsModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                 animate={{ opacity: 1, scale: 1, y: 0 }} 
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
               >
                  <div className="p-6 border-b border-white/5 bg-[#111] flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#c9a84c]/10 rounded-lg"><Terminal className="w-4 h-4 text-[#c9a84c]" /></div>
                        <div>
                          <h3 className="text-sm font-bold text-white tracking-widest uppercase">Platform API Terminal</h3>
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest">{selectedPlatform.name} // Session #{selectedPlatform.id}</p>
                        </div>
                     </div>
                     <button onClick={() => setShowLogsModal(false)} className="p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
                  </div>

                  <div className="p-6 bg-black font-mono text-[10px] h-80 overflow-y-auto space-y-2 custom-scrollbar">
                     <p className="text-gray-500">[{new Date().toISOString()}] Initializing connection to {selectedPlatform.name} API...</p>
                     <p className="text-green-500">[{new Date().toISOString()}] Connection established. Auth token verified.</p>
                     <p className="text-[#c9a84c]">[{new Date().toISOString()}] Fetching model data for {selectedPlatform.stats?.activeModels} nodes...</p>
                     <p className="text-gray-500">[{new Date().toISOString()}] Synchronizing revenue stream: €{selectedPlatform.stats?.monthlyRevenue} identified.</p>
                     <p className="text-blue-500">[{new Date().toISOString()}] Webhook heartbeat active. Monitoring for event callbacks.</p>
                     <div className="pt-2 animate-pulse text-white">_</div>
                  </div>

                  <div className="p-6 bg-[#111] border-t border-white/5 flex justify-end gap-3">
                     <button onClick={() => handleSync(selectedPlatform.id)} className="px-6 py-2 bg-white/5 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">Force Re-sync</button>
                     <button onClick={() => setShowLogsModal(false)} className="px-6 py-2 bg-[#c9a84c] text-black text-[9px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all">Close Instance</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
      `}</style>
    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default PlatformsManager;
