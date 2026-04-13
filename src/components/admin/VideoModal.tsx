'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Video, Clock, Monitor, Play, Shield, Activity, FileText } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { cn } from '@/utils/utils';

interface AcademyVideo {
  id?: string;
  title: string;
  description?: string;
  duration: string;
  level: 'Początkujący' | 'Średni' | 'Zaawansowany';
  cloudinaryId: string;
  url: string;
  thumbnail?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  video?: AcademyVideo | null;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  video
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    level: 'Początkujący' as AcademyVideo['level'],
    cloudinaryId: '',
    url: '',
    thumbnail: '',
    format: '',
    bytes: 0,
    width: 0,
    height: 0,
    isActive: true
  });

  const levels: AcademyVideo['level'][] = ['Początkujący', 'Średni', 'Zaawansowany'];

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title,
        description: video.description || '',
        duration: video.duration,
        level: video.level,
        cloudinaryId: video.cloudinaryId,
        url: video.url,
        thumbnail: video.thumbnail || '',
        format: video.format || '',
        bytes: video.bytes || 0,
        width: video.width || 0,
        height: video.height || 0,
        isActive: video.isActive
      });
    } else {
      setFormData({
        title: '',
        description: '',
        duration: '',
        level: 'Początkujący',
        cloudinaryId: '',
        url: '',
        thumbnail: '',
        format: '',
        bytes: 0,
        width: 0,
        height: 0,
        isActive: true
      });
    }
  }, [video]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = video ? `/api/admin/academy/videos?id=${video.id}` : '/api/admin/academy/videos';
      const method = video ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save video');
      }
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Failed to save video');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[40px] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
             <Video className="w-64 h-64 text-white" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-10 border-b border-white/5 bg-white/[0.02]">
            <div>
               <h2 className="text-3xl font-bold italic font-georgia text-[#c9a84c]">
                 {video ? 'Edycja <span className="text-white">Masterclass</span>' : 'Nowy <span className="text-white">Masterclass</span>'}
               </h2>
               <p className="text-[9px] text-gray-500 uppercase tracking-[4px] font-black mt-2">HRL Academy Cinematic Unit</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/5 rounded-2xl text-gray-600 hover:text-white transition-all border border-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 overflow-y-auto max-h-[calc(90vh-250px)] custom-scrollbar">
            <div className="grid grid-cols-12 gap-10">
               {/* Main Production Info */}
               <div className="col-span-12 lg:col-span-7 space-y-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                        <FileText className="w-3 h-3 text-[#c9a84c]" /> Tytuł i Tematyka
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="modal-input-gold"
                        placeholder="np. Skuteczna sprzedaż w DM (Masterclass)"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-2">Opis Merytoryczny</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="modal-textarea-gold h-48"
                        placeholder="Opisz czego nauczy się talent po obejrzeniu tego materiału..."
                      />
                    </div>
                  </div>

                  {/* Video Upload Area */}
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest block ml-2">Production Source (Video File)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CldUploadWidget
                        uploadPreset="hrl-studio"
                        options={{ resourceType: 'video' }}
                        onSuccess={(result) => {
                          if (result.info) {
                            const info = result.info as any;
                            setFormData(prev => ({
                              ...prev,
                              cloudinaryId: info.public_id,
                              url: info.secure_url,
                              thumbnail: info.secure_url.replace(/\.[^/.]+$/, ".jpg"),
                              format: info.format,
                              bytes: info.bytes,
                              width: info.width,
                              height: info.height,
                              duration: `${Math.floor(info.duration / 60)}:${Math.floor(info.duration % 60).toString().padStart(2, '0')}`
                            }));
                          }
                        }}
                      >
                        {({ open }) => (
                          <button
                            type="button"
                            onClick={() => open()}
                            className="p-10 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[40px] hover:border-[#c9a84c]/40 transition-all flex flex-col items-center justify-center gap-4 group"
                          >
                             <div className="w-16 h-16 bg-[#c9a84c]/5 rounded-3xl flex items-center justify-center text-[#c9a84c] group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8" />
                             </div>
                             <div className="text-center">
                                <p className="text-[10px] font-black text-white uppercase tracking-[3px]">Upload to Cloud</p>
                                <p className="text-[8px] text-gray-600 uppercase tracking-widest mt-2">MP4, WebM (Max 2GB)</p>
                             </div>
                          </button>
                        )}
                      </CldUploadWidget>

                      <div className="p-10 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[40px] flex flex-col justify-center gap-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-[#c9a84c]">
                               <Monitor className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">Local Production Path</p>
                         </div>
                         <input 
                            type="text"
                            value={formData.url}
                            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value, cloudinaryId: 'LOCAL' }))}
                            className="modal-input-gold !py-3 !text-[11px]"
                            placeholder="/video/education/lesson.mp4"
                         />
                         <p className="text-[8px] text-gray-600 uppercase tracking-widest leading-relaxed">
                            Use for assets in <span className="text-white">public/video</span>
                         </p>
                      </div>
                    </div>

                    {formData.url && (
                      <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-video bg-black group">
                         {formData.url.startsWith('http') || formData.url.startsWith('/') ? (
                           <video 
                             src={formData.url} 
                             className="w-full h-full object-cover opacity-60"
                             controls
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-800 uppercase tracking-[10px]">Preview Unavailable</div>
                         )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                         <div className="absolute bottom-8 left-8 flex items-center gap-6">
                            <div className="p-4 bg-[#c9a84c] text-black rounded-2xl shadow-2xl">
                               <Play className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-white uppercase tracking-widest">{formData.url.startsWith('http') ? 'Cloud Broadcast' : 'Local Master'}</p>
                               <p className="text-[8px] text-[#c9a84c] uppercase tracking-widest mt-1">Source: {formData.url}</p>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
               </div>

               {/* Configuration Sidebar */}
               <div className="col-span-12 lg:col-span-5 space-y-10">
                  <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/10 rounded-[32px] p-8 space-y-8">
                     <h3 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] border-b border-[#c9a84c]/20 pb-4 flex items-center justify-between">
                        Cinematic Data <Activity className="w-4 h-4" />
                     </h3>
                     
                     <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                             <Clock className="w-3 h-3" /> Czas Trwania
                          </label>
                          <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                            className="modal-input-gold !bg-black/40"
                            placeholder="np. 45:23"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                             <Monitor className="w-3 h-3" /> Stopień Trudności
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                             {levels.map(lvl => (
                               <button
                                 key={lvl}
                                 type="button"
                                 onClick={() => setFormData(prev => ({ ...prev, level: lvl }))}
                                 className={cn(
                                   "px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border flex justify-between items-center group",
                                   formData.level === lvl 
                                     ? "bg-[#c9a84c] border-[#c9a84c] text-black" 
                                     : "bg-black/20 border-white/5 text-gray-500 hover:border-[#c9a84c]/30"
                                 )}
                               >
                                 {lvl}
                                 {formData.level === lvl && <Play className="w-3 h-3" />}
                               </button>
                             ))}
                          </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-black border border-white/5 rounded-[32px] space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", formData.isActive ? "bg-[#c9a84c]/10 text-[#c9a84c]" : "bg-gray-800/10 text-gray-600")}>
                             <Shield className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-white uppercase tracking-widest">Status Kursu</div>
                            <div className="text-[7px] text-gray-600 uppercase tracking-widest mt-1">
                              {formData.isActive ? 'Widoczny w sekcji szkoleniowej' : 'Szkic produkcyjny'}
                            </div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer scale-90">
                          <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a84c] peer-checked:after:bg-black"></div>
                        </label>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-end gap-6 mt-16 pt-10 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-10 py-5 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Porzuć Zmiany
              </button>
              <button
                type="submit"
                disabled={loading || !formData.url}
                className="flex items-center gap-3 px-16 py-5 bg-[#c9a84c] hover:bg-[#e6c15c] disabled:bg-gray-800 text-black text-[10px] font-black uppercase tracking-[5px] rounded-3xl transition-all shadow-[0_20px_40px_rgba(201,168,76,0.15)] hover:scale-[1.02]"
              >
                <Save className="w-4 h-4" />
                {loading ? 'MODYFIKACJA...' : (video ? 'Autoryzuj Update' : 'Wgraj Masterclass')}
              </button>
            </div>
          </form>
        </motion.div>

        <style jsx global>{`
           .modal-input-gold {
              @apply w-full bg-[#111] border border-white/5 rounded-2xl px-5 py-4 text-[13px] text-white font-light focus:border-[#c9a84c]/40 focus:outline-none transition-all placeholder:text-gray-800;
           }
           .modal-textarea-gold {
              @apply w-full bg-[#111] border border-white/5 rounded-3xl px-6 py-5 text-[13px] text-white font-light focus:border-[#c9a84c]/40 focus:outline-none transition-all placeholder:text-gray-800 resize-none;
           }
           .custom-scrollbar::-webkit-scrollbar { width: 3px; }
           .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
           .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.1); border-radius: 10px; }
           .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;
