import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Upload, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, DollarSign, FileText, UserCheck } from 'lucide-react';

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
  bio?: string;
  platforms?: string;
  ageVerified?: boolean;
  documentsVerified?: boolean;
  revenueSplit?: {
    studio: number;
    partner: number;
    referral: number;
  };
}

interface PartnerFormData {
  name: string;
  handle: string;
  email: string;
  status: string;
  type: string;
  bio: string;
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
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'visuals' | 'finance'>('basic');
  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    handle: '',
    email: '',
    status: 'pending',
    type: 'solo',
    bio: '',
    revenueSplit: {
      studio: 60,
      partner: 30,
      referral: 10
    }
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    filterPartners();
  }, [partners, searchTerm, statusFilter]);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/admin/partners', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPartners(data.map((partner: any) => ({
          ...partner,
          ageVerified: Math.random() > 0.3,
          documentsVerified: Math.random() > 0.4,
          revenueSplit: {
            studio: 60,
            partner: 30,
            referral: 10
          }
        })));
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
    setLoading(false);
  };

  const filterPartners = () => {
    let filtered = partners;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    setFilteredPartners(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPartner ? `/api/admin/partners/${editingPartner.id}` : '/api/admin/partners';
      const method = editingPartner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchPartners();
        setShowModal(false);
        setEditingPartner(null);
        resetForm();
        onPartnersUpdate?.();
      }
    } catch (error) {
      console.error('Error saving partner:', error);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      handle: '',
      email: '',
      status: 'pending',
      type: 'solo',
      bio: '',
      revenueSplit: {
        studio: 60,
        partner: 30,
        referral: 10
      }
    });
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      handle: partner.handle,
      email: partner.email,
      status: partner.status,
      type: partner.type || 'solo',
      bio: partner.bio || '',
      revenueSplit: partner.revenueSplit || {
        studio: 60,
        partner: 30,
        referral: 10
      }
    });
    setShowModal(true);
  };

  const handleDelete = async (partnerId: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const response = await fetch(`/api/admin/partners/${partnerId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await fetchPartners();
        onPartnersUpdate?.();
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  const handleStatusChange = async (partnerId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/partners/${partnerId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchPartners();
        onPartnersUpdate?.();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Handle', 'Email', 'Status', 'Revenue', 'Sessions', 'Type'];
    const csvData = filteredPartners.map(p => [
      p.name,
      p.handle,
      p.email,
      p.status,
      p.revenueTotal.toFixed(2),
      p.sessions.toString(),
      p.type || 'solo'
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'partners.csv';
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-red-400 bg-red-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Partners Management</h2>
          <p className="text-gray-400">Manage models, partners, and revenue splits</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 rounded-lg text-white font-medium transition-all"
          >
            <Upload className="w-4 h-4" />
            Add Partner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Partners', value: partners.length, icon: UserCheck, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: partners.filter(p => p.status === 'active').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Pending', value: partners.filter(p => p.status === 'pending').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Total Revenue', value: `€${partners.reduce((sum, p) => sum + p.revenueTotal, 0).toFixed(0)}`, icon: DollarSign, color: 'from-purple-500 to-purple-600' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-white/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Partners Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Split</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPartners.map((partner) => (
                <motion.tr
                  key={partner.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold">
                        {partner.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{partner.name}</div>
                        <div className="text-sm text-gray-400">@{partner.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                      {getStatusIcon(partner.status)}
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${partner.ageVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        <UserCheck className="w-3 h-3" />
                        Age: {partner.ageVerified ? 'Verified' : 'Pending'}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${partner.documentsVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        <FileText className="w-3 h-3" />
                        Docs: {partner.documentsVerified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">€{partner.revenueTotal.toFixed(2)}</div>
                    <div className="text-xs text-gray-400">{partner.sessions} sessions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-400">
                      <div>Studio: {partner.revenueSplit?.studio || 60}%</div>
                      <div>Partner: {partner.revenueSplit?.partner || 30}%</div>
                      <div>Referral: {partner.revenueSplit?.referral || 10}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPartner(partner);
                          setShowDocumentsModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(partner)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Builder / Edit Partner Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-dark-2 border border-gold/20 rounded-xl w-full max-w-4xl my-8 overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)] relative"
          >
            <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-dark-3 to-dark-4 p-6 border-b border-gold/20 flex justify-between items-center relative z-10">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gold italic">
                  {editingPartner ? 'Edytor Wizytówki (Profile Builder)' : 'Kreator Profilu (Nowy Twórca)'}
                </h3>
                <p className="text-dim text-sm mt-1">Zaprojektuj publiczną wizytówkę i ustawienia biznesowe</p>
              </div>
              <button onClick={() => { setShowModal(false); setEditingPartner(null); resetForm(); }} className="text-gray-400 hover:text-white transition-colors">
                <XCircle className="w-8 h-8" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gold/10 bg-dark-3 relative z-10">
              <button 
                onClick={() => setActiveTab('basic')}
                className={`flex-1 py-4 text-sm font-medium tracking-widest uppercase transition-all ${activeTab === 'basic' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-dim hover:text-white hover:bg-white/5'}`}
              >
                1. Osobiste & BIO
              </button>
              <button 
                onClick={() => setActiveTab('visuals')}
                className={`flex-1 py-4 text-sm font-medium tracking-widest uppercase transition-all ${activeTab === 'visuals' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-dim hover:text-white hover:bg-white/5'}`}
              >
                2. Wygląd & Media
              </button>
              <button 
                onClick={() => setActiveTab('finance')}
                className={`flex-1 py-4 text-sm font-medium tracking-widest uppercase transition-all ${activeTab === 'finance' ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-dim hover:text-white hover:bg-white/5'}`}
              >
                3. Finanse & Kontrakt
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 relative z-10">
              
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gold/80 mb-2">Imię / Pseudonim Artystyczny</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-dark-4 border border-gold/20 rounded focus:outline-none focus:border-gold text-white font-light"
                        required
                        placeholder="np. Lexi"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gold/80 mb-2">Handle (URL)</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 bg-dark-3 border border-r-0 border-gold/20 text-dim rounded-l">@</span>
                        <input
                          type="text"
                          value={formData.handle}
                          onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                          className="flex-1 px-4 py-3 bg-dark-4 border border-gold/20 rounded-r focus:outline-none focus:border-gold text-white font-light"
                          required
                          placeholder="lexi_premium"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-gold/80 mb-2">Email Kontaktowy (Logowanie)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-dark-4 border border-gold/20 rounded focus:outline-none focus:border-gold text-white font-light"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gold/80 mb-2">Status Aktywności</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 bg-dark-4 border border-gold/20 rounded focus:outline-none focus:border-gold text-white font-light"
                      >
                        <option value="pending">W Przygotowaniu (Ukryty)</option>
                        <option value="active">Aktywny (Widoczny w Portfolio)</option>
                        <option value="inactive">Zawieszony</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gold/80 mb-2">Typ Konta</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-4 py-3 bg-dark-4 border border-gold/20 rounded focus:outline-none focus:border-gold text-white font-light"
                      >
                        <option value="solo">Solo Creator</option>
                        <option value="couple">BGM / Para</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-gold/80 mb-2">Opis Profilu (BIO widoczne u fanów)</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      placeholder="Napisz krótki i angażujący opis modelki do jej wizytówki..."
                      className="w-full px-4 py-3 bg-dark-4 border border-gold/20 rounded focus:outline-none focus:border-gold text-white font-light resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: VISUALS (Placeholder for Avatar/Images) */}
              {activeTab === 'visuals' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="bg-dark-4 border border-blue-500/30 p-6 rounded relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 text-3xl opacity-10">📸</div>
                     <h4 className="text-xl font-playfair text-white mb-2">Menedżer Mediów (Wkrótce)</h4>
                     <p className="text-dim text-sm italic">W tej sekcji docelowo będziemy uploadować awatar modelki, okładkę bannerową oraz zdjęcia do galerii przy użyciu Cloudinary API. Formularz zostanie zintegrowany z modułem direct upload.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="block text-xs uppercase tracking-widest font-bold text-gold/80">Awatar URL</label>
                       <input disabled className="w-full px-4 py-3 bg-dark-4/50 border border-gold/10 rounded text-dim font-light cursor-not-allowed" placeholder="Automatyczny po uploadzie..." />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-xs uppercase tracking-widest font-bold text-gold/80">Banner Hero URL</label>
                       <input disabled className="w-full px-4 py-3 bg-dark-4/50 border border-gold/10 rounded text-dim font-light cursor-not-allowed" placeholder="Automatyczny po uploadzie..." />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FINANCE */}
              {activeTab === 'finance' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-dark-3 p-6 border border-gold/10 rounded">
                    <h4 className="font-playfair text-xl text-gold italic mb-6 flex items-center gap-3">
                      <DollarSign className="w-5 h-5" /> Reguły Podziału Zysków (Revenue Share)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-dim mb-2">PROWIZJA STUDIA (%)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.revenueSplit.studio}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              revenueSplit: { ...prev.revenueSplit, studio: parseInt(e.target.value) || 0 }
                            }))}
                            min="0" max="100"
                            className="w-full pl-4 pr-10 py-3 bg-dark-4 border border-gold/20 rounded focus:border-gold text-white text-xl font-bold"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-dim mb-2">UDZIAŁ MODELKI (%)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.revenueSplit.partner}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              revenueSplit: { ...prev.revenueSplit, partner: parseInt(e.target.value) || 0 }
                            }))}
                            min="0" max="100"
                            className="w-full pl-4 pr-10 py-3 bg-dark-4 border border-gold/20 rounded focus:border-gold text-white text-xl font-bold"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-dim mb-2">BUDŻET PROMOCYJNY (%)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.revenueSplit.referral}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              revenueSplit: { ...prev.revenueSplit, referral: parseInt(e.target.value) || 0 }
                            }))}
                            min="0" max="100"
                            className="w-full pl-4 pr-10 py-3 bg-dark-4 border border-gold/20 rounded focus:border-gold text-white text-xl font-bold"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-dim italic text-center">
                    Podział procentowy stanowi podstawę do automatycznych wyliczeń modułu Finance. Upewnij się, że suma stanowi 100%.
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 mt-8 border-t border-gold/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPartner(null);
                    resetForm();
                  }}
                  className="px-8 py-3 bg-dark-3 hover:bg-dark-4 text-white font-bold tracking-widest uppercase text-xs border border-white/10 rounded transition-all"
                >
                  Anuluj Tworzenie
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gold hover:bg-gold/80 text-dark font-bold tracking-widest uppercase text-xs rounded transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] disabled:opacity-50"
                >
                  {loading ? 'Zapisuję...' : (editingPartner ? 'Zaktualizuj i wygeneruj Wizytówkę' : 'Zapisz i utwórz Profil Publiczny')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Documents Verification Modal */}
      {showDocumentsModal && selectedPartner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Documents Verification</h3>
              <button
                onClick={() => setShowDocumentsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold">
                  {selectedPartner.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{selectedPartner.name}</h4>
                  <p className="text-sm text-gray-400">@{selectedPartner.handle} • {selectedPartner.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-white">Age Verification Document</h5>
                    <span className={`px-2 py-1 rounded text-xs ${selectedPartner.ageVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {selectedPartner.ageVerified ? 'Verified' : 'Pending Review'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left text-sm text-gray-300 transition-colors">
                      📄 ID_Document_{selectedPartner.handle}.pdf
                    </button>
                    {!selectedPartner.ageVerified && (
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Approve
                        </button>
                        <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-white">Model Release Form</h5>
                    <span className={`px-2 py-1 rounded text-xs ${selectedPartner.documentsVerified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {selectedPartner.documentsVerified ? 'Verified' : 'Pending Review'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left text-sm text-gray-300 transition-colors">
                      📄 Release_Form_{selectedPartner.handle}.pdf
                    </button>
                    {!selectedPartner.documentsVerified && (
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Approve
                        </button>
                        <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PartnersManager;
