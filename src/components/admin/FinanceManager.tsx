import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Calendar, DollarSign, TrendingUp, TrendingDown, Users, CreditCard, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [processingPayout, setProcessingPayout] = useState(false);

  useEffect(() => {
    fetchFinancialData();
  }, [dateRange]);

  const fetchFinancialData = async () => {
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

  const exportToExcel = () => {
    // This would typically use a library like xlsx
    alert('Excel export functionality would be implemented with a library like xlsx');
  };

  const exportToCSV = () => {
    if (!financialData) return;

    const headers = ['Date', 'Partner', 'Platform', 'Type', 'Amount', 'Status'];
    const csvData = financialData.recentTransactions.map(record => [
      new Date(record.date).toLocaleDateString(),
      record.partner.name,
      record.platform || 'Unknown',
      record.type,
      Math.abs(record.amount).toFixed(2),
      record.status
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-records.csv';
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'subscription': return 'text-blue-400 bg-blue-400/10';
      case 'tip': return 'text-green-400 bg-green-400/10';
      case 'ppv': return 'text-purple-400 bg-purple-400/10';
      case 'payout': return 'text-red-400 bg-red-400/10';
      case 'referral': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const swissTaxBrackets: TaxBracket[] = [
    { min: 0, max: 14500, rate: 0, description: '0% - No tax' },
    { min: 14501, max: 31600, rate: 0.014, description: '1.4% - Basic rate' },
    { min: 31601, max: 41400, rate: 0.029, description: '2.9% - Low income' },
    { min: 41401, max: 55200, rate: 0.057, description: '5.7% - Medium income' },
    { min: 55201, max: 72500, rate: 0.087, description: '8.7% - Upper medium' },
    { min: 72501, max: 78100, rate: 0.107, description: '10.7% - High income' },
    { min: 78101, max: 103600, rate: 0.127, description: '12.7% - Very high' },
    { min: 103601, max: 134600, rate: 0.147, description: '14.7% - Top tier' },
    { min: 134601, max: 176000, rate: 0.167, description: '16.7% - Ultra high' },
    { min: 176001, max: 755200, rate: 0.187, description: '18.7% - Maximum' },
    { min: 755201, max: Infinity, rate: 0.215, description: '21.5% - Top bracket' }
  ];

  const calculateTax = (income: number) => {
    for (const bracket of swissTaxBrackets) {
      if (income >= bracket.min && income <= bracket.max) {
        return income * bracket.rate;
      }
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!financialData) {
    return (
      <div className="text-center text-gray-400 py-8">
        Failed to load financial data
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Financial Reporting</h2>
          <p className="text-gray-400">Revenue tracking, payouts, and tax calculations (Swiss HQ)</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export Excel
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => setShowPayoutModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 rounded-lg text-white font-medium transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Schedule Payout
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Revenue', 
            value: formatCurrency(financialData.overview.totalRevenue), 
            change: `+${financialData.overview.growth}%`,
            icon: DollarSign, 
            color: 'from-green-500 to-green-600',
            trend: 'up'
          },
          { 
            label: 'Pending Payouts', 
            value: formatCurrency(financialData.overview.pendingPayouts), 
            change: 'Ready to process',
            icon: CreditCard, 
            color: 'from-yellow-500 to-yellow-600',
            trend: 'neutral'
          },
          { 
            label: 'Monthly Revenue', 
            value: formatCurrency(financialData.overview.monthlyRevenue), 
            change: '+12.5%',
            icon: TrendingUp, 
            color: 'from-blue-500 to-blue-600',
            trend: 'up'
          },
          { 
            label: 'Active Partners', 
            value: '24', 
            change: '+2 this month',
            icon: Users, 
            color: 'from-purple-500 to-purple-600',
            trend: 'up'
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-8 h-8 text-white/50" />
              {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-white/70" />}
              {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-white/70" />}
            </div>
            <p className="text-white/80 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-white/70 text-xs mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue by Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue by Platform</h3>
          <div className="space-y-3">
            {financialData.revenueByPlatform.map((platform, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white text-xs font-bold">
                    {platform.platform.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{platform.platform}</p>
                    <p className="text-gray-400 text-sm">{platform.percentage}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{formatCurrency(platform.amount)}</p>
                  <p className={`text-sm ${platform.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {platform.change >= 0 ? '+' : ''}{platform.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swiss Tax Brackets */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Swiss Tax Brackets</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {swissTaxBrackets.map((bracket, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-900 rounded">
                <div>
                  <p className="text-white text-sm">{bracket.description}</p>
                  <p className="text-gray-400 text-xs">
                    {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{(bracket.rate * 100).toFixed(1)}%</p>
                  <p className="text-gray-400 text-xs">{formatCurrency(calculateTax((bracket.min + bracket.max) / 2))}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Types</option>
          <option value="subscription">Subscription</option>
          <option value="tip">Tips</option>
          <option value="ppv">PPV</option>
          <option value="payout">Payouts</option>
          <option value="referral">Referrals</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="processed">Processed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {financialData.recentTransactions
                .filter(transaction => {
                  const matchesSearch = searchTerm === '' || 
                    transaction.partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    transaction.platform?.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
                  const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
                  return matchesSearch && matchesType && matchesStatus;
                })
                .map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white text-xs font-bold">
                        {transaction.partner.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{transaction.partner.name}</div>
                        <div className="text-sm text-gray-400">@{transaction.partner.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {transaction.platform || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status === 'processed' && <CheckCircle className="w-3 h-3" />}
                      {transaction.status === 'pending' && <Clock className="w-3 h-3" />}
                      {transaction.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-6">Schedule Payout</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Partner</label>
                <select
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  required
                >
                  <option value="">Select a partner</option>
                  {Array.from(new Set(financialData.recentTransactions.map(t => t.partner))).map((partner) => (
                    <option key={partner.name} value={partner.name}>
                      {partner.name} (@{partner.handle})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Amount (EUR)</label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  required
                />
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Gross Amount:</span>
                  <span className="text-white">{payoutAmount ? formatCurrency(parseFloat(payoutAmount)) : '€0.00'}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Tax (Est.):</span>
                  <span className="text-white">
                    {payoutAmount ? formatCurrency(calculateTax(parseFloat(payoutAmount))) : '€0.00'}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between">
                  <span className="text-white font-medium">Net Amount:</span>
                  <span className="text-white font-bold">
                    {payoutAmount ? formatCurrency(parseFloat(payoutAmount) - calculateTax(parseFloat(payoutAmount))) : '€0.00'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSchedulePayout}
                disabled={!selectedPartner || !payoutAmount || processingPayout}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all"
              >
                {processingPayout ? 'Processing...' : 'Schedule Payout'}
              </button>
              <button
                onClick={() => {
                  setShowPayoutModal(false);
                  setSelectedPartner('');
                  setPayoutAmount('');
                }}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FinanceManager;
