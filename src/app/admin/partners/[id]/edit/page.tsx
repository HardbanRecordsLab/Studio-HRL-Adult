'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Upload,
  User,
  Users,
  Calendar,
  Clock,
  Wifi
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

interface Platform {
  name: string;
  username: string;
  url: string;
  followers: number;
}

interface LiveSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface Partner {
  id: string;
  name: string;
  handle: string;
  email: string;
  type: 'solo' | 'couple';
  status: 'active' | 'inactive' | 'pending';
  bio?: string;
  description?: string;
  avatar?: string;
  heroImage?: string;
  aboutImage1?: string;
  aboutImage2?: string;
  platforms: Platform[];
  liveSchedule: LiveSchedule[];
}

const availablePlatforms = [
  'OnlyFans', 'Fansly', 'ManyVids', 'Chaturbate', 'Stripchat', 
  'BongaCams', 'Instagram', 'Twitter/X', 'TikTok'
];

const daysOfWeek = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' }
];

const EditPartnerPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    email: '',
    type: 'solo' as 'solo' | 'couple',
    status: 'pending' as 'active' | 'inactive' | 'pending',
    bio: '',
    description: '',
    avatar: '',
    heroImage: '',
    aboutImage1: '',
    aboutImage2: '',
    platforms: [] as Platform[],
    liveSchedule: [] as LiveSchedule[]
  });

  useEffect(() => {
    fetchPartner();
  }, [params.id]);

  const fetchPartner = async () => {
    try {
      const response = await fetch(`/api/admin/partners?id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        const partner = data.data;
        setFormData({
          name: partner.name || '',
          handle: partner.handle || '',
          email: partner.email || '',
          type: partner.type || 'solo',
          status: partner.status || 'pending',
          bio: partner.bio || '',
          description: partner.description || '',
          avatar: partner.avatar || '',
          heroImage: partner.heroImage || '',
          aboutImage1: partner.aboutImage1 || '',
          aboutImage2: partner.aboutImage2 || '',
          platforms: partner.platforms || [],
          liveSchedule: partner.liveSchedule || []
        });
      } else {
        showToast('Failed to fetch partner', 'error');
        router.push('/admin/partners');
      }
    } catch (error) {
      console.error('Error fetching partner:', error);
      showToast('Failed to fetch partner', 'error');
      router.push('/admin/partners');
    }
    setLoading(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/partners?id=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast('Partner updated successfully', 'success');
        router.push('/admin/partners');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to update partner', 'error');
      }
    } catch (error) {
      console.error('Error updating partner:', error);
      showToast('Failed to update partner', 'error');
    }
    setSaving(false);
  };

  const addPlatform = () => {
    setFormData(prev => ({
      ...prev,
      platforms: [...prev.platforms, {
        name: availablePlatforms[0],
        username: '',
        url: '',
        followers: 0
      }]
    }));
  };

  const removePlatform = (index: number) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.filter((_, i) => i !== index)
    }));
  };

  const updatePlatform = (index: number, field: keyof Platform, value: any) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.map((platform, i) => 
        i === index ? { ...platform, [field]: value } : platform
      )
    }));
  };

  const addLiveSchedule = () => {
    setFormData(prev => ({
      ...prev,
      liveSchedule: [...prev.liveSchedule, {
        dayOfWeek: 1,
        startTime: '20:00',
        endTime: '23:00',
        isActive: true
      }]
    }));
  };

  const removeLiveSchedule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      liveSchedule: prev.liveSchedule.filter((_, i) => i !== index)
    }));
  };

  const updateLiveSchedule = (index: number, field: keyof LiveSchedule, value: any) => {
    setFormData(prev => ({
      ...prev,
      liveSchedule: prev.liveSchedule.map((schedule, i) => 
        i === index ? { ...schedule, [field]: value } : schedule
      )
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-700/50 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/partners"
              className="p-2 hover:bg-gray-800 rounded-lg text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Edit Partner</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Handle *</label>
                <input
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value.replace(/\s+/g, '-').toLowerCase() }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  placeholder="anna-rose"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'solo' | 'couple' }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  <option value="solo">Solo</option>
                  <option value="couple">Couple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'pending' }))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                rows={3}
                placeholder="Short bio..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                rows={5}
                placeholder="Detailed description..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Avatar</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, avatar: (result.info as any).secure_url }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {formData.avatar ? 'Change Avatar' : 'Upload Avatar'}
                    </button>
                  )}
                </CldUploadWidget>
                {formData.avatar && (
                  <img src={formData.avatar} alt="Avatar" className="mt-2 w-20 h-20 rounded-full object-cover" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Hero Image</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, heroImage: (result.info as any).secure_url }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {formData.heroImage ? 'Change Hero' : 'Upload Hero'}
                    </button>
                  )}
                </CldUploadWidget>
                {formData.heroImage && (
                  <img src={formData.heroImage} alt="Hero" className="mt-2 w-20 h-20 rounded object-cover" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">About Image 1</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, aboutImage1: (result.info as any).secure_url }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {formData.aboutImage1 ? 'Change Image' : 'Upload Image'}
                    </button>
                  )}
                </CldUploadWidget>
                {formData.aboutImage1 && (
                  <img src={formData.aboutImage1} alt="About 1" className="mt-2 w-20 h-20 rounded object-cover" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">About Image 2</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, aboutImage2: (result.info as any).secure_url }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {formData.aboutImage2 ? 'Change Image' : 'Upload Image'}
                    </button>
                  )}
                </CldUploadWidget>
                {formData.aboutImage2 && (
                  <img src={formData.aboutImage2} alt="About 2" className="mt-2 w-20 h-20 rounded object-cover" />
                )}
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                Platforms
              </h2>
              <button
                type="button"
                onClick={addPlatform}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Platform
              </button>
            </div>
            <div className="space-y-4">
              {formData.platforms.map((platform, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Platform {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removePlatform(index)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Platform</label>
                      <select
                        value={platform.name}
                        onChange={(e) => updatePlatform(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      >
                        {availablePlatforms.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                      <input
                        type="text"
                        value={platform.username}
                        onChange={(e) => updatePlatform(index, 'username', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">URL</label>
                      <input
                        type="url"
                        value={platform.url}
                        onChange={(e) => updatePlatform(index, 'url', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Followers</label>
                      <input
                        type="number"
                        value={platform.followers}
                        onChange={(e) => updatePlatform(index, 'followers', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {formData.platforms.length === 0 && (
                <p className="text-gray-400 text-center py-8">No platforms added yet</p>
              )}
            </div>
          </div>

          {/* Live Schedule */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Live Schedule
              </h2>
              <button
                type="button"
                onClick={addLiveSchedule}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Schedule
              </button>
            </div>
            <div className="space-y-4">
              {formData.liveSchedule.map((schedule, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Schedule {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeLiveSchedule(index)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Day</label>
                      <select
                        value={schedule.dayOfWeek}
                        onChange={(e) => updateLiveSchedule(index, 'dayOfWeek', parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      >
                        {daysOfWeek.map(day => (
                          <option key={day.value} value={day.value}>{day.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={schedule.startTime}
                        onChange={(e) => updateLiveSchedule(index, 'startTime', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">End Time</label>
                      <input
                        type="time"
                        value={schedule.endTime}
                        onChange={(e) => updateLiveSchedule(index, 'endTime', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                      <select
                        value={schedule.isActive ? 'true' : 'false'}
                        onChange={(e) => updateLiveSchedule(index, 'isActive', e.target.value === 'true')}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {formData.liveSchedule.length === 0 && (
                <p className="text-gray-400 text-center py-8">No schedules added yet</p>
              )}
            </div>
          </div>
        </form>
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

export default EditPartnerPage;
