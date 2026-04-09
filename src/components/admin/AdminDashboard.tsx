import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileManager from './ProfileManager';
import ContentManager from './ContentManager';

interface AdminDashboardProps {
  token: string;
}

interface Profile {
  id: string;
  handle: string;
  name: string;
  email: string;
  type: 'couple' | 'solo';
  status: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState('profiles');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (activeTab === 'profiles') {
      fetchProfiles();
    }
  }, [activeTab]);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
    setLoading(false);
  };

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'profiles', label: '👥 Profiles', icon: '👥' },
    { id: 'content', label: '🎬 Content', icon: '🎬' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-700/50 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center font-bold">
              HRL
            </div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-sm text-gray-400">Studio HRL Adult</p>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="border-b border-gray-700/50 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-rose-400'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-rose-700"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Profiles', value: profiles.length, color: 'from-blue-500 to-blue-600' },
              { label: 'Active Partners', value: profiles.filter(p => p.status === 'active').length, color: 'from-green-500 to-green-600' },
              { label: 'Pending', value: profiles.filter(p => p.status === 'pending').length, color: 'from-yellow-500 to-yellow-600' },
              { label: 'Inactive', value: profiles.filter(p => p.status === 'inactive').length, color: 'from-red-500 to-red-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg`}
              >
                <p className="text-white/80 text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-4xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Profiles Tab */}
        {activeTab === 'profiles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfileManager token={token} onProfilesUpdate={fetchProfiles} />
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ContentManager token={token} />
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Views', value: '142.5K', change: '+12.3%', color: 'blue' },
                { label: 'Total Revenue', value: '$24,852', change: '+8.7%', color: 'green' },
                { label: 'Active Subscribers', value: '6,241', change: '+5.2%', color: 'purple' },
                { label: 'Engagement Rate', value: '8.4%', change: '+2.1%', color: 'orange' },
                { label: 'Avg Session', value: '12m 34s', change: '+3.5%', color: 'pink' },
                { label: 'New Followers', value: '1,243', change: '+6.8%', color: 'cyan' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6"
                >
                  <p className="text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-green-400 text-sm font-semibold">{stat.change} vs last month</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Studio Name</label>
                    <input
                      type="text"
                      defaultValue="Studio HRL Adult"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Admin Email</label>
                    <input
                      type="email"
                      defaultValue="hardbanrecordslab.pl@gmail.com"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Default Commission %</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Security</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                    <span className="text-white">Require 2FA for admin login</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                    <span className="text-white">Email notifications for withdrawals</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded" />
                    <span className="text-white">Allow external integrations</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-700">
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-white transition-all">
                  Save Changes
                </button>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-all">
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
