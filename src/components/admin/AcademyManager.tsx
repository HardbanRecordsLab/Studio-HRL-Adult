'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  FileText, 
  Play, 
  Volume2, 
  BookOpen, 
  Trash2, 
  Edit, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Download,
  Filter,
  Eye,
  Star,
  Zap,
  Layers,
  Database,
  Smartphone,
  Shield,
  Layout,
  Clock
} from 'lucide-react';
import { cn } from '@/utils/utils';
import AcademyMediaManager from './AcademyMediaManager';

// Import New Gold Modals
import ArticleModal from './ArticleModal';
import DocumentModal from './DocumentModal';
import VideoModal from './VideoModal';
import PodcastModal from './PodcastModal';

interface AcademyManagerProps {
  token: string;
}

const AcademyManager: React.FC<AcademyManagerProps> = ({ token }) => {
  const [activeMode, setActiveMode] = useState<'courses' | 'media' | 'analytics'>('courses');
  const [contentType, setContentType] = useState<'videos' | 'podcasts' | 'documents' | 'articles'>('videos');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/academy/${contentType}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // New API returns array directly
        setItems(Array.isArray(data) ? data : (data.data || []));
      } else {
        setItems([]);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeMode === 'courses') {
      fetchData();
    }
  }, [contentType, token, activeMode]);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten element archiwum?')) return;
    
    try {
      const response = await fetch(`/api/admin/academy/${contentType}?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchData();
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const renderModal = () => {
    switch (contentType) {
      case 'videos':
        return <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchData(); }} video={editingItem} />;
      case 'podcasts':
        return <PodcastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchData(); }} podcast={editingItem} />;
      case 'documents':
        return <DocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchData(); }} document={editingItem} />;
      case 'articles':
        return <ArticleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchData(); }} article={editingItem} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      {/* Academy Premium Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter text-glow">Academy <span className="text-white">ECOSYSTEM</span></h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase font-bold">Infrastruktura Edukacyjna HRL // Unified Control Panel</p>
        </div>
        <div className="flex gap-4">
           <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
              {[
                { id: 'courses', label: 'Struktura Kursów', icon: Layout },
                { id: 'media', label: 'Archiwum Mediów', icon: Database },
                { id: 'analytics', label: 'Edukacja KPI', icon: TrendingUp }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id as any)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                    activeMode === mode.id ? "bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20" : "text-gray-500 hover:text-white"
                  )}
                >
                   <mode.icon className="w-3.5 h-3.5" /> {mode.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeMode === 'courses' && (
          <motion.div key="courses-ui" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10">
             {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Liczba Lekcji', value: items.length.toString(), icon: BookOpen, trend: 'Aktualna Baza' },
                  { label: 'Aktywni Studenci', value: '248', icon: Users, trend: 'Global Reach' },
                  { label: 'Engagement Rate', value: '92%', icon: Zap, trend: 'Top Performance' },
                  { label: 'Avg Rating', value: '4.9/5', icon: Star, trend: 'Quality Score' }
                ].map((s, i) => (
                  <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-[32px] hover:border-[#c9a84c]/20 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-10 transition-all"><s.icon className="w-16 h-16 text-white" /></div>
                     <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">{s.label}</p>
                     <p className="text-2xl font-bold text-white font-georgia italic">{s.value}</p>
                     <p className="text-[8px] text-[#c9a84c] uppercase font-bold mt-2 tracking-widest">{s.trend}</p>
                  </div>
                ))}
             </div>

             {/* Functional Bar */}
             <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-[#0d0d0d] border border-white/5 p-4 rounded-[40px] shadow-2xl">
                <div className="flex gap-1.5 p-1 bg-white/5 rounded-full overflow-x-auto no-scrollbar">
                   {[
                     { id: 'videos', label: 'Video Lessons' },
                     { id: 'podcasts', label: 'Listenables' },
                     { id: 'documents', label: 'PDF Guides' },
                     { id: 'articles', label: 'Elite Blog' }
                   ].map(cat => (
                     <button
                       key={cat.id}
                       onClick={() => setContentType(cat.id as any)}
                       className={cn(
                         "px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                         contentType === cat.id ? "bg-white/10 text-[#c9a84c] border border-[#c9a84c]/30" : "text-gray-500 hover:text-white"
                       )}
                     >
                       {cat.label}
                     </button>
                   ))}
                </div>
                <div className="relative w-full md:w-80">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                   <input 
                     type="text" 
                     placeholder="Wyszukaj lekcję..." 
                     className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-14 pr-6 text-[10px] text-white focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-700 font-bold uppercase tracking-widest"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                <button 
                  onClick={handleAdd}
                  className="flex items-center gap-3 px-8 py-3 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/20 whitespace-nowrap"
                >
                   <Plus className="w-4 h-4" /> Dodaj Moduł Kursu
                </button>
             </div>

             {/* Course Content Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {loading ? (
                  <div className="col-span-full py-32 text-center text-gray-700 uppercase tracking-[5px] animate-pulse">Inicjalizacja Modułów...</div>
                ) : items.length === 0 ? (
                  <div className="col-span-full py-32 text-center text-gray-800 uppercase tracking-[5px]">Brak zawartości w tej kategorii</div>
                ) : items.filter(i => (i.title || '').toLowerCase().includes(searchTerm.toLowerCase())).map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-[#0d0d0d] border border-white/5 rounded-[40px] overflow-hidden group hover:border-[#c9a84c]/30 transition-all shadow-2xl relative">
                     <div className="aspect-video bg-[#111] relative overflow-hidden">
                        <img 
                          src={item.thumbnail || (contentType === 'videos' ? 'https://res.cloudinary.com/hrl-studio/image/upload/v1712850000/placeholder_video.jpg' : 'https://res.cloudinary.com/hrl-studio/image/upload/v1712850000/placeholder_doc.jpg')} 
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute top-6 left-6 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black text-[#c9a84c] uppercase tracking-widest">
                          {item.level || item.category || 'Academy'}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                           <div className="w-14 h-14 bg-[#c9a84c]/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)]">
                              {contentType === 'videos' ? <Play className="w-5 h-5 fill-black text-black ml-1" /> : contentType === 'podcasts' ? <Volume2 className="w-5 h-5 text-black" /> : <FileText className="w-5 h-5 text-black" />}
                           </div>
                        </div>
                     </div>
                     <div className="p-8 space-y-6">
                        <div>
                           <h3 className="text-xl font-bold font-georgia italic text-white group-hover:text-[#c9a84c] transition-colors mb-2 line-clamp-1">{item.title}</h3>
                           <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest line-clamp-2 leading-relaxed italic">{item.excerpt || item.description || 'Brak opisu.'}</p>
                        </div>
                        <div className="flex justify-between items-center pt-6 border-t border-white/5">
                           <div className="flex gap-6 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                              <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {item.duration || item.readTime || '--:--'}</div>
                              <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5" /> High Quality</div>
                           </div>
                           <div className="flex gap-2">
                              <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 rounded-2xl text-gray-600 hover:text-white transition-all border border-white/5"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(item.id)} className="p-3 bg-white/5 rounded-2xl text-gray-600 hover:text-red-500 transition-all border border-white/5"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}

        {activeMode === 'media' && (
           <motion.div key="media-ui" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AcademyMediaManager isEmbedded={true} />
           </motion.div>
        )}

        {activeMode === 'analytics' && (
           <motion.div key="analytics-ui" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-20 text-center space-y-4">
              <TrendingUp className="w-20 h-20 text-[#c9a84c] mx-auto opacity-20" />
              <h3 className="text-2xl font-bold font-georgia italic text-white">Analityka Edukacyjna</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-[4px] font-black">Generowanie zaawansowanych raportów KPI dla sieci Akademii...</p>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Render the appropriate modal based on current content type */}
      {renderModal()}

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AcademyManager;
