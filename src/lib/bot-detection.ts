/**
 * Bot Detection and Anti-Spam Utilities
 * Provides various methods to detect and prevent automated abuse
 */

import { NextRequest } from "next/server";

/**
 * Detect common bot user agents
 */
export function isSuspiciousUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true;

  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /http\.client/i,
    /scrapy/i,
    /phantomjs/i,
    /headless/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}

/**
 * Detect suspicious request patterns
 */
export function detectSuspiciousPatterns(request: NextRequest): {
  suspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  const userAgent = request.headers.get("user-agent");
  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin");

  // Check for missing or suspicious user agent
  if (!userAgent || userAgent.length < 10) {
    reasons.push("Missing or suspicious user agent");
  } else if (isSuspiciousUserAgent(userAgent)) {
    reasons.push("Known bot user agent detected");
  }

  // Check for missing referer on form submissions (can be legitimate but suspicious)
  if (!referer && request.method === "POST") {
    // Not always suspicious, but worth noting
    reasons.push("Missing referer header");
  }

  // Check for suspicious header combinations
  const acceptHeader = request.headers.get("accept");
  if (!acceptHeader || !acceptHeader.includes("text/html")) {
    if (request.method === "POST" && !acceptHeader?.includes("application/json")) {
      reasons.push("Suspicious accept header for form submission");
    }
  }

  // Check for missing origin on POST requests
  if (request.method === "POST" && !origin && !referer) {
    reasons.push("Missing origin and referer on POST request");
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Validate honeypot field (should be empty if submitted by human)
 */
export function validateHoneypot(honeypotValue: string | undefined): boolean {
  return !honeypotValue || honeypotValue.trim() === "";
}

/**
 * Calculate time-based token to verify form submission timing
 * Forms should take a reasonable amount of time to fill
 */
export function generateTimingToken(): string {
  return Buffer.from(Date.now().toString()).toString("base64");
}

/**
 * Verify timing token - form should not be submitted too quickly
 */
export function verifyTimingToken(
  token: string,
  minSeconds: number = 3,
  maxSeconds: number = 3600
): { valid: boolean; reason?: string } {
  try {
    const timestamp = parseInt(Buffer.from(token, "base64").toString(), 10);
    const elapsed = (Date.now() - timestamp) / 1000;

    if (elapsed < minSeconds) {
      return {
        valid: false,
        reason: `Form submitted too quickly (${elapsed.toFixed(1)}s)`,
      };
    }

    if (elapsed > maxSeconds) {
      return { valid: false, reason: "Form token expired" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, reason: "Invalid timing token" };
  }
}

/**
 * Content analysis to detect spam patterns
 */
export function analyzeContentForSpam(content: string): {
  isSpam: boolean;
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];
  let spamScore = 0;

  // Check for excessive URLs
  const urlPattern = /(https?:\/\/[^\s]+)/gi;
  const urls = content.match(urlPattern) || [];
  if (urls.length > 3) {
    spamScore += 30;
    reasons.push("Excessive URLs detected");
  } else if (urls.length > 1) {
    spamScore += 10;
    reasons.push("Multiple URLs detected");
  }

  // Check for suspicious keywords
  const spamKeywords = [
    /click here/gi,
    /buy now/gi,
    /act now/gi,
    /limited time/gi,
    /guarantee(d)?/gi,
    /earn \$\d+/gi,
    /make money/gi,
    /weight loss/gi,
    /viagra/gi,
    /cialis/gi,
    /casino/gi,
    /lottery/gi,
    /winner/gi,
    /congratulations/gi,
    /bitcoin/gi,
    /crypto/gi,
  ];

  spamKeywords.forEach((keyword) => {
    const matches = content.match(keyword);
    if (matches && matches.length > 0) {
      spamScore += 15 * matches.length;
      reasons.push(`Spam keyword detected: ${matches[0]}`);
    }
  });

  // Check for excessive capitalization
  const capsRatio =
    (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.5 && content.length > 20) {
    spamScore += 20;
    reasons.push("Excessive capitalization");
  }

  // Check for repeated characters
  const repeatedChars = /(.)\1{5,}/g;
  if (repeatedChars.test(content)) {
    spamScore += 15;
    reasons.push("Excessive character repetition");
  }

  // Check for excessive special characters
  const specialChars = content.match(/[!@#$%^&*()+=\[\]{}|;:,.<>?]/g) || [];
  const specialCharsRatio = specialChars.length / content.length;
  if (specialCharsRatio > 0.2) {
    spamScore += 20;
    reasons.push("Excessive special characters");
  }

  // Check for very short messages with URLs
  if (content.length < 50 && urls.length > 0) {
    spamScore += 25;
    reasons.push("Short message with URL");
  }

  return {
    isSpam: spamScore >= 50,
    score: spamScore,
    reasons,
  };
}

/**
 * Generate a simple CSRF-like token for form submissions
 */
export function generateFormToken(secret: string = "default-secret"): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2);
  const data = `${timestamp}:${randomPart}`;
  
  // Simple encoding - in production, use proper HMAC
  return Buffer.from(data).toString("base64");
}

/**
 * Verify form token
 */
export function verifyFormToken(
  token: string,
  maxAgeMs: number = 3600000
): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [timestamp] = decoded.split(":");
    const age = Date.now() - parseInt(timestamp, 10);
    
    return age <= maxAgeMs && age >= 0;
  } catch {
    return false;
  }
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: NextRequest): string {
  // Priority: IP address -> User agent hash
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = request.headers.get("user-agent") || "unknown";
  
  // Combine IP and a portion of user agent for identifier
  return `${ip}:${userAgent.substring(0, 50)}`;
}

/**
 * Check if request is from a known VPN/proxy service
 */
export function isKnownProxy(ip: string): boolean {
  // Common VPN/proxy IP patterns (this is a basic check)
  // In production, use a service like IPQualityScore or similar
  
  // Check for common datacenter IP ranges (simplified)
  const suspiciousPatterns = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^127\./,
    /^0\./,
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(ip));
}

/**
 * Validate email format and detect disposable email providers
 */
export function validateEmail(email: string): {
  valid: boolean;
  isDisposable: boolean;
  reason?: string;
} {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, isDisposable: false, reason: "Invalid email format" };
  }

  // Check for disposable email domains
  const disposableDomains = [
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "throwaway.email",
    "temp-mail.org",
    "yopmail.com",
    "maildrop.cc",
    "getnada.com",
    "trashmail.com",
    "sharklasers.com",
    "guerrillamail.info",
    "grr.la",
    "guerrillamail.biz",
    "guerrillamail.de",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  const isDisposable = disposableDomains.includes(domain);

  return {
    valid: true,
    isDisposable,
    reason: isDisposable ? "Disposable email address detected" : undefined,
  };
}

/**
 * Combined bot detection check
 */
export function performBotCheck(
  request: NextRequest,
  formData: {
    honeypot?: string;
    timingToken?: string;
    content?: string;
    email?: string;
  }
): {
  isBot: boolean;
  confidence: number; // 0-100
  reasons: string[];
} {
  const reasons: string[] = [];
  let confidence = 0;

  // Check honeypot
  if (formData.honeypot && !validateHoneypot(formData.honeypot)) {
    confidence += 80;
    reasons.push("Honeypot field filled");
  }

  // Check timing token
  if (formData.timingToken) {
    const timing = verifyTimingToken(formData.timingToken, 2, 3600);
    if (!timing.valid) {
      confidence += 60;
      reasons.push(timing.reason || "Invalid timing");
    }
  }

  // Check user agent and headers
  const patternCheck = detectSuspiciousPatterns(request);
  if (patternCheck.suspicious) {
    confidence += 40;
    reasons.push(...patternCheck.reasons);
  }

  // Check content for spam
  if (formData.content) {
    const contentCheck = analyzeContentForSpam(formData.content);
    if (contentCheck.isSpam) {
      confidence += 50;
      reasons.push(...contentCheck.reasons);
    }
  }

  // Check email
  if (formData.email) {
    const emailCheck = validateEmail(formData.email);
    if (emailCheck.isDisposable) {
      confidence += 30;
      reasons.push("Disposable email detected");
    }
  }

  return {
    isBot: confidence >= 70,
    confidence: Math.min(confidence, 100),
    reasons,
  };
}
