'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, FileText, Folder, Tag, Briefcase, Shield, FileCheck } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { cn } from '@/utils/utils';

interface AcademyDocument {
  id?: string;
  title: string;
  description?: string;
  type: 'PDF' | 'DOCX';
  category: 'Prawny' | 'Operacyjny' | 'Biznesowy' | 'Strategia' | 'Compliance' | 'Casting';
  icon: string;
  cloudinaryId: string;
  url: string;
  size?: number;
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  document?: AcademyDocument | null;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  document
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'PDF' as AcademyDocument['type'],
    category: 'Prawny' as AcademyDocument['category'],
    icon: '📄',
    cloudinaryId: '',
    url: '',
    size: 0,
    isActive: true
  });

  const types: AcademyDocument['type'][] = ['PDF', 'DOCX'];
  const categories: AcademyDocument['category'][] = ['Prawny', 'Operacyjny', 'Biznesowy', 'Strategia', 'Compliance', 'Casting'];
  const commonIcons = ['📄', '📁', '💼', '⚖️', '📑', '🔐', '📊', '📈', '🎬', '🔞'];

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        description: document.description || '',
        type: document.type,
        category: document.category,
        icon: document.icon,
        cloudinaryId: document.cloudinaryId,
        url: document.url,
        size: document.size || 0,
        isActive: document.isActive
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'PDF',
        category: 'Prawny',
        icon: '📄',
        cloudinaryId: '',
        url: '',
        size: 0,
        isActive: true
      });
    }
  }, [document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = document ? `/api/admin/academy/documents?id=${document.id}` : '/api/admin/academy/documents';
      const method = document ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save document');
      }
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document');
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
          className="bg-[#0a0a0a] border border-white/10 rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
             <Briefcase className="w-64 h-64 text-white" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-10 border-b border-white/5 bg-white/[0.02]">
            <div>
               <h2 className="text-3xl font-bold italic font-georgia text-[#c9a84c]">
                 {document ? 'Edycja <span className="text-white">Dokumentu</span>' : 'Nowy <span className="text-white">Dokument</span>'}
               </h2>
               <p className="text-[9px] text-gray-500 uppercase tracking-[4px] font-black mt-2">HRL Academy Asset Management</p>
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
            <div className="space-y-10">
              {/* Basic Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                    <FileText className="w-3 h-3 text-[#c9a84c]" /> Pełny Tytuł
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="modal-input-gold"
                    placeholder="np. Kontrakt Agencyjny HRL"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                    <Folder className="w-3 h-3 text-[#c9a84c]" /> Format Archiwum
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as AcademyDocument['type'] }))}
                    className="modal-input-gold cursor-pointer"
                  >
                    {types.map(type => (
                      <option key={type} value={type} className="bg-black">{type} / Document Base</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Categorization and Iconography */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-[#c9a84c] uppercase tracking-widest flex items-center gap-2 ml-2">
                    <Shield className="w-3 h-3" /> Kategoria Biznesowa
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as AcademyDocument['category'] }))}
                    className="modal-input-gold cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-black">{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                    Ikona Reprezentatywna (Mnemonic)
                  </label>
                  <div className="flex flex-wrap gap-3 bg-white/[0.02] p-4 rounded-3xl border border-white/5">
                    {commonIcons.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon }))}
                        className={cn(
                          "w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all border",
                          formData.icon === icon 
                            ? "bg-[#c9a84c] border-[#c9a84c] scale-110 shadow-lg shadow-[#c9a84c]/20" 
                            : "bg-white/5 border-white/5 hover:border-white/10"
                        )}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Functional Description */}
              <div className="space-y-3">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-2">Krótki Opis Użytkowy</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="modal-textarea-gold h-32"
                  placeholder="Do czego służy ten dokument? np. Standardowy wzór umowy NDA dla nowych modelek."
                />
              </div>

              {/* Core Secure File Upload */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                   <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest block ml-2">Metoda Dostarczenia Zasobu</label>
                   <div className="text-[7px] text-[#c9a84c] font-black uppercase tracking-widest bg-[#c9a84c]/10 px-2 py-0.5 rounded">Vault / Local Hybrid</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cloudinary Upload */}
                  <CldUploadWidget
                    uploadPreset="hrl-studio"
                    options={{ resourceType: 'raw' }}
                    onSuccess={(result) => {
                      if (result.info) {
                        const info = result.info as any;
                        setFormData(prev => ({
                          ...prev,
                          cloudinaryId: info.public_id,
                          url: info.secure_url,
                          size: info.bytes || 0
                        }));
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="p-8 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[32px] hover:border-[#c9a84c]/40 transition-all flex flex-col items-center justify-center gap-3 group h-full"
                      >
                         <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#c9a84c] group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                         </div>
                         <div className="text-center">
                            <p className="text-[9px] font-black text-white uppercase tracking-widest">Wgraj do Chmury</p>
                            <p className="text-[7px] text-gray-600 uppercase tracking-widest mt-1">Automatyczny CDN</p>
                         </div>
                      </button>
                    )}
                  </CldUploadWidget>

                  {/* Manual Path */}
                  <div className="p-8 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[32px] flex flex-col justify-center gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#c9a84c]">
                           <FileCheck className="w-5 h-5" />
                        </div>
                        <p className="text-[9px] font-black text-white uppercase tracking-widest">Ścieżka Lokalna</p>
                     </div>
                     <input 
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value, cloudinaryId: 'LOCAL' }))}
                        className="modal-input-gold !py-2.5 !text-[10px]"
                        placeholder="/documents/plik.pdf"
                     />
                     <p className="text-[7px] text-gray-600 uppercase tracking-widest leading-relaxed">
                        Użyj dla plików w folderze <span className="text-white">public/documents</span>
                     </p>
                  </div>
                </div>
                
                {formData.url && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-2xl">
                         {formData.icon}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-black text-white uppercase tracking-widest truncate">{formData.title}</div>
                        <div className="text-[8px] text-gray-500 uppercase tracking-widest mt-1 truncate">
                          {formData.url.startsWith('http') ? 'Cloud CDN' : 'Local Asset'} • {formData.url}
                        </div>
                      </div>
                    </div>
                    <FileCheck className="w-6 h-6 text-[#c9a84c] flex-shrink-0" />
                  </motion.div>
                )}
              </div>

              {/* Safety Switch */}
              <div className="flex items-center justify-between p-8 bg-black border border-white/5 rounded-3xl">
                <div className="flex items-center gap-5">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", formData.isActive ? "bg-[#c9a84c]/10 text-[#c9a84c]" : "bg-gray-800/10 text-gray-600")}>
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Status Dostępności</div>
                    <div className="text-[7px] text-gray-600 uppercase tracking-widest mt-1">
                      {formData.isActive ? 'Widoczny dla autoryzowanych talentów' : 'Ukryty przed użytkownikami'}
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

            {/* Actions */}
            <div className="flex items-center justify-end gap-6 mt-16 pt-8 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={loading || !formData.url}
                className="flex items-center gap-3 px-12 py-5 bg-[#c9a84c] hover:bg-[#e6c15c] disabled:bg-gray-800 text-black text-[10px] font-black uppercase tracking-[4px] rounded-2xl transition-all shadow-xl shadow-[#c9a84c]/20"
              >
                <Save className="w-4 h-4" />
                {loading ? 'SYNCHRONIZACJA...' : (document ? 'Aktualizuj Zasób' : 'Zapisz w Vault')}
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

export default DocumentModal;
