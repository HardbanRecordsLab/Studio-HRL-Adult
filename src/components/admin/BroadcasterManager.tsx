import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  WifiOff, 
  Zap, 
  Activity, 
  Server, 
  Shield, 
  Settings, 
  Play, 
  Square, 
  Terminal, 
  Database,
  Globe,
  Share2,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '@/utils/utils';

interface BroadcasterTarget {
  id: string;
  name: string;
  url: string;
  key: string;
  status: 'online' | 'offline' | 'error' | 'syncing';
  bitrate: string;
  fps: number;
}

interface BroadcasterManagerProps {
  token: string;
}

const BroadcasterManager: React.FC<BroadcasterManagerProps> = ({ token }) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [inboundConnected, setInboundConnected] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  
  const [targets, setTargets] = useState<BroadcasterTarget[]>([
    { id: '1', name: 'Chaturbate', url: 'rtmp://live.chaturbate.com/live', key: '••••••••••••••••', status: 'offline', bitrate: '0 kbps', fps: 0 },
    { id: '2', name: 'Stripchat', url: 'rtmp://live.stripchat.com/live', key: '••••••••••••••••', status: 'offline', bitrate: '0 kbps', fps: 0 },
    { id: '3', name: 'BongaCams', url: 'rtmp://live.bongacams.com/live', key: '••••••••••••••••', status: 'offline', bitrate: '0 kbps', fps: 0 },
    { id: '4', name: 'OnlyFans Live', url: 'rtmps://live.onlyfans.com/live', key: '••••••••••••••••', status: 'offline', bitrate: '0 kbps', fps: 0 }
  ]);

  const toggleBroadcasting = () => {
    setIsBroadcasting(!isBroadcasting);
    setTargets(targets.map(t => ({
      ...t,
      status: !isBroadcasting ? 'online' : 'offline',
      bitrate: !isBroadcasting ? '4500 kbps' : '0 kbps',
      fps: !isBroadcasting ? 60 : 0
    })));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter text-glow">HRL <span className="text-white">Broadcaster</span> UNIT</h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase font-bold">Relay Server: <span className={inboundConnected ? 'text-green-500' : 'text-red-500'}>{inboundConnected ? 'CONNECTED' : 'STANDBY'}</span> // Cloud Cluster #4</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={toggleBroadcasting}
             className={cn(
               "flex items-center gap-3 px-8 py-3 text-[10px] font-black uppercase tracking-[4px] rounded-full transition-all shadow-2xl",
               isBroadcasting 
                ? "bg-red-500 text-white shadow-red-500/20 hover:bg-red-600" 
                : "bg-[#c9a84c] text-black shadow-[#c9a84c]/20 hover:scale-105"
             )}
           >
              {isBroadcasting ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isBroadcasting ? "Stop All Streams" : "Start Global Broadcast"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Monitor */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
           <div className="aspect-video bg-[#050505] border border-white/5 rounded-[40px] overflow-hidden relative group shadow-2xl">
              {isBroadcasting ? (
                <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                   <div className="text-center space-y-4">
                      <div className="w-20 h-20 border-2 border-[#c9a84c]/20 border-t-[#c9a84c] rounded-full animate-spin mx-auto" />
                      <p className="text-[10px] text-[#c9a84c] uppercase tracking-[8px] animate-pulse">Live Signal Monitor Active</p>
                   </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                   <WifiOff className="w-20 h-20 text-white/5" />
                   <p className="absolute bottom-10 text-[10px] text-gray-700 uppercase tracking-widest">No Inbound Signal Detected</p>
                </div>
              )}
              
              {/* Overlay HUD */}
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none">
                 <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-3">
                    <div className={cn("w-2 h-2 rounded-full", isBroadcasting ? 'bg-red-500 animate-pulse' : 'bg-gray-600')} />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{isBroadcasting ? 'LIVE' : 'OFFLINE'}</span>
                 </div>
                 <div className="flex gap-3">
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-bold text-white/60">4K // 60FPS</div>
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-bold text-[#c9a84c]">8500 kbps</div>
                 </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                 <div className="flex gap-8">
                    <div>
                       <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Enc Type</p>
                       <p className="text-[10px] font-bold text-white">NVENC H.264</p>
                    </div>
                    <div>
                       <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Server Latency</p>
                       <p className="text-[10px] font-bold text-green-500">12ms</p>
                    </div>
                    <div>
                       <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Dropped Frames</p>
                       <p className="text-[10px] font-bold text-white">0 (0.0%)</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-white"><Settings className="w-5 h-5" /></button>
                 </div>
              </div>
           </div>

           {/* Inbound Settings */}
           <div className="bg-[#0d0d0d] border border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl">
              <div>
                 <h3 className="text-xl font-bold font-georgia italic text-white mb-2">Konfiguracja <span className="text-[#c9a84c]">Inbound</span></h3>
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">Dane do wprowadzenia w OBS modelki</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-2">Serwer RTMP (Primary)</label>
                    <div className="relative">
                       <input readOnly value="rtmp://broadcast.hrlstudio.com/live" className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-[11px] text-white font-mono outline-none" />
                       <button onClick={() => handleCopy("rtmp://broadcast.hrlstudio.com/live", 'url')} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#c9a84c] hover:bg-[#c9a84c]/10 rounded-lg transition-all">
                          {copied === 'url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-2">Stream Key (HRL-SECURE)</label>
                    <div className="relative">
                       <input readOnly value="HRL_STUDIO_LIVE_SECURE_TOKEN_5521" className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-[11px] text-white font-mono outline-none" />
                       <button onClick={() => handleCopy("HRL_STUDIO_LIVE_SECURE_TOKEN_5521", 'key')} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#c9a84c] hover:bg-[#c9a84c]/10 rounded-lg transition-all">
                          {copied === 'key' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar: Targets */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-[#0d0d0d] border border-white/5 rounded-[40px] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                 <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-[#c9a84c]" />
                    <h3 className="text-[12px] font-black text-white uppercase tracking-widest">Targety (Relay)</h3>
                 </div>
                 <span className="text-[9px] font-black text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full uppercase tracking-widest">{targets.length} Aktywnych</span>
              </div>

              <div className="space-y-4">
                 {targets.map((t) => (
                    <div key={t.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-[#c9a84c]/20 transition-all group">
                       <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                             <div className={cn("w-1.5 h-1.5 rounded-full", t.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-700')} />
                             <span className="text-sm font-bold text-white group-hover:text-[#c9a84c] transition-colors">{t.name}</span>
                          </div>
                          <button className="p-2 text-gray-700 hover:text-white transition-all"><Settings className="w-4 h-4" /></button>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                             <p className="text-[7px] text-gray-500 uppercase tracking-widest mb-1">Bitrate</p>
                             <p className="text-[10px] font-bold text-white font-mono">{t.bitrate}</p>
                          </div>
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                             <p className="text-[7px] text-gray-500 uppercase tracking-widest mb-1">Status</p>
                             <p className={cn("text-[8px] font-black uppercase tracking-widest", t.status === 'online' ? 'text-green-500' : 'text-gray-600')}>{t.status}</p>
                          </div>
                       </div>

                       <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                          <span className="text-[9px] text-gray-600 font-mono italic">rtmp://live...</span>
                          <button className={cn(
                            "px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all",
                            t.status === 'online' ? 'border-red-500/30 text-red-500 hover:bg-red-500/10' : 'border-white/10 text-gray-500 hover:text-white'
                          )}>
                             {t.status === 'online' ? 'Drop' : 'Connect'}
                          </button>
                       </div>
                    </div>
                 ))}
              </div>

              <button className="w-full mt-8 py-4 bg-white/5 border border-dashed border-white/10 rounded-3xl text-[9px] font-black text-gray-500 uppercase tracking-[4px] hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-all">
                 + Dodaj Punkt Dystrybucji
              </button>
           </div>

           {/* Metrics */}
           <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/10 rounded-[40px] p-8 space-y-6">
              <div className="flex items-center gap-3">
                 <Activity className="w-5 h-5 text-[#c9a84c]" />
                 <h3 className="text-[12px] font-black text-white uppercase tracking-widest">Network Health</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Uplink (From OBS)', val: '98%', status: 'Excellent' },
                   { label: 'Downlink (To Relay)', val: '99.9%', status: 'Stable' },
                   { label: 'Memory Load', val: '12%', status: 'Optimum' }
                 ].map((m, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-[10px] mb-2 font-bold">
                         <span className="text-gray-400 uppercase tracking-widest">{m.label}</span>
                         <span className="text-[#c9a84c]">{m.val}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-[#c9a84c] rounded-full shadow-[0_0_10px_#c9a84c]" style={{ width: m.val }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <style jsx global>{`
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.3); }
      `}</style>
    </div>
  );
};

export default BroadcasterManager;
