import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  RefreshCw, 
  Settings, 
  Users, 
  Layers, 
  ExternalLink, 
  Shield, 
  Lock, 
  Check, 
  X,
  ChevronRight,
  Activity,
  Zap,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/utils/utils';

interface PlatformData {
  username?: string;
  url?: string;
  followers?: number;
  posts?: number;
  apiKey?: string;
  lastSync?: string;
}

interface UnifiedPlatformManagerProps {
  platform: string;
  icon: string;
  color: string;
  features: string[];
  data: PlatformData;
  onUpdate: (platform: string, data: PlatformData) => void;
  onSync: (platform: string) => void;
}

const UnifiedPlatformManager: React.FC<UnifiedPlatformManagerProps> = ({
  platform,
  icon,
  color,
  features,
  data,
  onUpdate,
  onSync
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    onUpdate(platform, editData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-[#0d0d0d] border border-white/5 rounded-[32px] overflow-hidden hover:border-[#c9a84c]/30 transition-all shadow-2xl relative"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
         <Globe className="w-32 h-32 text-white" />
      </div>

      {/* Header Info */}
      <div className="p-8 pb-4 flex justify-between items-start relative z-10">
         <div className="flex items-center gap-4">
            <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5`}>
               {icon}
            </div>
            <div>
               <h3 className="text-xl font-bold text-white font-georgia italic uppercase tracking-tighter group-hover:text-[#c9a84c] transition-colors">{platform}</h3>
               <p className="text-[8px] text-gray-500 font-black uppercase tracking-[2px]">Core Platform Engine</p>
            </div>
         </div>
         <div className="flex gap-2">
            <button onClick={() => onSync(platform)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all">
               <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={() => setIsEditing(!isEditing)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all">
               <Settings className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Vital Stats */}
      <div className="px-8 py-6 grid grid-cols-2 gap-6 relative z-10">
         <div className="space-y-1">
            <p className="text-[7px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-1.5"><Users className="w-3 h-3 text-[#c9a84c]" /> Followers</p>
            <p className="text-2xl font-bold text-white tracking-tighter">{(data.followers || 0).toLocaleString()}</p>
         </div>
         <div className="space-y-1">
            <p className="text-[7px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-1.5"><Layers className="w-3 h-3 text-blue-500" /> Assets</p>
            <p className="text-2xl font-bold text-white tracking-tighter">{(data.posts || 0).toLocaleString()}</p>
         </div>
      </div>

      {/* Feature Badges */}
      <div className="px-8 pb-8 flex flex-wrap gap-2 relative z-10">
         {features.map((feature, i) => (
           <span key={i} className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full text-[8px] font-black text-gray-500 uppercase tracking-widest group-hover:border-[#c9a84c]/20 group-hover:text-gray-400 transition-all">{feature}</span>
         ))}
      </div>

      {/* Synchronization Status */}
      <div className="px-8 py-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[8px] font-bold text-gray-600 uppercase tracking-[2px]">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            {data.lastSync ? `Last Sync: ${new Date(data.lastSync).toLocaleTimeString()}` : 'Idle'}
         </div>
         <Activity className="w-3 h-3 opacity-30" />
      </div>

      {/* Secure Configuration Panel (Overlay) */}
      <AnimatePresence>
         {isEditing && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="absolute inset-0 z-20 bg-[#0d0d0d] p-8 flex flex-col justify-between"
           >
              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-[3px] flex items-center gap-2">
                       <Shield className="w-4 h-4 text-[#c9a84c]" /> Config: {platform}
                    </h4>
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/5 rounded-lg transition-all"><X className="w-4 h-4 text-gray-500" /></button>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[7px] text-gray-600 uppercase tracking-widest font-black">Platform Username</label>
                       <input 
                         type="text" 
                         value={editData.username || ''}
                         onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-700 font-mono"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[7px] text-gray-600 uppercase tracking-widest font-black">Platform Secret / API Key</label>
                       <div className="relative">
                          <input 
                            type="password" 
                            value={editData.apiKey || ''}
                            onChange={(e) => setEditData({ ...editData, apiKey: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-[#c9a84c] focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-700 font-mono"
                            placeholder="••••••••••••••••"
                          />
                          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 pt-6">
                 <button onClick={() => setIsEditing(false)} className="flex-1 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-all">Cancel</button>
                 <button onClick={handleSave} className="flex-1 py-3 bg-[#c9a84c]/10 text-[9px] font-black text-[#c9a84c] border border-[#c9a84c]/20 uppercase tracking-widest rounded-xl hover:bg-[#c9a84c] hover:text-black transition-all">Zapisz Zmiany</button>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UnifiedPlatformManager;

export default UnifiedPlatformManager;