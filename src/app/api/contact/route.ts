import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, ContactFormData } from "@/lib/email/sendEmail";
import { z } from "zod";

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if email settings are configured in environment variables
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({
        success: false,
        message: "Email service is not configured. Contact the administrator."
      }, { status: 500 });
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Return detailed validation errors
      return NextResponse.json({ 
        success: false, 
        errors: validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }
    
    // Send email with validated data
    const result = await sendContactEmail(validationResult.data);
    
    return NextResponse.json({ 
      success: true, 
      message: "Your message has been sent successfully! We will get back to you soon." 
    }, { status: 200 });
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
    console.error("Error sending contact email:", error);
    
    // Check for specific error types
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    // Return user-friendly error message
    return NextResponse.json({ 
      success: false, 
      message: "Failed to send email. Please try again later."
    }, { status: 500 });
  }
}