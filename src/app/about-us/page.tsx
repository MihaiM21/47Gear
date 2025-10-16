import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | 47Gear",
  description: "Learn more about 47Gear - your premium gaming gear destination.",
};

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-12 bg-gradient-to-b from-black/30 to-transparent">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent">
          About 47Gear
        </h1>
        <p className="mt-4 text-lg text-white">Your premium gaming gear destination</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="rounded-lg border border-accent-primary/30 bg-black/50 p-6 shadow-neon hover:shadow-neon-dark transition-shadow duration-300">
          <h2 className="mb-4 text-2xl font-semibold text-accent-primary">Our Mission</h2>
          <p className="text-white">
            At 47Gear, we're dedicated to providing gamers with the highest quality gaming peripherals and accessories. 
            We believe that the right equipment can transform your gaming experience, giving you the competitive edge 
            you need to perform at your best.
          </p>
        </div>

        <div className="rounded-lg border border-accent-primary/30 bg-black/50 p-6 shadow-neon hover:shadow-neon-dark transition-shadow duration-300">
          <h2 className="mb-4 text-2xl font-semibold text-accent-primary">Our Vision</h2>
          <p className="text-white">
            We envision a gaming community where every player has access to professional-grade equipment that enhances 
            their skills and enjoyment. We're committed to innovation, quality, and customer satisfaction in everything we do.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-accent-primary/30 bg-black/50 p-6 shadow-neon hover:shadow-neon-dark transition-shadow duration-300">
        <h2 className="mb-4 text-2xl font-semibold text-accent-primary">Why Choose 47Gear?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-accent-secondary">Competitive Pricing</h3>
            <p className="text-center text-sm text-white">
              Premium quality gear at affordable prices
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-accent-secondary">Quality Assurance</h3>
            <p className="text-center text-sm text-white">
              Rigorously tested products for durability
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-accent-secondary">Customer Support</h3>
            <p className="text-center text-sm text-white">
              24/7 support from fellow gamers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}