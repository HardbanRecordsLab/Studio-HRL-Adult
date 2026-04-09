import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContentManagerProps {
  token: string;
}

const ContentManager: React.FC<ContentManagerProps> = ({ token }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [contentType, setContentType] = useState<'photo' | 'video' | 'audio'>('photo');
  const [selectedProfile, setSelectedProfile] = useState('anna-mark');
  const [uploadedItems, setUploadedItems] = useState<any[]>([
    { id: '1', type: 'photo', profile: 'anna-mark', filename: 'am-01.jpg', date: '2024-04-08', size: '2.4 MB' },
    { id: '2', type: 'photo', profile: 'alexia-exclusive', filename: 'alexia-02.jpg', date: '2024-04-07', size: '3.1 MB' },
    { id: '3', type: 'video', profile: 'jane-professional', filename: 'jane-01.mp4', date: '2024-04-06', size: '145 MB' },
  ]);

  const profiles = [
    { handle: 'anna-mark', name: 'Anna & Mark' },
    { handle: 'alexia-exclusive', name: 'Alexia' },
    { handle: 'jane-professional', name: 'Jane' },
  ];

  const handleContentUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `content/${selectedProfile}/${contentType}`);
    formData.append('type', contentType);

    try {
      // Simulate upload progress
      const intervals = setInterval(() => {
        setUploadProgress(p => Math.min(p + Math.random() * 30, 95));
      }, 300);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
      });

      clearInterval(intervals);
      setUploadProgress(100);

      if (response.ok) {
        const data = await response.json();
        setUploadedItems([
          {
            id: Date.now().toString(),
            type: contentType,
            profile: selectedProfile,
            filename: file.name,
            date: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            url: data.url
          },
          ...uploadedItems
        ]);
        alert('✅ Content uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 space-y-6"
      >
        <h3 className="text-2xl font-bold text-white">Upload Content</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Content Type</label>
            <div className="grid grid-cols-3 gap-3">
              {(['photo', 'video', 'audio'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setContentType(type)}
                  className={`px-4 py-3 rounded-lg font-bold transition-all transform ${ contentType === type
                    ? 'bg-rose-500 text-white scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {type === 'photo' && '📸'} {type === 'video' && '🎬'} {type === 'audio' && '🎵'}{' '}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Select Profile</label>
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            >
              {profiles.map((p) => (
                <option key={p.handle} value={p.handle}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Area */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Choose File</label>
          <div className="relative group">
            <input
              type="file"
              accept={
                contentType === 'photo'
                  ? 'image/*'
                  : contentType === 'video'
                  ? 'video/*'
                  : 'audio/*'
              }
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleContentUpload(e.target.files[0]);
                }
              }}
              className="hidden"
              id="content-upload"
              disabled={uploading}
            />
            <label
              htmlFor="content-upload"
              className="block w-full px-6 py-12 bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-lg text-center cursor-pointer hover:border-rose-500 transition-colors group-hover:bg-gray-900"
            >
              <div className="text-4xl mb-3">{contentType === 'photo' ? '📸' : contentType === 'video' ? '🎬' : '🎵'}</div>
              <p className="text-white font-bold mb-1">
                {uploading ? `Uploading ${uploadProgress}%...` : 'Drag & Drop or Click to Upload'}
              </p>
              <p className="text-sm text-gray-400">
                {contentType === 'photo' && 'JPG, PNG up to 50MB'}
                {contentType === 'video' && 'MP4, WebM up to 2GB'}
                {contentType === 'audio' && 'MP3, WAV up to 500MB'}
              </p>
            </label>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <motion.div className="mt-4 space-y-2">
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-600"
                />
              </div>
              <p className="text-sm text-gray-400 text-center">{uploadProgress}% uploaded</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Uploaded Content Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-white">Recent Uploads</h3>
        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
          {uploadedItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:border-rose-500/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="text-2xl">{item.type === 'photo' ? '📸' : item.type === 'video' ? '🎬' : '🎵'}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{item.filename}</p>
                  <p className="text-xs text-gray-500">{item.profile} • {item.date} • {item.size}</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-rose-500 hover:bg-rose-600 rounded text-xs font-bold text-white transition-all ml-2 flex-shrink-0">
                ✓ Use
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContentManager;
