import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Key, Shield, Users, Settings, Database, Bell, Globe, CreditCard, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface SystemSettings {
  revenueSplit: {
    studio: number;
    partner: number;
    referral: number;
  };
  roles: {
    admin: string[];
    manager: string[];
    model: string[];
  };
  apiKeys: {
    cloudinary: string;
    sendgrid: string;
    stripe: string;
    webhook: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    payoutAlerts: boolean;
    newApplications: boolean;
  };
  integrations: {
    onlyfans: boolean;
    fansly: boolean;
    chaturbate: boolean;
    stripchat: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    ipWhitelist: string[];
    auditLog: boolean;
  };
  general: {
    studioName: string;
    adminEmail: string;
    supportEmail: string;
    timezone: string;
    currency: string;
    language: string;
  };
}

interface SystemSettingsProps {
  token: string;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ token }) => {
  const [settings, setSettings] = useState<SystemSettings>({
    revenueSplit: {
      studio: 60,
      partner: 30,
      referral: 10
    },
    roles: {
      admin: ['admin@studio.com'],
      manager: ['manager@studio.com'],
      model: []
    },
    apiKeys: {
      cloudinary: 'sk_********************************',
      sendgrid: 'SG.***************************',
      stripe: 'sk_live_***************************',
      webhook: 'whsec_***************************'
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      payoutAlerts: true,
      newApplications: true
    },
    integrations: {
      onlyfans: true,
      fansly: true,
      chaturbate: true,
      stripchat: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 24,
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      auditLog: true
    },
    general: {
      studioName: 'Studio HRL Adult',
      adminEmail: 'admin@studio.com',
      supportEmail: 'support@studio.com',
      timezone: 'Europe/Warsaw',
      currency: 'EUR',
      language: 'pl'
    }
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'revenue' | 'roles' | 'api' | 'notifications' | 'security'>('general');
  const [newRoleUser, setNewRoleUser] = useState('');
  const [newRoleType, setNewRoleType] = useState<'admin' | 'manager' | 'model'>('model');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        // Show success message
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
    setSaving(false);
  };

  const handleAddRole = () => {
    if (!newRoleUser) return;

    setSettings(prev => ({
      ...prev,
      roles: {
        ...prev.roles,
        [newRoleType]: [...prev.roles[newRoleType], newRoleUser]
      }
    }));
    setNewRoleUser('');
  };

  const handleRemoveRole = (roleType: 'admin' | 'manager' | 'model', email: string) => {
    setSettings(prev => ({
      ...prev,
      roles: {
        ...prev.roles,
        [roleType]: prev.roles[roleType].filter(e => e !== email)
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'revenue', label: 'Revenue Split', icon: CreditCard },
    { id: 'roles', label: 'User Roles', icon: Users },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
          <p className="text-gray-400">Configure system-wide settings and integrations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchSettings}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-rose-500 text-rose-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">General Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Studio Name</label>
                <input
                  type="text"
                  value={settings.general.studioName}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, studioName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.general.adminEmail}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, adminEmail: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
                <input
                  type="email"
                  value={settings.general.supportEmail}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, supportEmail: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, timezone: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  <option value="Europe/Warsaw">Europe/Warsaw</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Europe/Berlin">Europe/Berlin</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Currency</label>
                <select
                  value={settings.general.currency}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, currency: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="PLN">PLN</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                <select
                  value={settings.general.language}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, language: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  <option value="pl">Polski</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Integrations</h3>
            <div className="space-y-3">
              {Object.entries(settings.integrations).map(([platform, enabled]) => (
                <label key={platform} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      integrations: {
                        ...prev.integrations,
                        [platform]: e.target.checked
                      }
                    }))}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-white capitalize">{platform}</span>
                  <span className={`px-2 py-1 rounded text-xs ${enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {enabled ? 'Connected' : 'Disconnected'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Revenue Split Settings */}
      {activeTab === 'revenue' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Distribution</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Studio Commission (%)</label>
                <input
                  type="number"
                  value={settings.revenueSplit.studio}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    revenueSplit: { ...prev.revenueSplit, studio: parseInt(e.target.value) || 0 }
                  }))}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Partner Share (%)</label>
                <input
                  type="number"
                  value={settings.revenueSplit.partner}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    revenueSplit: { ...prev.revenueSplit, partner: parseInt(e.target.value) || 0 }
                  }))}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Referral Commission (%)</label>
                <input
                  type="number"
                  value={settings.revenueSplit.referral}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    revenueSplit: { ...prev.revenueSplit, referral: parseInt(e.target.value) || 0 }
                  }))}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>
              <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total:</span>
                  <span className={`font-medium ${
                    settings.revenueSplit.studio + settings.revenueSplit.partner + settings.revenueSplit.referral === 100
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    {settings.revenueSplit.studio + settings.revenueSplit.partner + settings.revenueSplit.referral}%
                  </span>
                </div>
                {settings.revenueSplit.studio + settings.revenueSplit.partner + settings.revenueSplit.referral !== 100 && (
                  <p className="text-red-400 text-xs mt-2">
                    Total must equal 100%
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* User Roles */}
      {activeTab === 'roles' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">User Role Management</h3>
            
            {/* Add New Role */}
            <div className="mb-6 p-4 bg-gray-900 rounded-lg">
              <h4 className="text-white font-medium mb-3">Add User to Role</h4>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={newRoleUser}
                  onChange={(e) => setNewRoleUser(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
                <select
                  value={newRoleType}
                  onChange={(e) => setNewRoleType(e.target.value as any)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  <option value="model">Model</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Role Lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(settings.roles).map(([role, users]) => (
                <div key={role} className="bg-gray-900 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3 capitalize">{role}s ({users.length})</h4>
                  <div className="space-y-2">
                    {users.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                        <span className="text-sm text-gray-300">{user}</span>
                        <button
                          onClick={() => handleRemoveRole(role as any, user)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {users.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">No users assigned</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* API Keys */}
      {activeTab === 'api' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">API Configuration</h3>
              <button
                onClick={() => setShowApiKeys(!showApiKeys)}
                className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
              >
                {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showApiKeys ? 'Hide' : 'Show'} Keys
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(settings.apiKeys).map(([service, key]) => (
                <div key={service}>
                  <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">{service} API Key</label>
                  <div className="flex gap-2">
                    <input
                      type={showApiKeys ? 'text' : 'password'}
                      value={key}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        apiKeys: { ...prev.apiKeys, [service]: e.target.value }
                      }))}
                      className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                      Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([notification, enabled]) => (
                <label key={notification} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [notification]: e.target.checked
                      }
                    }))}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-white capitalize">{notification.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Security Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactorAuth: e.target.checked }
                  }))}
                  className="w-5 h-5 rounded"
                />
                <label className="text-white">Require 2FA for admin login</label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Session Timeout (hours)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, sessionTimeout: parseInt(e.target.value) || 0 }
                  }))}
                  min="1"
                  max="168"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.security.auditLog}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, auditLog: e.target.checked }
                  }))}
                  className="w-5 h-5 rounded"
                />
                <label className="text-white">Enable audit logging</label>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SystemSettings;
