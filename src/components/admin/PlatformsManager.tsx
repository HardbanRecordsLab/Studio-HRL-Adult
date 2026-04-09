import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, CheckCircle, XCircle, AlertCircle, Settings, Activity, Download, Upload, Eye, Edit, Trash2, Wifi, WifiOff } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  type: 'livecam' | 'fansite';
  category: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync?: string;
  apiKey?: string;
  apiSecret?: string;
  webhookUrl?: string;
  syncFrequency: number; // minutes
  isActive: boolean;
  errorCount: number;
  lastError?: string;
  stats?: {
    totalRevenue: number;
    monthlyRevenue: number;
    activeModels: number;
    totalSessions: number;
  };
  config?: {
    commissionRate: number;
    payoutThreshold: number;
    autoSync: boolean;
    notifications: boolean;
  };
}

interface PlatformsManagerProps {
  token: string;
}

const PlatformsManager: React.FC<PlatformsManagerProps> = ({ token }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [syncingPlatforms, setSyncingPlatforms] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPlatforms();
  }, []);

  useEffect(() => {
    filterPlatforms();
  }, [platforms, searchTerm, typeFilter, statusFilter]);

  const fetchPlatforms = async () => {
    try {
      const response = await fetch('/api/admin/platforms', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPlatforms(data);
      }
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
    setLoading(false);
  };

  const filterPlatforms = () => {
    let filtered = platforms;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    setFilteredPlatforms(filtered);
  };

  const handleSync = async (platformId: string) => {
    setSyncingPlatforms(prev => new Set(prev).add(platformId));
    
    try {
      const response = await fetch(`/api/admin/platforms/${platformId}/sync`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        await fetchPlatforms();
      }
    } catch (error) {
      console.error('Error syncing platform:', error);
    } finally {
      setSyncingPlatforms(prev => {
        const newSet = new Set(prev);
        newSet.delete(platformId);
        return newSet;
      });
    }
  };

  const handleToggleStatus = async (platformId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/platforms/${platformId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive })
      });

      if (response.ok) {
        await fetchPlatforms();
      }
    } catch (error) {
      console.error('Error updating platform status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/10';
      case 'disconnected': return 'text-gray-400 bg-gray-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      case 'syncing': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'disconnected': return <XCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      default: return null;
    }
  };

  const defaultPlatforms: Platform[] = [
    // Live Cam Platforms (10)
    {
      id: '1',
      name: 'Chaturbate',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      syncFrequency: 5,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 45230.50,
        monthlyRevenue: 12450.00,
        activeModels: 12,
        totalSessions: 342
      }
    },
    {
      id: '2',
      name: 'Stripchat',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      syncFrequency: 5,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 38420.75,
        monthlyRevenue: 10200.00,
        activeModels: 8,
        totalSessions: 256
      }
    },
    {
      id: '3',
      name: 'MyFreeCams',
      type: 'livecam',
      category: 'Live Cam',
      status: 'error',
      lastSync: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      syncFrequency: 10,
      isActive: true,
      errorCount: 3,
      lastError: 'API rate limit exceeded',
      stats: {
        totalRevenue: 28910.25,
        monthlyRevenue: 8900.00,
        activeModels: 6,
        totalSessions: 189
      }
    },
    {
      id: '4',
      name: 'BongaCams',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      syncFrequency: 5,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 22150.00,
        monthlyRevenue: 7800.00,
        activeModels: 5,
        totalSessions: 145
      }
    },
    {
      id: '5',
      name: 'CamSoda',
      type: 'livecam',
      category: 'Live Cam',
      status: 'disconnected',
      syncFrequency: 15,
      isActive: false,
      errorCount: 0,
      stats: {
        totalRevenue: 15670.50,
        monthlyRevenue: 4500.00,
        activeModels: 4,
        totalSessions: 98
      }
    },
    {
      id: '6',
      name: 'LiveJasmin',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
      syncFrequency: 10,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 51230.75,
        monthlyRevenue: 15600.00,
        activeModels: 15,
        totalSessions: 412
      }
    },
    {
      id: '7',
      name: 'Streamate',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      syncFrequency: 5,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 34200.00,
        monthlyRevenue: 9800.00,
        activeModels: 9,
        totalSessions: 278
      }
    },
    {
      id: '8',
      name: 'Flirt4Free',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
      syncFrequency: 10,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 19850.25,
        monthlyRevenue: 6200.00,
        activeModels: 7,
        totalSessions: 167
      }
    },
    {
      id: '9',
      name: 'ImLive',
      type: 'livecam',
      category: 'Live Cam',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      syncFrequency: 15,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 12450.00,
        monthlyRevenue: 3800.00,
        activeModels: 3,
        totalSessions: 89
      }
    },
    {
      id: '10',
      name: 'Cams.com',
      type: 'livecam',
      category: 'Live Cam',
      status: 'disconnected',
      syncFrequency: 20,
      isActive: false,
      errorCount: 0,
      stats: {
        totalRevenue: 8900.00,
        monthlyRevenue: 2100.00,
        activeModels: 2,
        totalSessions: 45
      }
    },
    // Fansite Platforms (8)
    {
      id: '11',
      name: 'OnlyFans',
      type: 'fansite',
      category: 'Fansite',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
      syncFrequency: 2,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 89450.00,
        monthlyRevenue: 28900.00,
        activeModels: 18,
        totalSessions: 892
      }
    },
    {
      id: '12',
      name: 'Fansly',
      type: 'fansite',
      category: 'Fansite',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      syncFrequency: 5,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 45600.00,
        monthlyRevenue: 14200.00,
        activeModels: 12,
        totalSessions: 456
      }
    },
    {
      id: '13',
      name: 'ManyVids',
      type: 'fansite',
      category: 'Fansite',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
      syncFrequency: 10,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 32100.00,
        monthlyRevenue: 9800.00,
        activeModels: 8,
        totalSessions: 234
      }
    },
    {
      id: '14',
      name: 'JustForFans',
      type: 'fansite',
      category: 'Fansite',
      status: 'error',
      lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      syncFrequency: 15,
      isActive: true,
      errorCount: 2,
      lastError: 'Authentication failed',
      stats: {
        totalRevenue: 23400.00,
        monthlyRevenue: 7200.00,
        activeModels: 6,
        totalSessions: 178
      }
    },
    {
      id: '15',
      name: 'Fancentro',
      type: 'fansite',
      category: 'Fansite',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      syncFrequency: 10,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 18700.00,
        monthlyRevenue: 5600.00,
        activeModels: 5,
        totalSessions: 145
      }
    },
    {
      id: '16',
      name: 'AdmireMe',
      type: 'fansite',
      category: 'Fansite',
      status: 'disconnected',
      syncFrequency: 20,
      isActive: false,
      errorCount: 0,
      stats: {
        totalRevenue: 12300.00,
        monthlyRevenue: 3400.00,
        activeModels: 3,
        totalSessions: 89
      }
    },
    {
      id: '17',
      name: 'Fanvue',
      type: 'fansite',
      category: 'Fansite',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      syncFrequency: 15,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 15600.00,
        monthlyRevenue: 4800.00,
        activeModels: 4,
        totalSessions: 112
      }
    },
    {
      id: '18',
      name: 'Patreon',
      type: 'fansite',
      category: 'Fansite',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
      syncFrequency: 30,
      isActive: true,
      errorCount: 0,
      stats: {
        totalRevenue: 9800.00,
        monthlyRevenue: 2900.00,
        activeModels: 2,
        totalSessions: 67
      }
    }
  ];

  useEffect(() => {
    setPlatforms(defaultPlatforms);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Management</h2>
          <p className="text-gray-400">Manage 18 platform connections (10 Live Cam + 8 Fansite)</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setPlatforms(defaultPlatforms);
              setSelectedPlatform(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 rounded-lg text-white font-medium transition-all"
          >
            <Upload className="w-4 h-4" />
            Add Platform
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Platforms', value: platforms.length, icon: Activity, color: 'from-blue-500 to-blue-600' },
          { label: 'Connected', value: platforms.filter(p => p.status === 'connected').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Errors', value: platforms.filter(p => p.status === 'error').length, icon: AlertCircle, color: 'from-red-500 to-red-600' },
          { label: 'Total Revenue', value: `€${platforms.reduce((sum, p) => sum + (p.stats?.totalRevenue || 0), 0).toFixed(0)}`, icon: Download, color: 'from-purple-500 to-purple-600' }
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
            placeholder="Search platforms..."
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
          <option value="livecam">Live Cam</option>
          <option value="fansite">Fansite</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="connected">Connected</option>
          <option value="disconnected">Disconnected</option>
          <option value="error">Error</option>
          <option value="syncing">Syncing</option>
        </select>
      </div>

      {/* Platforms Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Sync</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Models</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPlatforms.map((platform) => (
                <motion.tr
                  key={platform.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold">
                        {platform.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{platform.name}</div>
                        <div className="text-sm text-gray-400">{platform.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      platform.type === 'livecam' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {platform.type === 'livecam' ? '📹 Live Cam' : '💎 Fansite'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(platform.status)}`}>
                        {getStatusIcon(platform.status)}
                        {platform.status}
                      </span>
                      {platform.errorCount > 0 && (
                        <div className="text-xs text-red-400">
                          {platform.errorCount} errors
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {platform.lastSync ? new Date(platform.lastSync).toLocaleTimeString() : 'Never'}
                    </div>
                    <div className="text-xs text-gray-400">
                      Every {platform.syncFrequency} min
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">€{(platform.stats?.monthlyRevenue || 0).toFixed(2)}</div>
                    <div className="text-xs text-gray-400">this month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{platform.stats?.activeModels || 0}</div>
                    <div className="text-xs text-gray-400">active</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSync(platform.id)}
                        disabled={syncingPlatforms.has(platform.id)}
                        className="text-blue-400 hover:text-blue-300 disabled:text-gray-500"
                      >
                        {syncingPlatforms.has(platform.id) ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPlatform(platform);
                          setShowLogsModal(true);
                        }}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(platform.id, !platform.isActive)}
                        className={platform.isActive ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-gray-300'}
                      >
                        {platform.isActive ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                      </button>
                      <button className="text-rose-400 hover:text-rose-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Logs Modal */}
      {showLogsModal && selectedPlatform && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">API Logs - {selectedPlatform.name}</h3>
                <p className="text-sm text-gray-400 mt-1">Platform: {selectedPlatform.category}</p>
              </div>
              <button
                onClick={() => setShowLogsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Connection Status */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-3">Connection Status</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-2 ${getStatusColor(selectedPlatform.status)} px-2 py-1 rounded text-xs`}>
                      {selectedPlatform.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Sync:</span>
                    <span className="ml-2 text-white">
                      {selectedPlatform.lastSync ? new Date(selectedPlatform.lastSync).toLocaleString() : 'Never'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Error Count:</span>
                    <span className="ml-2 text-white">{selectedPlatform.errorCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Sync Frequency:</span>
                    <span className="ml-2 text-white">{selectedPlatform.syncFrequency} minutes</span>
                  </div>
                </div>
              </div>

              {/* Recent Logs */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-3">Recent API Logs</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {[
                    { timestamp: new Date(), level: 'info', message: 'Sync completed successfully' },
                    { timestamp: new Date(Date.now() - 1000 * 60 * 5), level: 'info', message: 'Fetched 12 new transactions' },
                    { timestamp: new Date(Date.now() - 1000 * 60 * 10), level: 'warning', message: 'Rate limit approaching' },
                    { timestamp: new Date(Date.now() - 1000 * 60 * 15), level: 'error', message: selectedPlatform.lastError || 'API timeout' },
                    { timestamp: new Date(Date.now() - 1000 * 60 * 20), level: 'info', message: 'Connection established' }
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm p-2 bg-gray-900 rounded">
                      <span className="text-gray-500 text-xs">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        log.level === 'error' ? 'bg-red-500/20 text-red-400' :
                        log.level === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-gray-300">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Configuration */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-3">API Configuration</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">API Endpoint:</span>
                    <span className="ml-2 text-white">https://api.{selectedPlatform.name.toLowerCase()}.com/v1</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Webhook URL:</span>
                    <span className="ml-2 text-white">https://studio-hrl.com/webhooks/{selectedPlatform.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={() => handleSync(selectedPlatform.id)}
                disabled={syncingPlatforms.has(selectedPlatform.id)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncingPlatforms.has(selectedPlatform.id) ? 'animate-spin' : ''}`} />
                {syncingPlatforms.has(selectedPlatform.id) ? 'Syncing...' : 'Sync Now'}
              </button>
              <button
                onClick={() => setShowLogsModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PlatformsManager;
