import { cookies } from 'next/headers';

// In production, use environment variables for admin credentials
// and implement proper authentication with database
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // Change this!
};

const ADMIN_SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-secret-key';

export interface AdminSession {
  username: string;
  expiresAt: number;
}

/**
 * Verify admin credentials
 */
export function verifyAdminCredentials(username: string, password: string): boolean {
  return (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  );
}

/**
 * Create admin session token
 */
export function createSessionToken(username: string): string {
  const session: AdminSession = {
    username,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  
  // In production, use proper JWT or encrypted tokens
  return Buffer.from(JSON.stringify(session)).toString('base64');
}

/**
 * Verify admin session token
 */
export function verifySessionToken(token: string): AdminSession | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (decoded.expiresAt < Date.now()) {
      return null; // Session expired
    }
    
    return decoded as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated as admin (for API routes)
 */
export async function isAdminAuthenticated(request: Request): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    
    if (!sessionToken) {
      console.log('No session token found');
      return false;
    }
    
    const session = verifySessionToken(sessionToken);
    console.log('Session verification result:', session);
    return session !== null;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

/**
 * Check if user is authenticated as admin (for server components)
 */
export async function isAdminAuthenticatedServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  
  if (!sessionToken) return false;
  
  const session = verifySessionToken(sessionToken);
  return session !== null;
}
