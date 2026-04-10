'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, Podcast, Clock, Mic } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

interface AcademyPodcast {
  id?: string;
  title: string;
  description?: string;
  episodeNumber: string;
  duration: string;
  cloudinaryId: string;
  url: string;
  format?: string;
  bytes?: number;
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  podcast?: AcademyPodcast | null;
}

const PodcastModal: React.FC<PodcastModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  podcast
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    episodeNumber: '',
    duration: '',
    cloudinaryId: '',
    url: '',
    format: '',
    bytes: 0,
    isActive: true
  });

  useEffect(() => {
    if (podcast) {
      setFormData({
        title: podcast.title,
        description: podcast.description || '',
        episodeNumber: podcast.episodeNumber,
        duration: podcast.duration,
        cloudinaryId: podcast.cloudinaryId,
        url: podcast.url,
        format: podcast.format || '',
        bytes: podcast.bytes || 0,
        isActive: podcast.isActive
      });
    } else {
      setFormData({
        title: '',
        description: '',
        episodeNumber: '',
        duration: '',
        cloudinaryId: '',
        url: '',
        format: '',
        bytes: 0,
        isActive: true
      });
    }
  }, [podcast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = podcast ? `/api/admin/academy/podcasts?id=${podcast.id}` : '/api/admin/academy/podcasts';
      const method = podcast ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save podcast');
      }
    } catch (error) {
      console.error('Error saving podcast:', error);
      alert('Failed to save podcast');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">
              {podcast ? 'Edit Podcast' : 'New Podcast'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-6">
              {/* Title and Episode Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Episode Number *</label>
                  <input
                    type="text"
                    value={formData.episodeNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, episodeNumber: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    placeholder="e.g., EP 01"
                    required
                  />
                </div>
              </div>

              {/* Duration and Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Duration *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    placeholder="e.g., 42:15"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Audio Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Audio File *</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  options={{ resourceType: 'video' }} // Cloudinary treats audio as video
                  onSuccess={(result) => {
                    if (result.info) {
                      const info = result.info as any;
                      setFormData(prev => ({
                        ...prev,
                        cloudinaryId: info.public_id,
                        url: info.secure_url,
                        format: info.format,
                        bytes: info.bytes
                      }));
                    }
                  }}
                >
                  {({ open }) => (
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        {formData.url ? 'Change Audio' : 'Upload Audio'}
                      </button>
                      {formData.url && (
                        <div className="p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mic className="w-5 h-5 text-rose-400" />
                            <div>
                              <div className="text-white font-medium">{formData.title}</div>
                              <div className="text-sm text-gray-400">
                                {formData.format} | {(formData.bytes / 1024 / 1024).toFixed(1)} MB
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>

              {/* Active Status */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Podcast className="w-5 h-5 text-rose-400" />
                  <div>
                    <div className="text-white font-medium">Active Status</div>
                    <div className="text-sm text-gray-400">
                      {formData.isActive ? 'Podcast will be visible to users' : 'Podcast will be hidden'}
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.url}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : (podcast ? 'Update Podcast' : 'Create Podcast')}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PodcastModal;
