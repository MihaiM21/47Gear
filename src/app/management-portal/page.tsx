'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingDots from '@/components/loading-dots';
import AdminReviewsManager from '@/components/admin/reviews-manager';
import ProductStoriesManager from '@/components/admin/product-stories-manager';

type TabType = 'reviews' | 'stories';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('reviews');

  // Check authentication status
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || 'Login failed');
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Login form
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gaming-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-gaming-900 to-accent-secondary/10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-gaming-800/80 backdrop-blur-xl rounded-2xl shadow-elegant-lg border border-accent-primary/20 p-8">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center shadow-neon-purple">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2 text-white">Admin Portal</h1>
            <p className="text-center text-gaming-300 text-sm mb-6">Review Management System</p>
            
            {loginError && (
              <div className="mb-4 p-3 bg-accent-red/10 border border-accent-red/30 text-accent-red rounded-lg backdrop-blur-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gaming-200 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gaming-900/50 border border-accent-primary/30 rounded-lg focus:ring-2 focus:ring-accent-secondary focus:border-accent-secondary transition-all text-white placeholder-gaming-400"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gaming-200 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gaming-900/50 border border-accent-primary/30 rounded-lg focus:ring-2 focus:ring-accent-secondary focus:border-accent-secondary transition-all text-white placeholder-gaming-400"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white py-3 rounded-lg hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {loginLoading ? <LoadingDots className="bg-white" /> : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gaming-900 flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  // Admin dashboard - use the enhanced reviews manager
  return (
    <div className="min-h-screen bg-black relative">
      {/* Header with logout */}
      <div className="bg-gaming-800/80 backdrop-blur-xl shadow-elegant border-b border-accent-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center shadow-neon-purple">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Management Portal</h1>
                <p className="text-xs text-gaming-300">Reviews & Product Stories</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gaming-900/50 text-white rounded-lg hover:bg-accent-red hover:shadow-neon-red transition-all border border-accent-red/30"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 border-b border-accent-primary/10">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-accent-secondary'
                  : 'text-gaming-400 hover:text-gaming-200'
              }`}
            >
              Reviews
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === 'stories'
                  ? 'text-accent-secondary'
                  : 'text-gaming-400 hover:text-gaming-200'
              }`}
            >
              Product Stories
              {activeTab === 'stories' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'reviews' ? <AdminReviewsManager /> : <ProductStoriesManager />}
    </div>
  );
}
