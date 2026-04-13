'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, FileText, Calendar, Shield, Fingerprint, Zap } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { cn } from '@/utils/utils';

interface Partner {
  id: string;
  name: string;
  handle: string;
  email: string;
  status: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  documentStatus: string;
  documentsCount: number;
  latestDocument?: any;
  documents: any[];
}

interface AddDocumentFormProps {
  partner: Partner;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  partner,
  onClose,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'id_card',
    frontUrl: '',
    backUrl: '',
    selfieUrl: '',
    expiryDate: '',
    notes: ''
  });

  const documentTypes = [
    { value: 'id_card', label: 'Dowód Osobisty' },
    { value: 'passport', label: 'Paszport' },
    { value: 'driving_license', label: 'Prawo Jazdy' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: partner.id,
          ...formData,
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null
        })
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add document');
      }
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to add document');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[120] flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[50px] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.9)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none">
             <Shield className="w-80 h-80 text-white" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-12 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-[#c9a84c] rounded-2xl flex items-center justify-center text-black">
                  <Fingerprint className="w-8 h-8" />
               </div>
               <div>
                  <h2 className="text-3xl font-bold italic font-georgia text-white">
                    Dodaj <span className="text-[#c9a84c]">Zasób KYC</span>
                  </h2>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[4px] font-black mt-2">Dla: {partner.name} (@{partner.handle})</p>
               </div>
            </div>
            <button
              onClick={onClose}
              className="p-4 hover:bg-white/5 rounded-2xl text-gray-600 hover:text-white transition-all border border-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-12 overflow-y-auto max-h-[calc(90vh-250px)] custom-scrollbar">
            <div className="grid grid-cols-12 gap-12">
               {/* Left Column: Metadata */}
               <div className="col-span-12 lg:col-span-4 space-y-10">
                  <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 space-y-8">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-[#c9a84c] uppercase tracking-[4px] flex items-center gap-3">
                         <FileText className="w-4 h-4" /> Typ Dokumentu
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="modal-input-gold cursor-pointer"
                      >
                        {documentTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-black">{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-[#c9a84c] uppercase tracking-[4px] flex items-center gap-3">
                         <Calendar className="w-4 h-4" /> Data Ważności
                      </label>
                      <input
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                        className="modal-input-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 px-4">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                       <Zap className="w-3 h-3 text-[#c9a84c]" /> Uwagi do Weryfikacji
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add system notes for auditors..."
                      className="modal-textarea-gold h-48"
                    />
                  </div>
               </div>

               {/* Right Column: Upload Zones */}
               <div className="col-span-12 lg:col-span-8 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Front Side */}
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-white uppercase tracking-[3px] block ml-4">Awers (Front) *</label>
                        <CldUploadWidget
                          uploadPreset="hrl-studio"
                          options={{ resourceType: 'image' }}
                          onSuccess={(result) => {
                            if (result.info) {
                              setFormData(prev => ({ ...prev, frontUrl: (result.info as any).secure_url }));
                            }
                          }}
                        >
                          {({ open }) => (
                            <div className="space-y-4">
                              <button
                                type="button"
                                onClick={() => open()}
                                className="w-full py-16 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[40px] hover:border-[#c9a84c]/50 transition-all flex flex-col items-center justify-center gap-4 group"
                              >
                                 <Upload className="w-8 h-8 text-gray-700 group-hover:text-[#c9a84c] transition-all" />
                                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-white">Autoryzuj Awers</span>
                              </button>
                              {formData.frontUrl && (
                                <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-video group shadow-2xl">
                                  <img src={formData.frontUrl} alt="Front" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                  <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, frontUrl: '' }))}
                                    className="absolute top-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-2xl text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </CldUploadWidget>
                     </div>

                     {/* Back Side */}
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-white uppercase tracking-[3px] block ml-4">Rewers (Back)</label>
                        <CldUploadWidget
                          uploadPreset="hrl-studio"
                          options={{ resourceType: 'image' }}
                          onSuccess={(result) => {
                            if (result.info) {
                              setFormData(prev => ({ ...prev, backUrl: (result.info as any).secure_url }));
                            }
                          }}
                        >
                          {({ open }) => (
                            <div className="space-y-4">
                              <button
                                type="button"
                                onClick={() => open()}
                                className="w-full py-16 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[40px] hover:border-[#c9a84c]/50 transition-all flex flex-col items-center justify-center gap-4 group"
                              >
                                 <Upload className="w-8 h-8 text-gray-700 group-hover:text-[#c9a84c] transition-all" />
                                 <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest group-hover:text-white">Autoryzuj Rewers</span>
                              </button>
                              {formData.backUrl && (
                                <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-video group shadow-2xl">
                                  <img src={formData.backUrl} alt="Back" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                  <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, backUrl: '' }))}
                                    className="absolute top-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-2xl text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </CldUploadWidget>
                     </div>
                  </div>

                  {/* Selfie Verification Area */}
                  <div className="space-y-6">
                     <label className="text-[10px] font-black text-white uppercase tracking-[4px] block ml-4 flex items-center gap-3">
                        Biometria (Selfie z Dokumentem) <Shield className="w-4 h-4 text-[#c9a84c]" />
                     </label>
                     <CldUploadWidget
                       uploadPreset="hrl-studio"
                       options={{ resourceType: 'image' }}
                       onSuccess={(result) => {
                         if (result.info) {
                           setFormData(prev => ({ ...prev, selfieUrl: (result.info as any).secure_url }));
                         }
                       }}
                     >
                       {({ open }) => (
                         <div className="space-y-6">
                            {!formData.selfieUrl ? (
                               <button
                                 type="button"
                                 onClick={() => open()}
                                 className="w-full py-20 bg-[#c9a84c]/5 border-2 border-dashed border-[#c9a84c]/20 rounded-[40px] hover:bg-[#c9a84c]/10 transition-all flex flex-col items-center justify-center gap-4 group"
                               >
                                  <div className="p-6 bg-[#c9a84c] text-black rounded-3xl shadow-xl group-hover:scale-110 transition-transform">
                                     <Upload className="w-8 h-8" />
                                  </div>
                                  <div className="text-center">
                                     <p className="text-[12px] font-black text-white uppercase tracking-[3px]">Biometric Scan Required</p>
                                     <p className="text-[8px] text-gray-600 uppercase tracking-widest mt-2">Prześlij zdjęcie kandydata trzymającego dokument</p>
                                  </div>
                               </button>
                            ) : (
                               <div className="relative rounded-[40px] overflow-hidden border border-[#c9a84c]/30 shadow-[0_0_60px_rgba(201,168,76,0.1)] flex justify-center bg-black group aspect-video">
                                  <img src={formData.selfieUrl} alt="Selfie" className="h-full object-contain transition-all duration-1000 group-hover:scale-105" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <p className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px]">Verified Biometric Feed</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, selfieUrl: '' }))}
                                    className="absolute top-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:text-red-500 transition-all border border-white/10"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                               </div>
                            )}
                         </div>
                       )}
                     </CldUploadWidget>
                  </div>
               </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-end gap-10 mt-20 pt-10 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-10 py-5 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Anuluj Operację
              </button>
              <button
                type="submit"
                disabled={loading || !formData.frontUrl}
                className="flex items-center gap-4 px-20 py-6 bg-[#c9a84c] hover:bg-[#e6c15c] disabled:bg-gray-800 text-black text-[11px] font-black uppercase tracking-[6px] rounded-[30px] transition-all shadow-2xl shadow-[#c9a84c]/30 hover:scale-[1.03] disabled:opacity-30 disabled:hover:scale-100"
              >
                <Save className="w-5 h-5" />
                {loading ? 'MODYFIKACJA...' : 'ARCHIWIZUJ DOKUMENT'}
              </button>
            </div>
          </form>
        </motion.div>

        <style jsx global>{`
           .modal-input-gold {
              @apply w-full bg-[#111] border border-white/5 rounded-2xl px-6 py-4 text-[13px] text-white font-light focus:border-[#c9a84c]/40 focus:outline-none transition-all placeholder:text-gray-800;
           }
           .modal-textarea-gold {
              @apply w-full bg-[#0d0d0d] border border-white/5 rounded-3xl px-6 py-6 text-[13px] text-white font-light focus:border-[#c9a84c]/40 focus:outline-none transition-all placeholder:text-gray-800 resize-none;
           }
           .custom-scrollbar::-webkit-scrollbar { width: 4px; }
           .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
           .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.1); border-radius: 20px; }
           .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddDocumentForm;
