import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  FileText, 
  Calendar, 
  User, 
  Star,
  Activity,
  Shield,
  Zap,
  MoreVertical,
  X,
  Phone,
  Info,
  Trash2
} from 'lucide-react';

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
  consentAge: boolean;
  consentTerms: boolean;
  consentData: boolean;
  consentMarketing: boolean;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  video?: string;
  status: 'pending' | 'approved' | 'rejected';
  contractStatus: 'not_sent' | 'sent' | 'signed' | 'rejected';
  convertedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface CastingManagerProps {
  token: string;
}

const CastingManager: React.FC<CastingManagerProps> = ({ token }) => {
  const [applications, setApplications] = useState<CastingApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<CastingApplication | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/casting', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/casting/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) fetchApplications();
    } catch (e) { console.error(e); }
  };

  const handleConvert = async (id: string) => {
    if (!confirm('Czy na pewno chcesz utworzyć profil partnera na podstawie tego zgłoszenia?')) return;
    try {
      const response = await fetch('/api/admin/casting/convert', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ applicationId: id })
      });
      if (response.ok) {
        alert('Profil partnera został utworzony pomyślnie!');
        fetchApplications();
      } else {
        const err = await response.json();
        alert(`Błąd: ${err.error || 'Nie udało się utworzyć profilu'}`);
      }
    } catch (e) { console.error(e); }
  };

  const filtered = applications.filter(a => {
    const matchesSearch = `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || a.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateAge = (date: string) => {
    const birth = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">HRL <span className="text-white">Casting</span> HUB</h2>
          <p className="text-[10px] text-gray-400 tracking-[3px] uppercase">Zarządzanie nowymi talentami i weryfikacja zgłoszeń</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded transition-all hover:bg-white/10">
              <Download className="w-4 h-4" /> Eksportuj PDF
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: 'Wszystkie Zgłoszenia', val: applications.length, icon: User, color: '#c9a84c' },
           { label: 'Oczekujące', val: applications.filter(a => a.status === 'pending').length, icon: Clock, color: '#f59e0b' },
           { label: 'Zakwalifikowane', val: applications.filter(a => a.status === 'approved').length, icon: CheckCircle, color: '#22c55e' },
           { label: 'Odrzucone', val: applications.filter(a => a.status === 'rejected').length, icon: XCircle, color: '#ef4444' }
         ].map((s, i) => (
           <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#c9a84c]/20 transition-all cursor-default">
              <div>
                <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-2xl font-bold font-georgia">{s.val}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                <s.icon className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: s.color }} />
              </div>
           </div>
         ))}
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
         <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-6 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-[#c9a84c] text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {f === 'all' ? 'Wszystko' : f === 'pending' ? 'Oczekujące' : f === 'approved' ? 'Zatwierdzone' : 'Odrzucone'}
              </button>
            ))}
         </div>

         <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input 
              type="text" 
              placeholder="Szukaj po nazwisku / email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-[10px] text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 uppercase tracking-[2px]" 
            />
         </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Aplikant</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Kontakt</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Wiek / Detale</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Doświadczenie</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Kontrakt</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {loading ? (
                <tr>
                   <td colSpan={6} className="py-20 text-center text-gray-600 uppercase tracking-[10px] animate-pulse">Analiza bazy talentów...</td>
                </tr>
             ) : filtered.length === 0 ? (
                <tr>
                   <td colSpan={6} className="py-20 text-center text-gray-600 uppercase tracking-[10px]">Brak nowych zgłoszeń</td>
                </tr>
             ) : filtered.map((a) => (
                <tr key={a.id} className="group hover:bg-white/[0.02] transition-colors">
                   <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson/20 to-dark-4 border border-white/10 flex items-center justify-center text-gold font-bold">
                            {a.firstName.charAt(0)}{a.lastName.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-bold font-georgia text-white group-hover:text-[#c9a84c] transition-colors">{a.firstName} {a.lastName}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{new Date(a.createdAt).toLocaleDateString()}</p>
                         </div>
                      </div>
                   </td>
                   <td className="px-8 py-6">
                      <p className="text-[10px] text-white font-bold">{a.email}</p>
                      <p className="text-[9px] text-gray-400">{a.phone}</p>
                   </td>
                   <td className="px-8 py-6">
                      <p className="text-[10px] text-white">{calculateAge(a.birthDate)} lat</p>
                      <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{a.height}cm / {a.weight}kg</p>
                   </td>
                   <td className="px-8 py-6">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${a.experience === 'yes' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-gray-400'}`}>
                         {a.experience === 'yes' ? 'Doświadczona' : 'Nowa'}
                      </span>
                   </td>
                   <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                        a.status === 'approved' ? 'bg-green-500/10 text-green-500' : 
                        a.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                         {a.status}
                      </span>
                   </td>
                   <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                        a.contractStatus === 'signed' ? 'bg-green-500/10 text-green-500' : 
                        a.contractStatus === 'sent' ? 'bg-blue-500/10 text-blue-500' : 'bg-white/5 text-gray-500'
                      }`}>
                         {a.contractStatus === 'signed' ? 'Podpisany' : a.contractStatus === 'sent' ? 'Wysłany' : 'Brak'}
                      </span>
                   </td>
                   <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <button onClick={() => { setSelectedApp(a); setShowModal(true); }} className="p-2 text-gray-600 hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                         {a.status === 'pending' && (
                           <>
                             <button onClick={() => handleStatusChange(a.id, 'approved')} className="p-2 text-gray-600 hover:text-green-500 transition-all"><CheckCircle className="w-4 h-4" /></button>
                             <button onClick={() => handleStatusChange(a.id, 'rejected')} className="p-2 text-gray-600 hover:text-red-500 transition-all"><XCircle className="w-4 h-4" /></button>
                           </>
                         )}
                         <button onClick={() => handleDelete(a.id)} className="p-2 text-gray-800 hover:text-red-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                   </td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      <AnimatePresence>
         {showModal && selectedApp && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                 animate={{ opacity: 1, scale: 1, y: 0 }} 
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
               >
                  <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                     <div>
                        <h3 className="text-2xl font-bold font-georgia text-[#c9a84c] italic">Karta Aplikanta <span className="text-white">#{selectedApp.id.slice(-6)}</span></h3>
                        <div className="flex gap-3 mt-1">
                           <p className="text-[10px] text-gray-400 uppercase tracking-widest">Status: {selectedApp.status}</p>
                           <span className="text-gray-600">|</span>
                           <p className={`text-[10px] uppercase tracking-widest font-bold ${selectedApp.contractStatus === 'signed' ? 'text-green-500' : 'text-blue-400'}`}>
                              Kontrakt: {selectedApp.contractStatus === 'signed' ? 'PODPISANY' : selectedApp.contractStatus === 'sent' ? 'OCZEKUJE NA PODPIS' : 'NIE WYSŁANY'}
                           </p>
                        </div>
                     </div>
                     <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-white transition-all bg-white/5 rounded-full"><X className="w-6 h-6" /></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10">
                     <div className="grid grid-cols-3 gap-12">
                        {/* Section 1: Basic & Physical */}
                        <div className="space-y-8">
                           <div>
                              <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] mb-6 border-b border-[#c9a84c]/20 pb-2">Dane Osobowe</h4>
                              <div className="space-y-4">
                                 <div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Pełne Imię i Nazwisko</p>
                                    <p className="text-lg font-bold text-white">{selectedApp.firstName} {selectedApp.lastName}</p>
                                 </div>
                                 <div className="flex gap-8">
                                    <div>
                                       <p className="text-[8px] text-gray-400 uppercase tracking-widest">Wiek</p>
                                       <p className="text-sm font-bold text-white">{calculateAge(selectedApp.birthDate)} lat</p>
                                    </div>
                                    <div>
                                       <p className="text-[8px] text-gray-400 uppercase tracking-widest">Wzrost / Waga</p>
                                       <p className="text-sm font-bold text-white">{selectedApp.height}cm / {selectedApp.weight}kg</p>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest">Cechy</p>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{selectedApp.hairColor} / {selectedApp.eyeColor} / {selectedApp.breastSize}</p>
                                 </div>
                              </div>
                           </div>

                           <div>
                              <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] mb-6 border-b border-[#c9a84c]/20 pb-2">Kontakt</h4>
                              <div className="space-y-3">
                                 <div className="flex items-center gap-3 text-white">
                                    <Mail className="w-4 h-4 text-[#c9a84c]" />
                                    <span className="text-[10px] font-bold">{selectedApp.email}</span>
                                 </div>
                                 <div className="flex items-center gap-3 text-white">
                                    <Phone className="w-4 h-4 text-[#c9a84c]" />
                                    <span className="text-[10px] font-bold">{selectedApp.phone}</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Section 2: Experience & Motivation */}
                        <div className="col-span-2 space-y-8">
                           <div className="grid grid-cols-2 gap-8">
                              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                 <h4 className="text-[9px] font-black text-white uppercase tracking-widest mb-4">Doświadczenie</h4>
                                 <p className="text-xs text-gray-400 leading-relaxed italic">{selectedApp.experienceDesc || 'Brak wcześniejszego doświadczenia stacjonarnego.'}</p>
                              </div>
                              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                 <h4 className="text-[9px] font-black text-white uppercase tracking-widest mb-4">Motywacja</h4>
                                 <p className="text-xs text-gray-400 leading-relaxed italic">"{selectedApp.motivation}"</p>
                              </div>
                           </div>

                           <div>
                              <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] mb-6 border-b border-[#c9a84c]/20 pb-2">Preferencje & Zakres</h4>
                              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                 <div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Typy Contentu</p>
                                    <p className="text-[10px] text-white font-bold">{Array.isArray(selectedApp.contentTypes) ? selectedApp.contentTypes.join(', ') : selectedApp.contentTypes || 'Nie określono'}</p>
                                 </div>
                                 <div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Limity (Boundaries)</p>
                                    <p className="text-[10px] text-white font-bold">{selectedApp.limits || 'Brak zadeklarowanych limitów'}</p>
                                 </div>
                                 <div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Dostępność</p>
                                    <p className="text-[10px] text-white font-bold">{selectedApp.sessionsPerWeek} sesji / {selectedApp.workingTimes ? (Array.isArray(selectedApp.workingTimes) ? `${selectedApp.workingTimes.length} slotów` : 'Zdefiniowano') : 'Brak'}</p>
                                 </div>
                                 <div>
                                    <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Platformy</p>
                                    <p className="text-[10px] text-white font-bold">{Array.isArray(selectedApp.platforms) ? selectedApp.platforms.join(', ') : selectedApp.platforms || 'Brak'}</p>
                                 </div>
                              </div>
                           </div>

                           <div>
                              <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] mb-6 border-b border-[#c9a84c]/20 pb-2">Media & Portret</h4>
                              <div className="flex gap-4">
                                 {[selectedApp.photo1, selectedApp.photo2, selectedApp.photo3].map((img, i) => img && (
                                   <div key={i} className="w-32 h-44 bg-black border border-white/10 rounded-xl overflow-hidden group relative">
                                       <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                          <Eye className="w-6 h-6 text-white" />
                                       </div>
                                   </div>
                                 ))}
                                 {selectedApp.video && (
                                    <div className="w-32 h-44 bg-black border border-white/10 rounded-xl flex items-center justify-center cursor-pointer group hover:border-[#c9a84c]/50">
                                       <Zap className="w-8 h-8 text-gold animate-pulse" />
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-white/5 border-t border-white/5 flex gap-4">
                     {selectedApp.status === 'pending' ? (
                        <>
                           <button onClick={() => { handleConvert(selectedApp.id); setShowModal(false); }} className="flex-1 py-4 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-[3px] rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-[#c9a84c]/20">Zatwierdź & Utwórz Profil</button>
                           <button onClick={() => { handleStatusChange(selectedApp.id, 'rejected'); setShowModal(false); }} className="flex-1 py-4 bg-white/5 text-red-500 text-[10px] font-black uppercase tracking-[3px] border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-all">Odrzuć Aplikację</button>
                        </>
                     ) : selectedApp.status === 'approved' ? (
                        <div className="flex w-full gap-4">
                           <button onClick={() => handleConvert(selectedApp.id)} className="flex-1 py-4 bg-green-600 text-white text-[10px] font-black uppercase tracking-[3px] rounded-xl">Utwórz/Aktualizuj Profil</button>
                           <button onClick={() => setShowModal(false)} className="px-8 py-4 bg-white/10 text-white text-[10px] font-black uppercase tracking-[3px] rounded-xl">Zamknij</button>
                        </div>
                     ) : (
                        <button onClick={() => setShowModal(false)} className="w-full py-4 bg-white/10 text-white text-[10px] font-black uppercase tracking-[3px] rounded-xl">Zamknij Kartę</button>
                     )}
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CastingManager;
