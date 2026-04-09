import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

interface LoginFormState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

const AdminLoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: '',
    password: '',
    error: '',
    loading: false,
  });

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
      window.location.href = '/admin';
    } catch (error) {
      setLoginForm(prev => ({
        ...prev,
        error: 'An error occurred. Please try again.',
        loading: false,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Studio HRL Adult</title>
        <meta name="description" content="Studio HRL Admin Login" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

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
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
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
                  placeholder="********"
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
    </>
  );
};

export default AdminLoginPage;
