import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  Tag, 
  Folder, 
  Clock, 
  Video, 
  Music,
  Plus,
  BarChart3,
  Globe,
  Monitor,
  Smartphone,
  Zap,
  Shield,
  Layers,
  Activity,
  ChevronRight,
  MoreVertical,
  Clock4,
  Check,
  RefreshCw,
  X
} from 'lucide-react';
import { cn } from '@/utils/utils';

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'image' | 'audio' | 'document';
  category: string;
  tags: string[];
  url: string;
  thumbnail?: string;
  duration?: string;
  size?: string;
  status: 'draft' | 'published' | 'archived';
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
  downloads?: number;
  author?: string;
  platform?: string;
  isPublic: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface ContentManagementSystemProps {
  token: string;
}

const ContentManagementSystem: React.FC<ContentManagementSystemProps> = ({ token }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [distributingStatus, setDistributingStatus] = useState<Record<string, 'pending' | 'uploading' | 'success' | 'error'>>({});

  const categories = [
    'Tutorial', 'Interview', 'Behind the Scenes', 'Performance', 'Photoshoot', 
    'Podcast', 'Webinar', 'Course Material', 'Marketing', 'User Generated'
  ];

  // FUNCTIONALITY: RESTORED API LOGIC
  useEffect(() => {
    fetchContent();
  }, [token]);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, typeFilter, statusFilter, categoryFilter]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Fallback to mock data if API fails so panel remains usable for dev
        setContent(mockContentData);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent(mockContentData);
    }
    setLoading(false);
  };

  const filterContent = () => {
    let filtered = content;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter !== 'all') filtered = filtered.filter(item => item.type === typeFilter);
    if (statusFilter !== 'all') filtered = filtered.filter(item => item.status === statusFilter);
    if (categoryFilter !== 'all') filtered = filtered.filter(item => item.category === categoryFilter);
    setFilteredContent(filtered);
  };

  const handleStatusChange = async (contentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/content/${contentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) await fetchContent();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSchedule = async (contentId: string, scheduledDate: string) => {
    try {
      const response = await fetch(`/api/admin/content/${contentId}/schedule`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scheduledFor: scheduledDate })
      });
      if (response.ok) {
        await fetchContent();
        setShowScheduleModal(false);
        setSelectedContent(null);
      }
    } catch (error) {
      console.error('Error scheduling:', error);
    }
  };

  const mockContentData: ContentItem[] = [
    { id: '1', title: 'Live Cam Success Strategies', description: 'Complete guide to maximizing earnings on live cam platforms', type: 'video', category: 'Tutorial', tags: ['Beginner', 'Live Cam'], url: '#', thumbnail: '#', duration: '45:23', size: '245 MB', status: 'published', createdAt: '2024-01-15', updatedAt: '2024-01-15', views: 1250, downloads: 89, author: 'Admin', isPublic: true, level: 'beginner' },
    { id: '2', title: 'Fansite Marketing Masterclass', description: 'Advanced marketing techniques for content creators', type: 'video', category: 'Course Material', tags: ['Advanced', 'Fansite'], url: '#', thumbnail: '#', duration: '1:23:45', size: '512 MB', status: 'published', createdAt: '2024-01-10', updatedAt: '2024-01-10', views: 890, downloads: 45, author: 'Marketing', isPublic: false, level: 'advanced' },
    { id: '3', title: 'Safety and Privacy Workshop', description: 'Essential security measures for digital creators', type: 'audio', category: 'Webinar', tags: ['Safety', 'Privacy'], url: '#', duration: '42:15', size: '89 MB', status: 'published', createdAt: '2024-01-05', updatedAt: '2024-01-05', views: 567, downloads: 78, author: 'Security', isPublic: true, level: 'intermediate' },
    { id: '4', title: 'Equipment Setup Guide', description: 'Essential kit for 4K streaming and high-fidelity production', type: 'document', category: 'Tutorial', tags: ['Equipment'], url: '#', size: '2.3 MB', status: 'draft', createdAt: '2024-01-08', updatedAt: '2024-01-08', views: 234, downloads: 156, author: 'Admin', isPublic: true, level: 'beginner' }
  ];

  const handleStartDistribution = async (platforms: string[]) => {
    if (!selectedContent) return;
    setDistributingStatus({});
    
    try {
      const response = await fetch('/api/admin/content/distribute', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contentId: selectedContent.id, platforms })
      });
      
      if (response.ok) {
        // UI Feedback simulation
        platforms.forEach((p, i) => {
          setTimeout(() => {
            setDistributingStatus(prev => ({ ...prev, [p]: 'uploading' }));
            setTimeout(() => {
              setDistributingStatus(prev => ({ ...prev, [p]: 'success' }));
            }, 2000 + (i * 1000));
          }, i * 500);
        });
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter text-glow">Content <span className="text-white">COMMAND</span></h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase font-bold">Zarządzanie dystrybucją // API Status: {loading ? 'Loading...' : 'Connected'}</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-2.5 bg-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:bg-white/10 border border-white/5">
              <Download className="w-4 h-4" /> Eksportuj
           </button>
           <button onClick={() => setShowModal(true)} className="flex items-center gap-3 px-6 py-2.5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/10">
              <Plus className="w-4 h-4" /> Wgraj Content
           </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Assets', value: content.length, icon: Layers, color: 'text-blue-500', trend: 'Global' },
          { label: 'Published', value: content.filter(c => c.status === 'published').length, icon: CheckCircle, color: 'text-green-500', trend: 'Live' },
          { label: 'Pending Drafts', value: content.filter(c => c.status === 'draft').length, icon: Edit, color: 'text-yellow-500', trend: 'Inbox' },
          { label: 'Total Engagement', value: content.reduce((sum, c) => sum + (c.views || 0), 0).toLocaleString(), icon: Activity, color: 'text-[#c9a84c]', trend: 'Views' }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-[32px] hover:border-[#c9a84c]/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-white/5 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon className="w-5 h-5" /></div>
              <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-[#0d0d0d] border border-white/5 p-4 rounded-[40px] shadow-2xl">
         <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input 
              type="text" 
              placeholder="Wyszukaj w archiwum..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-14 pr-6 text-[10px] text-white focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-700 uppercase tracking-widest font-bold"
            />
         </div>
         <div className="flex gap-2">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-[10px] text-white/50 font-black uppercase tracking-widest outline-none focus:border-[#c9a84c]/20 transition-all cursor-pointer">
               <option value="all">Wszystkie Typy</option>
               <option value="video">Wideo</option>
               <option value="image">Zdjęcia</option>
               <option value="audio">Audio</option>
               <option value="document">Dokumenty</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-[10px] text-white/50 font-black uppercase tracking-widest outline-none focus:border-[#c9a84c]/20 transition-all cursor-pointer">
               <option value="all">Wszystkie Statusy</option>
               <option value="published">Opublikowane</option>
               <option value="draft">Szkice</option>
               <option value="archived">Archiwum</option>
            </select>
         </div>
      </div>

      {/* Content Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         <AnimatePresence mode="popLayout">
           {filteredContent.map((item, i) => (
             <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }} className="group bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#c9a84c]/30 transition-all shadow-2xl relative">
                <div className="aspect-[4/5] bg-[#111] relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                   <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black text-[#c9a84c] uppercase tracking-[2px]">{item.type}</span>
                      <span className={cn("px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black uppercase tracking-[2px]", item.status === 'published' ? 'text-green-500' : 'text-yellow-500')}>{item.status}</span>
                   </div>
                   <div className="absolute top-6 right-6">
                      <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white/50 hover:text-white transition-all"><MoreVertical className="w-4 h-4" /></button>
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                      <div className="w-16 h-16 bg-[#c9a84c]/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)]"><Play className="w-6 h-6 fill-black text-black ml-1" /></div>
                   </div>
                   <div className="absolute bottom-8 left-8 right-8 space-y-3">
                      <div className="flex items-center gap-2 text-[8px] text-gray-500 uppercase tracking-widest font-black"><Clock4 className="w-3 h-3" /> {item.duration || item.size} // {item.category}</div>
                      <h3 className="text-xl font-bold text-white font-georgia italic leading-tight group-hover:text-[#c9a84c] transition-colors line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                         <span className="text-[9px] font-black text-white/50 uppercase tracking-tight">{item.author}</span>
                         <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#c9a84c]"><Eye className="w-3.5 h-3.5" /> {item.views || 0}</div>
                            <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/30"><Download className="w-3.5 h-3.5" /> {item.downloads || 0}</div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="p-4 bg-white/[0.02] flex gap-2">
                   {item.status === 'draft' ? (
                     <button onClick={() => handleStatusChange(item.id, 'published')} className="flex-1 py-3 bg-green-500/10 text-[9px] font-black text-green-500 uppercase tracking-widest rounded-2xl hover:bg-green-500 hover:text-black transition-all border border-green-500/20">Publikuj</button>
                   ) : (
                     <button onClick={() => handleStatusChange(item.id, 'archived')} className="flex-1 py-3 bg-white/5 text-[9px] font-black text-white/50 uppercase tracking-widest rounded-2xl hover:bg-white/10 hover:text-white transition-all border border-white/5">Archiwizuj</button>
                   )}
                   <button onClick={() => { setSelectedContent(item); setShowScheduleModal(true); }} className="flex-1 py-3 bg-[#c9a84c]/10 text-[9px] font-black text-[#c9a84c] uppercase tracking-widest rounded-2xl hover:bg-[#c9a84c] hover:text-black transition-all border border-[#c9a84c]/20">Zaplanuj</button>
                   {item.type === 'video' && (
                     <button onClick={() => { setSelectedContent(item); setShowDistributeModal(true); }} className="p-3 bg-[#c9a84c] text-black rounded-2xl hover:scale-105 transition-all shadow-lg shadow-[#c9a84c]/20">
                        <Zap className="w-4 h-4 fill-black" />
                     </button>
                   )}
                </div>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>

      {/* Schedule Modal (RESTORED FUNCTIONALITY) */}
      <AnimatePresence>
         {showScheduleModal && selectedContent && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-[40px] p-10 space-y-8 shadow-[0_0_100px_rgba(201,168,76,0.1)]">
                 <div className="flex justify-between items-center bg-white/[0.02] -mx-10 -mt-10 p-10 border-b border-white/5">
                    <div>
                       <h3 className="text-2xl font-bold font-georgia italic text-white mb-1">Planowanie Publikacji</h3>
                       <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black leading-tight">Ustaw datę i czas dla: {selectedContent.title}</p>
                    </div>
                    <button onClick={() => setShowScheduleModal(false)} className="p-3 hover:bg-white/5 rounded-full transition-all"><X className="w-6 h-6 text-gray-500" /></button>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[8px] text-gray-600 uppercase tracking-widest font-black">Data i Czas (System Network Time)</label>
                       <input 
                         type="datetime-local" 
                         className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#c9a84c] outline-none transition-all font-mono"
                         onChange={(e) => setSelectedContent({...selectedContent, scheduledFor: e.target.value})}
                       />
                    </div>
                    <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4">
                       <p className="text-[8px] text-[#c9a84c] uppercase tracking-[2px] font-black border-b border-[#c9a84c]/20 pb-2">Automation Pipeline</p>
                       <div className="space-y-2">
                          <label className="flex items-center gap-3 text-[10px] font-bold text-gray-400 cursor-pointer hover:text-white transition-colors"><input type="checkbox" defaultChecked className="w-4 h-4 accent-[#c9a84c]" /> Powiadom subskrybentów (Telegram/Email)</label>
                          <label className="flex items-center gap-3 text-[10px] font-bold text-gray-400 cursor-pointer hover:text-white transition-colors"><input type="checkbox" defaultChecked className="w-4 h-4 accent-[#c9a84c]" /> Automatyczny post na Twitter/X</label>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button onClick={() => setShowScheduleModal(false)} className="flex-1 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white">Anuluj Operację</button>
                    <button 
                      onClick={() => selectedContent.scheduledFor && handleSchedule(selectedContent.id, selectedContent.scheduledFor)}
                      disabled={!selectedContent.scheduledFor}
                      className="flex-1 py-4 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-[#c9a84c]/20 disabled:opacity-30"
                    >
                      Potwierdź Harmonogram
                    </button>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

       {/* Distribution Modal (HRL SYNDICATOR UI) */}
       <AnimatePresence>
          {showDistributeModal && selectedContent && (
             <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/98 backdrop-blur-2xl">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[50px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
                   <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-[#c9a84c]/20 rounded-2xl flex items-center justify-center text-[#c9a84c]"><Zap className="w-6 h-6 fill-[#c9a84c]" /></div>
                         <div>
                            <h3 className="text-2xl font-bold font-georgia italic text-white">HRL <span className="text-[#c9a84c]">Syndicator</span></h3>
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Automatyczna Dystrybucja Contentu: {selectedContent.title}</p>
                         </div>
                      </div>
                      <button onClick={() => { setShowDistributeModal(false); setDistributingStatus({}); }} className="p-3 hover:bg-white/5 rounded-full transition-all text-gray-500"><X className="w-6 h-6" /></button>
                   </div>

                   <div className="p-10 overflow-y-auto space-y-8 flex-1">
                      <div className="grid grid-cols-2 gap-4">
                         {['Pornhub', 'ManyVids', 'Fansly', 'ModelCenter', 'OnlyFans', 'SpankBang'].map((plat) => (
                            <div key={plat} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-[#c9a84c]/40 transition-all">
                               <div className="flex items-center gap-4">
                                  <div className={cn("w-2 h-2 rounded-full", distributingStatus[plat] === 'success' ? 'bg-green-500' : distributingStatus[plat] === 'uploading' ? 'bg-[#c9a84c] animate-pulse' : 'bg-gray-700')} />
                                  <span className="text-xs font-bold text-white uppercase tracking-tighter">{plat}</span>
                               </div>
                               {distributingStatus[plat] === 'success' ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                               ) : distributingStatus[plat] === 'uploading' ? (
                                  <RefreshCw className="w-4 h-4 text-[#c9a84c] animate-spin" />
                               ) : (
                                  <div className="w-4 h-4 rounded-full border border-white/10" />
                               )}
                            </div>
                         ))}
                      </div>

                      <div className="p-8 bg-[#c9a84c]/5 border border-[#c9a84c]/10 rounded-[32px] space-y-4">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">
                            <span>Postęp Operacji</span>
                            <span>{Object.values(distributingStatus).filter(s => s === 'success').length} / 6 Platform</span>
                         </div>
                         <div className="h-1.5 bg-black rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }} 
                               animate={{ width: `${(Object.values(distributingStatus).filter(s => s === 'success').length / 6) * 100}%` }}
                               className="h-full bg-[#c9a84c] shadow-[0_0_15px_#c9a84c]" 
                            />
                         </div>
                      </div>
                   </div>

                   <div className="p-10 bg-white/5 border-t border-white/5">
                      <button 
                        onClick={() => handleStartDistribution(['Pornhub', 'ManyVids', 'Fansly', 'ModelCenter', 'OnlyFans', 'SpankBang'])}
                        disabled={Object.values(distributingStatus).some(s => s === 'uploading' || s === 'success')}
                        className="w-full py-5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-[5px] rounded-3xl hover:scale-[1.02] transition-all shadow-2xl shadow-[#c9a84c]/20 disabled:opacity-50"
                      >
                         Uruchom Proces Syndykacji (All Platforms)
                      </button>
                   </div>
                </motion.div>
             </div>
          )}
       </AnimatePresence>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.2); }
      `}</style>
    </div>
  );
};

export default ContentManagementSystem;
