import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Activity,
  Shield,
  Zap,
  MoreVertical,
  X,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface FinancialRecord {
  id: string;
  partnerId: string;
  partner: {
    name: string;
    handle: string;
  };
  amount: number;
  type: 'subscription' | 'tip' | 'ppv' | 'payout' | 'referral';
  status: 'pending' | 'processed' | 'failed';
  date: string;
  platform?: string;
}

interface FinanceOverview {
  totalRevenue: number;
  pendingPayouts: number;
  growth: number;
  monthlyRevenue: number;
  quarterlyRevenue: number;
  yearlyRevenue: number;
}

interface PlatformRevenue {
  platform: string;
  amount: number;
  percentage: number;
  change: number;
}

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
  description: string;
}

interface FinanceManagerProps {
  token: string;
}

const FinanceManager: React.FC<FinanceManagerProps> = ({ token }) => {
  const [financialData, setFinancialData] = useState<{
    overview: FinanceOverview;
    revenueByPlatform: PlatformRevenue[];
    recentTransactions: FinancialRecord[];
    payoutHistory: FinancialRecord[];
  } | null>(null);
  const [partners, setPartners] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [revenueType, setRevenueType] = useState<'subscription' | 'tip' | 'ppv' | 'referral'>('subscription');
  const [revenuePlatform, setRevenuePlatform] = useState('OnlyFans');
  const [processingPayout, setProcessingPayout] = useState(false);

  useEffect(() => {
    fetchFinancialData();
    fetchPartners();
  }, [dateRange]);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/admin/partners', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPartners(data.map((p: any) => ({ id: p.id, name: p.name })));
      }
    } catch (e) { console.error(e); }
  };

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/finance?range=${dateRange}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setFinancialData(data);
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
    setLoading(false);
  };

  const handleSchedulePayout = async () => {
    if (!selectedPartner || !payoutAmount) return;
    setProcessingPayout(true);
    try {
      const response = await fetch('/api/admin/finance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'schedule_payout',
          partnerId: selectedPartner,
          amount: parseFloat(payoutAmount)
        })
      });
      if (response.ok) {
        await fetchFinancialData();
        setShowPayoutModal(false);
        setSelectedPartner('');
        setPayoutAmount('');
      }
    } catch (error) {
      console.error('Error scheduling payout:', error);
    }
    setProcessingPayout(false);
  };

  const handleAddRevenue = async () => {
    if (!selectedPartner || !payoutAmount) return;
    setProcessingPayout(true);
    try {
      const response = await fetch('/api/admin/finance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'add_revenue',
          partnerId: selectedPartner,
          amount: parseFloat(payoutAmount),
          type: revenueType,
          platform: revenuePlatform
        })
      });
      if (response.ok) {
        await fetchFinancialData();
        setShowRevenueModal(false);
        setSelectedPartner('');
        setPayoutAmount('');
      }
    } catch (error) {
      console.error('Error adding revenue:', error);
    }
    setProcessingPayout(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const swissTaxBrackets: TaxBracket[] = [
    { min: 0, max: 14500, rate: 0, description: 'Podstawa Kwoty Wolnej' },
    { min: 14501, max: 31600, rate: 0.014, description: 'Próg Podstawowy I' },
    { min: 31601, max: 41400, rate: 0.029, description: 'Próg Podstawowy II' },
    { min: 41401, max: 55200, rate: 0.057, description: 'Próg Średni' },
    { min: 55201, max: 176000, rate: 0.167, description: 'Próg Wysoki' },
    { min: 176001, max: Infinity, rate: 0.215, description: 'Maximum Tax Bracket' }
  ];

  const calculateTax = (income: number) => {
    for (const bracket of swissTaxBrackets) {
      if (income >= bracket.min && income <= bracket.max) return income * bracket.rate;
    }
    return 0;
  };

  if (loading && !financialData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="w-12 h-12 border-2 border-[#c9a84c]/20 border-t-[#c9a84c] rounded-full animate-spin" />
        <p className="text-[10px] text-gray-500 uppercase tracking-[5px] animate-pulse">Synchronizacja Finansów...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">HRL <span className="text-white">Finance</span> AUDIT</h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase">Raportowanie przychodów, wypłaty i optymalizacja podatkowa (Global HQ)</p>
        </div>
        <div className="flex gap-4">
           <select 
             className="bg-white/5 border border-white/10 text-white text-[10px] uppercase font-black px-4 py-2.5 rounded outline-none focus:border-[#c9a84c] transition-all"
             value={dateRange}
             onChange={(e) => setDateRange(e.target.value)}
           >
              <option value="7">Ostatnie 7 dni</option>
              <option value="30">Ostatnie 30 dni</option>
              <option value="90">Ostatni Kwartał</option>
           </select>
           <button onClick={() => setShowRevenueModal(true)} className="flex items-center gap-3 px-6 py-2.5 bg-[#22c55e] text-black text-[10px] font-black uppercase tracking-widest rounded transition-all hover:scale-105 shadow-xl shadow-green-500/10">
              <Plus className="w-4 h-4" /> Dodaj Przychód
           </button>
           <button onClick={() => setShowPayoutModal(true)} className="flex items-center gap-3 px-6 py-2.5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/10">
              <CreditCard className="w-4 h-4" /> Zaplanuj Wypłatę
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
         {[
           { label: 'Revenue Total', val: formatCurrency(financialData?.overview.totalRevenue || 0), growth: '+12.4%', icon: DollarSign, color: '#c9a84c' },
           { label: 'Pending Payouts', val: formatCurrency(financialData?.overview.pendingPayouts || 0), growth: 'Oczekujące', icon: Clock, color: '#f59e0b' },
           { label: 'Avg Monthly', val: formatCurrency(financialData?.overview.monthlyRevenue || 0), growth: '+5.2%', icon: TrendingUp, color: '#22c55e' },
           { label: 'Active Creators', val: partners.length.toString(), growth: 'Wszyscy Partnerzy', icon: Users, color: '#ffffff' }
         ].map((s, i) => (
           <div key={i} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#c9a84c]/20 transition-all cursor-default">
              <div>
                <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                <div className="flex items-baseline gap-2">
                   <p className="text-2xl font-bold font-georgia">{s.val}</p>
                </div>
                <p className="text-[8px] text-[#c9a84c] mt-1 font-black uppercase tracking-widest">{s.growth}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                <s.icon className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: s.color }} />
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
         {/* Table Section */}
         <div className="col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <h4 className="text-[10px] font-black text-white uppercase tracking-[4px]">Ostatnie Transakcje</h4>
                <div className="flex gap-4">
                   <select 
                      className="bg-white/5 border border-white/10 text-white text-[9px] uppercase font-black px-4 py-2 rounded outline-none focus:border-[#c9a84c] transition-all"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                   >
                      <option value="all">Wszystkie Typy</option>
                      <option value="subscription">Subskrypcje</option>
                      <option value="tip">Napiwki</option>
                      <option value="ppv">PPV</option>
                      <option value="payout">Wypłaty</option>
                   </select>
                   <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                      <input 
                        type="text" 
                        placeholder="Szukaj..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-[9px] text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-gray-700 uppercase tracking-[2px]" 
                      />
                   </div>
                </div>
            </div>

            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-4 text-[9px] font-black text-gray-500 uppercase tracking-[2px]">Data</th>
                      <th className="px-6 py-4 text-[9px] font-black text-gray-500 uppercase tracking-[2px]">Partner</th>
                      <th className="px-6 py-4 text-[9px] font-black text-gray-500 uppercase tracking-[2px]">Typ</th>
                      <th className="px-6 py-4 text-[9px] font-black text-gray-500 uppercase tracking-[2px]">Status</th>
                      <th className="px-6 py-4 text-[9px] font-black text-gray-500 uppercase tracking-[3px] text-right">Kwota</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[10px]">
                     {financialData?.recentTransactions
                        .filter(t => {
                           const matchesSearch = t.partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                              t.type.toLowerCase().includes(searchTerm.toLowerCase());
                           const matchesType = typeFilter === 'all' || t.type === typeFilter;
                           return matchesSearch && matchesType;
                        })
                        .slice(0, 15).map((t) => (
                       <tr key={t.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-bold text-gold text-[8px]">{t.partner.name.charAt(0)}</div>
                                <span className="font-bold text-white uppercase tracking-wider">{t.partner.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-gray-500 font-black uppercase tracking-widest text-[8px]">{t.type}</span>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`flex items-center gap-1.5 ${t.status === 'processed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                <div className={`w-1 h-1 rounded-full ${t.status === 'processed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                <span className="uppercase font-black tracking-widest text-[8px]">{t.status}</span>
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <span className={`font-bold font-georgia ${t.amount > 0 ? 'text-white' : 'text-red-500'}`}>
                                {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                             </span>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Right Sidebar: Tax & Platforms */}
         <div className="space-y-8">
            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 space-y-6">
               <h4 className="text-[10px] font-black text-[#c9a84c] uppercase tracking-[4px] border-b border-[#c9a84c]/20 pb-4 flex items-center justify-between">
                  Swiss Tax Optim. <Shield className="w-3.5 h-3.5" />
               </h4>
               <div className="space-y-4">
                  {swissTaxBrackets.map((b, i) => (
                    <div key={i} className="flex justify-between items-center group">
                       <div>
                          <p className="text-[9px] font-bold text-white group-hover:text-[#c9a84c] transition-colors">{b.description}</p>
                          <p className="text-[7px] text-gray-500 uppercase tracking-widest">{formatCurrency(b.min)} - {b.max === Infinity ? '∞' : formatCurrency(b.max)}</p>
                       </div>
                       <p className="text-[10px] font-black text-[#c9a84c]">{(b.rate * 100).toFixed(1)}%</p>
                    </div>
                  ))}
               </div>
               <div className="pt-6 border-t border-white/5">
                  <p className="text-[8px] text-gray-500 uppercase tracking-[2px] leading-relaxed italic">System automatycznie rezerwuje fundusze na poczet zobowiązań HQ w Szwajcarii.</p>
               </div>
            </div>

            <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 space-y-6">
               <h4 className="text-[10px] font-black text-white uppercase tracking-[4px] border-b border-white/5 pb-4">Revenue Capture</h4>
               <div className="space-y-6">
                  {financialData?.revenueByPlatform.map((p, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-end">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{p.platform}</p>
                          <p className="text-[10px] font-bold text-white">{formatCurrency(p.amount)}</p>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${p.percentage}%` }} className="h-full bg-[#c9a84c]" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Revenue Modal */}
      <AnimatePresence>
          {showRevenueModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRevenueModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                 animate={{ opacity: 1, scale: 1, y: 0 }} 
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
               >
                  <div className="p-8 border-b border-white/5 bg-green-500/5 flex justify-between items-center">
                     <div>
                        <h3 className="text-2xl font-bold font-georgia text-green-500 italic">Capture <span className="text-white">Revenue</span></h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Ręczne księgowanie wpływów z platform</p>
                     </div>
                     <button onClick={() => setShowRevenueModal(false)} className="p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
                  </div>

                  <div className="p-8 space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] block mb-3">Platforma</label>
                           <select value={revenuePlatform} onChange={(e) => setRevenuePlatform(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-green-500 transition-all">
                              <option value="OnlyFans" className="bg-black">OnlyFans</option>
                              <option value="Fansly" className="bg-black">Fansly</option>
                              <option value="Chaturbate" className="bg-black">Chaturbate</option>
                              <option value="MyFreeCams" className="bg-black">MyFreeCams</option>
                              <option value="Other" className="bg-black">Inne</option>
                           </select>
                        </div>
                        <div>
                           <label className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] block mb-3">Typ</label>
                           <select value={revenueType} onChange={(e) => setRevenueType(e.target.value as any)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-green-500 transition-all">
                              <option value="subscription" className="bg-black">Subskrypcja</option>
                              <option value="tip" className="bg-black">Napiwek</option>
                              <option value="ppv" className="bg-black">PPV</option>
                              <option value="referral" className="bg-black">Referral</option>
                           </select>
                        </div>
                     </div>

                     <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] block mb-3">Wybierz Partnerkę</label>
                        <select value={selectedPartner} onChange={(e) => setSelectedPartner(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-green-500">
                           <option value="" className="bg-black">Wybierz z listy...</option>
                           {partners.map(p => <option key={p.id} value={p.id} className="bg-black">{p.name}</option>)}
                        </select>
                     </div>

                     <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] block mb-3">Kwota Brutto (EUR)</label>
                        <div className="relative">
                           <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                           <input type="number" value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-2xl font-bold text-white outline-none focus:border-green-500" />
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-white/5 flex gap-4">
                     <button onClick={handleAddRevenue} disabled={processingPayout || !selectedPartner || !payoutAmount} className="flex-1 py-4 bg-green-500 text-black text-[10px] font-black uppercase tracking-[3px] rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50">
                        {processingPayout ? 'Księgowanie...' : 'Zaksięguj Przychód'}
                     </button>
                  </div>
               </motion.div>
            </div>
          )}
      </AnimatePresence>

      {/* Payout Modal */}
      <AnimatePresence>
         {showPayoutModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayoutModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                 animate={{ opacity: 1, scale: 1, y: 0 }} 
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
               >
                  <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
                     <div>
                        <h3 className="text-2xl font-bold font-georgia text-[#c9a84c] italic">Schedule <span className="text-white">Payout</span></h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Zatwierdzenie transferu środków do partnera</p>
                     </div>
                     <button onClick={() => setShowPayoutModal(false)} className="p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
                  </div>

                  <div className="p-8 space-y-6">
                     <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] block mb-3">Wybierz Partnera / Talent</label>
                        <select 
                           value={selectedPartner}
                           onChange={(e) => setSelectedPartner(e.target.value)}
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#c9a84c] selection:bg-[#c9a84c]"
                        >
                           <option value="" className="bg-black">Wybierz z listy...</option>
                           {partners.map(p => (
                              <option key={p.id} value={p.id} className="bg-black">{p.name}</option>
                           ))}
                        </select>
                     </div>

                     <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-[3px] block mb-3">Kwota (EUR)</label>
                        <div className="relative">
                           <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                           <input 
                              type="number"
                              value={payoutAmount}
                              onChange={(e) => setPayoutAmount(e.target.value)}
                              placeholder="0.00"
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-2xl font-bold text-white outline-none focus:border-[#c9a84c] placeholder:text-white/10"
                           />
                        </div>
                     </div>

                     <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex justify-between text-[10px] text-gray-400">
                           <span className="uppercase tracking-widest">Est. Tax Deduction:</span>
                           <span className="font-bold text-red-500">-{formatCurrency(calculateTax(parseFloat(payoutAmount) || 0))}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                           <span className="text-[10px] font-black text-white uppercase tracking-[2px]">Net Transfer:</span>
                           <span className="text-2xl font-bold text-white font-georgia">{formatCurrency((parseFloat(payoutAmount) || 0) - calculateTax(parseFloat(payoutAmount) || 0))}</span>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-white/5 flex gap-4">
                     <button 
                        onClick={handleSchedulePayout}
                        disabled={processingPayout || !selectedPartner || !payoutAmount}
                        className="flex-1 py-4 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-[3px] rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-[#c9a84c]/20 disabled:opacity-50"
                     >
                        {processingPayout ? 'Procesor Autoryzacji...' : 'Autoryzuj Przelew'}
                     </button>
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

export default FinanceManager;
