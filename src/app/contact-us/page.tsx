import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | 47Gear",
  description: "Get in touch with the 47Gear team for any inquiries, support or feedback.",
};

export default function ContactUsPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-12 bg-gradient-to-b from-black/30 to-transparent">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-white">We'd love to hear from you</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-accent-primary/30 bg-black/50 p-6 shadow-neon hover:shadow-neon-dark transition-shadow duration-300">
          <h2 className="mb-4 text-2xl font-semibold text-accent-primary">Get In Touch</h2>
          
          <div className="mb-6">
            <p className="text-white">
              Have questions, feedback, or need support with your order? Our team is here to help!
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-accent-secondary">Phone</h3>
                <p className="text-white">+1 (800) 47-GEAR</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-accent-secondary">Email</h3>
                <p className="text-white">support@47gear.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-accent-secondary">Address</h3>
                <p className="text-white">123 Gaming Street, Tech City, GR 12345</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-accent-primary/30 bg-black/50 p-6 shadow-neon hover:shadow-neon-dark transition-shadow duration-300">
          <h2 className="mb-4 text-2xl font-semibold text-accent-primary">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-accent-secondary">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-4 py-2 text-white focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-accent-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-4 py-2 text-white focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm text-accent-secondary">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-4 py-2 text-white focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="Subject"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-accent-secondary">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-accent-primary/30 bg-black/70 px-4 py-2 text-white focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full rounded-md bg-accent-primary px-6 py-3 text-center font-medium text-white transition-all duration-300 hover:shadow-neon transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}