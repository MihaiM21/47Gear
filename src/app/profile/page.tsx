'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getShopifyUrl } from '@/lib/shopify';
import { GET_CUSTOMER_ORDERS, GET_CUSTOMER } from '@/lib/shopify/queries/profile';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import LoadingDots from '@/components/loading-dots';
import clsx from 'clsx';

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerAccessToken = localStorage.getItem('customerAccessToken');
        if (!customerAccessToken) {
          setError('Please log in to view your profile');
          setLoading(false);
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
          setCustomer(customerData.customer);
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 pb-8 pt-16">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-1">
              {customer?.firstName} {customer?.lastName}
            </h1>
            <p className="text-lg text-gray-500">{customer?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className={`w-50 rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-center font-medium text-white text-sm shadow-neon hover:shadow-neon-purple transition-all duration-300 hover:translate-y-[-1px] relative overflow-hidden shine-effect`}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Order History</h2>
        {orders.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <p className="text-lg font-medium text-accent-primary mb-1">No orders yet</p>
            <p className="text-gray-500">When you make your first order, it will appear here.</p>
            <Link
              href="/search"
              className="mt-6 inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8 bg-gaming">
            {orders.map(({ node: order }) => (
              <div key={order.id} className="rounded-lg border border-accent-primary bg-gaming overflow-hidden">
                <div className="border-b border-accent-primary bg-gaming p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on {formatDate(order.processedAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {order.totalPrice.amount} {order.totalPrice.currencyCode}
                      </p>
                      <p className={clsx(
                        'text-sm font-medium',
                        order.financialStatus === 'PAID' ? 'text-green-600' : 'text-orange-600'
                      )}>
                        {order.financialStatus}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {order.lineItems.nodes.map((item, index) => (
                    <div key={index} className="p-6 flex items-center space-x-6">
                      {item.variant?.image && (
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-accent-primary">
                          <Image
                            src={item.variant.image.url}
                            alt={item.title}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.variant?.product?.handle}`}
                          className="text-lg font-medium text-white hover:text-accent-primary"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-sm text-accent-secondary">
                          Quantity: {item.currentQuantity}
                        </p>
                        <p className="mt-1 text-sm font-medium text-accent-secondary">
                          {item.originalTotalPrice.amount} {item.originalTotalPrice.currencyCode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.shippingAddress && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Shipping Address
                    </h3>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>{order.shippingAddress.name}</p>
                      {order.shippingAddress.company && (
                        <p>{order.shippingAddress.company}</p>
                      )}
                      <p>{order.shippingAddress.address1}</p>
                      {order.shippingAddress.address2 && (
                        <p>{order.shippingAddress.address2}</p>
                      )}
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.country}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}