import { NextRequest, NextResponse } from 'next/server';
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    const body = await request.json();

    // Return a 400 if no query is present.
    if (!body.query) {
      return NextResponse.json(
        { message: 'Query is required' },
        {
          status: 400
        }
      );
    }

    const domain = process.env.SHOPIFY_STORE_DOMAIN
      ? process.env.SHOPIFY_STORE_DOMAIN.includes('http')
        ? process.env.SHOPIFY_STORE_DOMAIN
        : `https://${process.env.SHOPIFY_STORE_DOMAIN}`
      : '';
    
    if (!domain) {
      return NextResponse.json(
        { message: 'Missing Shopify store domain' },
        { status: 500 }
      );
    }

    const shopifyApiUrl = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
    
    const response = await fetch(shopifyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken || ''
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Return a 401 if authentication fails.
    if (data.errors && data.errors[0].message.includes('authentication')) {
      return NextResponse.json(
        { message: 'Authentication failed' },
        {
          status: 401
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      {
        status: 500
      }
    );
  }
}