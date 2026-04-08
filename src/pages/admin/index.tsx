import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navigation from '@/components/common/Navigation';
import UnifiedPlatformManager from '@/components/admin/UnifiedPlatformManager';
import { cn } from '@/utils/utils';
import { useAuth } from '@/hooks/useAuth';

interface PlatformInfo {
  username: string;
  url: string;
  followers: number;
  posts: number;
  features: string[];
  apiKey?: string;
  lastSync?: string;
  [key: string]: any;
}

interface PlatformDataType {
  [key: string]: PlatformInfo;
}

const AdminPanel: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('/api/admin/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          localStorage.removeItem('adminToken');
          setLoading(false);
          return;
        }
        setLoading(false);
      } catch (error) {
        localStorage.removeItem('adminToken');
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Handle admin login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      if (!response.ok) {
        const data = await response.json();
        setLoginError(data.error || 'Login failed');
        return;
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      setLoginEmail('');
      setLoginPassword('');
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    }
  };

  // Handle logout
  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

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

  // Unified Profile Management State
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [platformData, setPlatformData] = useState<PlatformDataType>({
    // Live Cam Platforms
    chaturbate: { username: '', url: '', followers: 12500, posts: 45, features: ['Tip Menu', 'Private Show', 'Interactive Toys', 'Fanclub'] },
    myfreecams: { username: '', url: '', followers: 8200, posts: 128, features: ['Premium', 'MFCCoins', 'Club Members'] },
    livejasmin: { username: '', url: '', followers: 15700, posts: 234, features: ['Private Show', 'VIP Show', 'HD/4K'] },
    stripchat: { username: '', url: '', followers: 22100, posts: 67, features: ['Fan Club', 'VR Shows', 'Gold Shows'] },
    camsoda: { username: '', url: '', followers: 5300, posts: 23, features: ['VR Shows', 'Crypto Tips', 'VOD'] },
    bongacams: { username: '', url: '', followers: 3100, posts: 12, features: ['Gold Shows', 'European Focus'] },
    flirt4free: { username: '', url: '', followers: 8900, posts: 78, features: ['Party Chat', 'Feature Shows'] },
    imlive: { username: '', url: '', followers: 6700, posts: 34, features: ['Multi-Viewer', 'Wish List'] },
    
    // Subscription/Fansite Platforms
    onlyfans: { username: '', url: '', followers: 12500, posts: 45, apiKey: '', features: ['Subskrypcja', 'PPV', 'DM', 'Custom Content'] },
    fansly: { username: '', url: '', followers: 8200, posts: 128, features: ['Algorytm', 'Tiers', 'Multi-media'] },
    manyvids: { username: '', url: '', followers: 15700, posts: 234, features: ['VOD', 'MV Crush', 'Store'] },
    clips4sale: { username: '', url: '', followers: 22100, posts: 67, features: ['Fetish Niche', 'Studio System'] },
    avnstars: { username: '', url: '', followers: 5300, posts: 23, features: ['Sub', 'VOD', 'Live Cam'] },
    fanvue: { username: '', url: '', followers: 3100, posts: 12, apiKey: '', features: ['Low Fee', 'AI Tools'] },
    
    // Tube/UGC Platforms
    pornhub: { username: '', url: '', followers: 8900, posts: 78, features: ['ModelHub', 'Rev Share', 'Fanclub'] },
    xhamster: { username: '', url: '', followers: 6700, posts: 34, features: ['Creator Program', 'SEO'] },
    xvideos: { username: '', url: '', followers: 12500, posts: 45, features: ['RED Sub', 'Rev Share'] },
    xhamsterlive: { username: '', url: '', followers: 8200, posts: 128, features: ['Live Cam', 'xHamster Base'] },
    
    // Marketing Platforms
    twitter: { username: '', url: '', followers: 15700, posts: 234, features: ['Threads', 'Spaces', 'Polls'] },
    reddit: { username: '', url: '', followers: 22100, posts: 67, features: ['Subreddits', 'Upvotes'] },
    telegram: { username: '', url: '', followers: 5300, posts: 23, features: ['VIP Channel', 'TON Blockchain'] },
    tiktok: { username: '', url: '', followers: 3100, posts: 12, features: ['Duets', 'Stitches', 'Live'] },
    instagram: { username: '', url: '', followers: 8900, posts: 78, features: ['Stories', 'Reels', 'SFW Only'] },
  });

  // Settings State
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Studio HRL Adult',
      adminEmail: 'admin@hrlstudio.com',
      currency: 'EUR',
      timezone: 'Europe/Warsaw'
    },
    integrations: {
      cloudinary: { status: 'connected' },
      supabase: { status: 'connected' },
      stripe: { status: 'not_configured' },
      sendgrid: { status: 'not_configured' },
      twitter: { status: 'pending' },
      meta: { status: 'pending' }
    },
    maintenance: {
      lastBackup: '2026-04-08 02:00',
      systemUptime: '15 days',
      version: '2.1.0'
    }
  });

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    loadSettings();
  }, []);

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

  // Unified Profile Handlers
  const handlePlatformUpdate = (platform: string, data: any): void => {
    setPlatformData((prev: PlatformDataType) => ({
      ...prev,
      [platform]: { ...prev[platform], ...data, lastSync: new Date().toISOString() }
    }));
    alert(`${platform} settings updated successfully!`);
  };

  const handlePlatformSync = (platform: string): void => {
    // Simulate API call to sync platform data
    setTimeout(() => {
      setPlatformData((prev: PlatformDataType) => ({
        ...prev,
        [platform]: {
          ...(prev[platform] || {}),
          followers: (prev[platform]?.followers || 0) + Math.floor(Math.random() * 100),
          posts: (prev[platform]?.posts || 0) + Math.floor(Math.random() * 5),
          lastSync: new Date().toISOString()
        }
      }));
      alert(`${platform} data synced successfully!`);
    }, 1000);
  };

  // Settings Functions
  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'general', data: settings.general }),
      });
      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert('Error saving settings');
    }
  };

  const handleMaintenanceAction = async (action: string) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'maintenance', data: { action } }),
      });
      if (response.ok) {
        alert(`${action.replace('_', ' ')} completed successfully!`);
        // Refresh settings
        const settingsResponse = await fetch('/api/admin/settings');
        if (settingsResponse.ok) {
          const newSettings = await settingsResponse.json();
          setSettings(newSettings);
        }
      } else {
        alert(`Failed to ${action.replace('_', ' ')}`);
      }
    } catch (error) {
      alert(`Error performing ${action.replace('_', ' ')}`);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Panel | Studio HRL Adult</title>
      </Head>

      {loading ? (
        <div className="min-h-screen bg-dark text-text flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl">⏳</div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      ) : !localStorage.getItem('adminToken') ? (
        // LOGIN SCREEN
        <div className="min-h-screen bg-dark text-text flex flex-col">
          <Navigation />
          <main className="flex-1 flex items-center justify-center pt-24 pb-24">
            <div className="w-full max-w-md">
              <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="font-cormorant text-4xl text-gold italic">Admin Access</h1>
                  <p className="text-dim text-sm">Only authorized personnel</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@hrlstudio.com"
                      className="w-full bg-dark-3 border border-gold/10 px-4 py-3 text-white outline-none focus:border-gold/40 transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-dark-3 border border-gold/10 px-4 py-3 text-white outline-none focus:border-gold/40 transition-colors"
                      required
                    />
                  </div>

                  {loginError && (
                    <div className="bg-crimson/10 border border-crimson/30 p-3 rounded text-crimson text-sm">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gold text-dark font-bold py-3 px-6 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm"
                  >
                    Login
                  </button>
                </form>

                <div className="text-center text-[10px] text-dim">
                  <p>🔒 Admin panel secured</p>
                  <p>Unauthorized access attempts are logged</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        // ADMIN PANEL
        <div className="min-h-screen bg-dark text-text flex flex-col">
        <Navigation />

        <main className="flex-1 pt-24">
          <div className="max-w-7xl mx-auto px-8 pb-24">
            {/* Header */}
            <div className="mb-12 space-y-4 flex justify-between items-start">
              <div className="space-y-4">
                <h1 className="font-cormorant text-5xl text-white italic">Admin Control Panel</h1>
                <p className="text-dim text-lg">Manage profiles, media, and casting applications</p>
              </div>
              <button
                onClick={handleAdminLogout}
                className="bg-crimson/10 text-crimson hover:bg-crimson hover:text-white py-2 px-6 text-sm font-bold uppercase tracking-widest transition-all rounded border border-crimson/20"
              >
                🚪 Logout
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-12 overflow-x-auto border-b border-gold/10 pb-4">
              {[
                { id: 'dashboard', label: '📊 Dashboard', desc: 'Analytics & KPIs' },
                { id: 'profiles', label: '👥 Profiles', desc: 'Create & manage creator profiles' },
                { id: 'unified', label: '🌐 Unified', desc: 'Manage all platforms from one place' },
                { id: 'finance', label: '💰 Finance', desc: 'Revenue tracking & payments' },
                { id: 'content', label: '📝 Content', desc: 'CMS & content management' },
                { id: 'portfolio', label: '🖼️ Portfolio', desc: 'View portfolio gallery' },
                { id: 'media', label: '📹 Media', desc: 'Upload media from Cloudinary' },
                { id: 'casting', label: '🎬 Casting', desc: 'Review applications' },
                { id: 'security', label: '🔒 Security', desc: 'Compliance & audit logs' },
                { id: 'settings', label: '⚙️ Settings', desc: 'System configuration' },
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
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-12">
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">Analytics Dashboard</h2>
                      <p className="text-dim text-lg">Real-time KPIs and business insights</p>

                      {/* KPI Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: 'Total Revenue (M-T-D)', value: '€12,450', trend: '+18.5%', color: 'text-gold', bg: 'bg-gold/5', icon: '💰' },
                          { label: 'Active Partners', value: '24', trend: 'Stable', color: 'text-green-500', bg: 'bg-green-500/5', icon: '👥' },
                          { label: 'Pending Castings', value: '8', trend: 'New: 3', color: 'text-blue-500', bg: 'bg-blue-500/5', icon: '🎬' },
                          { label: 'Compliance Score', value: '100%', trend: 'Verified', color: 'text-crimson', bg: 'bg-crimson/5', icon: '✅' },
                        ].map((kpi, i) => (
                          <div key={i} className={`${kpi.bg} border border-gold/10 p-6 rounded-lg text-center space-y-3`}>
                            <div className="text-3xl">{kpi.icon}</div>
                            <div className="space-y-1">
                              <p className="text-2xl font-bold text-white">{kpi.value}</p>
                              <p className="text-sm text-dim">{kpi.label}</p>
                            </div>
                            <p className={`text-sm font-bold ${kpi.color}`}>{kpi.trend}</p>
                          </div>
                        ))}
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Recent Activity</h3>
                        <div className="space-y-4">
                          {[
                            { time: '2 min ago', text: 'New casting application from Anna K.', type: 'info' },
                            { time: '15 min ago', text: 'Payment processed: €450 from Partner #12', type: 'success' },
                            { time: '1 hour ago', text: 'Content uploaded to 5 platforms', type: 'info' },
                            { time: '2 hours ago', text: 'Compliance audit completed', type: 'success' },
                          ].map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-dark-2 border border-gold/10 rounded-lg">
                              <div className={`w-3 h-3 rounded-full ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                              <div className="flex-1">
                                <p className="text-white">{activity.text}</p>
                                <p className="text-xs text-dim">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Revenue Chart Placeholder */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Revenue Trends</h3>
                        <div className="h-64 bg-dark-2 border border-gold/20 rounded-lg flex items-center justify-center">
                          <p className="text-dim">📈 Chart visualization will be implemented with Chart.js</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

                {/* UNIFIED PROFILES TAB */}
                {activeTab === 'unified' && (
                  <div className="space-y-12">
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">Unified Creator Profile Manager</h2>
                      <p className="text-dim text-lg">Manage one creator across all platforms from this single dashboard</p>

                      {/* Platform Overview */}
                      <div className="space-y-8">
                        {/* Live Cam Platforms */}
                        <div>
                          <h3 className="font-cormorant text-2xl text-gold italic mb-4">🎥 Live Cam Platforms</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                              { key: 'chaturbate', name: 'Chaturbate', icon: '💎', color: 'text-pink-500' },
                              { key: 'myfreecams', name: 'MyFreeCams', icon: '🌟', color: 'text-purple-500' },
                              { key: 'livejasmin', name: 'LiveJasmin', icon: '👑', color: 'text-gold' },
                              { key: 'stripchat', name: 'StripChat', icon: '💃', color: 'text-red-500' },
                              { key: 'camsoda', name: 'CamSoda', icon: '🎮', color: 'text-blue-500' },
                              { key: 'bongacams', name: 'BongaCams', icon: '🇪🇺', color: 'text-green-500' },
                              { key: 'flirt4free', name: 'Flirt4Free', icon: '💬', color: 'text-orange-500' },
                              { key: 'imlive', name: 'ImLive', icon: '📺', color: 'text-cyan-500' },
                            ].map((platform) => {
                              const platformInfo = platformData[platform.key] as PlatformInfo;
                              return (
                              <div key={platform.key} className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                                <div className="text-3xl">{platform.icon}</div>
                                <h4 className="font-bold text-white">{platform.name}</h4>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Followers/Subscribers</p>
                                  <p className={`text-lg font-bold ${platform.color}`}>{platformInfo.followers || 0}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Content Items</p>
                                  <p className="text-lg font-bold text-gold">{platformInfo.posts || 0}</p>
                                </div>
                                <div className="text-xs text-dim space-y-1">
                                  <p>Features:</p>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {platformInfo.features.map((feature: string, i: number) => (
                                      <span key={i} className="bg-gold/10 text-gold px-2 py-1 rounded text-[10px]">{feature}</span>
                                    ))}
                                  </div>
                                </div>
                                <button className="w-full bg-gold/10 text-gold hover:bg-gold hover:text-dark py-2 text-xs font-bold uppercase transition-all">
                                  Manage {platform.name}
                                </button>
                              </div>
                            );
                            })}
                          </div>
                        </div>

                        {/* Subscription/Fansite Platforms */}
                        <div>
                          <h3 className="font-cormorant text-2xl text-gold italic mb-4">💳 Subscription/Fansite Platforms</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                              { key: 'onlyfans', name: 'OnlyFans', icon: '💎', color: 'text-pink-500' },
                              { key: 'fansly', name: 'Fansly', icon: '🔍', color: 'text-purple-500' },
                              { key: 'manyvids', name: 'ManyVids', icon: '🎬', color: 'text-red-500' },
                              { key: 'clips4sale', name: 'Clips4Sale', icon: '📦', color: 'text-orange-500' },
                              { key: 'avnstars', name: 'AVN Stars', icon: '🏆', color: 'text-gold' },
                              { key: 'fanvue', name: 'Fanvue', icon: '🤖', color: 'text-cyan-500' },
                            ].map((platform) => {
                              const platformInfo = platformData[platform.key] as PlatformInfo;
                              return (
                              <div key={platform.key} className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                                <div className="text-3xl">{platform.icon}</div>
                                <h4 className="font-bold text-white">{platform.name}</h4>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Subscribers</p>
                                  <p className={`text-lg font-bold ${platform.color}`}>{platformInfo.followers || 0}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Content Items</p>
                                  <p className="text-lg font-bold text-gold">{platformInfo.posts || 0}</p>
                                </div>
                                <div className="text-xs text-dim space-y-1">
                                  <p>Features:</p>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {platformInfo.features.map((feature: string, i: number) => (
                                      <span key={i} className="bg-gold/10 text-gold px-2 py-1 rounded text-[10px]">{feature}</span>
                                    ))}
                                  </div>
                                </div>
                                <button className="w-full bg-gold/10 text-gold hover:bg-gold hover:text-dark py-2 text-xs font-bold uppercase transition-all">
                                  Manage {platform.name}
                                </button>
                              </div>
                            );
                            })}
                          </div>
                        </div>

                        {/* Tube/UGC Platforms */}
                        <div>
                          <h3 className="font-cormorant text-2xl text-gold italic mb-4">📺 Tube/UGC Platforms</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                              { key: 'pornhub', name: 'Pornhub ModelHub', icon: '🔥', color: 'text-red-600' },
                              { key: 'xhamster', name: 'xHamster Creator', icon: '🐹', color: 'text-orange-500' },
                              { key: 'xvideos', name: 'xVideos RED', icon: '🎥', color: 'text-blue-500' },
                              { key: 'xhamsterlive', name: 'xHamster Live', icon: '📡', color: 'text-green-500' },
                            ].map((platform) => {
                              const platformInfo = platformData[platform.key] as PlatformInfo;
                              return (
                              <div key={platform.key} className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                                <div className="text-3xl">{platform.icon}</div>
                                <h4 className="font-bold text-white">{platform.name}</h4>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Views/Subscribers</p>
                                  <p className={`text-lg font-bold ${platform.color}`}>{platformInfo.followers || 0}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Videos</p>
                                  <p className="text-lg font-bold text-gold">{platformInfo.posts || 0}</p>
                                </div>
                                <div className="text-xs text-dim space-y-1">
                                  <p>Features:</p>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {platformInfo.features.map((feature: string, i: number) => (
                                      <span key={i} className="bg-gold/10 text-gold px-2 py-1 rounded text-[10px]">{feature}</span>
                                    ))}
                                  </div>
                                </div>
                                <button className="w-full bg-gold/10 text-gold hover:bg-gold hover:text-dark py-2 text-xs font-bold uppercase transition-all">
                                  Manage {platform.name}
                                </button>
                              </div>
                            );
                            })}
                          </div>
                        </div>

                        {/* Marketing Platforms */}
                        <div>
                          <h3 className="font-cormorant text-2xl text-gold italic mb-4">📣 Marketing Platforms</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                              { key: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'text-blue-500' },
                              { key: 'reddit', name: 'Reddit', icon: '🟠', color: 'text-orange-500' },
                              { key: 'telegram', name: 'Telegram', icon: '✈️', color: 'text-cyan-500' },
                              { key: 'tiktok', name: 'TikTok', icon: '🎵', color: 'text-red-500' },
                              { key: 'instagram', name: 'Instagram', icon: '📸', color: 'text-purple-500' },
                            ].map((platform) => {
                              const platformInfo = platformData[platform.key] as PlatformInfo;
                              return (
                              <div key={platform.key} className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                                <div className="text-3xl">{platform.icon}</div>
                                <h4 className="font-bold text-white">{platform.name}</h4>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Followers</p>
                                  <p className={`text-lg font-bold ${platform.color}`}>{platformInfo.followers || 0}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-dim">Posts</p>
                                  <p className="text-lg font-bold text-gold">{platformInfo.posts || 0}</p>
                                </div>
                                <div className="text-xs text-dim space-y-1">
                                  <p>Features:</p>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {platformInfo.features.map((feature: string, i: number) => (
                                      <span key={i} className="bg-gold/10 text-gold px-2 py-1 rounded text-[10px]">{feature}</span>
                                    ))}
                                  </div>
                                </div>
                                <button className="w-full bg-gold/10 text-gold hover:bg-gold hover:text-dark py-2 text-xs font-bold uppercase transition-all">
                                  Manage {platform.name}
                                </button>
                              </div>
                            );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Content Scheduler */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Content Scheduler</h3>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <div key={day} className="text-center space-y-2">
                              <p className="text-sm text-gold font-bold uppercase">{day}</p>
                              <div className="bg-dark-2 border border-gold/20 p-3 rounded space-y-2">
                                <div className="text-xs text-dim">Posts</div>
                                <div className="text-lg font-bold text-white">3</div>
                                <button className="w-full bg-gold/20 text-gold hover:bg-gold hover:text-dark py-1 text-xs font-bold uppercase transition-all">
                                  Edit
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Implementation Phases */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Implementation Phases</h3>
                        <div className="space-y-4">
                          {[
                            { phase: 'FAZA 0', time: 'Tydz. 1-2', title: 'Przed startem', platforms: ['OnlyFans', 'Fansly', 'Chaturbate', 'StripChat', 'Twitter/X', 'Reddit'], goal: 'Wszystkie konta zweryfikowane, sprzęt gotowy' },
                            { phase: 'FAZA 1', time: 'Tydz. 3-4', title: 'Soft Launch', platforms: ['OnlyFans', 'Chaturbate', 'Twitter/X', 'Reddit'], goal: 'Pierwsze sub OF, pierwsze tokeny' },
                            { phase: 'FAZA 2', time: 'Tydz. 5-8', title: 'Traction', platforms: ['StripChat', 'MyFreeCams', 'Fansly', 'Telegram'], goal: '20-60 sub OF, regularne live' },
                            { phase: 'FAZA 3', time: 'M2-M3', title: 'Dywersyfikacja', platforms: ['ManyVids', 'BongaCams', 'Pornhub', 'xHamster', 'CamSoda'], goal: '5-7 aktywnych platform, pasywne VOD' },
                            { phase: 'FAZA 4', time: 'M4+', title: 'Skalowanie', platforms: ['LiveJasmin', 'Clips4Sale', 'AVN Stars', 'Fanvue', 'xVideos RED'], goal: '$2000-5000+/m., zdywersyfikowane przychody' }
                          ].map((phase, i) => (
                            <div key={i} className="bg-dark-2 border border-gold/20 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-bold text-gold">{phase.phase} - {phase.title}</h4>
                                  <p className="text-sm text-dim">{phase.time}</p>
                                </div>
                                <span className="bg-gold/10 text-gold px-2 py-1 rounded text-xs">Goal: {phase.goal}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {phase.platforms.map((platform, j) => (
                                  <span key={j} className="bg-gold/20 text-gold px-3 py-1 rounded text-xs">
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-4">
                        <button className="bg-gold text-dark font-bold py-3 px-6 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm">
                          📝 Create Post for All Platforms
                        </button>
                        <button className="bg-crimson text-white font-bold py-3 px-6 hover:bg-crimson/80 transition-colors uppercase tracking-widest text-sm">
                          📊 View Analytics
                        </button>
                        <button className="bg-blue-500 text-white font-bold py-3 px-6 hover:bg-blue-500/80 transition-colors uppercase tracking-widest text-sm">
                          🔄 Sync All Platforms
                        </button>
                      </div>

                      {/* Revenue Projections */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Revenue Projections (Monthly)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { platform: 'Chaturbate', pessimistic: '50-150$', realistic: '200-600$', optimistic: '1000-3000$' },
                            { platform: 'MyFreeCams', pessimistic: '30-100$', realistic: '150-500$', optimistic: '800-2500$' },
                            { platform: 'LiveJasmin', pessimistic: '50-200$', realistic: '300-800$', optimistic: '1500-5000$' },
                            { platform: 'StripChat', pessimistic: '30-100$', realistic: '150-400$', optimistic: '600-2000$' },
                            { platform: 'OnlyFans', pessimistic: '50-200$', realistic: '300-1000$', optimistic: '2000-10000$' },
                            { platform: 'Fansly', pessimistic: '20-100$', realistic: '150-500$', optimistic: '1000-5000$' },
                            { platform: 'ManyVids', pessimistic: '10-50$', realistic: '80-300$', optimistic: '500-2000$' },
                            { platform: 'Pornhub ModelHub', pessimistic: '10-40$', realistic: '50-200$', optimistic: '300-1000$' },
                            { platform: 'Telegram VIP', pessimistic: '0-50$', realistic: '100-400$', optimistic: '500-2000$' }
                          ].map((proj, i) => (
                            <div key={i} className="bg-dark-2 border border-gold/20 p-4 rounded-lg">
                              <h4 className="font-bold text-white mb-3">{proj.platform}</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-dim">Pessimistic:</span>
                                  <span className="text-red-400">{proj.pessimistic}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-dim">Realistic:</span>
                                  <span className="text-yellow-400">{proj.realistic}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-dim">Optimistic:</span>
                                  <span className="text-green-400">{proj.optimistic}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gold/10 border border-gold/20 p-4 rounded-lg text-center">
                          <p className="text-gold font-bold">Portfolio Total (6+ platforms after 6 months)</p>
                          <p className="text-2xl font-cormorant text-white italic">1500-5200$ realistic / 8500-30000$ optimistic</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FINANCE TAB */}
                {activeTab === 'finance' && (
                  <div className="space-y-12">
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">Finance & Revenue Management</h2>
                      <p className="text-dim text-lg">Track payments, payouts, and financial performance</p>

                      {/* Financial Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                          <div className="text-3xl">💰</div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-gold">€12,450</p>
                            <p className="text-sm text-dim">Total Revenue (MTD)</p>
                          </div>
                        </div>
                        <div className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                          <div className="text-3xl">⏳</div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-blue-500">€3,200</p>
                            <p className="text-sm text-dim">Pending Payouts</p>
                          </div>
                        </div>
                        <div className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                          <div className="text-3xl">📈</div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-green-500">+18.5%</p>
                            <p className="text-sm text-dim">Growth vs Last Month</p>
                          </div>
                        </div>
                      </div>

                      {/* Revenue by Platform */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Revenue by Platform</h3>
                        <div className="space-y-4">
                          {[
                            { platform: 'OnlyFans', amount: '€4,200', percentage: 34, color: 'bg-pink-500' },
                            { platform: 'Chaturbate', amount: '€3,800', percentage: 31, color: 'bg-purple-500' },
                            { platform: 'Fansly', amount: '€2,100', percentage: 17, color: 'bg-blue-500' },
                            { platform: 'ManyVids', amount: '€1,200', percentage: 10, color: 'bg-red-500' },
                            { platform: 'Other', amount: '€950', percentage: 8, color: 'bg-gray-500' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-32 text-sm text-white font-bold">{item.platform}</div>
                              <div className="flex-1 bg-dark-2 rounded-full h-4">
                                <div className={`h-4 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                              </div>
                              <div className="w-20 text-right text-gold font-bold">{item.amount}</div>
                              <div className="w-12 text-right text-dim text-sm">{item.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Transactions */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Recent Transactions</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="bg-dark-2 border-b border-gold/10">
                                <th className="px-4 py-3 text-[10px] text-gold font-bold uppercase tracking-widest">Date</th>
                                <th className="px-4 py-3 text-[10px] text-gold font-bold uppercase tracking-widest">Partner</th>
                                <th className="px-4 py-3 text-[10px] text-gold font-bold uppercase tracking-widest">Platform</th>
                                <th className="px-4 py-3 text-[10px] text-gold font-bold uppercase tracking-widest">Type</th>
                                <th className="px-4 py-3 text-[10px] text-gold font-bold uppercase tracking-widest">Amount</th>
                                <th className="px-4 py-3 text-[10px] text-gold font-bold uppercase tracking-widest">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gold/5">
                              {[
                                { date: '2026-04-08', partner: 'Anna K.', platform: 'OnlyFans', type: 'Subscription', amount: '€45', status: 'processed' },
                                { date: '2026-04-08', partner: 'Mike T.', platform: 'Chaturbate', type: 'Tokens', amount: '€120', status: 'processed' },
                                { date: '2026-04-07', partner: 'Sarah L.', platform: 'Fansly', type: 'PPV', amount: '€25', status: 'pending' },
                                { date: '2026-04-07', partner: 'John D.', platform: 'ManyVids', type: 'VOD Sale', amount: '€15', status: 'processed' },
                              ].map((tx, i) => (
                                <tr key={i} className="hover:bg-gold/5 transition-colors">
                                  <td className="px-4 py-3 text-white">{tx.date}</td>
                                  <td className="px-4 py-3 text-white">{tx.partner}</td>
                                  <td className="px-4 py-3 text-dim">{tx.platform}</td>
                                  <td className="px-4 py-3 text-dim">{tx.type}</td>
                                  <td className="px-4 py-3 text-gold font-bold">{tx.amount}</td>
                                  <td className="px-4 py-3">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest ${
                                      tx.status === 'processed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                      {tx.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Payout Management */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Payout Management</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white">Schedule Payout</h4>
                            <div className="space-y-3">
                              <select className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40">
                                <option>Select Partner</option>
                                <option>Anna K. - €450</option>
                                <option>Mike T. - €320</option>
                                <option>Sarah L. - €180</option>
                              </select>
                              <input type="number" placeholder="Amount (€)" className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40" />
                              <button className="w-full bg-gold text-dark font-bold py-2 px-4 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm">
                                Schedule Payout
                              </button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white">Payout History</h4>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              <div className="flex justify-between text-sm">
                                <span>Anna K. - €450</span>
                                <span className="text-green-500">Completed</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Mike T. - €320</span>
                                <span className="text-yellow-500">Pending</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Sarah L. - €180</span>
                                <span className="text-green-500">Completed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTENT TAB */}
                {activeTab === 'content' && (
                  <div className="space-y-12">
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">Content Management System</h2>
                      <p className="text-dim text-lg">Manage articles, guides, and educational content</p>

                      {/* Content Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { label: 'Published Articles', count: 24, icon: '📝', color: 'text-blue-500' },
                          { label: 'Draft Articles', count: 8, icon: '📄', color: 'text-yellow-500' },
                          { label: 'Video Tutorials', count: 12, icon: '🎥', color: 'text-red-500' },
                          { label: 'Total Views', count: 15420, icon: '👁️', color: 'text-green-500' },
                        ].map((stat, i) => (
                          <div key={i} className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                            <div className="text-3xl">{stat.icon}</div>
                            <div className="space-y-1">
                              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count.toLocaleString()}</p>
                              <p className="text-sm text-dim">{stat.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Content List */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="font-cormorant text-2xl text-gold italic">Content Library</h3>
                          <button className="bg-gold text-dark font-bold py-2 px-4 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm">
                            + New Article
                          </button>
                        </div>
                        <div className="space-y-4">
                          {[
                            { title: 'Jak zacząć na OnlyFans - kompletny przewodnik', category: 'Podstawy', status: 'published', views: 2340, date: '2026-04-01' },
                            { title: 'Strategie monetyzacji na platformach live cam', category: 'Monetyzacja', status: 'published', views: 1890, date: '2026-03-28' },
                            { title: 'Bezpieczeństwo w branży adult content', category: 'Bezpieczeństwo', status: 'draft', views: 0, date: '2026-04-05' },
                            { title: 'Jak budować markę osobistą jako twórca', category: 'Marka', status: 'published', views: 3120, date: '2026-03-25' },
                          ].map((article, i) => (
                            <div key={i} className="bg-dark-2 border border-gold/10 p-4 rounded-lg flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="text-white font-bold">{article.title}</h4>
                                <div className="flex items-center gap-4 mt-2 text-sm text-dim">
                                  <span>{article.category}</span>
                                  <span>{article.views} views</span>
                                  <span>{article.date}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-1 rounded uppercase ${
                                  article.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                  {article.status}
                                </span>
                                <button className="text-gold hover:text-white transition-colors">Edit</button>
                                <button className="text-crimson hover:text-white transition-colors">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Categories Management */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Content Categories</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            'Podstawy', 'Monetyzacja', 'Bezpieczeństwo', 'Marka', 'Platformy', 'Technologia', 'Prawo', 'Biznes'
                          ].map((category, i) => (
                            <div key={i} className="bg-dark-2 border border-gold/10 p-4 rounded-lg text-center">
                              <p className="text-gold font-bold">{category}</p>
                              <p className="text-xs text-dim mt-1">12 articles</p>
                            </div>
                          ))}
                        </div>
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

                {/* SECURITY TAB */}
                {activeTab === 'security' && (
                  <div className="space-y-12">
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">Security & Compliance</h2>
                      <p className="text-dim text-lg">Monitor compliance, audit logs, and system security</p>

                      {/* Security Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                          { label: 'Compliance Score', value: '100%', status: 'excellent', icon: '✅', color: 'text-green-500' },
                          { label: 'Active Sessions', value: '12', status: 'normal', icon: '👥', color: 'text-blue-500' },
                          { label: 'Failed Logins', value: '3', status: 'low', icon: '🚫', color: 'text-yellow-500' },
                          { label: 'Data Backups', value: 'Daily', status: 'current', icon: '💾', color: 'text-purple-500' },
                        ].map((item, i) => (
                          <div key={i} className="bg-dark-3 border border-gold/10 p-6 rounded-lg text-center space-y-3">
                            <div className="text-3xl">{item.icon}</div>
                            <div className="space-y-1">
                              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                              <p className="text-sm text-dim">{item.label}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded uppercase ${
                              item.status === 'excellent' ? 'bg-green-500/10 text-green-500' :
                              item.status === 'normal' ? 'bg-blue-500/10 text-blue-500' :
                              item.status === 'low' ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-purple-500/10 text-purple-500'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Audit Log */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Audit Log</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {[
                            { time: '2026-04-08 14:32', action: 'User login', user: 'admin@hrl.com', ip: '192.168.1.1', status: 'success' },
                            { time: '2026-04-08 14:15', action: 'Profile updated', user: 'Anna K.', ip: '10.0.0.5', status: 'success' },
                            { time: '2026-04-08 13:45', action: 'Failed login attempt', user: 'unknown', ip: '203.0.113.1', status: 'failed' },
                            { time: '2026-04-08 13:22', action: 'Content published', user: 'admin@hrl.com', ip: '192.168.1.1', status: 'success' },
                            { time: '2026-04-08 12:58', action: 'Payment processed', user: 'system', ip: '127.0.0.1', status: 'success' },
                            { time: '2026-04-08 12:30', action: 'Compliance check', user: 'system', ip: '127.0.0.1', status: 'success' },
                          ].map((log, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-dark-2 border border-gold/10 rounded-lg">
                              <div className={`w-3 h-3 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <p className="text-gold font-bold">{log.action}</p>
                                  <p className="text-dim text-xs">{log.time}</p>
                                </div>
                                <div>
                                  <p className="text-white">User: {log.user}</p>
                                </div>
                                <div>
                                  <p className="text-dim">IP: {log.ip}</p>
                                </div>
                                <div className="text-right">
                                  <span className={`text-xs px-2 py-1 rounded uppercase ${
                                    log.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                  }`}>
                                    {log.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Compliance Checks */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Compliance Dashboard</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white">Age Verification</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Verified Users</span>
                                <span className="text-green-500">98.5%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Pending Verification</span>
                                <span className="text-yellow-500">1.5%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Rejected</span>
                                <span className="text-red-500">0%</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white">Content Moderation</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Approved Content</span>
                                <span className="text-green-500">95.2%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Under Review</span>
                                <span className="text-yellow-500">4.8%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Blocked</span>
                                <span className="text-red-500">0%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="w-full bg-gold text-dark font-bold py-3 px-6 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm">
                          Run Compliance Audit
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                  <div className="space-y-12">
                    <div className="bg-dark-2 border border-gold/10 p-12 rounded-lg space-y-8">
                      <h2 className="font-cormorant text-3xl text-gold italic">System Settings</h2>
                      <p className="text-dim text-lg">Configure system preferences, integrations, and maintenance</p>

                      {/* General Settings */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">General Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                              Site Name
                            </label>
                            <input
                              type="text"
                              value={settings.general.siteName}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                general: { ...prev.general, siteName: e.target.value }
                              }))}
                              className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                              Admin Email
                            </label>
                            <input
                              type="email"
                              value={settings.general.adminEmail}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                general: { ...prev.general, adminEmail: e.target.value }
                              }))}
                              className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                              Default Currency
                            </label>
                            <select
                              value={settings.general.currency}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                general: { ...prev.general, currency: e.target.value }
                              }))}
                              className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors"
                            >
                              <option value="EUR">EUR (€)</option>
                              <option value="USD">USD ($)</option>
                              <option value="GBP">GBP (£)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm text-gold font-bold uppercase tracking-widest">
                              Timezone
                            </label>
                            <select
                              value={settings.general.timezone}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                general: { ...prev.general, timezone: e.target.value }
                              }))}
                              className="w-full bg-dark-2 border border-gold/10 px-3 py-2 text-white outline-none focus:border-gold/40 transition-colors"
                            >
                              <option value="Europe/Warsaw">Europe/Warsaw (CET)</option>
                              <option value="UTC">UTC</option>
                              <option value="America/New_York">America/New_York (EST)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* API Integrations */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">API Integrations</h3>
                        <div className="space-y-4">
                          {[
                            { name: 'Cloudinary', key: 'cloudinary', description: 'Media storage and optimization' },
                            { name: 'Supabase', key: 'supabase', description: 'Database and authentication' },
                            { name: 'Stripe', key: 'stripe', description: 'Payment processing' },
                            { name: 'SendGrid', key: 'sendgrid', description: 'Email notifications' },
                            { name: 'Twitter API', key: 'twitter', description: 'Social media automation' },
                            { name: 'Meta API', key: 'meta', description: 'Instagram/Facebook integration' },
                          ].map((api, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-dark-2 border border-gold/10 rounded-lg">
                              <div>
                                <h4 className="text-white font-bold">{api.name}</h4>
                                <p className="text-sm text-dim">{api.description}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-1 rounded uppercase ${
                                  settings.integrations[api.key as keyof typeof settings.integrations]?.status === 'connected' ? 'bg-green-500/10 text-green-500' :
                                  settings.integrations[api.key as keyof typeof settings.integrations]?.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                  'bg-gray-500/10 text-gray-500'
                                }`}>
                                  {settings.integrations[api.key as keyof typeof settings.integrations]?.status?.replace('_', ' ') || 'not_configured'}
                                </span>
                                <button className="text-gold hover:text-white transition-colors text-sm">
                                  Configure
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Maintenance */}
                      <div className="bg-dark-3 border border-gold/10 p-8 rounded-lg space-y-6">
                        <h3 className="font-cormorant text-2xl text-gold italic">Maintenance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            onClick={() => handleMaintenanceAction('clear_cache')}
                            className="bg-blue-500 text-white font-bold py-3 px-4 hover:bg-blue-500/80 transition-colors uppercase tracking-widest text-sm"
                          >
                            Clear Cache
                          </button>
                          <button
                            onClick={() => handleMaintenanceAction('backup_database')}
                            className="bg-yellow-500 text-dark font-bold py-3 px-4 hover:bg-yellow-500/80 transition-colors uppercase tracking-widest text-sm"
                          >
                            Backup Database
                          </button>
                          <button
                            onClick={() => handleMaintenanceAction('reset_settings')}
                            className="bg-red-500 text-white font-bold py-3 px-4 hover:bg-red-500/80 transition-colors uppercase tracking-widest text-sm"
                          >
                            Reset Settings
                          </button>
                        </div>
                        <div className="pt-4 border-t border-gold/10">
                          <p className="text-sm text-dim">
                            Last backup: {settings.maintenance.lastBackup} | System uptime: {settings.maintenance.systemUptime} | Version: {settings.maintenance.version}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveSettings}
                          className="bg-gold text-dark font-bold py-3 px-8 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm"
                        >
                          Save All Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        </div>
      )}
    </>
  );
};

export default AdminPanel;

