import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { cn } from '@/utils/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  PlatformDataType,
  LoginFormState,
  Profile,
  CastingApplication,
  SettingsState
} from '@/types';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: '',
    password: '',
    error: '',
    loading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setIsAuthenticated(true);
    }
    setPageLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginForm(prev => ({ ...prev, error: '', loading: true }));

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setLoginForm(prev => ({
          ...prev,
          error: data.error || 'Login failed',
          loading: false,
        }));
        return;
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      setAdminToken(data.token);
      setIsAuthenticated(true);
      setLoginForm({
        email: '',
        password: '',
        error: '',
        loading: false,
      });
    } catch (error) {
      setLoginForm(prev => ({ ...prev, error: 'An error occurred. Please try again.', loading: false }));
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
          ...prev[platform], 
          lastSync: new Date().toISOString(),
          error: 'An error occurred. Please try again.',
          loading: false
        }
      }));
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken('');
    setIsAuthenticated(false);
    setLoginForm({ email: '', password: '', error: '', loading: false });
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-2 border-rose-500/20 border-t-rose-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Studio HRL Adult</title>
        <meta name="description" content="Studio HRL Admin Dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {!isAuthenticated ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/50">
                <span className="text-2xl font-bold text-white">HRL</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-gray-400">Studio HRL Adult</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@studio.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="â€˘â€˘â€˘â€˘â€˘â€˘â€˘â€˘"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    required
                  />
                </div>

                {loginForm.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
                  >
                    {loginForm.error}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loginForm.loading}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition-all"
                >
                  {loginForm.loading ? 'Logging in...' : 'Sign In'}
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">Protected admin area</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div>
          <AdminDashboard token={adminToken} />
          <motion.button
            onClick={handleLogout}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 right-8 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg text-sm font-medium"
          >
            Logout
          </motion.button>
        </div>
      )}
    </>
  );
};

export default AdminPage;
