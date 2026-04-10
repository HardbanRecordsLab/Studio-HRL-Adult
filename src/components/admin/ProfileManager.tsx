import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileManagerProps {
  token: string;
  onProfilesUpdate?: () => void;
}

interface ProfileForm {
  name: string;
  handle: string;
  email: string;
  bio: string;
  type: 'solo' | 'couple';
  status: 'active' | 'pending' | 'inactive';
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ token, onProfilesUpdate }) => {
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'null'>('null');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    handle: '',
    email: '',
    bio: '',
    type: 'solo',
    status: 'pending',
  });

  const handleImageUpload = async (file: File, profileHandle: string, fieldName: string) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `profiles/${profileHandle}`);

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Show success toast
        alert(`Image uploaded: ${data.url}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCreateProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        alert('Profile created!');
        setFormMode('null');
        setForm({
          name: '',
          handle: '',
          email: '',
          bio: '',
          type: 'solo',
          status: 'pending',
        });
        onProfilesUpdate?.();
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('Failed to create profile');
    }
  };

  const sampleProfiles = [
    { id: '1', name: 'Anna & Mark', handle: 'anna-mark', type: 'couple', status: 'active' },
    { id: '2', name: 'Alexia', handle: 'alexia-exclusive', type: 'solo', status: 'active' },
    { id: '3', name: 'Jane', handle: 'jane-professional', type: 'solo', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Create New Profile Button */}
      <motion.button
        onClick={() => setFormMode(formMode === 'create' ? 'null' : 'create')}
        className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-lg font-bold text-white transition-all transform hover:-translate- 0.5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        + Create New Profile
      </motion.button>

      {/* Create Form */}
      {formMode === 'create' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 space-y-4"
        >
          <h3 className="text-xl font-bold text-white mb-4">New Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            />
            <input
              type="text"
              placeholder="Handle (@unique-id)"
              value={form.handle}
              onChange={(e) => setForm({ ...form, handle: e.target.value })}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as 'solo' | 'couple' })}
              className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            >
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
            </select>
          </div>

          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            rows={3}
          />

          <div className="flex gap-3">
            <button
              onClick={handleCreateProfile}
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-white transition-all"
            >
              Create Profile
            </button>
            <button
              onClick={() => setFormMode('null')}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Profiles List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sampleProfiles.map((profile, idx) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 space-y-4 hover:border-rose-500/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                <p className="text-sm text-gray-400">@{profile.handle}</p>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                {profile.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Hero Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(e.target.files[0], profile.handle, 'heroImage');
                      }
                    }}
                    className="hidden"
                    id={`hero-${profile.id}`}
                  />
                  <label
                    htmlFor={`hero-${profile.id}`}
                    className="block px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-center cursor-pointer hover:border-rose-500 transition-colors"
                  >
                    {uploading ? '📤 Uploading...' : '📸 Upload Hero Image'}
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">Gallery Images</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach(file => {
                          handleImageUpload(file, profile.handle, 'gallery');
                        });
                      }
                    }}
                    className="hidden"
                    id={`gallery-${profile.id}`}
                  />
                  <label
                    htmlFor={`gallery-${profile.id}`}
                    className="block px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-center cursor-pointer hover:border-rose-500 transition-colors"
                  >
                    📁 Upload Gallery (Multiple)
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-2">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-bold text-white transition-all">
                ✏️ Edit Details
              </button>
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-bold text-white transition-all">
                ⚙️ Settings
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileManager;
