import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | 47Gear",
  description: "Learn more about 47Gear - your premium gaming gear destination.",
};

export default function AboutUsPage() {
  return (
    <div className="relative mx-auto max-w-screen-lg px-4 py-16 overflow-hidden">
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-gradient">
              About <span className="text-gradient-purple">47Gear</span>
            </h1>
            <div className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>
          </div>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto animate-fade-in-up">
            Your premium gaming gear destination, crafted for gamers by gamers
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient-purple">Our Story</h2>
          <div className="relative glass-card hover:shadow-glow-purple transition-all duration-500 p-8">
            <div className="absolute top-0 right-0 h-20 w-20 bg-accent-primary/10 rounded-full blur-2xl"></div>
            <p className="text-white/90 text-lg leading-relaxed">
              Founded in 2021 by professional gamers, 47Gear was born from a simple idea: gaming peripherals should be as 
              exceptional as the players who use them. We started with a single mousepad design and have grown into a 
              comprehensive gear provider trusted by casual and professional gamers alike.
            </p>
            <p className="text-white/90 text-lg leading-relaxed mt-4">
              Our journey hasn't always been easy, but our passion for gaming and commitment to quality has helped us build 
              a community that values performance, durability, and innovation in gaming hardware.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="glass-card hover:shadow-glow-purple hover:scale-[1.02] transition-all duration-300 p-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <h2 className="text-2xl font-bold mb-4 text-gradient-purple flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
              Our Mission
            </h2>
            <p className="text-white/90 relative z-10">
              At 47Gear, we're dedicated to providing gamers with the highest quality gaming peripherals and accessories. 
              We believe that the right equipment can transform your gaming experience, giving you the competitive edge 
              you need to perform at your best.
            </p>
          </div>

          <div className="glass-card hover:shadow-glow-purple hover:scale-[1.02] transition-all duration-300 p-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <h2 className="text-2xl font-bold mb-4 text-gradient-purple flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Our Vision
            </h2>
            <p className="text-white/90 relative z-10">
              We envision a gaming community where every player has access to professional-grade equipment that enhances 
              their skills and enjoyment. We're committed to innovation, quality, and customer satisfaction in everything we do.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient-purple">Why Choose 47Gear?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass-card hover:shadow-glow-purple hover:translate-y-[-8px] transition-all duration-300 p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-purple-700 shadow-glow-sm mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient-purple">Competitive Pricing</h3>
              <p className="text-white/80">
                Premium quality gear at affordable prices. We believe top-tier gaming shouldn't break the bank.
              </p>
            </div>
            
            <div className="glass-card hover:shadow-glow-purple hover:translate-y-[-8px] transition-all duration-300 p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-purple-700 shadow-glow-sm mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient-purple">Quality Assurance</h3>
              <p className="text-white/80">
                Every product is rigorously tested for durability and performance in real gaming scenarios.
              </p>
            </div>
            
            <div className="glass-card hover:shadow-glow-purple hover:translate-y-[-8px] transition-all duration-300 p-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-purple-700 shadow-glow-sm mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient-purple">Customer Support</h3>
              <p className="text-white/80">
                24/7 support from fellow gamers who understand your needs and speak your language.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient-purple">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="glass-card hover:shadow-glow-purple group transition-all duration-300 p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent-primary/40 group-hover:border-accent-primary transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 to-purple-700/40 group-hover:opacity-70 transition-opacity"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-4 text-white/80 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">Alex Chen</h3>
              <p className="text-accent-primary mb-3">Founder & CEO</p>
              <p className="text-white/80 text-sm">
                Former esports competitor with over 10 years of experience in the gaming industry.
              </p>
            </div>
            
            <div className="glass-card hover:shadow-glow-purple group transition-all duration-300 p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent-primary/40 group-hover:border-accent-primary transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 to-purple-700/40 group-hover:opacity-70 transition-opacity"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-4 text-white/80 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">Sarah Johnson</h3>
              <p className="text-accent-primary mb-3">Head of Design</p>
              <p className="text-white/80 text-sm">
                Award-winning product designer with a passion for ergonomics and performance.
              </p>
            </div>
            
            <div className="glass-card hover:shadow-glow-purple group transition-all duration-300 p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-accent-primary/40 group-hover:border-accent-primary transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/40 to-purple-700/40 group-hover:opacity-70 transition-opacity"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-4 text-white/80 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">Marcus Lee</h3>
              <p className="text-accent-primary mb-3">Community Manager</p>
              <p className="text-white/80 text-sm">
                Gaming community builder and former team manager for professional esports organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}