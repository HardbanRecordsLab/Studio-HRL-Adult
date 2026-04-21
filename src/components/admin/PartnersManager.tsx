import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  UserCheck, 
  MoreVertical,
  Shield,
  Zap,
  Star,
  Activity,
  UserPlus
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  handle: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  revenueTotal: number;
  followers?: string;
  rating?: string;
  sessions: number;
  lastSync?: string;
  type?: 'couple' | 'solo';
  avatar?: string;
  heroImage?: string;
  bio?: string;
  height?: number | string;
  weight?: number | string;
  measurements?: string;
  platforms?: string;
  profileData?: any;
  ageVerified: boolean;
  documentsVerified: boolean;
  revenueSplit: {
    studio: number;
    partner: number;
    referral: number;
  };
}

interface PartnersManagerProps {
  token: string;
  onPartnersUpdate?: () => void;
}

const PartnersManager: React.FC<PartnersManagerProps> = ({ token, onPartnersUpdate }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/partners', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPartners(data.map((p: any) => ({
          ...p,
          // Default values if missing in DB for now
          ageVerified: p.ageVerified ?? false,
          documentsVerified: p.documentsVerified ?? false,
          revenueSplit: p.revenueSplit || { studio: 60, partner: 30, referral: 10 }
        })));
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę partnerkę?')) return;
    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchPartners();
        onPartnersUpdate?.();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filtered = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [newPartner, setNewPartner] = useState({
    name: '', handle: '', email: '', bio: '', height: '', weight: '', measurements: '', avatar: '',
    heroPitch: '',
    bust: '', waist: '', hips: '', size: '',
    characteristics: '',
    likes: ['', '', '', '', '', ''],
    boundaries: ['', '', '', '', '', ''],
    bestInMe: ['', '', '', '', '', '', '', '', '', ''],
    whyWatchMe: ['', '', '', '', '', '', '', '', '', ''],
    gallery: ['', '', '', '', '']
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const cleanHandle = newPartner.handle.startsWith('@') ? newPartner.handle.substring(1) : newPartner.handle;
      
      const profileData = {
        likes: newPartner.likes.filter((l: string) => l.trim() !== ''),
        boundaries: newPartner.boundaries.filter((b: string) => b.trim() !== ''),
        bestInMe: newPartner.bestInMe.filter((b: string) => b.trim() !== ''),
        whyWatchMe: newPartner.whyWatchMe.filter((w: string) => w.trim() !== ''),
        gallery: newPartner.gallery.filter((g: string) => g.trim() !== '')
      };

      const payload = {
        ...newPartner, 
        handle: cleanHandle, 
        status: editingPartner ? editingPartner.status : 'active', 
        type: 'solo',
        profileData: profileData,
        measurements: newPartner.bust && newPartner.waist && newPartner.hips 
          ? `${newPartner.bust} / ${newPartner.waist} / ${newPartner.hips}` 
          : newPartner.measurements
      };

      const url = editingPartner ? `/api/admin/partners/${editingPartner.id}` : '/api/admin/partners';
      const method = editingPartner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowModal(false);
        setEditingPartner(null);
        setNewPartner({ 
          name: '', handle: '', email: '', bio: '', height: '', weight: '', measurements: '', avatar: '',
          heroPitch: '', bust: '', waist: '', hips: '', size: '', characteristics: '',
          likes: ['', '', '', '', '', ''], boundaries: ['', '', '', '', '', ''],
          bestInMe: ['', '', '', '', '', '', '', '', '', ''], whyWatchMe: ['', '', '', '', '', '', '', '', '', ''],
          gallery: ['', '', '', '', '']
        });
        fetchPartners();
        onPartnersUpdate?.();
      } else {
        const errData = await response.json();
        alert(`Błąd: ${errData.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn relative">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">HRL <span className="text-white">Partners</span> HUB</h2>
          <p className="text-[10px] text-gray-400 tracking-[3px] uppercase">Zarządzanie talentami i kontraktami premium</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => {
             setEditingPartner(null);
             setNewPartner({ 
               name: '', handle: '', email: '', bio: '', height: '', weight: '', measurements: '', avatar: '',
               heroPitch: '', bust: '', waist: '', hips: '', size: '', characteristics: '',
               likes: ['', '', '', '', '', ''], boundaries: ['', '', '', '', '', ''],
               bestInMe: ['', '', '', '', '', '', '', '', '', ''], whyWatchMe: ['', '', '', '', '', '', '', '', '', ''],
               gallery: ['', '', '', '', '']
             });
             setShowModal(true);
           }} className="flex items-center gap-3 px-6 py-2.5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/10">
              <UserPlus className="w-4 h-4" /> Dodaj Partnerkę
           </button>
           <button className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded transition-all hover:bg-white/10">
              <Download className="w-4 h-4" /> Eksport CSV
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: 'Aktywne Talenty', val: partners.filter(p => p.status === 'active').length, icon: UserCheck, color: '#c9a84c' },
           { label: 'Weryfikacja Oczekująca', val: partners.filter(p => p.status === 'pending').length, icon: Shield, color: '#f59e0b' },
           { label: 'Przychód Miesięczny', val: `€${partners.reduce((s, p) => s + p.revenueTotal, 0).toLocaleString()}`, icon: Activity, color: '#22c55e' },
           { label: 'Średni Split', val: '60/30/10', icon: Zap, color: '#ef4444' }
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
            {['all', 'active', 'pending', 'inactive'].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-6 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-[#c9a84c] text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {f === 'all' ? 'Wszyscy' : f === 'active' ? 'Aktywni' : f === 'pending' ? 'Oczekujący' : 'Zawieszeni'}
              </button>
            ))}
         </div>

         <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input 
              type="text" 
              placeholder="Szukaj po imieniu / handle..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-[10px] text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 uppercase tracking-[2px]" 
            />
         </div>
      </div>

      {/* Partners Table */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Partnerka / Talent</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Weryfikacja</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Zarobki (Total)</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Split</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <tr>
                   <td colSpan={6} className="py-20 text-center text-gray-600 uppercase tracking-[10px] animate-pulse">Synchronizacja Hubu...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                   <td colSpan={6} className="py-20 text-center text-gray-600 uppercase tracking-[10px]">Brak dopasowań</td>
                </tr>
              ) : filtered.map((p) => (
                <motion.tr 
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-black border border-white/10 flex-shrink-0 relative group-hover:border-[#c9a84c]/50 transition-all">
                        {p.avatar ? (
                          <img src={p.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-purple-900/40 to-[#111] text-[#c9a84c]">
                             {p.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                         <p className="text-sm font-bold font-georgia text-white mb-0.5 group-hover:text-[#c9a84c] transition-colors">{p.name}</p>
                         <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">@{p.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                       p.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                       p.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                     }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          p.status === 'active' ? 'bg-green-500' : 
                          p.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        {p.status}
                     </span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                           <Shield className={`w-3 h-3 ${p.ageVerified ? 'text-green-500' : 'text-gray-700'}`} />
                           <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">18+</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <FileText className={`w-3 h-3 ${p.documentsVerified ? 'text-green-500' : 'text-gray-700'}`} />
                           <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Docs</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold font-georgia text-white">
                     €{p.revenueTotal.toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                     <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                       {p.revenueSplit.studio}/{p.revenueSplit.partner}/{p.revenueSplit.referral}
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-4">
                        <a href={`/profile/${p.handle}`} target="_blank" rel="noreferrer" className="p-2 text-gray-600 hover:text-white transition-all"><Eye className="w-4 h-4" /></a>
                        <button onClick={() => {
                          const pd = typeof p.profileData === 'string' ? JSON.parse(p.profileData) : (p.profileData || {});
                          setNewPartner({
                            ...newPartner,
                            name: p.name || '',
                            handle: p.handle || '',
                            email: p.email || '',
                            bio: p.bio || '',
                            height: p.height?.toString() || '',
                            weight: p.weight?.toString() || '',
                            measurements: p.measurements || '',
                            avatar: p.avatar || '',
                            heroPitch: p.heroImage || '',
                            bust: '', waist: '', hips: '', size: '', // Optional parsing if stored in measurements
                            characteristics: pd.characteristics || '',
                            likes: pd.likes?.length ? pd.likes.concat(Array(Math.max(0, 6 - pd.likes.length)).fill('')) : ['', '', '', '', '', ''],
                            boundaries: pd.boundaries?.length ? pd.boundaries.concat(Array(Math.max(0, 6 - pd.boundaries.length)).fill('')) : ['', '', '', '', '', ''],
                            bestInMe: pd.bestInMe?.length ? pd.bestInMe.concat(Array(Math.max(0, 10 - pd.bestInMe.length)).fill('')) : ['', '', '', '', '', '', '', '', '', ''],
                            whyWatchMe: pd.whyWatchMe?.length ? pd.whyWatchMe.concat(Array(Math.max(0, 10 - pd.whyWatchMe.length)).fill('')) : ['', '', '', '', '', '', '', '', '', ''],
                            gallery: pd.gallery?.length ? pd.gallery.concat(Array(Math.max(0, 5 - pd.gallery.length)).fill('')) : ['', '', '', '', '']
                          });
                          setEditingPartner(p);
                          setShowModal(true);
                        }} className="p-2 text-gray-600 hover:text-[#c9a84c] transition-all"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-800 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* MODAL: ADD PARTNER */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0a0a0c] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-transparent">
                <div>
                  <h3 className="text-2xl font-bold font-georgia text-white">Kreator Profilu Premium</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Stwórz nowy wizerunek partnerki w systemie publicznym</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 text-gray-500 hover:text-white transition-all">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreatePartner} className="max-h-[70vh] overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* SECTION 1: HERO / PITCH */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Hero Image / Opis</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Pitch Wizerunkowy</label>
                    <textarea value={newPartner.heroPitch} onChange={e => setNewPartner({...newPartner, heroPitch: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 min-h-[60px]" placeholder="Krótki, chwytliwy pitch opisujący wizerunek..." maxLength={200} />
                  </div>
                </div>

                {/* SECTION 2: PODSTAWOWE DANE */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Podstawowe Dane</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Pseudonim (Imię)</label>
                      <input type="text" required value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 font-georgia" placeholder="Np. Alexia, Sophia" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Unikalny Handle (URL)</label>
                      <input type="text" required value={newPartner.handle} onChange={e => setNewPartner({...newPartner, handle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="Np. alexia.hrl" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Email Kontaktowy (B2B)</label>
                    <input type="email" required value={newPartner.email} onChange={e => setNewPartner({...newPartner, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="model@studio.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Opis Główny (Lead Bio)</label>
                    <textarea required value={newPartner.bio} onChange={e => setNewPartner({...newPartner, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 min-h-[80px]" placeholder="Opis wstępny widoczny od razu na samej górze profilu..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Hero Image (URL avataru)</label>
                    <input type="text" value={newPartner.avatar} onChange={e => setNewPartner({...newPartner, avatar: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="/images/default-profile.jpg" />
                  </div>
                </div>

                {/* SECTION 3: WYMIARY */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Wymiary</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Wzrost (cm)</label>
                      <input type="number" value={newPartner.height} onChange={e => setNewPartner({...newPartner, height: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="174" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Waga (kg)</label>
                      <input type="number" value={newPartner.weight} onChange={e => setNewPartner({...newPartner, weight: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="58" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Rozmiar</label>
                      <input type="text" value={newPartner.size} onChange={e => setNewPartner({...newPartner, size: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="75C" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Biust (cm)</label>
                      <input type="number" value={newPartner.bust} onChange={e => setNewPartner({...newPartner, bust: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="92" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Talia (cm)</label>
                      <input type="number" value={newPartner.waist} onChange={e => setNewPartner({...newPartner, waist: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="62" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Biodra (cm)</label>
                      <input type="number" value={newPartner.hips} onChange={e => setNewPartner({...newPartner, hips: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700" placeholder="92" />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: CHARAKTERYSTYKA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Charakterystyka</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Opis Charakterystyczny (max 700 znaków)</label>
                    <textarea value={newPartner.characteristics} onChange={e => setNewPartner({...newPartner, characteristics: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 min-h-[100px]" placeholder="Szczegółowy opis charakterystyki osobowości i stylu..." maxLength={700} />
                    <p className="text-[8px] text-gray-600 mt-1 text-right">{newPartner.characteristics.length}/700</p>
                  </div>
                </div>

                {/* SECTION 5: UPODOPANIA I GRANICE */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Upodobania i Granice</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Upodobania (6 pozycji)</label>
                      {newPartner.likes.map((like, i) => (
                        <input key={i} type="text" value={like} onChange={e => {
                          const newLikes = [...newPartner.likes];
                          newLikes[i] = e.target.value;
                          setNewPartner({...newPartner, likes: newLikes});
                        }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 text-[10px] mb-2" placeholder={`Upodobanie ${i + 1}`} />
                      ))}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Granice (6 pozycji)</label>
                      {newPartner.boundaries.map((boundary, i) => (
                        <input key={i} type="text" value={boundary} onChange={e => {
                          const newBoundaries = [...newPartner.boundaries];
                          newBoundaries[i] = e.target.value;
                          setNewPartner({...newPartner, boundaries: newBoundaries});
                        }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 text-[10px] mb-2" placeholder={`Granica ${i + 1}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION 6: ZALETY I POWODY */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Zalety i Powody do Oglądania</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Mój Atut (10 pozycji)</label>
                      {newPartner.bestInMe.map((attr, i) => (
                        <input key={i} type="text" value={attr} onChange={e => {
                          const newBestInMe = [...newPartner.bestInMe];
                          newBestInMe[i] = e.target.value;
                          setNewPartner({...newPartner, bestInMe: newBestInMe});
                        }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 text-[10px] mb-2" placeholder={`Atut ${i + 1}`} />
                      ))}
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Dlaczego Mnie Oglądać (10 pozycji)</label>
                      {newPartner.whyWatchMe.map((reason, i) => (
                        <input key={i} type="text" value={reason} onChange={e => {
                          const newWhyWatchMe = [...newPartner.whyWatchMe];
                          newWhyWatchMe[i] = e.target.value;
                          setNewPartner({...newPartner, whyWatchMe: newWhyWatchMe});
                        }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 text-[10px] mb-2" placeholder={`Powód ${i + 1}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* SECTION 7: GALERIA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#c9a84c] to-purple-600"></div>
                    <h4 className="text-sm font-bold text-[#c9a84c] uppercase tracking-widest">Galeria Portfolio</h4>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">URL Zdjęć (5 pozycji)</label>
                    {newPartner.gallery.map((url, i) => (
                      <input key={i} type="text" value={url} onChange={e => {
                        const newGallery = [...newPartner.gallery];
                        newGallery[i] = e.target.value;
                        setNewPartner({...newPartner, gallery: newGallery});
                      }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 text-[10px] mb-2" placeholder={`/image/photo${i + 1}.jpg`} />
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end gap-4 sticky bottom-0 bg-[#0a0a0c] py-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-all">Anuluj</button>
                  <button type="submit" disabled={submitting} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-[#c9a84c] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-50">
                    {submitting ? 'GENEROWANIE PROFILU...' : 'PUBLIKUJ MODELKĘ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
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

export default PartnersManager;
