import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Shield, 
  Zap, 
  Info,
  ChevronLeft,
  ChevronRight,
  Database,
  Activity,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/utils';

interface AdminLog {
  id: string;
  createdAt: string;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ip?: string;
}

interface LogsManagerProps {
  token: string;
}

const LogsManager: React.FC<LogsManagerProps> = ({ token }) => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resourceFilter, setResourceFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        resource: resourceFilter,
        action: actionFilter
      });
      const response = await fetch(`/api/admin/logs?${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs);
        setTotalPages(data.pagination.pages);
      }
    } catch (e) {
      console.error('Error fetching logs:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [page, resourceFilter, actionFilter, token]);

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'text-green-500 bg-green-500/10';
    if (action.includes('DELETE')) return 'text-red-500 bg-red-500/10';
    if (action.includes('UPDATE')) return 'text-blue-500 bg-blue-500/10';
    if (action.includes('LOGIN')) return 'text-purple-500 bg-purple-500/10';
    return 'text-gray-400 bg-white/5';
  };

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case 'partners': return <User className="w-3 h-3" />;
      case 'casting': return <Zap className="w-3 h-3" />;
      case 'finance': return <Activity className="w-3 h-3" />;
      case 'academy': return <Database className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter text-glow">System <span className="text-white">AUDIT</span></h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase font-bold">Historia operacji i logi bezpieczeństwa infrastruktury</p>
        </div>
        <div className="flex gap-4">
           <select 
             className="bg-white/5 border border-white/10 text-white text-[10px] uppercase font-black px-4 py-2.5 rounded outline-none focus:border-[#c9a84c] transition-all"
             value={resourceFilter}
             onChange={(e) => { setResourceFilter(e.target.value); setPage(1); }}
           >
              <option value="all" className="bg-black">Wszystkie Zasoby</option>
              <option value="partners" className="bg-black">Partnerzy</option>
              <option value="casting" className="bg-black">Casting</option>
              <option value="finance" className="bg-black">Finanse</option>
              <option value="academy" className="bg-black">Akademia</option>
           </select>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: 'Ostatnie 24h', val: logs.length > 0 ? 'Active' : 'Idle', icon: Activity, color: '#c9a84c' },
           { label: 'Admini Online', val: '1', icon: Shield, color: '#22c55e' },
           { label: 'Typ Logowania', val: 'Prisma + NextAuth', icon: History, color: '#ffffff' },
           { label: 'Integrity Check', val: 'Secure', icon: AlertCircle, color: '#c9a84c' }
         ].map((s, i) => (
           <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#c9a84c]/20 transition-all cursor-default">
              <div>
                <p className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-xl font-bold font-georgia italic">{s.val}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5">
                <s.icon className="w-5 h-5 opacity-30" style={{ color: s.color }} />
              </div>
           </div>
         ))}
      </div>

      {/* Logs Table */}
      <div className="bg-[#0b0b0b] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[3px]">Timestamp</th>
                  <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[3px]">Admin</th>
                  <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[3px]">Akcja</th>
                  <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[3px]">Zasób</th>
                  <th className="px-8 py-5 text-[9px] font-black text-gray-500 uppercase tracking-[3px]">Szczegóły</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {loading ? (
                 <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-700 uppercase tracking-[10px] animate-pulse">Dekodowanie logów...</td>
                 </tr>
               ) : logs.length === 0 ? (
                 <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-800 uppercase tracking-[10px]">Brak zarejestrowanych zdarzeń</td>
                 </tr>
               ) : logs.map((log) => (
                 <tr key={log.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3 text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-mono">{new Date(log.createdAt).toLocaleString()}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] text-[8px] font-black uppercase">
                             {log.adminEmail.charAt(0)}
                          </div>
                          <span className="text-[10px] font-bold text-white/80">{log.adminEmail}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className={cn(
                         "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest inline-flex items-center gap-2",
                         getActionColor(log.action)
                       )}>
                          <div className="w-1 h-1 rounded-full bg-current" />
                          {log.action.replace(/_/g, ' ')}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2 text-gray-400">
                          {getResourceIcon(log.resource)}
                          <span className="text-[9px] font-black uppercase tracking-widest">{log.resource}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-4">
                          <p className="text-[10px] text-gray-500 italic line-clamp-1 max-w-[200px]">{log.details || 'Brak dodatkowych danych'}</p>
                          {log.details && (
                             <button 
                               onClick={() => alert(JSON.stringify(JSON.parse(log.details!), null, 2))}
                               className="p-1.5 hover:text-[#c9a84c] transition-colors"
                             >
                                <Info className="w-3.5 h-3.5" />
                             </button>
                          )}
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>

         {/* Pagination */}
         <div className="p-6 border-t border-white/5 flex items-center justify-between bg-black/20">
            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black">Strona {page} z {totalPages}</p>
            <div className="flex gap-2">
               <button 
                 disabled={page === 1}
                 onClick={() => setPage(p => p - 1)}
                 className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all"
               >
                  <ChevronLeft className="w-4 h-4" />
               </button>
               <button 
                 disabled={page === totalPages}
                 onClick={() => setPage(p => p + 1)}
                 className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all"
               >
                  <ChevronRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.3); }
      `}</style>
    </div>
  );
};

export default LogsManager;
