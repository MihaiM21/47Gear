import { Metadata } from "next";
import ContactForm from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | 47Gear",
  description: "Get in touch with the 47Gear team for any inquiries, support or feedback.",
};

export default function ContactUsPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* Streamlined header with gradient effect */}
      <div className="mb-10 text-center relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-accent-primary/20 blur-xl opacity-30 rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 animate-gradient">
          Contact Us
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto my-4"></div>
        <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
          We&apos;re here to answer your questions and help you level up your gaming experience.
        </p>
      </div>

      {/* Main content area with more breathing room MOVE TO cols 5 when email added */}
      <div className="grid gap-8 md:grid-cols-1 relative">
        {/* Left side - Streamlined contact info */}
        <div className="md:col-span-2 glass-card p-6 border border-accent-primary/20 shadow-neon hover:shadow-neon-purple transition-all duration-300 transform hover:translate-y-[-2px]">
          <h2 className="text-xl font-bold mb-4 text-gradient-purple">Get In Touch</h2>
          
          <div className="mb-5">
            <p className="text-white/80 text-sm">
              Our support team is ready to assist with your gaming gear needs.
            </p>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center group">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/20 border border-accent-primary/30 group-hover:shadow-neon transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-accent-yellow transition-colors duration-300">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-accent-secondary">Support Hotline</h3>
                <p className="text-white text-sm text-hover-underline inline-block">+1 (800) 47-GEAR</p>
              </div>
            </div>
            
            <div className="flex items-center group">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/20 border border-accent-primary/30 group-hover:shadow-neon transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-accent-yellow transition-colors duration-300">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-accent-secondary">Email Us</h3>
                <p className="text-white text-sm text-hover-underline inline-block">support@47gear.com</p>
              </div>
            </div>
            
            <div className="flex items-center group">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/20 border border-accent-primary/30 group-hover:shadow-neon transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-accent-yellow transition-colors duration-300">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-accent-secondary">Gaming HQ</h3>
                <p className="text-white text-sm text-hover-underline inline-block">123 Gaming Street, Tech City, GR 12345</p>
              </div>
            </div>
          </div>
          
          {/* Social media icons - more compact */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-accent-secondary mb-3">Connect With Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 rounded-full bg-gaming-800 flex items-center justify-center group transition-all duration-300 hover:bg-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gaming-800 flex items-center justify-center group transition-all duration-300 hover:bg-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-white">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://www.instagram.com/47gear.ro/" className="h-8 w-8 rounded-full bg-gaming-800 flex items-center justify-center group transition-all duration-300 hover:bg-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gaming-800 flex items-center justify-center group transition-all duration-300 hover:bg-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary group-hover:text-white">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right side - Streamlined contact form */}
        {/* <div className="md:col-span-3 glass-card p-6 border border-accent-primary/20 shadow-neon hover:shadow-neon-purple transition-all duration-300 transform hover:translate-y-[-2px] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-2xl"></div>
          
          <h2 className="text-xl font-bold mb-5 text-gradient-purple">Send a Message</h2>
          

          <ContactForm />
          

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-white/60 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-accent-green" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>We typically respond within 24 hours</span>
          </div>
        </div> */}
      </div>
      
      {/* FAQ section - more compact */}
      <div className="mt-14 text-center">
        <h2 className="text-xl font-bold mb-1 text-gradient-purple">Frequently Asked Questions</h2>
        <p className="text-white/70 text-sm mb-6">Got questions? We&apos;ve got answers.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-4 text-left border border-accent-primary/20 hover:shadow-neon transition-all duration-300">
            <h3 className="text-base font-semibold text-accent-secondary mb-1">What are your shipping times?</h3>
            <p className="text-white/80 text-sm">Most orders ship within 1-2 business days. Standard shipping takes 3-5 business days, while express is 1-3 days.</p>
          </div>
          
          <div className="glass-card p-4 text-left border border-accent-primary/20 hover:shadow-neon transition-all duration-300">
            <h3 className="text-base font-semibold text-accent-secondary mb-1">Do you offer international shipping?</h3>
            <p className="text-white/80 text-sm">Yes! We ship worldwide. International shipping typically takes 7-14 business days depending on location.</p>
          </div>
          
          <div className="glass-card p-4 text-left border border-accent-primary/20 hover:shadow-neon transition-all duration-300">
            <h3 className="text-base font-semibold text-accent-secondary mb-1">What&apos;s your return policy?</h3>
            <p className="text-white/80 text-sm">We offer a 30-day return policy. Products must be in original condition with all packaging and accessories.</p>
          </div>
          
          <div className="glass-card p-4 text-left border border-accent-primary/20 hover:shadow-neon transition-all duration-300">
            <h3 className="text-base font-semibold text-accent-secondary mb-1">Do you offer warranty on products?</h3>
            <p className="text-white/80 text-sm">All gear comes with a 1-year warranty against defects. Premium products have extended warranties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}