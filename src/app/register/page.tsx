'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CUSTOMER_CREATE, CUSTOMER_ACCESS_TOKEN_CREATE } from '@/lib/shopify/mutations/customer';
import { getShopifyUrl } from '@/lib/shopify';
import LoadingDots from '@/components/loading-dots';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // First create the customer
      const createResponse = await fetch(getShopifyUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CUSTOMER_CREATE,
          variables: {
            input: formData,
          },
        }),
      });

      const { data: createData } = await createResponse.json();

      if (createData?.customerCreate?.customerUserErrors?.length) {
        setError(createData.customerCreate.customerUserErrors[0].message);
        return;
      }

      // If customer creation was successful, log them in
      const loginResponse = await fetch(getShopifyUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CUSTOMER_ACCESS_TOKEN_CREATE,
          variables: {
            input: {
              email: formData.email,
              password: formData.password,
            },
          },
        }),
      });

      const { data: loginData } = await loginResponse.json();

      if (loginData?.customerAccessTokenCreate?.customerUserErrors?.length) {
        setError(loginData.customerAccessTokenCreate.customerUserErrors[0].message);
        return;
      }

      if (loginData?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
        localStorage.setItem(
          'customerAccessToken',
          loginData.customerAccessTokenCreate.customerAccessToken.accessToken
        );
        router.push('/profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6">
            <span className="text-xs font-medium text-accent-secondary tracking-wider uppercase">Join Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Create Account
          </h1>
          <p className="text-white/60 text-lg">Start your premium experience</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm text-white/80 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent-secondary focus:outline-none transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm text-white/80 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent-secondary focus:outline-none transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={handleChange}
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent-secondary focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <p className="mt-2 text-xs text-white/50">Minimum 8 characters</p>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-accent-secondary focus:ring-accent-secondary focus:ring-offset-0"
              />
              <label htmlFor="acceptTerms" className="text-sm text-white/60">
                I agree to the{' '}
                <Link href="/terms-of-service" className="text-accent-secondary hover:text-accent-primary transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-accent-secondary hover:text-accent-primary transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingDots className="bg-black" /> : 'Create Account'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-accent-secondary hover:text-accent-primary transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}