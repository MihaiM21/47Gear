'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/lib/shopify/mutations/customer';
import { getShopifyUrl } from '@/lib/shopify';
import LogoSquare from '@/components/logo-square';
import LoadingDots from '@/components/loading-dots';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="mx-8 max-w-2xl lg:mx-auto">
      <div className="flex flex-col items-center space-y-10 pt-16 pb-16 md:pt-24">
        <div className="flex flex-col items-center space-y-6">
          <LogoSquare />
          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-lg text-neutral-500">
            Sign in to your account to continue
          </p>
        </div>
        <div className="w-full max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="relative rounded border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary">
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-center font-medium text-white text-sm shadow-neon hover:shadow-neon-purple transition-all duration-300 hover:translate-y-[-1px] relative overflow-hidden shine-effect`}
              >
                {loading ? <LoadingDots className="bg-white" /> : 'Sign in'}
              </button>
              <Link
                href="/register"
                className="text-center text-sm font-medium text-primary underline underline-offset-4 hover:text-gray-700"
              >
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}