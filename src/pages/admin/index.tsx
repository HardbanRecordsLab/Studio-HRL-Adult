import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminDashboard from '@/components/admin/AdminDashboard';

interface LoginFormState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

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
      setLoginForm(prev => ({
        ...prev,
        error: 'An error occurred. Please try again.',
        loading: false,
      }));
    }
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
