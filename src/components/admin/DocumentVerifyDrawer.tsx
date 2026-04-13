'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Upload,
  FileText,
  Calendar,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Clock,
  Shield,
  Fingerprint,
  Activity,
  Zap,
  Briefcase
} from 'lucide-react';
import AddDocumentForm from './AddDocumentForm';
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

interface DocumentVerifyDrawerProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DocumentVerifyDrawer: React.FC<DocumentVerifyDrawerProps> = ({
  partner,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImages, setShowImages] = useState<{ [key: string]: boolean }>({});
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!partner) return null;

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusUpdate = async (documentId: string, status: 'verified' | 'rejected') => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: documentId,
          status,
          notes: status === 'rejected' ? notes[documentId] : undefined
        })
      });

      if (response.ok) {
        showToast(`Document ${status} successfully`, 'success');
        onSuccess();
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to update document', 'error');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      showToast('Failed to update document', 'error');
    }
    setLoading(false);
  };

  const toggleImageVisibility = (documentId: string, imageType: string) => {
    const key = `${documentId}-${imageType}`;
    setShowImages(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isImageVisible = (documentId: string, imageType: string) => {
    const key = `${documentId}-${imageType}`;
    return showImages[key] || false;
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'id_card': return 'Dowód Osobisty';
      case 'passport': return 'Paszport';
      case 'driving_license': return 'Prawo Jazdy';
      default: return type;
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'verified': return { label: 'Zaszyfrowany & Zweryfikowany', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: <CheckCircle className="w-3 h-3" /> };
      case 'rejected': return { label: 'Odrzucony / Błąd weryfikacji', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <XCircle className="w-3 h-3" /> };
      case 'pending': return { label: 'Oczekiwanie na Audyt', color: 'text-[#c9a84c]', bg: 'bg-[#c9a84c]/10', border: 'border-[#c9a84c]/20', icon: <Clock className="w-3 h-3" /> };
      default: return { label: status, color: 'text-gray-500', bg: 'bg-white/5', border: 'border-white/5', icon: <Clock className="w-3 h-3" /> };
    }
  };

  const documents = partner.documents || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Luxury Security Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-6xl bg-[#050505] border-l border-white/5 z-[110] overflow-hidden flex flex-col"
          >
            {/* Security Header */}
            <div className="p-10 border-b border-white/5 bg-gradient-to-r from-black to-[#0a0a0a] flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <Fingerprint className="w-48 h-48 text-white" />
               </div>
               
               <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                    {partner.avatar ? (
                      <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-[#c9a84c]">{partner.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-georgia italic text-white uppercase tracking-tighter">
                      KYC <span className="text-[#c9a84c]">Verification</span> Portal
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{partner.name}</span>
                       <span className="text-gray-600">/</span>
                       <span className="text-[10px] font-black text-[#c9a84c] uppercase tracking-widest">@{partner.handle}</span>
                    </div>
                  </div>
               </div>
               
               <button
                 onClick={onClose}
                 className="p-4 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all border border-white/5"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            {/* Verification Content */}
            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              {documents.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
                  <div className="w-32 h-32 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-gray-800">
                     <FileText className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-georgia italic">Brak dokumentów w systemie</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[4px]">Ten partner nie przesłał jeszcze żadnych danych KYC do weryfikacji.</p>
                  </div>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-12 py-5 bg-[#c9a84c] hover:bg-[#e6c15c] text-black text-[10px] font-black uppercase tracking-[4px] rounded-2xl transition-all shadow-xl shadow-[#c9a84c]/20"
                  >
                    Wymuś Przesłanie Dokumentów
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="flex items-end justify-between border-b border-white/5 pb-8">
                     <div>
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[4px]">HRL Vault: Bezpieczny Magazyn Dokumentów</h3>
                        <p className="text-[8px] text-gray-600 uppercase tracking-[2px] mt-2">Wszystkie dane są szyfrowane i maskowane do czasu Twojej autoryzacji.</p>
                     </div>
                     <button
                       onClick={() => setShowAddForm(true)}
                       className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-[#c9a84c] border border-white/10 hover:border-[#c9a84c] text-white hover:text-black text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all group"
                     >
                       <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                       Dodaj Nowy Zasób
                     </button>
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                     {documents.map((doc) => {
                       const status = getStatusInfo(doc.status);
                       return (
                         <div key={doc.id} className="bg-[#0b0b0b] border border-white/5 rounded-[40px] p-10 space-y-10 group hover:border-[#c9a84c]/20 transition-all shadow-2xl relative overflow-hidden">
                           {/* Background Decor Clip */}
                           <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                              <Shield className="w-48 h-48" />
                           </div>

                           <div className="flex items-start justify-between relative z-10">
                             <div className="space-y-4">
                               <div className="flex items-center gap-4">
                                  <div className="p-4 bg-white/5 rounded-2xl text-[#c9a84c]">
                                     <Fingerprint className="w-8 h-8" />
                                  </div>
                                  <div>
                                     <h4 className="text-2xl font-bold text-white font-georgia italic uppercase tracking-tighter">
                                       {getDocumentTypeLabel(doc.type)}
                                     </h4>
                                     <div className="flex items-center gap-4 mt-1">
                                       <span className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border", status.bg, status.color, status.border)}>
                                         {status.icon}
                                         {status.label}
                                       </span>
                                     </div>
                                  </div>
                               </div>
                               <div className="flex gap-8 text-[9px] font-black text-gray-500 uppercase tracking-widest pl-2">
                                  {doc.verifiedAt && <span className="flex items-center gap-2 mt-2"><Activity className="w-3 h-3" /> Data Weryfikacji: {new Date(doc.verifiedAt).toLocaleDateString()}</span>}
                                  {doc.verifiedBy && <span className="flex items-center gap-2 mt-2"><User className="w-3 h-3" /> Audytor: {doc.verifiedBy}</span>}
                               </div>
                             </div>
                           </div>

                           {/* Document Images (The Core Verification Part) */}
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                             {/* Front */}
                             <div className="space-y-4">
                                <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest text-center">Widok: Awers (Front)</p>
                                <div className="relative group/img aspect-[3/2] bg-black rounded-[24px] overflow-hidden border border-white/5 shadow-2xl">
                                  <img
                                    src={doc.frontUrl}
                                    alt="Document front"
                                    className={cn("w-full h-full object-cover transition-all duration-700", isImageVisible(doc.id, 'front') ? "scale-105" : "blur-[20px] scale-110 opacity-30")}
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover/img:bg-black/20 transition-all">
                                     <button
                                       onClick={() => toggleImageVisibility(doc.id, 'front')}
                                       className="p-5 bg-black/60 backdrop-blur-md rounded-[20px] text-white border border-white/10 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                                     >
                                       {isImageVisible(doc.id, 'front') ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                     </button>
                                  </div>
                                  {isImageVisible(doc.id, 'front') && (
                                     <div className="absolute top-4 left-4 p-2 bg-[#c9a84c] text-black rounded-lg">
                                        <Shield className="w-3 h-3" />
                                     </div>
                                  )}
                                </div>
                             </div>

                             {/* Back */}
                             {doc.backUrl && (
                               <div className="space-y-4">
                                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest text-center">Widok: Rewers (Back)</p>
                                  <div className="relative group/img aspect-[3/2] bg-black rounded-[24px] overflow-hidden border border-white/5 shadow-2xl">
                                    <img
                                      src={doc.backUrl}
                                      alt="Document back"
                                      className={cn("w-full h-full object-cover transition-all duration-700", isImageVisible(doc.id, 'back') ? "scale-105" : "blur-[20px] scale-110 opacity-30")}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover/img:bg-black/20 transition-all">
                                       <button
                                         onClick={() => toggleImageVisibility(doc.id, 'back')}
                                         className="p-5 bg-black/60 backdrop-blur-md rounded-[20px] text-white border border-white/10 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                                       >
                                         {isImageVisible(doc.id, 'back') ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                       </button>
                                    </div>
                                  </div>
                               </div>
                             )}

                             {/* Selfie */}
                             {doc.selfieUrl && (
                               <div className="space-y-4">
                                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest text-center">Widok: Biometria (Selfie)</p>
                                  <div className="relative group/img aspect-[3/2] bg-black rounded-[24px] overflow-hidden border border-white/5 shadow-2xl">
                                    <img
                                      src={doc.selfieUrl}
                                      alt="Selfie with document"
                                      className={cn("w-full h-full object-cover transition-all duration-700", isImageVisible(doc.id, 'selfie') ? "scale-105 shadow-inner" : "blur-[20px] scale-110 opacity-30")}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover/img:bg-black/20 transition-all">
                                       <button
                                         onClick={() => toggleImageVisibility(doc.id, 'selfie')}
                                         className="p-5 bg-black/60 backdrop-blur-md rounded-[20px] text-white border border-white/10 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                                       >
                                         {isImageVisible(doc.id, 'selfie') ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                       </button>
                                    </div>
                                  </div>
                               </div>
                             )}
                           </div>

                           {/* Notes & Lifecycle Data */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end relative z-10 p-8 bg-white/[0.01] border border-white/5 rounded-[32px]">
                              <div className="space-y-4">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                   <Zap className="w-3 h-3 text-[#c9a84c]" /> Notatki Audytorskie
                                </label>
                                <textarea
                                  value={notes[doc.id] || doc.notes || ''}
                                  onChange={(e) => setNotes(prev => ({ ...prev, [doc.id]: e.target.value }))}
                                  placeholder="Wpisz treść uwag lub powód odrzucenia..."
                                  className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl focus:border-[#c9a84c]/40 outline-none transition-all placeholder:text-gray-800 text-sm text-white h-24"
                                />
                              </div>
                              <div className="space-y-6">
                                 <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-500">
                                    <span>Ważność Dokumentu:</span>
                                    <span className="text-white italic">{doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : 'Bezterminowy'}</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-500">
                                    <span>Sync HRL ID:</span>
                                    <span className="text-gray-700 font-mono">#{doc.id.slice(0, 12)}...</span>
                                 </div>

                                 {doc.status === 'pending' && (
                                   <div className="flex gap-4 pt-4 border-t border-white/5">
                                     <button
                                       onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                                       disabled={loading || !notes[doc.id]}
                                       className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-gray-600 hover:text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all disabled:opacity-30"
                                     >
                                       <XCircle className="w-4 h-4" />
                                       Odrzuć
                                     </button>
                                     <button
                                       onClick={() => handleStatusUpdate(doc.id, 'verified')}
                                       disabled={loading}
                                       className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#c9a84c] hover:bg-[#e6c15c] text-black text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-[#c9a84c]/20"
                                     >
                                       <CheckCircle className="w-4 h-4" />
                                       Zatwierdź
                                     </button>
                                   </div>
                                 )}
                              </div>
                           </div>
                         </div>
                       );
                     })}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Overlay Forms (Modals) */}
            <AnimatePresence>
              {showAddForm && (
                <AddDocumentForm
                  partner={partner}
                  onClose={() => setShowAddForm(false)}
                  onSuccess={() => {
                    setShowAddForm(false);
                    onSuccess();
                  }}
                />
              )}
            </AnimatePresence>

            {/* Notification System */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className={cn("fixed bottom-12 right-12 px-10 py-5 rounded-[24px] text-white text-[10px] font-black uppercase tracking-[3px] shadow-2xl z-[200]", toast.type === 'success' ? 'bg-[#c9a84c] text-black' : 'bg-red-600')}
                >
                  {toast.message}
                </motion.div>
              )}
            </AnimatePresence>

            <style jsx global>{`
              .custom-scrollbar::-webkit-scrollbar { width: 3px; }
              .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
              .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.1); border-radius: 20px; }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DocumentVerifyDrawer;
