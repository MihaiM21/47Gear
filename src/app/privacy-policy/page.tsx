import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | 47Gear",
  description: "Learn how 47Gear collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* Header with gradient effect */}
      <div className="mb-8 text-center relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-accent-primary/20 blur-xl opacity-30 rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 animate-gradient">
          Privacy <span className="text-accent-yellow">Policy</span>
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto my-4"></div>
        <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
          Last updated: October 21, 2025
        </p>
      </div>

      {/* Main content */}
      <div className="glass-card p-6 border border-accent-primary/20 shadow-neon mb-8">
        <div className="prose prose-invert prose-headings:text-accent-secondary prose-a:text-accent-secondary max-w-none">
          <h2 className="text-xl font-bold text-gradient-purple mb-4">Introduction</h2>
          <p className="text-white/80 text-sm mb-4">
            At 47Gear, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make purchases.
          </p>
          <p className="text-white/80 text-sm mb-6">
            Please read this privacy policy carefully. If you do not agree with our policies and practices, you may choose not to use our website. By accessing or using our website, you agree to this privacy policy.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Information We Collect</h2>
          <p className="text-white/80 text-sm mb-2">We collect several types of information from and about users of our website, including:</p>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li className="text-white/80 text-sm">
              <span className="text-accent-secondary">Personal information:</span> Name, email address, postal address, phone number, and payment information when you create an account or place an order.
            </li>
            <li className="text-white/80 text-sm">
              <span className="text-accent-secondary">Usage information:</span> How you interact with our website, products you view, search terms, and browsing patterns.
            </li>
            <li className="text-white/80 text-sm">
              <span className="text-accent-secondary">Technical information:</span> IP address, browser type, device information, and cookies.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">How We Use Your Information</h2>
          <p className="text-white/80 text-sm mb-2">We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li className="text-white/80 text-sm">Process and fulfill your orders</li>
            <li className="text-white/80 text-sm">Provide customer support and respond to inquiries</li>
            <li className="text-white/80 text-sm">Improve our website and product offerings</li>
            <li className="text-white/80 text-sm">Personalize your shopping experience</li>
            <li className="text-white/80 text-sm">Send marketing communications (if you've opted in)</li>
            <li className="text-white/80 text-sm">Protect against fraudulent transactions</li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-white/80 text-sm mb-4">
            We use cookies and similar tracking technologies to collect information about your browsing activities. These tools help us analyze website traffic, personalize content, and understand how visitors use our site.
          </p>
          <p className="text-white/80 text-sm mb-6">
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, some parts of the site may become inaccessible or not function properly if you disable cookies.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Data Security</h2>
          <p className="text-white/80 text-sm mb-4">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="text-white/80 text-sm mb-6">
            While we use commercially reasonable efforts to protect your information, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Third-Party Services</h2>
          <p className="text-white/80 text-sm mb-4">
            We may share your information with third-party service providers who perform services on our behalf, such as payment processing, shipping, and marketing services. These providers have access to personal information needed to perform their functions but are prohibited from using it for other purposes.
          </p>
          <p className="text-white/80 text-sm mb-6">
            Our website may include links to third-party websites. These sites have their own privacy policies, and we are not responsible for their content or practices.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Your Rights</h2>
          <p className="text-white/80 text-sm mb-2">Depending on your location, you may have rights regarding your personal data, including:</p>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li className="text-white/80 text-sm">Accessing your personal data</li>
            <li className="text-white/80 text-sm">Correcting inaccurate information</li>
            <li className="text-white/80 text-sm">Deleting your personal data</li>
            <li className="text-white/80 text-sm">Restricting or objecting to processing</li>
            <li className="text-white/80 text-sm">Data portability</li>
            <li className="text-white/80 text-sm">Withdrawing consent</li>
          </ul>
          <p className="text-white/80 text-sm mb-6">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Changes to Our Privacy Policy</h2>
          <p className="text-white/80 text-sm mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
          <p className="text-white/80 text-sm mb-6">
            We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Contact Us</h2>
          <p className="text-white/80 text-sm mb-4">
            If you have any questions or concerns about this privacy policy or our data practices, please contact us at:
          </p>
          <div className="glass-card p-4 inline-block bg-black/40 border border-accent-primary/20">
            <p className="text-white/90 text-sm">47Gear</p>
            <p className="text-white/90 text-sm">123 Gaming Street</p>
            <p className="text-white/90 text-sm">Tech City, GR 12345</p>
            <p className="text-white/90 text-sm">Email: privacy@47gear.com</p>
            <p className="text-white/90 text-sm">Phone: +1 (800) 47-GEAR</p>
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Have Questions?</h3>
          <p className="text-white/70 text-sm mb-3">Our support team is here to help with any privacy concerns.</p>
          <a 
            href="/contact-us" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Contact Support
          </a>
        </div>
        
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Terms of Service</h3>
          <p className="text-white/70 text-sm mb-3">Learn about the terms governing your use of our services.</p>
          <a 
            href="/terms-of-service" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            View Terms
          </a>
        </div>
      </div>
    </div>
  );
}