"use server";

import { cookies } from "next/headers";

/**
 * Get customer access token from cookies
 */
export async function getCustomerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("customerAccessToken")?.value || null;
}

/**
 * Set customer access token in cookies
 */
export async function setCustomerToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  // Set cookie with 30 days expiry
  cookieStore.set("customerAccessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

/**
 * Remove customer access token from cookies
 */
export async function removeCustomerToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("customerAccessToken");
}

/**
 * Get customer info from Shopify using stored token
 */
export async function getCustomerInfo(): Promise<{
  authenticated: boolean;
  name?: string;
  email?: string;
} | null> {
  const token = await getCustomerToken();
  
  if (!token) {
    return { authenticated: false };
  }

  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query: `
            query getCustomer($customerAccessToken: String!) {
              customer(customerAccessToken: $customerAccessToken) {
                firstName
                lastName
                email
              }
            }
          `,
          variables: { customerAccessToken: token },
        }),
      }
    );

    const { data } = await response.json();

    if (data?.customer) {
      return {
        authenticated: true,
        name: `${data.customer.firstName} ${data.customer.lastName}`.trim(),
        email: data.customer.email,
      };
    }

    // Token invalid or expired, remove it
    await removeCustomerToken();
    return { authenticated: false };
  } catch (error) {
    console.error('Error fetching customer info:', error);
    return { authenticated: false };
  }
}
