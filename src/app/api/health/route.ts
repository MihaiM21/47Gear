import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  checks: {
    shopify: 'ok' | 'error';
    email: 'ok' | 'error' | 'not_configured';
  };
}

export async function GET() {
  const healthCheck: HealthCheckResponse = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '0.2.0',
    checks: {
      shopify: 'ok',
      email: 'ok',
    },
  };

  // Check Shopify configuration
  if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    healthCheck.checks.shopify = 'error';
    healthCheck.status = 'unhealthy';
  }

  // Check email configuration
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
    healthCheck.checks.email = 'not_configured';
    // Email is optional, don't mark as unhealthy
  }

  const statusCode = healthCheck.status === 'healthy' ? 200 : 503;

  return NextResponse.json(healthCheck, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
