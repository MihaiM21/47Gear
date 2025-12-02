'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_RECOVER } from '@/lib/shopify/mutations/customer';
import { getShopifyUrl } from '@/lib/shopify';
import LoadingDots from '@/components/loading-dots';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(getShopifyUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CUSTOMER_ACCESS_TOKEN_CREATE,
          variables: {
            input: {
              email,
              password,
            },
          },
        }),
      });

      const { data } = await response.json();

      if (data?.customerAccessTokenCreate?.customerUserErrors?.length) {
        setError(data.customerAccessTokenCreate.customerUserErrors[0].message);
        return;
      }

      if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
        localStorage.setItem(
          'customerAccessToken',
          data.customerAccessTokenCreate.customerAccessToken.accessToken
        );
        router.push('/profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetLoading(true);

    try {
      const response = await fetch(getShopifyUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CUSTOMER_RECOVER,
          variables: {
            email: resetEmail,
          },
        }),
      });

      const { data } = await response.json();

      if (data?.customerRecover?.customerUserErrors?.length) {
        setError(data.customerRecover.customerUserErrors[0].message);
        return;
      }

      setResetSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        {!showForgotPassword ? (
          <>
            {/* Login Form */}
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6">
                <span className="text-xs font-medium text-accent-secondary tracking-wider uppercase">Account Access</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-white/60 text-lg">Sign in to continue your journey</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm text-white/80 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent-secondary focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm text-white/80 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent-secondary focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-accent-secondary hover:text-accent-primary transition-colors"
                >
                  Forgot your password?
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <LoadingDots className="bg-black" /> : 'Sign In'}
                </button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="text-accent-secondary hover:text-accent-primary transition-colors font-medium"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Forgot Password Form */}
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6">
                <span className="text-xs font-medium text-accent-secondary tracking-wider uppercase">Password Recovery</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                Reset Password
              </h1>
              <p className="text-white/60 text-lg">We'll send you a recovery link</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
              {resetSuccess ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-green-500/20 to-green-400/20 flex items-center justify-center border border-green-500/20">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                    <p className="text-white/60">
                      We've sent password reset instructions to <span className="text-white">{resetEmail}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetSuccess(false);
                      setResetEmail('');
                    }}
                    className="w-full px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  {error && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="resetEmail" className="block text-sm text-white/80 mb-2">
                      Email Address
                    </label>
                    <input
                      id="resetEmail"
                      name="resetEmail"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent-secondary focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setError('');
                        setResetEmail('');
                      }}
                      className="flex-1 px-4 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="flex-1 px-4 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resetLoading ? <LoadingDots className="bg-black" /> : 'Reset Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}