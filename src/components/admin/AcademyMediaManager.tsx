'use client';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  Film, 
  Music, 
  FileText, 
  BookOpen, 
  Loader2, 
  Trash2, 
  Edit2, 
  Plus,
  Search,
  Play,
  Activity,
  Zap,
  Shield,
  Clock,
  Volume2
} from 'lucide-react';
import { cn } from '@/utils/utils';

// Import New Gold Modals
import ArticleModal from './ArticleModal';
import DocumentModal from './DocumentModal';
import VideoModal from './VideoModal';
import PodcastModal from './PodcastModal';

interface AcademyMediaManagerProps {
  isEmbedded?: boolean;
}

type ContentType = 'videos' | 'podcasts' | 'documents' | 'articles';

const AcademyMediaManager: React.FC<AcademyMediaManagerProps> = ({ isEmbedded = false }) => {
  const [activeTab, setActiveTab] = useState<ContentType>('videos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const queryClient = useQueryClient();

  // Real API Fetching
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-academy', activeTab],
    queryFn: async () => {
       const res = await axios.get(`/api/admin/academy/${activeTab}`);
       return res.data;
    },
  });

  const tabs = [
    { id: 'videos' as ContentType, name: 'Video Masterclass', icon: Film, color: '#c9a84c' },
    { id: 'podcasts' as ContentType, name: 'Listenables', icon: Music, color: '#ffffff' },
    { id: 'documents' as ContentType, name: 'PDF Guides', icon: FileText, color: '#ffffff' },
    { id: 'articles' as ContentType, name: 'Elite Blog', icon: BookOpen, color: '#ffffff' },
  ];

  const filteredData = (Array.isArray(data) ? data : []).filter((item: any) => 
    (item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz trwale usunąć ten zasób?')) return;
    try {
      await axios.delete(`/api/admin/academy/${activeTab}?id=${id}`);
      refetch();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const renderModal = () => {
    switch (activeTab) {
      case 'videos':
        return <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); refetch(); }} video={editingItem} />;
      case 'podcasts':
        return <PodcastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); refetch(); }} podcast={editingItem} />;
      case 'documents':
        return <DocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); refetch(); }} document={editingItem} />;
      case 'articles':
        return <ArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); refetch(); }} article={editingItem} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn bg-black/40 p-10 rounded-[50px] border border-white/5 shadow-inner">
      {/* Premium Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">HRL <span className="text-white">Academy</span> ARCHIVE</h2>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-3 px-8 py-3 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/20"
        >
          <Plus className="w-4 h-4" /> Nowy Zasób Archiwalny
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-4 p-1.5 bg-white/5 rounded-full w-fit border border-white/10">
         {tabs.map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={cn(
               "flex items-center gap-3 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
               activeTab === tab.id ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20' : 'text-gray-500 hover:text-white'
             )}
           >
             <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? 'text-black' : 'text-gray-600')} />
             {tab.name}
           </button>
         ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
         <div className="relative w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input 
               type="text" 
               placeholder="Przeszukaj archive engine..." 
               className="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-4 pl-14 pr-6 text-[10px] text-white focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-700 uppercase tracking-widest font-black"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-8 text-[9px] font-black text-gray-500 uppercase tracking-[3px]">
            <div className="flex items-center gap-3"><Activity className="w-4 h-4 text-[#c9a84c]" /> Sync Status: <span className="text-white">Active</span></div>
            <div className="flex items-center gap-3"><Zap className="w-4 h-4 text-[#c9a84c]" /> Items: <span className="text-white">{filteredData.length}</span></div>
         </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
         <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-6">
                 <Loader2 className="w-12 h-12 text-[#c9a84c] animate-spin" />
                 <p className="text-[10px] text-gray-500 uppercase tracking-[6px] animate-pulse">Inicjalizacja Bazy Archiwalnej...</p>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="col-span-full py-32 text-center text-gray-800 uppercase tracking-[5px]">Baza Archiwalna jest pusta</div>
            ) : filteredData.map((item: any, i: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#c9a84c]/40 transition-all shadow-2xl relative"
              >
                 <div className="aspect-video bg-[#111] relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={item.thumbnail || (activeTab === 'videos' ? 'https://res.cloudinary.com/hrl-studio/image/upload/v1712850000/placeholder_video.jpg' : 'https://res.cloudinary.com/hrl-studio/image/upload/v1712850000/placeholder_doc.jpg')} 
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-700" 
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full animate-pulse" />
                       <span className="text-[8px] font-black text-white uppercase tracking-[2px]">{item.level || item.category || 'Academy'}</span>
                    </div>
                    <div className="absolute bottom-6 right-6">
                       <div className="w-10 h-10 bg-[#c9a84c] rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(201,168,76,0.5)] group-hover:scale-110 transition-transform">
                          {activeTab === 'videos' ? <Play className="w-4 h-4 fill-black" /> : activeTab === 'podcasts' ? <Volume2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                       </div>
                    </div>
                 </div>

                 <div className="p-8 space-y-6">
                    <div>
                       <h4 className="text-lg font-bold text-white group-hover:text-[#c9a84c] transition-colors font-georgia italic mb-2 line-clamp-1">{item.title}</h4>
                       <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest line-clamp-2 italic">{item.excerpt || item.description || 'Brak opisu.'}</p>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                       <div className="flex gap-6 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                          <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-[#c9a84c]" /> {item.duration || item.readTime || '--:--'}</div>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-500 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-500 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Dynamic Modals */}
      {renderModal()}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
      `}</style>
    </div>
  );
};

export default AcademyMediaManager;
