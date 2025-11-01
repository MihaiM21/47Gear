'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CUSTOMER_CREATE, CUSTOMER_ACCESS_TOKEN_CREATE } from '@/lib/shopify/mutations/customer';
import { getShopifyUrl } from '@/lib/shopify';
import LogoSquare from '@/components/logo-square';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
    <div className="mx-8 max-w-2xl lg:mx-auto">
      <div className="flex flex-col items-center space-y-10 pt-16 pb-16 md:pt-24">
        <div className="flex flex-col items-center space-y-6">
          <LogoSquare />
          <h1 className="text-4xl font-bold tracking-tight">Create an account</h1>
          <p className="text-lg text-neutral-500">
            Join us for a better shopping experience
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>
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
                  value={formData.email}
                  onChange={handleChange}
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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
                {loading ? <LoadingDots className="bg-white" /> : 'Create account'}
              </button>
              <Link
                href="/login"
                className="text-center text-sm font-medium text-primary underline underline-offset-4 hover:text-gray-700"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}