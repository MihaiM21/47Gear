"use client";

import { useState } from 'react';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  });
  
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set loading state
    setFormStatus({
      type: 'loading',
      message: 'Sending your message...',
    });
    
    try {
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      // Success state
      setFormStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We will get back to you soon.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
      });
    } catch (error) {
      // Error state
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 relative z-10 ${className}`}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-xs font-medium text-accent-secondary">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-3 py-2 text-white text-sm focus:border-accent-secondary focus:ring-1 focus:ring-accent-secondary/20 transition-all duration-300"
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-medium text-accent-secondary">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-3 py-2 text-white text-sm focus:border-accent-secondary focus:ring-1 focus:ring-accent-secondary/20 transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="subject" className="block text-xs font-medium text-accent-secondary">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-3 py-2 text-white text-sm focus:border-accent-secondary focus:ring-1 focus:ring-accent-secondary/20 transition-all duration-300"
          placeholder="How can we help you?"
        />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="message" className="block text-xs font-medium text-accent-secondary">
          Your Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-3 py-2 text-white text-sm focus:border-accent-secondary focus:ring-1 focus:ring-accent-secondary/20 transition-all duration-300"
          placeholder="Tell us what's on your mind..."
        ></textarea>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="consent"
          checked={formData.consent}
          onChange={handleCheckboxChange}
          className="h-4 w-4 rounded border-accent-primary/50 bg-black text-accent-secondary focus:ring-accent-secondary/30"
        />
        <label htmlFor="consent" className="text-xs text-white/70">
          I agree to receive gaming updates and promotional emails
        </label>
      </div>
      
      {/* Form status message */}
      {formStatus.message && (
        <div 
          className={`p-3 rounded-md ${
            formStatus.type === 'success' 
              ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
              : formStatus.type === 'error' 
                ? 'bg-red-900/30 text-red-400 border border-red-500/30' 
                : 'bg-accent-primary/20 text-white/80 border border-accent-primary/30'
          }`}
        >
          {formStatus.message}
        </div>
      )}
      
      <button
        type="submit"
        disabled={formStatus.type === 'loading'}
        className={`w-full rounded-md bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2 text-center font-medium text-white text-sm shadow-neon hover:shadow-neon-purple transition-all duration-300 hover:translate-y-[-1px] relative overflow-hidden shine-effect ${
          formStatus.type === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <div className="flex items-center justify-center">
          {formStatus.type === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </div>
      </button>
    </form>
  );
}