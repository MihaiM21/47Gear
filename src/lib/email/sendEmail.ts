import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent?: boolean;
}

/**
 * Creates and configures a Nodemailer transporter based on email provider
 */
function createTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(String(process.env.EMAIL_PORT || '587'));
  const secure = port === 465;
  
  // Check if using Gmail
  const isGmail = host?.includes('gmail.com');
  
  // Base transporter config
  const config = {
    host,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    debug: process.env.NODE_ENV !== 'production'
  };
  
  // Add Gmail-specific options if using Gmail
  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Should be an App Password for Gmail
      },
      debug: process.env.NODE_ENV !== 'production'
    });
  }
  
  // Use standard SMTP configuration for other providers
  return nodemailer.createTransport(config);
}

/**
 * Sends an email with contact form data
 */
export async function sendContactEmail(data: ContactFormData) {
  try {
    // Check if email settings are configured
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is not complete. Please check environment variables.');
    }

    console.log('Initializing email transport with host:', process.env.EMAIL_HOST);
    
    // Create appropriate transporter
    const transporter = createTransporter();

    // Try to verify connection configuration
    try {
      console.log('Verifying email transporter connection...');
      await transporter.verify();
      console.log('Email server connection established successfully');
    } catch (verifyError) {
      console.error('Email verification failed:', verifyError);
      // Continue anyway - some providers don't support verification
    }

    // Sender and recipient emails
    const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

    console.log(`Preparing to send email from ${from} to ${to}`);

    // Email content
    const mailOptions = {
      from: `"${data.name} via 47Gear Contact" <${from}>`,
      to,
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}
Consent to marketing: ${data.consent ? 'Yes' : 'No'}
      `,
      html: `
<h2>Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Subject:</strong> ${data.subject}</p>
<p><strong>Message:</strong></p>
<p>${data.message.replace(/\n/g, '<br>')}</p>
<p><strong>Consent to marketing:</strong> ${data.consent ? 'Yes' : 'No'}</p>
      `,
    };

    // Send email
    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}