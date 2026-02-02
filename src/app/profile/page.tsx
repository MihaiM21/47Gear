'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getShopifyUrl } from '@/lib/shopify';
import { 
  GET_CUSTOMER_ORDERS, 
  GET_CUSTOMER,
  CUSTOMER_UPDATE,
  CUSTOMER_ADDRESS_UPDATE
} from '@/lib/shopify/queries/profile';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import LoadingDots from '@/components/loading-dots';
import clsx from 'clsx';

type TabType = 'orders' | 'details' | 'addresses';

const ROMANIAN_PROVINCES = [
  'Alba',
  'Arad',
  'Argeș',
  'Bacău',
  'Bihor',
  'Bistrița-Năsăud',
  'Botoșani',
  'Brașov',
  'Brăila',
  'București',
  'Buzău',
  'Caraș-Severin',
  'Călărași',
  'Cluj',
  'Constanța',
  'Covasna',
  'Dâmbovița',
  'Dolj',
  'Galați',
  'Giurgiu',
  'Gorj',
  'Harghita',
  'Hunedoara',
  'Ialomița',
  'Iași',
  'Ilfov',
  'Maramureș',
  'Mehedinți',
  'Mureș',
  'Neamț',
  'Olt',
  'Prahova',
  'Satu Mare',
  'Sălaj',
  'Sibiu',
  'Suceava',
  'Teleorman',
  'Timiș',
  'Tulcea',
  'Vaslui',
  'Vâlcea',
  'Vrancea'
];

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip: string;
  phone?: string;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  defaultAddress?: Address;
  addresses?: {
    edges: Array<{
      node: Address;
    }>;
  };
}

interface OrderLineItem {
  currentQuantity: number;
  title: string;
  originalTotalPrice: {
    amount: string;
    currencyCode: string;
  };
  variant?: {
    image?: {
      url: string;
    };
    product?: {
      handle: string;
    };
  };
}

interface ShippingAddress {
  name: string;
  company?: string;
  city: string;
  country: string;
  address1: string;
  address2?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    nodes: OrderLineItem[];
  };
  shippingAddress?: ShippingAddress;
}

interface OrderEdge {
  node: Order;
}

export default function ProfilePage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderEdge[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [address, setAddress] = useState<Address | null>(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
    zip: '',
    phone: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerAccessToken = localStorage.getItem('customerAccessToken');
        if (!customerAccessToken) {
          router.push('/login');
          return;
        }

        // Fetch customer details
        const customerResponse = await fetch(getShopifyUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_CUSTOMER,
            variables: { customerAccessToken }
          })
        });

        const { data: customerData } = await customerResponse.json();
        if (customerData?.customer) {
          const customerInfo = customerData.customer;
          setCustomer(customerInfo);
          
          // Set address from default address
          if (customerInfo.defaultAddress) {
            setAddress(customerInfo.defaultAddress);
          }
          
          // Set edit form initial values
          setEditForm({
            firstName: customerInfo.firstName || '',
            lastName: customerInfo.lastName || '',
            email: customerInfo.email || '',
            phone: customerInfo.phone || ''
          });
        }

        // Fetch orders
        const ordersResponse = await fetch(getShopifyUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_CUSTOMER_ORDERS,
            variables: {
              customerAccessToken,
              first: 10,
              sortKey: 'PROCESSED_AT',
              reverse: true
            }
          })
        });

        const { data: ordersData } = await ordersResponse.json();
        if (ordersData?.customer?.orders?.edges) {
          setOrders(ordersData.customer.orders.edges);
        }
      } catch (err) {
        setError('Failed to load profile data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('customerAccessToken');
    router.push('/login');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const customerAccessToken = localStorage.getItem('customerAccessToken');
    if (!customerAccessToken) return;
    
    try {
      const response = await fetch('/api/graphql/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CUSTOMER_UPDATE,
          variables: {
            customerAccessToken,
            customer: {
              firstName: editForm.firstName,
              lastName: editForm.lastName,
              email: editForm.email,
              phone: editForm.phone || null
            }
          }
        })
      });

      const result = await response.json();
      
      if (result.data?.customerUpdate?.customerUserErrors?.length > 0) {
        alert(result.data.customerUpdate.customerUserErrors[0].message);
      } else {
        setCustomer(result.data.customerUpdate.customer);
        setIsEditingDetails(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address?.id) {
      alert('No address to update. Please refresh the page.');
      return;
    }
    setIsSaving(true);

    const customerAccessToken = localStorage.getItem('customerAccessToken');
    if (!customerAccessToken) return;

    try {
      const response = await fetch('/api/graphql/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CUSTOMER_ADDRESS_UPDATE,
          variables: {
            customerAccessToken,
            id: address.id,
            address: {
              firstName: addressForm.firstName,
              lastName: addressForm.lastName,
              company: addressForm.company || null,
              address1: addressForm.address1,
              address2: addressForm.address2 || null,
              city: addressForm.city,
              province: addressForm.province || null,
              country: addressForm.country,
              zip: addressForm.zip,
              phone: addressForm.phone || null
            }
          }
        })
      });

      const result = await response.json();
      
      if (result.data?.customerAddressUpdate?.customerUserErrors?.length > 0) {
        alert(result.data.customerAddressUpdate.customerUserErrors[0].message);
      } else {
        // Update local state
        setAddress({
          ...address,
          firstName: addressForm.firstName,
          lastName: addressForm.lastName,
          company: addressForm.company || undefined,
          address1: addressForm.address1,
          address2: addressForm.address2 || undefined,
          city: addressForm.city,
          province: addressForm.province || undefined,
          country: addressForm.country,
          zip: addressForm.zip,
          phone: addressForm.phone || undefined
        });
        setIsEditingAddress(false);
        resetAddressForm();
      }
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address');
    } finally {
      setIsSaving(false);
    }
  };

  const startEditingAddress = () => {
    if (!address) return;
    setIsEditingAddress(true);
    setAddressForm({
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company || '',
      address1: address.address1,
      address2: address.address2 || '',
      city: address.city,
      province: address.province || '',
      country: address.country,
      zip: address.zip,
      phone: address.phone || ''
    });
  };

  const resetAddressForm = () => {
    setAddressForm({
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: '',
      zip: '',
      phone: ''
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Parolele noi nu se potrivesc');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Parola nouă trebuie să aibă cel puțin 8 caractere');
      return;
    }

    setIsSaving(true);

    const customerAccessToken = localStorage.getItem('customerAccessToken');
    if (!customerAccessToken) return;

    try {
      // First, verify current password by attempting to create a new access token
      const verifyResponse = await fetch('/api/graphql/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
              customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                  accessToken
                }
                customerUserErrors {
                  code
                  field
                  message
                }
              }
            }
          `,
          variables: {
            input: {
              email: customer?.email,
              password: passwordForm.currentPassword
            }
          }
        })
      });

      const verifyResult = await verifyResponse.json();
      
      if (verifyResult.data?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
        setPasswordError('Parola curentă este incorectă');
        setIsSaving(false);
        return;
      }

      // If verification successful, update password
      const updateResponse = await fetch('/api/graphql/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
              customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
                customer {
                  id
                  email
                }
                customerUserErrors {
                  code
                  field
                  message
                }
              }
            }
          `,
          variables: {
            customerAccessToken,
            customer: {
              password: passwordForm.newPassword
            }
          }
        })
      });

      const updateResult = await updateResponse.json();
      
      if (updateResult.data?.customerUpdate?.customerUserErrors?.length > 0) {
        setPasswordError(updateResult.data.customerUpdate.customerUserErrors[0].message);
      } else {
        alert('Parola a fost schimbată cu succes!');
        setIsChangingPassword(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('A apărut o eroare la schimbarea parolei');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <LoadingDots className="bg-black" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-4">{error}</h1>
          <Link
            href="/login"
            className="text-sm font-medium text-primary underline underline-offset-4 hover:text-gray-700"
          >
            Go to login page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white mt-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-4">
                <span className="text-xs font-medium text-accent-secondary tracking-wider uppercase">Account Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                Welcome back, {customer?.firstName}
              </h1>
              <p className="text-white/60 text-lg">{customer?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300 font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-12">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={clsx(
                'pb-4 font-medium transition-all duration-300 relative',
                activeTab === 'orders'
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              )}
            >
              Comenzi
              {activeTab === 'orders' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-secondary to-accent-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={clsx(
                'pb-4 font-medium transition-all duration-300 relative',
                activeTab === 'details'
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              )}
            >
              Detaliile contului
              {activeTab === 'details' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-secondary to-accent-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={clsx(
                'pb-4 font-medium transition-all duration-300 relative',
                activeTab === 'addresses'
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              )}
            >
              Adresa
              {activeTab === 'addresses' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-secondary to-accent-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No orders yet</h3>
                <p className="text-white/60 mb-8">Start shopping to see your orders here</p>
                <Link
                  href="/search"
                  className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(({ node: order }) => (
                  <div key={order.id} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-all duration-500">
                    <div className="p-6 md:p-8 border-b border-white/5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl font-bold text-white">
                              Order #{order.orderNumber}
                            </span>
                            <span className={clsx(
                              'px-3 py-1 rounded-full text-xs font-medium',
                              order.financialStatus === 'PAID'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            )}>
                              {order.financialStatus}
                            </span>
                          </div>
                          <p className="text-white/50 text-sm">
                            Placed on {formatDate(order.processedAt)}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-2xl font-bold text-white">
                            {order.totalPrice.amount} {order.totalPrice.currencyCode}
                          </p>
                          <p className="text-white/50 text-sm mt-1">Total Amount</p>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-white/5">
                      {order.lineItems.nodes.map((item, index) => (
                        <div key={index} className="p-6 md:p-8 flex gap-6">
                          {item.variant?.image && (
                            <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-gaming-900/30">
                              <Image
                                src={item.variant.image.url}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.variant?.product?.handle}`}
                              className="text-lg font-medium text-white hover:text-accent-secondary transition-colors line-clamp-2"
                            >
                              {item.title}
                            </Link>
                            <div className="mt-2 flex items-center gap-4 text-sm text-white/60">
                              <span>Qty: {item.currentQuantity}</span>
                              <span>•</span>
                              <span className="font-medium text-white">
                                {item.originalTotalPrice.amount} {item.originalTotalPrice.currencyCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.shippingAddress && (
                      <div className="p-6 md:p-8 bg-white/[0.01] border-t border-white/5">
                        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                          Shipping Address
                        </h4>
                        <div className="text-white/60 space-y-1">
                          <p>{order.shippingAddress.name}</p>
                          {order.shippingAddress.company && <p>{order.shippingAddress.company}</p>}
                          <p>{order.shippingAddress.address1}</p>
                          {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                          <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="w-full">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Informatii personale</h3>
                <button
                  onClick={() => setIsEditingDetails(!isEditingDetails)}
                  className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium"
                >
                  {isEditingDetails ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {!isEditingDetails ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-white/50 uppercase tracking-wider">Nume complet</label>
                    <p className="text-lg text-white mt-1">{customer?.firstName} {customer?.lastName}</p>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <label className="text-sm text-white/50 uppercase tracking-wider">Email</label>
                    <p className="text-lg text-white mt-1">{customer?.email}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white/80 mb-2">Prenume</label>
                      <input
                        type="text"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                        placeholder="Prenume"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-2">Nume de familie</label>
                      <input
                        type="text"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                        placeholder="Nume de familie"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingDetails(false)}
                      className="px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 mt-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Securitate</h3>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium"
                  >
                    Schimbă Parola
                  </button>
                )}
              </div>

              {!isChangingPassword ? (
                <div>
                  <p className="text-white/60">Menține-ți contul în siguranță prin schimbarea periodică a parolei.</p>
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-6">
                  {passwordError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-red-400 text-sm">{passwordError}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Parola Curentă</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      placeholder="Introdu parola curentă"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Parola Nouă</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      placeholder="Introdu parola nouă (min. 8 caractere)"
                      required
                      minLength={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Confirmă Parola Nouă</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      placeholder="Confirmă parola nouă"
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Se salvează...' : 'Schimbă Parola'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        setPasswordError('');
                      }}
                      className="px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-all duration-300"
                    >
                      Anulează
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="w-full">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Adresa de livrare</h3>
                {!isEditingAddress && address && (
                  <button
                    onClick={startEditingAddress}
                    className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!isEditingAddress ? (
                address ? (
                  <div className="space-y-2 text-white/80">
                    <p className="font-medium text-white text-lg">{address.firstName} {address.lastName}</p>
                    {address.company && <p>{address.company}</p>}
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{address.city}{address.province && `, ${address.province}`} {address.zip}</p>
                    <p>{address.country}</p>
                    {address.phone && <p className="mt-4">Phone: {address.phone}</p>}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/60">No address on file</p>
                  </div>
                )
              ) : (
                <form onSubmit={handleUpdateAddress} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white/80 mb-2">First Name</label>
                      <input
                        type="text"
                        value={addressForm.firstName}
                        onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={addressForm.lastName}
                        onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      value={addressForm.company}
                      onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Address Line 1</label>
                    <input
                      type="text"
                      value={addressForm.address1}
                      onChange={(e) => setAddressForm({ ...addressForm, address1: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={addressForm.address2}
                      onChange={(e) => setAddressForm({ ...addressForm, address2: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm text-white/80 mb-2">City</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-2">Județ</label>
                      <select
                        value={addressForm.province}
                        onChange={(e) => setAddressForm({ ...addressForm, province: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.75rem center',
                          backgroundSize: '1.25rem'
                        }}
                      >
                        <option value="" className="bg-gaming-900">Select județ...</option>
                        {ROMANIAN_PROVINCES.map((province) => (
                          <option key={province} value={province} className="bg-gaming-900">
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-2">ZIP/Postal Code</label>
                      <input
                        type="text"
                        value={addressForm.zip}
                        onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Country</label>
                    <input
                      type="text"
                      value={addressForm.country}
                      onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-accent-secondary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Address'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingAddress(false);
                        resetAddressForm();
                      }}
                      className="px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}