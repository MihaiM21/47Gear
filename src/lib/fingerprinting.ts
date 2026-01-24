/**
 * Client Fingerprinting and Request Pattern Detection
 * Provides advanced tracking and anomaly detection
 */

import { NextRequest } from "next/server";

export interface ClientFingerprint {
  id: string;
  ip: string;
  userAgent: string;
  language: string;
  timestamp: number;
  headers: Record<string, string>;
}

export interface RequestPattern {
  clientId: string;
  requestCount: number;
  firstSeen: number;
  lastSeen: number;
  endpoints: Map<string, number>;
  userAgentChanges: number;
  suspicionScore: number;
}

/**
 * Generate a unique fingerprint for a client
 */
export function generateClientFingerprint(
  request: NextRequest
): ClientFingerprint {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = request.headers.get("user-agent") || "unknown";
  const language = request.headers.get("accept-language") || "unknown";

  // Collect relevant headers for fingerprinting
  const headers: Record<string, string> = {};
  const relevantHeaders = [
    "accept",
    "accept-encoding",
    "accept-language",
    "dnt",
    "sec-ch-ua",
    "sec-ch-ua-mobile",
    "sec-ch-ua-platform",
    "sec-fetch-dest",
    "sec-fetch-mode",
    "sec-fetch-site",
  ];

  relevantHeaders.forEach((header) => {
    const value = request.headers.get(header);
    if (value) headers[header] = value;
  });

  // Create a simple hash-like ID from key attributes
  const fingerprintData = `${ip}:${userAgent}:${language}`;
  const id = Buffer.from(fingerprintData).toString("base64").substring(0, 32);

  return {
    id,
    ip,
    userAgent,
    language,
    timestamp: Date.now(),
    headers,
  };
}

/**
 * Request pattern tracker (in-memory storage)
 */
class PatternTracker {
  private patterns = new Map<string, RequestPattern>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Cleanup old patterns every 10 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 10 * 60 * 1000);
  }

  /**
   * Track a request and analyze patterns
   */
  track(
    clientId: string,
    endpoint: string,
    userAgent: string
  ): {
    pattern: RequestPattern;
    anomalies: string[];
  } {
    const now = Date.now();
    let pattern = this.patterns.get(clientId);

    if (!pattern) {
      pattern = {
        clientId,
        requestCount: 0,
        firstSeen: now,
        lastSeen: now,
        endpoints: new Map(),
        userAgentChanges: 0,
        suspicionScore: 0,
      };
      this.patterns.set(clientId, pattern);
    }

    const anomalies: string[] = [];

    // Update pattern
    pattern.requestCount++;
    pattern.lastSeen = now;

    // Track endpoint hits
    const endpointCount = pattern.endpoints.get(endpoint) || 0;
    pattern.endpoints.set(endpoint, endpointCount + 1);

    // Detect anomalies

    // 1. High request frequency in short time
    const timeSinceFirst = now - pattern.firstSeen;
    if (timeSinceFirst < 60000 && pattern.requestCount > 20) {
      // 20+ requests in first minute
      anomalies.push("Abnormally high request rate for new client");
      pattern.suspicionScore += 30;
    }

    // 2. Repeated requests to same endpoint
    if (endpointCount > 10) {
      anomalies.push("Excessive requests to same endpoint");
      pattern.suspicionScore += 20;
    }

    // 3. Pattern matching bot behavior (evenly spaced requests)
    if (pattern.requestCount >= 5) {
      const recentRequests = this.getRecentRequestTimes(clientId, 5);
      if (recentRequests && this.hasEvenSpacing(recentRequests)) {
        anomalies.push("Robot-like request timing pattern");
        pattern.suspicionScore += 40;
      }
    }

    // 4. Visiting only API endpoints without browsing
    const apiEndpointRatio = this.calculateApiEndpointRatio(pattern);
    if (pattern.requestCount > 10 && apiEndpointRatio > 0.8) {
      anomalies.push("Accessing mostly API endpoints");
      pattern.suspicionScore += 25;
    }

    return { pattern, anomalies };
  }

  /**
   * Calculate ratio of API endpoint requests
   */
  private calculateApiEndpointRatio(pattern: RequestPattern): number {
    let apiCount = 0;
    let totalCount = 0;

    pattern.endpoints.forEach((count, endpoint) => {
      totalCount += count;
      if (endpoint.includes("/api/")) {
        apiCount += count;
      }
    });

    return totalCount > 0 ? apiCount / totalCount : 0;
  }

  /**
   * Check if requests have suspiciously even spacing (bot behavior)
   */
  private hasEvenSpacing(timestamps: number[]): boolean {
    if (timestamps.length < 3) return false;

    const intervals: number[] = [];
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1]);
    }

    // Calculate standard deviation
    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance =
      intervals.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      intervals.length;
    const stdDev = Math.sqrt(variance);

    // If standard deviation is very low, intervals are suspiciously consistent
    return stdDev < mean * 0.2; // 20% variation threshold
  }

  /**
   * Get recent request timestamps for a client
   */
  private getRecentRequestTimes(
    clientId: string,
    count: number
  ): number[] | null {
    // This is a simplified implementation
    // In production, you'd store request timestamps
    return null;
  }

  /**
   * Get pattern for a client
   */
  getPattern(clientId: string): RequestPattern | null {
    return this.patterns.get(clientId) || null;
  }

  /**
   * Check if client is suspicious based on accumulated score
   */
  isSuspicious(clientId: string): boolean {
    const pattern = this.patterns.get(clientId);
    return pattern ? pattern.suspicionScore >= 50 : false;
  }

  /**
   * Cleanup old patterns
   */
  private cleanup() {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour

    const keysToDelete: string[] = [];

    for (const [clientId, pattern] of this.patterns.entries()) {
      if (now - pattern.lastSeen > maxAge) {
        keysToDelete.push(clientId);
      }
    }

    keysToDelete.forEach((key) => this.patterns.delete(key));
  }

  /**
   * Reset pattern for a client
   */
  reset(clientId: string) {
    this.patterns.delete(clientId);
  }

  /**
   * Destroy tracker
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.patterns.clear();
  }
}

// Export singleton instance
export const patternTracker = new PatternTracker();

/**
 * Analyze request for suspicious patterns
 */
export function analyzeRequestPattern(request: NextRequest): {
  fingerprint: ClientFingerprint;
  suspicious: boolean;
  suspicionScore: number;
  reasons: string[];
} {
  const fingerprint = generateClientFingerprint(request);
  const endpoint = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";

  const { pattern, anomalies } = patternTracker.track(
    fingerprint.id,
    endpoint,
    userAgent
  );

  return {
    fingerprint,
    suspicious: pattern.suspicionScore >= 50,
    suspicionScore: pattern.suspicionScore,
    reasons: anomalies,
  };
}

/**
 * Check if IP is from known malicious sources
 * This is a basic implementation - in production, integrate with threat intelligence
 */
export function checkIPReputation(ip: string): {
  safe: boolean;
  reason?: string;
} {
  // Basic checks for obviously bad IPs
  
  // Check for localhost/private IPs (suspicious for external requests)
  if (
    ip === "127.0.0.1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.")
  ) {
    return { safe: false, reason: "Private/localhost IP" };
  }

  // Check for malformed IPs
  if (ip === "unknown" || ip === "") {
    return { safe: false, reason: "Missing or invalid IP" };
  }

  // In production, check against threat intelligence databases
  // For now, consider all other IPs safe
  return { safe: true };
}

/**
 * Detect if request is coming from automated tools
 */
export function detectAutomation(request: NextRequest): {
  isAutomated: boolean;
  confidence: number;
  indicators: string[];
} {
  const indicators: string[] = [];
  let confidence = 0;

  // Check User-Agent
  const userAgent = request.headers.get("user-agent") || "";
  const automationPatterns = [
    /selenium/i,
    /webdriver/i,
    /phantom/i,
    /headless/i,
    /automation/i,
    /bot/i,
    /crawler/i,
    /spider/i,
  ];

  if (automationPatterns.some((pattern) => pattern.test(userAgent))) {
    indicators.push("Automation tool detected in user agent");
    confidence += 50;
  }

  // Check for missing or suspicious headers
  const expectedHeaders = ["accept", "accept-language", "accept-encoding"];
  const missingHeaders = expectedHeaders.filter(
    (header) => !request.headers.get(header)
  );

  if (missingHeaders.length > 0) {
    indicators.push(`Missing expected headers: ${missingHeaders.join(", ")}`);
    confidence += 15 * missingHeaders.length;
  }

  // Check for webdriver indicators
  const secChUa = request.headers.get("sec-ch-ua");
  if (secChUa && secChUa.includes("Headless")) {
    indicators.push("Headless browser detected");
    confidence += 40;
  }

  return {
    isAutomated: confidence >= 50,
    confidence: Math.min(confidence, 100),
    indicators,
  };
}
