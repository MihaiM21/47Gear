import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { analyzeRequestPattern, detectAutomation, checkIPReputation } from './lib/fingerprinting';
import { isSuspiciousUserAgent } from './lib/bot-detection';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Blocked IPs/clients (temporary - for production use a database)
const blockedClients = new Set<string>();

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // max requests per window
  apiMaxRequests: 50, // stricter limit for API routes
};

function rateLimit(ip: string, isApiRoute: boolean): boolean {
  const now = Date.now();
  const limit = isApiRoute ? RATE_LIMIT.apiMaxRequests : RATE_LIMIT.maxRequests;
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT.windowMs);

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Skip bot detection for localhost/development
  const isLocalhost = ip === 'unknown' || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('::ffff:127.0.0.1');
  
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/api/admin') || 
                       request.nextUrl.pathname.startsWith('/management-portal');
  const isPublicApiRoute = request.nextUrl.pathname.startsWith('/api/product-stories') ||
                           request.nextUrl.pathname.startsWith('/api/reviews/featured');

  // Check if client is blocked (skip for localhost)
  if (!isLocalhost && blockedClients.has(ip)) {
    return new NextResponse('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Perform advanced bot detection on sensitive routes (skip for localhost)
  if (!isLocalhost && isApiRoute && !isPublicApiRoute) {
    // Check IP reputation
    const ipCheck = checkIPReputation(ip);
    if (!ipCheck.safe) {
      console.warn('Suspicious IP detected:', { ip, reason: ipCheck.reason });
      // Don't block immediately, but increase suspicion
    }

    // Detect automation
    const automationCheck = detectAutomation(request);
    if (automationCheck.isAutomated && automationCheck.confidence >= 70) {
      console.warn('Automated tool detected:', {
        ip,
        indicators: automationCheck.indicators,
        confidence: automationCheck.confidence,
      });
      
      // Block high-confidence automation attempts on sensitive endpoints
      if (request.method === 'POST' && automationCheck.confidence >= 80) {
        return new NextResponse('Forbidden', {
          status: 403,
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      }
    }

    // Analyze request patterns
    const patternAnalysis = analyzeRequestPattern(request);
    if (patternAnalysis.suspicious && patternAnalysis.suspicionScore >= 80) {
      console.error('Highly suspicious pattern detected:', {
        ip,
        fingerprint: patternAnalysis.fingerprint.id,
        score: patternAnalysis.suspicionScore,
        reasons: patternAnalysis.reasons,
      });
      
      // Temporarily block this client
      blockedClients.add(ip);
      setTimeout(() => blockedClients.delete(ip), 3600000); // Unblock after 1 hour
      
      return new NextResponse('Too Many Suspicious Requests', {
        status: 429,
        headers: {
          'Retry-After': '3600',
          'Content-Type': 'text/plain',
        },
      });
    }

    // Check for suspicious user agents
    const userAgent = request.headers.get('user-agent');
    if (isSuspiciousUserAgent(userAgent) && request.method === 'POST') {
      console.warn('Suspicious user agent on POST request:', { ip, userAgent });
      // Increase rate limit strictness for suspicious user agents
      RATE_LIMIT.apiMaxRequests = Math.max(10, RATE_LIMIT.apiMaxRequests / 2);
    }
  }
  
  // Skip rate limiting for admin routes and public read-only API routes
  if (!isAdminRoute && !isPublicApiRoute) {
    // Apply rate limiting
    if (!rateLimit(ip, isApiRoute)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'application/json',
        },
      });
    }
  }

  // Security Headers
  const securityHeaders = {
    // Prevent clickjacking
    'X-Frame-Options': 'SAMEORIGIN',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Enable browser XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    
    // Strict Transport Security (HSTS)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com",
      "style-src 'self' 'unsafe-inline' https://cdn.shopify.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://cdn.shopify.com https://*.myshopify.com",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add rate limit headers for transparency
  response.headers.set('X-RateLimit-Limit', isApiRoute ? RATE_LIMIT.apiMaxRequests.toString() : RATE_LIMIT.maxRequests.toString());

  return response;
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
