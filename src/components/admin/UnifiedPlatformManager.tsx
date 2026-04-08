import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

interface PlatformData {
  username?: string;
  url?: string;
  followers?: number;
  posts?: number;
  apiKey?: string;
  lastSync?: string;
}

interface UnifiedPlatformManagerProps {
  platform: string;
  icon: string;
  color: string;
  features: string[];
  data: PlatformData;
  onUpdate: (platform: string, data: PlatformData) => void;
  onSync: (platform: string) => void;
}

const UnifiedPlatformManager: React.FC<UnifiedPlatformManagerProps> = ({
  platform,
  icon,
  color,
  features,
  data,
  onUpdate,
  onSync
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    onUpdate(platform, editData);
    setIsEditing(false);
  };

  const handleSync = () => {
    onSync(platform);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-3 border border-gold/10 p-6 rounded-lg space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-cormorant text-xl text-white italic">{platform}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gold/10 text-gold hover:bg-gold hover:text-dark px-3 py-1 text-xs font-bold uppercase transition-all"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleSync}
            className="bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 text-xs font-bold uppercase transition-all"
          >
            Sync
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-dim">Followers/Subscribers</p>
          <p className={`text-2xl font-bold ${color}`}>{data.followers || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-dim">Content Items</p>
          <p className="text-2xl font-bold text-gold">{data.posts || 0}</p>
        </div>
      </div>

      {/* Features */}
      <div>
        <p className="text-sm text-dim mb-2">Platform Features:</p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <span key={i} className="bg-gold/10 text-gold px-2 py-1 rounded text-xs">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 pt-4 border-t border-gold/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gold font-bold uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="text"
                value={editData.username || ''}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors text-sm"
                placeholder={`@${platform.toLowerCase()}_username`}
              />
            </div>
            <div>
              <label className="block text-sm text-gold font-bold uppercase tracking-widest mb-2">
                Profile URL
              </label>
              <input
                type="url"
                value={editData.url || ''}
                onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors text-sm"
                placeholder={`https://${platform.toLowerCase()}.com/username`}
              />
            </div>
          </div>

          {platform === 'onlyfans' || platform === 'patreon' ? (
            <div>
              <label className="block text-sm text-gold font-bold uppercase tracking-widest mb-2">
                API Key (Optional)
              </label>
              <input
                type="password"
                value={editData.apiKey || ''}
                onChange={(e) => setEditData({ ...editData, apiKey: e.target.value })}
                className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors text-sm"
                placeholder="Enter API key for automated sync"
              />
            </div>
          ) : null}

          <button
            onClick={handleSave}
            className="w-full bg-gold text-dark font-bold py-2 px-4 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm"
          >
            Save {platform} Settings
          </button>
        </motion.div>
      )}

      {/* Last Sync */}
      {data.lastSync && (
        <p className="text-xs text-dim">
          Last synced: {new Date(data.lastSync).toLocaleString()}
        </p>
      )}
    </motion.div>
  );
};

export default UnifiedPlatformManager;