'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingDots from '@/components/loading-dots';
import AdminReviewsManager from '@/components/admin/reviews-manager';
import ProductStoriesManager from '@/components/admin/product-stories-manager';

type TabType = 'reviews' | 'stories' | 'cache';

// Cache Manager Component
function CacheManager() {
  const [revalidating, setRevalidating] = useState(false);
  const [message, setMessage] = useState('');
  const [lastRevalidated, setLastRevalidated] = useState<Date | null>(null);

  const handleRevalidate = async (tags: string[]) => {
    setRevalidating(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Successfully revalidated: ${data.revalidated.join(', ')}`);
        setLastRevalidated(new Date());
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to revalidate cache');
    } finally {
      setRevalidating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gaming-800/50 backdrop-blur-sm rounded-xl p-8 border border-accent-primary/20">
        <h2 className="text-2xl font-bold text-white mb-2">Cache Manager</h2>
        <p className="text-gaming-300 mb-8">
          Manually refresh cached data from Shopify. Use this when you update products or collections and want to see changes immediately.
        </p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') 
              ? 'bg-accent-green/10 border border-accent-green/30 text-accent-green' 
              : 'bg-accent-red/10 border border-accent-red/30 text-accent-red'
          }`}>
            {message}
          </div>
        )}

        {lastRevalidated && (
          <div className="mb-6 text-sm text-gaming-300">
            Last revalidated: {lastRevalidated.toLocaleString()}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Products Card */}
          <div className="bg-gaming-900/50 rounded-lg p-6 border border-accent-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Products</h3>
                <p className="text-xs text-gaming-400">Refresh all product data</p>
              </div>
            </div>
            <p className="text-sm text-gaming-300 mb-4">
              Updates product titles, prices, descriptions, images, and availability.
            </p>
            <button
              onClick={() => handleRevalidate(['products'])}
              disabled={revalidating}
              className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white py-2 px-4 rounded-lg hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
            >
              {revalidating ? <LoadingDots className="bg-white" /> : '🔄 Refresh Products'}
            </button>
          </div>

          {/* Collections Card */}
          <div className="bg-gaming-900/50 rounded-lg p-6 border border-accent-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Collections</h3>
                <p className="text-xs text-gaming-400">Refresh collection data</p>
              </div>
            </div>
            <p className="text-sm text-gaming-300 mb-4">
              Updates collection names, descriptions, and product listings.
            </p>
            <button
              onClick={() => handleRevalidate(['collections'])}
              disabled={revalidating}
              className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white py-2 px-4 rounded-lg hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
            >
              {revalidating ? <LoadingDots className="bg-white" /> : '🔄 Refresh Collections'}
            </button>
          </div>

          {/* Everything Card */}
          <div className="md:col-span-2 bg-gaming-900/50 rounded-lg p-6 border border-accent-yellow/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-yellow/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Refresh Everything</h3>
                <p className="text-xs text-gaming-400">Nuclear option: refresh all cached data</p>
              </div>
            </div>
            <p className="text-sm text-gaming-300 mb-4">
              Revalidates all products and collections. Use this after making multiple changes in Shopify.
            </p>
            <button
              onClick={() => handleRevalidate(['products', 'collections'])}
              disabled={revalidating}
              className="w-full bg-gradient-to-r from-accent-yellow to-accent-red text-white py-3 px-4 rounded-lg hover:shadow-neon-yellow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
            >
              {revalidating ? <LoadingDots className="bg-white" /> : '⚡ Refresh Everything'}
            </button>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-8 p-4 bg-accent-secondary/10 border border-accent-secondary/20 rounded-lg">
          <h4 className="text-sm font-semibold text-accent-secondary mb-2">ℹ️ About Cache Refresh</h4>
          <ul className="text-xs text-gaming-300 space-y-1">
            <li>• <strong>Automatic:</strong> Cache refreshes automatically every 3-5 minutes</li>
            <li>• <strong>Webhooks:</strong> Set up Shopify webhooks for instant updates (see SHOPIFY_WEBHOOK_SETUP.md)</li>
            <li>• <strong>Manual:</strong> Use these buttons when you need immediate results</li>
            <li>• <strong>No harm:</strong> Safe to use anytime - won't break anything!</li>
          </ul>
        </div>

        {/* Webhook status */}
        <div className="mt-6 p-4 bg-gaming-900/50 border border-accent-primary/10 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-3">🔗 Webhook Setup Status</h4>
          <p className="text-sm text-gaming-300 mb-3">
            For automatic instant updates, configure Shopify webhooks:
          </p>
          <div className="space-y-2 text-xs text-gaming-400">
            <div className="flex items-center gap-2">
              <span className="text-accent-yellow">⚠️</span>
              <span>Webhook URL: <code className="bg-gaming-800 px-2 py-1 rounded">https://your-domain.com/api/revalidate?secret=your-secret</code></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-secondary">📖</span>
              <span>See <strong>SHOPIFY_WEBHOOK_SETUP.md</strong> for step-by-step instructions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="bg-black backdrop-blur-xl shadow-elegant border-b border-accent-primary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mt-20">
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
            <button
              onClick={() => setActiveTab('cache')}
              className={`px-6 py-3 font-medium transition-all relative ${
                activeTab === 'cache'
                  ? 'text-accent-secondary'
                  : 'text-gaming-400 hover:text-gaming-200'
              }`}
            >
              Cache Manager
              {activeTab === 'cache' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'reviews' ? (
        <AdminReviewsManager />
      ) : activeTab === 'stories' ? (
        <ProductStoriesManager />
      ) : (
        <CacheManager />
      )}
    </div>
  );
}
