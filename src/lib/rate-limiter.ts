/**
 * Advanced Rate Limiting Utility
 * Provides protection against abuse with sliding window rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
  requests: number[];
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Cleanup old entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Check if a request should be rate limited using sliding window
   */
  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    let entry = this.store.get(identifier);

    // Clean up old requests outside the window
    if (entry) {
      entry.requests = entry.requests.filter(
        (timestamp) => now - timestamp < windowMs
      );
    } else {
      entry = { count: 0, resetTime: now + windowMs, requests: [] };
      this.store.set(identifier, entry);
    }

    // Check if limit exceeded
    if (entry.requests.length >= limit) {
      const oldestRequest = entry.requests[0];
      const resetTime = oldestRequest + windowMs;
      return {
        allowed: false,
        remaining: 0,
        resetTime,
      };
    }

    // Add new request
    entry.requests.push(now);
    entry.count = entry.requests.length;

    return {
      allowed: true,
      remaining: limit - entry.count,
      resetTime: now + windowMs,
    };
  }

  /**
   * More strict rate limiting for sensitive endpoints
   */
  checkStrict(
    identifier: string,
    maxRequests: number,
    windowMs: number,
    burstLimit: number = 5,
    burstWindowMs: number = 10000
  ): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    reason?: string;
  } {
    // First check burst protection (many requests in short time)
    const burstResult = this.check(
      `burst:${identifier}`,
      burstLimit,
      burstWindowMs
    );
    if (!burstResult.allowed) {
      return {
        ...burstResult,
        reason: "Too many requests in short time - possible bot behavior",
      };
    }

    // Then check overall rate limit
    const result = this.check(identifier, maxRequests, windowMs);
    if (!result.allowed) {
      return {
        ...result,
        reason: "Rate limit exceeded",
      };
    }

    return { ...result, allowed: true };
  }

  /**
   * Get current usage statistics
   */
  getStats(identifier: string): {
    requests: number;
    oldestRequest: number | null;
    newestRequest: number | null;
  } {
    const entry = this.store.get(identifier);
    if (!entry || entry.requests.length === 0) {
      return { requests: 0, oldestRequest: null, newestRequest: null };
    }

    return {
      requests: entry.requests.length,
      oldestRequest: entry.requests[0],
      newestRequest: entry.requests[entry.requests.length - 1],
    };
  }

  /**
   * Cleanup expired entries
   */
  private cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.store.entries()) {
      // Remove entries with no recent requests (5 minutes old)
      entry.requests = entry.requests.filter(
        (timestamp) => now - timestamp < 5 * 60 * 1000
      );

      if (entry.requests.length === 0) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.store.delete(key));
  }

  /**
   * Manually reset rate limit for an identifier
   */
  reset(identifier: string) {
    this.store.delete(identifier);
  }

  /**
   * Clean up on shutdown
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.store.clear();
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  // Contact form submissions
  CONTACT_FORM: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    burstLimit: 2,
    burstWindowMs: 5 * 60 * 1000, // 5 minutes
  },
  // Review submissions
  REVIEW_SUBMIT: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
    burstLimit: 2,
    burstWindowMs: 5 * 60 * 1000, // 5 minutes
  },
  // General API requests
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
    burstLimit: 30,
    burstWindowMs: 10 * 1000, // 10 seconds
  },
  // Admin routes
  ADMIN: {
    maxRequests: 200,
    windowMs: 60 * 1000, // 1 minute
    burstLimit: 50,
    burstWindowMs: 10 * 1000, // 10 seconds
  },
};
