'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  User,
  Clock,
  Video,
  Image,
  Star,
  Heart,
  Camera,
  Play,
  Check,
  Zap,
  Shield,
  Activity,
  Award
} from 'lucide-react';
import { cn } from '@/utils/utils';

interface CastingApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  breastSize?: string;
  experience: string;
  experienceDesc?: string;
  platforms?: string;
  contentTypes?: string;
  limits?: string;
  sessionsPerWeek?: string;
  workingTimes?: string;
  motivation: string;
  bodyModifications?: string;
  skills?: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  video?: string;
  consentAge: boolean;
  consentTerms: boolean;
  consentData: boolean;
  consentMarketing: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface CastingDetailDrawerProps {
  application: CastingApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: 'approved' | 'rejected') => void;
  loading?: boolean;
}

const CastingDetailDrawer: React.FC<CastingDetailDrawerProps> = ({
  application,
  isOpen,
  onClose,
  onStatusUpdate,
  loading = false
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!application) return null;

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'approved':
        return { label: 'Zatwierdzona', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: <CheckCircle className="w-4 h-4" /> };
      case 'rejected':
        return { label: 'Odrzucona', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <XCircle className="w-4 h-4" /> };
      case 'pending':
        return { label: 'Weryfikacja', color: 'text-[#c9a84c]', bg: 'bg-[#c9a84c]/10', border: 'border-[#c9a84c]/20', icon: <Clock className="w-4 h-4" /> };
      default:
        return { label: status, color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20', icon: <Clock className="w-4 h-4" /> };
    }
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    return days[dayOfWeek];
  };

  // Parse JSON strings
  const platforms = application.platforms ? JSON.parse(application.platforms) : [];
  const contentTypes = application.contentTypes ? JSON.parse(application.contentTypes) : [];
  const workingTimes = application.workingTimes ? JSON.parse(application.workingTimes) : [];

  const photos = [application.photo1, application.photo2, application.photo3].filter(Boolean);
  const statusInfo = getStatusInfo(application.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with extreme blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Luxury Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-5xl bg-[#050505] border-l border-white/5 z-[110] overflow-hidden flex flex-col"
          >
            {/* Header Area */}
            <div className="p-10 border-b border-white/5 bg-gradient-to-r from-black to-[#0a0a0a] flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <Activity className="w-full h-full text-[#c9a84c]" />
               </div>
               
               <div className="flex items-center gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#c9a84c] to-[#8a6d2b] flex items-center justify-center text-3xl font-bold text-black shadow-2xl">
                     {application.firstName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-georgia italic text-white uppercase tracking-tighter">
                      {application.firstName} <span className="text-[#c9a84c]">{application.lastName}</span>
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                       <span className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", statusInfo.bg, statusInfo.color, statusInfo.border)}>
                          {statusInfo.icon}
                          {statusInfo.label}
                       </span>
                       <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Aplikacja nr: {application.id.slice(-6)}</span>
                    </div>
                  </div>
               </div>
               
               <button
                 onClick={onClose}
                 className="p-4 hover:bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all border border-white/5"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar space-y-12">
               
               <div className="grid grid-cols-12 gap-10">
                  {/* Personal Bio & Motivation */}
                  <div className="col-span-12 lg:col-span-7 space-y-10">
                     <section className="space-y-6">
                        <div className="flex items-center gap-4 text-[#c9a84c]">
                           <Heart className="w-5 h-5" />
                           <h3 className="text-[10px] font-black uppercase tracking-[4px]">Motywacja i Cele</h3>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] relative group">
                           <p className="text-gray-300 leading-relaxed italic text-lg font-georgia">"{application.motivation}"</p>
                           <div className="absolute bottom-4 right-8 opacity-10">
                              <Zap className="w-12 h-12 text-[#c9a84c]" />
                           </div>
                        </div>
                     </section>

                     <section className="space-y-6">
                        <div className="flex items-center gap-4 text-[#c9a84c]">
                           <Award className="w-5 h-5" />
                           <h3 className="text-[10px] font-black uppercase tracking-[4px]">Doświadczenie i Skille</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="p-6 bg-[#c9a84c]/5 border border-[#c9a84c]/10 rounded-3xl">
                              <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-3">Status Doświadczenia</p>
                              <span className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest", application.experience === 'yes' ? "bg-[#c9a84c] text-black" : "bg-white/5 text-gray-400")}>
                                 {application.experience === 'yes' ? 'Profesjonalistka' : 'New Face'}
                              </span>
                           </div>
                           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                              <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-3">Umiejętności Dodatkowe</p>
                              <p className="text-[11px] text-white font-medium">{application.skills || 'Brak danych'}</p>
                           </div>
                        </div>
                        {application.experienceDesc && (
                           <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl">
                              <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest mb-3">Opis Doświadczenia</p>
                              <p className="text-[11px] text-gray-300 leading-relaxed">{application.experienceDesc}</p>
                           </div>
                        )}
                     </section>

                     <section className="space-y-6">
                        <div className="flex items-center gap-4 text-[#c9a84c]">
                           <Camera className="w-5 h-5" />
                           <h3 className="text-[10px] font-black uppercase tracking-[4px]">Galeria Castingowa</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                           {photos.map((photo, index) => (
                              <motion.div
                                 key={index}
                                 whileHover={{ scale: 1.05, y: -5 }}
                                 className="aspect-[3/4] bg-[#111] rounded-[24px] overflow-hidden cursor-pointer border border-white/5 shadow-2xl relative group"
                                 onClick={() => setSelectedImage(photo!)}
                              >
                                 <img
                                    src={photo!}
                                    alt={`Casting ${index + 1}`}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-[8px] font-black text-[#c9a84c] uppercase tracking-widest">Powiększ Widok</p>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     </section>

                     {application.video && (
                        <section className="space-y-6">
                           <div className="flex items-center gap-4 text-[#c9a84c]">
                              <Video className="w-5 h-5" />
                              <h3 className="text-[10px] font-black uppercase tracking-[4px]">Weryfikacja Wideo</h3>
                           </div>
                           <div className="relative aspect-video bg-black rounded-[32px] overflow-hidden border border-white/5 shadow-2xl group">
                              <video src={application.video} className="w-full h-full object-cover opacity-60" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <a
                                    href={application.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 bg-[#c9a84c] text-black rounded-full shadow-[0_0_50px_rgba(201,168,76,0.5)] hover:scale-110 transition-all flex items-center gap-3"
                                 >
                                    <Play className="w-6 h-6 fill-current" />
                                    <span className="font-black uppercase tracking-widest text-[10px]">Odtwórz Nagranie</span>
                                 </a>
                              </div>
                           </div>
                        </section>
                     )}
                  </div>

                  {/* Sidebar Stats & Personal Data */}
                  <div className="col-span-12 lg:col-span-5 space-y-10">
                     <div className="p-8 bg-[#0d0d0d] border border-white/5 rounded-[40px] space-y-8 shadow-2xl">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[4px] border-b border-white/5 pb-6">Szczegóły Profilu</h4>
                        
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-1">
                              <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">Wiek</p>
                              <p className="text-xl font-bold text-white">{application.birthDate ? new Date().getFullYear() - new Date(application.birthDate).getFullYear() : 'N/A'} lat</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">Wzrost</p>
                              <p className="text-xl font-bold text-white">{application.height || 'N/A'} cm</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">Waga</p>
                              <p className="text-xl font-bold text-white">{application.weight || 'N/A'} kg</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">Biust</p>
                              <p className="text-xl font-bold text-white">{application.breastSize || 'N/A'}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">Włosy</p>
                              <p className="text-xl font-bold text-white">{application.hairColor || 'N/A'}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">Oczy</p>
                              <p className="text-xl font-bold text-white">{application.eyeColor || 'N/A'}</p>
                           </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/5">
                           <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Kontakt Bezpośredni</p>
                           <div className="space-y-3">
                              <div className="flex items-center gap-4 text-sm text-white">
                                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#c9a84c]">
                                    <Mail className="w-5 h-5" />
                                 </div>
                                 <span className="font-medium">{application.email}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-white">
                                 <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#c9a84c]">
                                    <Phone className="w-5 h-5" />
                                 </div>
                                 <span className="font-medium">{application.phone}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-8">
                        <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px]">Preferowane Platformy</h4>
                        <div className="flex flex-wrap gap-3">
                           {platforms.map((p: string, i: number) => (
                              <span key={i} className="px-4 py-2 bg-black border border-white/10 rounded-xl text-[10px] font-bold text-gray-300 uppercase tracking-widest">{p}</span>
                           ))}
                        </div>
                        <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] pt-4">Typ Kontentu</h4>
                        <div className="flex flex-wrap gap-3">
                           {contentTypes.map((t: string, i: number) => (
                              <span key={i} className="px-4 py-2 border border-[#c9a84c]/20 rounded-xl text-[10px] font-bold text-[#c9a84c] uppercase tracking-widest">{t}</span>
                           ))}
                        </div>
                     </div>

                     <div className="p-8 bg-black border border-white/5 rounded-[40px] space-y-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[4px] flex items-center gap-3">
                           <Clock className="w-4 h-4 text-[#c9a84c]" /> Dostępność (Grafik)
                        </h4>
                        <div className="space-y-3">
                           {workingTimes.map((time: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">{getDayName(time.dayOfWeek)}</span>
                                 <span className="text-[11px] font-bold text-white">{time.startTime} — {time.endTime}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="p-8 bg-[#c9a84c]/5 border border-[#c9a84c]/10 rounded-[40px] space-y-6">
                        <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[4px] flex items-center gap-3">
                           <Shield className="w-4 h-4" /> Weryfikacja Prawna
                        </h4>
                        <div className="space-y-4">
                           {[
                              { label: 'Weryfikacja Wieku (18+)', val: application.consentAge },
                              { label: 'Akceptacja Regulaminu', val: application.consentTerms },
                              { label: 'Zgoda na Dane Osobowe', val: application.consentData }
                           ].map((c, i) => (
                              <div key={i} className="flex items-center justify-between">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{c.label}</span>
                                 <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", c.val ? "bg-green-500 text-black" : "bg-red-500 text-black")}>
                                    {c.val ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-10 border-t border-white/5 bg-black/80 backdrop-blur-xl flex justify-between items-center">
               <div className="text-[9px] text-gray-600 font-black uppercase tracking-[3px]">
                  Applied: {new Date(application.createdAt).toLocaleDateString()}
               </div>
               
               <div className="flex gap-6">
                  {application.status === 'pending' ? (
                     <>
                        <button
                           onClick={() => onStatusUpdate(application.id, 'rejected')}
                           disabled={loading}
                           className="px-10 py-5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-500 text-[10px] font-black uppercase tracking-[4px] rounded-2xl transition-all"
                        >
                           Odrzuć Kandydaturę
                        </button>
                        <button
                           onClick={() => onStatusUpdate(application.id, 'approved')}
                           disabled={loading}
                           className="px-12 py-5 bg-[#c9a84c] hover:bg-[#e6c15c] text-black text-[10px] font-black uppercase tracking-[5px] rounded-2xl transition-all shadow-[0_20px_50px_rgba(201,168,76,0.3)] hover:scale-[1.03]"
                        >
                           {loading ? 'MODYFIKACJA...' : 'Zatwierdź & Podpisz'}
                        </button>
                     </>
                  ) : (
                     <div className="px-10 py-5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                        Aplikacja została już przetworzona: <span className="text-white ml-2 underline">{application.status}</span>
                     </div>
                  )}
               </div>
            </div>

            {/* Custom Lightbox for Images */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-12"
                  onClick={() => setSelectedImage(null)}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-10 right-10 p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all border border-white/10"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <motion.img
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    src={selectedImage}
                    alt="Enlarged view"
                    className="max-w-full max-h-full object-contain rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,1)] border border-white/10"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <style jsx global>{`
               .custom-scrollbar::-webkit-scrollbar { width: 4px; }
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

export default CastingDetailDrawer;
