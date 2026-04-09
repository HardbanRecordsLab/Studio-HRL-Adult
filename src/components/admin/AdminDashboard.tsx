import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white placeholder-gray-500 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            </div>

            {/* Profiles Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading profiles...</p>
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-400">No profiles found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles.map((profile, i) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 hover:border-rose-500/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-rose-400 transition-colors">
                          {profile.name}
                        </h3>
                        <p className="text-sm text-gray-400">@{profile.handle}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        profile.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        profile.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {profile.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Type:</span> {profile.type}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Email:</span> {profile.email}
                      </p>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-lg font-medium text-sm transition-all transform hover:-translate-y-0.5">
                      Edit Profile →
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center"
          >
            <p className="text-gray-400">Content Management Coming Soon</p>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center"
          >
            <p className="text-gray-400">Analytics Coming Soon</p>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center"
          >
            <p className="text-gray-400">Settings Coming Soon</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
