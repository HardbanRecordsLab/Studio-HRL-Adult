import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Camera, 
  Image as ImageIcon, 
  Plus, 
  Edit3, 
  Globe, 
  Lock, 
  CheckCircle, 
  X,
  Upload,
  Activity,
  Zap,
  Star
} from 'lucide-react';

interface ProfileManagerProps {
  token: string;
  onProfilesUpdate?: () => void;
}

interface Profile {
  id: string;
  name: string;
  handle: string;
  email: string;
  bio: string;
  type: 'solo' | 'couple';
  status: 'active' | 'pending' | 'inactive';
  heroImage?: string;
  gallery?: string[];
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ token, onProfilesUpdate }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'null'>('null');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/partners', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (e) {
      console.error('Fetch profiles error:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, [token]);

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
        // Here we would typically update the profile in the DB with the new image URL
        fetchProfiles();
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">HRL <span className="text-white">Profile</span> MASTER</h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase">Zarządzanie marką osobistą i estetyką wizualną modelek</p>
        </div>
        <button 
           onClick={() => setFormMode('create')}
           className="flex items-center gap-3 px-6 py-2.5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/10"
        >
          <Plus className="w-4 h-4" /> Nowy Profil Publiczny
        </button>
      </div>

      {/* Grid of Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
             <div key={i} className="bg-[#0d0d0d] border border-white/5 h-64 rounded-2xl animate-pulse" />
          ))
        ) : profiles.map((profile) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-[#c9a84c]/30 transition-all"
          >
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            
            {/* Hero Image / Placeholder */}
            <div className="h-56 bg-dark-4 overflow-hidden relative">
               {profile.heroImage ? (
                  <img src={profile.heroImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" alt="" />
               ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-crimson/10 to-transparent">
                     <User className="w-16 h-16 text-white/5 opacity-20" />
                  </div>
               )}
               <div className="absolute top-4 right-4 z-20">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md border ${
                    profile.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {profile.status}
                  </span>
               </div>
            </div>

            {/* Profile Info */}
            <div className="relative z-20 p-6 -mt-12">
               <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-georgia text-white group-hover:text-[#c9a84c] transition-colors">{profile.name}</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">@{profile.handle}</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all"><Settings className="w-4 h-4" /></button>
                     <button className="p-2 bg-white/5 hover:bg-[#c9a84c] hover:text-black rounded-full text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group/item">
                        <Camera className="w-4 h-4 text-gray-500 group-hover/item:text-[#c9a84c] mb-2" />
                        <p className="text-[8px] text-gray-500 uppercase tracking-widest">Wgraj Hero</p>
                     </div>
                     <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group/item">
                        <ImageIcon className="w-4 h-4 text-gray-500 group-hover/item:text-[#c9a84c] mb-2" />
                        <p className="text-[8px] text-gray-500 uppercase tracking-widest">Galeria</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-bold text-gray-600 uppercase tracking-widest pt-2">
                     <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> Publiczny URL</span>
                     <span className="flex items-center gap-2 text-[#c9a84c] group-hover:animate-pulse cursor-pointer">Live Preview <Zap className="w-3 h-3" /></span>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ProfileManager;
