import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import { cn } from '@/utils/utils';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profiles');
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      handle: '@example_creator',
      name: 'Example Creator',
      template: 'elegant',
      bio: 'Professional content creator',
      image: '/images/studio-noir.jpg',
      status: 'active',
    },
  ]);

  const [newProfile, setNewProfile] = useState({
    name: '',
    handle: '',
    bio: '',
    template: 'elegant',
  });

  const [castingApplications, setCastingApplications] = useState([
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'Test',
      email: 'anna@test.com',
      status: 'pending',
      submittedAt: '2026-04-08',
    },
  ]);

  const profileTemplates = [
    {
      id: 'elegant',
      name: 'Elegant Noir',
      description: 'Premium minimalist design with dark aesthetic',
      color: 'from-dark via-dark-2 to-dark-3',
    },
    {
      id: 'luxury',
      name: 'Luxury Gold',
      description: 'Luxurious gold accent theme',
      color: 'from-dark via-gold/5 to-dark',
    },
    {
      id: 'modern',
      name: 'Modern Vibrant',
      description: 'Contemporary design with vibrant accents',
      color: 'from-dark via-crimson/5 to-dark',
    },
  ];

  const handleCreateProfile = () => {
    if (!newProfile.name || !newProfile.handle) {
      alert('Please fill in all required fields');
      return;
    }

    const profile = {
      id: profiles.length + 1,
      ...newProfile,
      image: '/images/studio-noir.jpg',
      status: 'active',
    };

    setProfiles([...profiles, profile]);
    setNewProfile({ name: '', handle: '', bio: '', template: 'elegant' });
    alert('Profile created successfully and added to portfolio!');
  };

  const handleDeleteProfile = (id: number) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter((p) => p.id !== id));
    }
  };

  const handleApproveApplication = (id: number) => {
    setCastingApplications(
      castingApplications.map((app) =>
        app.id === id ? { ...app, status: 'approved' } : app
      )
    );
    alert('Application approved! Profile will be created.');
  };

  return (
    <>
      <Head>
        <title>Admin Panel | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text flex flex-col">
        <Navigation />

        <main className="flex-1 pt-24">
          <div className="max-w-7xl mx-auto px-8 pb-24">
            {/* Header */}
            <div className="mb-12 space-y-4">
              <h1 className="font-cormorant text-5xl text-white italic">Admin Control Panel</h1>
              <p className="text-dim text-lg">Manage profiles, media, and casting applications</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-12 overflow-x-auto border-b border-gold/10 pb-4">
              {[
                { id: 'profiles', label: '👥 Profiles', desc: 'Create & manage creator profiles' },
                { id: 'portfolio', label: '🖼️ Portfolio', desc: 'View portfolio gallery' },
                { id: 'media', label: '📹 Media', desc: 'Upload media from Cloudinary' },
                { id: 'casting', label: '🎬 Casting', desc: 'Review applications' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-6 py-3 text-sm tracking-widest uppercase font-bold transition-all whitespace-nowrap border-b-2',
                    activeTab === tab.id
                      ? 'border-gold text-gold'
                      : 'border-transparent text-dim hover:text-gold'
                  )}
                  title={tab.desc}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* PROFILES TAB */}
                {activeTab === 'profiles' && (
                  <div className="space-y-12">
                    {/* Create Profile Form */}
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">Create New Creator Profile</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                            Creator Name *
                          </label>
                          <input
                            type="text"
                            value={newProfile.name}
                            onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                            placeholder="Full Name"
                            className="w-full bg-dark-3 border border-gold/10 px-4 py-3 text-white outline-none focus:border-gold/40 transition-colors text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                            Handle (URL) *
                          </label>
                          <input
                            type="text"
                            value={newProfile.handle}
                            onChange={(e) => setNewProfile({ ...newProfile, handle: e.target.value })}
                            placeholder="@username"
                            className="w-full bg-dark-3 border border-gold/10 px-4 py-3 text-white outline-none focus:border-gold/40 transition-colors text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                          Bio / Description
                        </label>
                        <textarea
                          value={newProfile.bio}
                          onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
                          placeholder="Brief professional description (max 150 chars)..."
                          maxLength={150}
                          className="w-full bg-dark-3 border border-gold/10 px-4 py-3 text-white outline-none focus:border-gold/40 transition-colors min-h-20 resize-none text-sm"
                        />
                        <p className="text-[10px] text-dim">{newProfile.bio.length}/150</p>
                      </div>

                      <div className="space-y-6">
                        <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                          Select Profile Template
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {profileTemplates.map((template) => (
                            <button
                              key={template.id}
                              onClick={() => setNewProfile({ ...newProfile, template: template.id })}
                              className={cn(
                                'p-6 border-2 rounded-lg transition-all text-center space-y-3 hover:scale-105',
                                newProfile.template === template.id
                                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                                  : 'border-gold/20 hover:border-gold/50'
                              )}
                            >
                              <div className={`h-32 rounded bg-gradient-to-b ${template.color}`} />
                              <h4 className="font-cormorant text-lg text-white italic">{template.name}</h4>
                              <p className="text-[10px] text-dim">{template.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleCreateProfile}
                        className="w-full bg-gold text-dark font-bold py-4 px-6 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm shadow-lg"
                      >
                        ✓ Create Profile & Add to Portfolio
                      </button>
                    </div>

                    {/* Active Profiles */}
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <div className="flex justify-between items-center">
                        <h2 className="font-cormorant text-3xl text-gold italic">Active Profiles ({profiles.length})</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {profiles.map((profile) => (
                          <motion.div
                            key={profile.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-dark-3 border border-gold/10 overflow-hidden hover:border-gold/30 transition-all group cursor-pointer"
                          >
                            {/* Profile Image */}
                            <div className="aspect-square bg-dark overflow-hidden relative">
                              <img
                                src={profile.image}
                                alt={profile.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-gold font-bold text-center">Click to view full profile →</span>
                              </div>
                            </div>

                            {/* Profile Info */}
                            <div className="p-6 space-y-4">
                              <div>
                                <h3 className="font-cormorant text-2xl text-white italic">{profile.name}</h3>
                                <p className="text-[10px] text-gold tracking-widest uppercase font-bold">{profile.handle}</p>
                              </div>

                              <p className="text-xs text-dim leading-relaxed line-clamp-2">{profile.bio}</p>

                              <div className="flex gap-2 text-[10px] uppercase tracking-widest">
                                <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded">●Active</span>
                                <span className="bg-gold/10 text-gold px-2 py-1 rounded">{profile.template}</span>
                              </div>

                              <div className="pt-4 border-t border-gold/10 flex gap-2">
                                <button className="flex-1 bg-gold/10 text-gold hover:bg-gold hover:text-dark py-2 text-[10px] font-bold uppercase transition-all">
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProfile(profile.id)}
                                  className="flex-1 bg-crimson/10 text-crimson hover:bg-crimson hover:text-white py-2 text-[10px] font-bold uppercase transition-all"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PORTFOLIO TAB */}
                {activeTab === 'portfolio' && (
                  <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                    <h2 className="font-cormorant text-3xl text-gold italic">Portfolio Gallery</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {profiles.map((profile) => (
                        <motion.div
                          key={profile.id}
                          whileHover={{ scale: 1.05, rotateZ: 2 }}
                          className="aspect-square bg-dark border-2 border-gold/10 overflow-hidden cursor-pointer group"
                        >
                          <img
                            src={profile.image}
                            alt={profile.handle}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                            <p className="text-gold font-bold text-sm">{profile.handle}</p>
                            <p className="text-white text-xs mt-2">{profile.name}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-dark-3 border border-gold/10 p-8 text-center space-y-4">
                      <p className="text-gold font-bold uppercase tracking-widest">Portfolio Stats</p>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <p className="text-4xl font-cormorant text-gold italic">{profiles.length}</p>
                          <p className="text-[10px] text-dim uppercase">Active Profiles</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-4xl font-cormorant text-gold italic">32</p>
                          <p className="text-[10px] text-dim uppercase">Media Files</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-4xl font-cormorant text-gold italic">↑</p>
                          <p className="text-[10px] text-dim uppercase">Live</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MEDIA TAB */}
                {activeTab === 'media' && (
                  <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                    <h2 className="font-cormorant text-3xl text-gold italic">Upload Media from Cloudinary</h2>

                    <div className="bg-dark-3 border-2 border-dashed border-gold/30 p-16 rounded text-center space-y-4 hover:border-gold/60 transition-colors">
                      <p className="text-6xl">☁️</p>
                      <p className="text-white font-bold text-lg">Drag & drop or click to upload</p>
                      <p className="text-dim text-sm max-w-md mx-auto">
                        Support for photos (JPG, PNG), videos (MP4, MOV), and documents (PDF, DOCX)
                      </p>
                      <button className="bg-gold text-dark font-bold py-3 px-8 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm">
                        📁 Select Files to Upload
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white uppercase tracking-widest">Recent Uploads</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'studio-photo-001.jpg', size: '2.3 MB', type: '📸' },
                          { name: 'promo-video-001.mp4', size: '45 MB', type: '🎥' },
                          { name: 'portfolio-pic-001.jpg', size: '1.8 MB', type: '📸' },
                          { name: 'behind-scenes.mov', size: '52 MB', type: '🎥' },
                        ].map((file, i) => (
                          <div
                            key={i}
                            className="bg-dark-3 border border-gold/10 p-4 flex justify-between items-center hover:border-gold/30 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-2xl">{file.type}</span>
                              <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-[10px] text-dim">{file.size}</p>
                              </div>
                            </div>
                            <button className="text-gold hover:text-white transition-colors uppercase text-[10px] font-bold">
                              Use in Profile
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* CASTING TAB */}
                {activeTab === 'casting' && (
                  <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                    <h2 className="font-cormorant text-3xl text-gold italic">Casting Applications</h2>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-dark-3 border-b border-gold/10">
                            <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Name</th>
                            <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Email</th>
                            <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Submitted</th>
                            <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold/5">
                          {castingApplications.map((app) => (
                            <tr
                              key={app.id}
                              className="hover:bg-gold/5 transition-colors group"
                            >
                              <td className="px-6 py-4 text-white font-medium">
                                {app.firstName} {app.lastName}
                              </td>
                              <td className="px-6 py-4 text-dim text-xs">{app.email}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={cn(
                                    'text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest inline-block',
                                    app.status === 'pending'
                                      ? 'bg-gold/10 text-gold'
                                      : app.status === 'approved'
                                        ? 'bg-green-500/10 text-green-500'
                                        : 'bg-crimson/10 text-crimson'
                                  )}
                                >
                                  {app.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-dim text-xs">{app.submittedAt}</td>
                              <td className="px-6 py-4 text-xs space-x-3">
                                <button className="text-gold hover:text-white transition-colors underline font-bold">
                                  View Form
                                </button>
                                <button className="text-dim hover:text-gold transition-colors underline">
                                  Photos
                                </button>
                                <button className="text-dim hover:text-gold transition-colors underline">
                                  Video
                                </button>
                                {app.status === 'pending' && (
                                  <button
                                    onClick={() => handleApproveApplication(app.id)}
                                    className="text-green-500 hover:text-green-400 transition-colors underline font-bold ml-2"
                                  >
                                    ✓ Approve
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-dark-3 border border-gold/10 p-6 text-center space-y-2">
                      <p className="text-[10px] text-dim uppercase tracking-widest">Casting Info</p>
                      <p className="text-2xl font-cormorant text-gold italic">{castingApplications.length} Applications</p>
                      <p className="text-[10px] text-dim">
                        {castingApplications.filter((a) => a.status === 'pending').length} Pending
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminPanel;

