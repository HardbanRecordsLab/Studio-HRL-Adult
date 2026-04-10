import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Video, 
  DollarSign, 
  Wifi, 
  BookOpen, 
  Settings, 
  FileText,
  TrendingUp,
  Search,
  Filter,
  Shield,
  FileCheck,
  History
} from 'lucide-react';
import PartnersManager from './PartnersManager';
import CastingManager from './CastingManager';
import PlatformsManager from './PlatformsManager';
import FinanceManager from './FinanceManager';
import ContentManagementSystem from './ContentManagementSystem';
import AcademyManager from './AcademyManager';
import SystemSettings from './SystemSettings';

interface AdminDashboardProps {
  token: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview and statistics' },
    { id: 'partners', label: 'Partners', icon: Users, description: 'Manage models and partners' },
    { id: 'casting', label: 'Casting', icon: UserCheck, description: 'Review applications' },
    { id: 'platforms', label: 'Platforms', icon: Wifi, description: '18 platform connections' },
    { id: 'finance', label: 'Finance', icon: DollarSign, description: 'Revenue and payouts' },
    { id: 'content', label: 'Content', icon: Video, description: 'Media management' },
    { id: 'academy', label: 'Academy', icon: BookOpen, description: 'Courses and progress' },
    { id: 'verify', label: 'Documents', icon: Shield, description: 'Identity verification' },
    { id: 'logs', label: 'Logs', icon: History, description: 'System activity logs' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'System configuration' },
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
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Partners', value: '24', color: 'from-blue-500 to-blue-600', icon: Users },
                { label: 'Active Platforms', value: '18', color: 'from-green-500 to-green-600', icon: Wifi },
                { label: 'Monthly Revenue', value: 'EUR 89.5K', color: 'from-purple-500 to-purple-600', icon: DollarSign },
                { label: 'Academy Courses', value: '12', color: 'from-yellow-500 to-yellow-600', icon: BookOpen },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <stat.icon className="w-5 h-5 text-white/50" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {tabs.slice(1).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center gap-3 p-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-left transition-colors"
                    >
                      <tab.icon className="w-5 h-5 text-rose-400" />
                      <div>
                        <p className="text-white font-medium">{tab.label}</p>
                        <p className="text-gray-400 text-xs">{tab.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New partner application', time: '2 hours ago', type: 'casting' },
                    { action: 'Revenue sync completed', time: '4 hours ago', type: 'finance' },
                    { action: 'New course published', time: '6 hours ago', type: 'academy' },
                    { action: 'Platform connection issue', time: '8 hours ago', type: 'platforms' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <span className="text-white text-sm">{activity.action}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PartnersManager token={token} />
          </motion.div>
        )}

        {/* Casting Tab */}
        {activeTab === 'casting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CastingManager token={token} />
          </motion.div>
        )}

        {/* Platforms Tab */}
        {activeTab === 'platforms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PlatformsManager token={token} />
          </motion.div>
        )}

        {/* Finance Tab */}
        {activeTab === 'finance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FinanceManager token={token} />
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ContentManagementSystem token={token} />
          </motion.div>
        )}

        {/* Academy Tab */}
        {activeTab === 'academy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AcademyManager token={token} />
          </motion.div>
        )}

        {/* Documents/Verify Tab */}
        {activeTab === 'verify' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-full h-full">
              <iframe 
                src="/admin/verify" 
                className="w-full h-[calc(100vh-200px)] border-0 bg-transparent"
                title="Document Verification"
              />
            </div>
          </motion.div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-full h-full">
              <iframe 
                src="/admin/logs" 
                className="w-full h-[calc(100vh-200px)] border-0 bg-transparent"
                title="System Logs"
              />
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-full h-full">
              <iframe 
                src="/admin/settings" 
                className="w-full h-[calc(100vh-200px)] border-0 bg-transparent"
                title="Settings"
              />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
