'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  Mail, 
  DollarSign, 
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface StudioSettings {
  id: string;
  updatedAt: string;
  studioName: string;
  contactEmail: string;
  notificationEmail: string;
  revenueModelShare: number;
  revenuePartnerShare: number;
  revenueStudioShare: number;
  castingEmailTemplate?: string;
  castingRejectTemplate?: string;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'revenue' | 'emails'>('general');
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data.data);
      } else {
        showToast('Failed to fetch settings', 'error');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      showToast('Failed to fetch settings', 'error');
    }
    setLoading(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (updates: Partial<StudioSettings>) => {
    if (!settings) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.data);
        showToast('Settings saved successfully', 'success');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to save settings', 'error');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showToast('Failed to save settings', 'error');
    }
    setSaving(false);
  };

  const calculateRevenueDistribution = (amount: number) => {
    if (!settings) return { model: 0, partner: 0, studio: 0 };
    
    return {
      model: (amount * settings.revenueModelShare) / 100,
      partner: (amount * settings.revenuePartnerShare) / 100,
      studio: (amount * settings.revenueStudioShare) / 100
    };
  };

  const tabs = [
    { id: 'general' as const, label: 'Ogólne', icon: Settings },
    { id: 'revenue' as const, label: 'Podzia przychodów', icon: DollarSign },
    { id: 'emails' as const, label: 'Szablony emaili', icon: Mail }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">No settings found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-700/50 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center font-bold">
              HRL
            </div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Studio Name</label>
                  <input
                    type="text"
                    value={settings.studioName}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, studioName: e.target.value } : null)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, contactEmail: e.target.value } : null)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Notification Email</label>
                  <input
                    type="email"
                    value={settings.notificationEmail}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, notificationEmail: e.target.value } : null)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    placeholder="Where alerts and notifications are sent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleSave({
                    studioName: settings.studioName,
                    contactEmail: settings.contactEmail,
                    notificationEmail: settings.notificationEmail
                  })}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Revenue Distribution</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Model/Partnerka: {settings.revenueModelShare}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.revenueModelShare}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, revenueModelShare: parseInt(e.target.value) } : null)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Partner zewntrzny: {settings.revenuePartnerShare}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.revenuePartnerShare}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, revenuePartnerShare: parseInt(e.target.value) } : null)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Studio HRL: {settings.revenueStudioShare}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.revenueStudioShare}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, revenueStudioShare: parseInt(e.target.value) } : null)}
                    className="w-full"
                  />
                </div>

                {/* Validation Warning */}
                {(settings.revenueModelShare + settings.revenuePartnerShare + settings.revenueStudioShare) !== 100 && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">
                      Revenue shares must sum to 100%. Current sum: {settings.revenueModelShare + settings.revenuePartnerShare + settings.revenueStudioShare}%
                    </span>
                  </div>
                )}

                {/* Preview */}
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Preview for $1000 revenue:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Model:</span>
                      <span className="text-white font-medium">${calculateRevenueDistribution(1000).model.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Partner:</span>
                      <span className="text-white font-medium">${calculateRevenueDistribution(1000).partner.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Studio:</span>
                      <span className="text-white font-medium">${calculateRevenueDistribution(1000).studio.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleSave({
                    revenueModelShare: settings.revenueModelShare,
                    revenuePartnerShare: settings.revenuePartnerShare,
                    revenueStudioShare: settings.revenueStudioShare
                  })}
                  disabled={saving || (settings.revenueModelShare + settings.revenuePartnerShare + settings.revenueStudioShare) !== 100}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Revenue Settings'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Email Templates</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Approved Application Template
                  </label>
                  <textarea
                    value={settings.castingEmailTemplate || ''}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, castingEmailTemplate: e.target.value } : null)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white font-mono text-sm"
                    rows={6}
                    placeholder="Gratulacje {firstName}! Twoje zgloszenie zostalo zatwierdzone..."
                  />
                  <div className="mt-2 text-xs text-gray-400">
                    Available variables: {'{firstName}'}, {'{lastName}'}, {'{email}'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Rejected Application Template
                  </label>
                  <textarea
                    value={settings.castingRejectTemplate || ''}
                    onChange={(e) => setSettings(prev => prev ? { ...prev, castingRejectTemplate: e.target.value } : null)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white font-mono text-sm"
                    rows={6}
                    placeholder="Dziekujemy {firstName} za zgloszenie. Tym razem..."
                  />
                  <div className="mt-2 text-xs text-gray-400">
                    Available variables: {'{firstName}'}, {'{lastName}'}, {'{email}'}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleSave({
                    castingEmailTemplate: settings.castingEmailTemplate,
                    castingRejectTemplate: settings.castingRejectTemplate
                  })}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Email Templates'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default SettingsPage;
