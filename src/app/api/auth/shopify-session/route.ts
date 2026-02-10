import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/auth/shopify-session
 * Check if user is authenticated via Shopify cookies and return customer info
 */
export async function GET(request: NextRequest) {
  try {
    // Get Shopify session cookie
    const cookies = request.cookies;
    const shopifySessionCookie = cookies.get('_shopify_y')?.value || cookies.get('cart_sig')?.value;
    
    // Try to get customer token from various cookie names Shopify uses
    const customerToken = cookies.get('_shopify_customer')?.value || 
                         cookies.get('customer_auth')?.value;

    if (!customerToken && !shopifySessionCookie) {
      return NextResponse.json({ 
        authenticated: false 
      });
    }

    // If we have a customer token, verify it with Shopify
    if (customerToken) {
      try {
        const shopifyResponse = await fetch(
          `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-01/graphql.json`,
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
              variables: { customerAccessToken: customerToken },
            }),
          }
        );

        const { data } = await shopifyResponse.json();

        if (data?.customer) {
          return NextResponse.json({
            authenticated: true,
            customerName: `${data.customer.firstName} ${data.customer.lastName}`.trim(),
            customerToken: customerToken,
          });
        }
      } catch (err) {
        console.error('Error verifying Shopify token:', err);
      }
    }

    // If no valid authentication found
    return NextResponse.json({ 
      authenticated: false,
      message: 'Please log in through your Shopify account'
    });

  } catch (error) {
    console.error('Error checking Shopify session:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Failed to check authentication' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
