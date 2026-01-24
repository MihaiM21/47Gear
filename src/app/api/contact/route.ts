import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/sendEmail";
import { z } from "zod";
import { rateLimiter, RATE_LIMITS } from "@/lib/rate-limiter";
import {
  performBotCheck,
  getClientIdentifier,
  validateHoneypot,
  verifyTimingToken,
} from "@/lib/bot-detection";

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to submit this form",
  }),
  // Anti-spam fields (optional, default to empty string if not provided)
  website: z.string().optional().default(""), // Honeypot
  timingToken: z.string().optional().default(""), // Timing verification
});

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const clientId = getClientIdentifier(request);
    
    // Apply strict rate limiting for contact form
    const rateLimitResult = rateLimiter.checkStrict(
      `contact:${clientId}`,
      RATE_LIMITS.CONTACT_FORM.maxRequests,
      RATE_LIMITS.CONTACT_FORM.windowMs,
      RATE_LIMITS.CONTACT_FORM.burstLimit,
      RATE_LIMITS.CONTACT_FORM.burstWindowMs
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            rateLimitResult.reason ||
            "Too many requests. Please try again later.",
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMITS.CONTACT_FORM.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

    // Check if email settings are configured in environment variables
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({
        success: false,
        message: "Email service is not configured. Contact the administrator."
      }, { status: 500 });
    }
    
    // Parse request body
    const body = await request.json();
    
    // Log received data in development mode (helps debugging)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Contact form submission:', {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasSubject: !!body.subject,
        hasMessage: !!body.message,
        messageLength: body.message?.length || 0,
        hasConsent: !!body.consent,
        hasWebsite: !!body.website,
        hasTimingToken: !!body.timingToken,
      });
    }
    
    // Validate form data
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Log validation errors in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('Validation errors:', validationResult.error.errors);
      }
      
      // Return detailed validation errors
      return NextResponse.json({ 
        success: false, 
        errors: validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    const validatedData = validationResult.data;

    // Perform comprehensive bot detection
    const botCheck = performBotCheck(request, {
      honeypot: validatedData.website,
      timingToken: validatedData.timingToken,
      content: validatedData.message,
      email: validatedData.email,
    });

    // Log suspicious activity (in production, send to monitoring service)
    if (botCheck.confidence > 30) {
      console.warn("Suspicious contact form submission detected:", {
        clientId,
        confidence: botCheck.confidence,
        reasons: botCheck.reasons,
        timestamp: new Date().toISOString(),
      });
    }

    // Block if high confidence bot detection
    if (botCheck.isBot) {
      // Log the blocked attempt
      console.error("Bot submission blocked:", {
        clientId,
        confidence: botCheck.confidence,
        reasons: botCheck.reasons,
      });

      // Return a generic error to not reveal anti-bot measures
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request. Please try again later.",
        },
        { status: 400 }
      );
    }

    // Additional honeypot check
    if (validatedData.website && !validateHoneypot(validatedData.website)) {
      console.warn("Honeypot triggered:", { clientId });
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request.",
        },
        { status: 400 }
      );
    }

    // Verify timing token if provided
    if (validatedData.timingToken) {
      const timingResult = verifyTimingToken(validatedData.timingToken, 2, 3600);
      if (!timingResult.valid) {
        console.warn("Invalid timing token:", {
          clientId,
          reason: timingResult.reason,
        });
        // Don't block completely, but note suspicious behavior
      }
    }
    
    // Send email with validated data (excluding anti-spam fields)
    const emailData = {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      consent: validatedData.consent,
    };
    
    const result = await sendContactEmail(emailData);
    
    return NextResponse.json({ 
      success: true, 
      message: "Your message has been sent successfully! We will get back to you soon." 
    }, { 
      status: 200,
      headers: {
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      }
    });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }
    
    // Log the full error for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error sending contact email:", error);
    }
    
    // Return user-friendly error message
    return NextResponse.json({ 
      success: false, 
      message: "Failed to send email. Please try again later."
    }, { status: 500 });
  }
}