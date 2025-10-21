import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | 47Gear",
  description: "Read the terms and conditions that govern your use of 47Gear's services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* Header with gradient effect */}
      <div className="mb-8 text-center relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-accent-primary/20 blur-xl opacity-30 rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 animate-gradient">
          Terms of <span className="text-accent-yellow">Service</span>
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto my-4"></div>
        <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
          Last updated: October 21, 2025
        </p>
      </div>

      {/* Main content */}
      <div className="glass-card p-6 border border-accent-primary/20 shadow-neon mb-8">
        <div className="prose prose-invert prose-headings:text-accent-secondary prose-a:text-accent-secondary max-w-none">
          <h2 className="text-xl font-bold text-gradient-purple mb-4">Welcome to 47Gear</h2>
          <p className="text-white/80 text-sm mb-4">
            These terms and conditions outline the rules and regulations for the use of 47Gear's website and services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 47Gear's website if you do not accept all of the terms and conditions stated on this page.
          </p>
          <p className="text-white/80 text-sm mb-6">
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">License to Use Website</h2>
          <p className="text-white/80 text-sm mb-4">
            Unless otherwise stated, 47Gear and/or its licensors own the intellectual property rights for all material on 47Gear's website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p className="text-white/80 text-sm mb-2">You must not:</p>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li className="text-white/80 text-sm">Republish material from this website</li>
            <li className="text-white/80 text-sm">Sell, rent or sub-license material from this website</li>
            <li className="text-white/80 text-sm">Reproduce, duplicate or copy material from this website</li>
            <li className="text-white/80 text-sm">Redistribute content from 47Gear (unless content is specifically made for redistribution)</li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">User Account</h2>
          <p className="text-white/80 text-sm mb-4">
            When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
          </p>
          <p className="text-white/80 text-sm mb-4">
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
          </p>
          <p className="text-white/80 text-sm mb-6">
            We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Products & Services</h2>
          <p className="text-white/80 text-sm mb-4">
            All products and services are subject to availability. We reserve the right to discontinue any product or service at any time. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
          </p>
          <p className="text-white/80 text-sm mb-6">
            We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Accuracy of Billing and Account Information</h2>
          <p className="text-white/80 text-sm mb-4">
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
          </p>
          <p className="text-white/80 text-sm mb-6">
            You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Shipping & Returns</h2>
          <p className="text-white/80 text-sm mb-4">
            Delivery times may vary depending on the product availability, payment verification, and shipping destination. We are not responsible for delays beyond our control, including but not limited to carrier delays, weather conditions, or other force majeure events.
          </p>
          <p className="text-white/80 text-sm mb-4">
            We offer a 30-day return policy for most items. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Several types of goods are exempt from being returned, including but not limited to digital products and custom-made items.
          </p>
          <p className="text-white/80 text-sm mb-6">
            To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Warranty & Repairs</h2>
          <p className="text-white/80 text-sm mb-4">
            All our gaming gear comes with a standard 1-year manufacturer warranty against defects in materials and workmanship. Premium products may have extended warranties as specified on the product page.
          </p>
          <p className="text-white/80 text-sm mb-6">
            To claim warranty service, contact our customer support team with proof of purchase. We will guide you through the repair or replacement process.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Prohibited Uses</h2>
          <p className="text-white/80 text-sm mb-2">You may not use our website or services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction. You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li className="text-white/80 text-sm">Violate any applicable laws or regulations</li>
            <li className="text-white/80 text-sm">Infringe upon or violate our intellectual property rights or those of others</li>
            <li className="text-white/80 text-sm">Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li className="text-white/80 text-sm">Submit false or misleading information</li>
            <li className="text-white/80 text-sm">Upload or transmit viruses or any other type of malicious code</li>
            <li className="text-white/80 text-sm">Attempt to gain unauthorized access to our systems</li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Limitation of Liability</h2>
          <p className="text-white/80 text-sm mb-4">
            To the fullest extent permitted by applicable law, 47Gear and its affiliates shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
          <p className="text-white/80 text-sm mb-6">
            In no event shall our total liability to you for all damages, losses or causes of action exceed the amount you have paid to 47Gear in the last six (6) months, or, if greater, one hundred dollars ($100).
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Governing Law</h2>
          <p className="text-white/80 text-sm mb-6">
            These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction where 47Gear's headquarters are located, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Changes to Terms</h2>
          <p className="text-white/80 text-sm mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
          <p className="text-white/80 text-sm mb-6">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the website and services.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Contact Us</h2>
          <p className="text-white/80 text-sm mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="glass-card p-4 inline-block bg-black/40 border border-accent-primary/20">
            <p className="text-white/90 text-sm">47Gear</p>
            <p className="text-white/90 text-sm">123 Gaming Street</p>
            <p className="text-white/90 text-sm">Tech City, GR 12345</p>
            <p className="text-white/90 text-sm">Email: legal@47gear.com</p>
            <p className="text-white/90 text-sm">Phone: +1 (800) 47-GEAR</p>
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Have Questions?</h3>
          <p className="text-white/70 text-sm mb-3">Our support team is here to help with any questions about our terms.</p>
          <a 
            href="/contact-us" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Contact Support
          </a>
        </div>
        
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Privacy Policy</h3>
          <p className="text-white/70 text-sm mb-3">Learn how we protect and manage your personal data.</p>
          <a 
            href="/privacy-policy" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            View Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}