import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | 47Gear",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16 mt-8">
      <div className="relative w-full max-w-2xl">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -left-[20%] h-[500px] w-[500px] rounded-full bg-accent-primary/10 blur-[120px]"></div>
          <div className="absolute -bottom-[40%] -right-[20%] h-[500px] w-[500px] rounded-full bg-accent-secondary/10 blur-[120px]"></div>
        </div>
        

        {/* Main content */}
        <div className="glass-card p-8 md:p-12 text-center">
          {/* 404 Number */}
          <div className="mb-8 relative">
            <h1 className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[120px] md:text-[180px] font-black leading-none text-accent-primary/5 blur-sm select-none">
                404
              </div>
            </div>
          </div>

          {/* Error message */}
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Oops! Pagina nu a fost găsită
            </h2>
            <p className="text-gaming-300 text-base md:text-lg max-w-md mx-auto">
              Pagina pe care o căutați nu există.
            </p>
          </div>

          {/* Animated icon */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-accent-primary/30 blur-xl"></div>
              <svg
                className="relative h-24 w-24 text-accent-secondary animate-float"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-neon-purple hover:scale-[1.02] active:scale-[0.98] group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg border border-accent-secondary/30 bg-gaming-800/50 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:border-accent-secondary hover:shadow-neon-purple hover:scale-[1.02] active:scale-[0.98] group"
            >
              Browse Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Popular links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gaming-400 mb-4">Cauți ceva anume?</p>
            <div className="flex flex-wrap justify-center gap-3">
              
              <Link
                href="/about-us"
                className="text-sm text-accent-secondary hover:text-accent-primary transition-colors duration-200 hover:underline"
              >
                About Us
              </Link>
              <span className="text-gaming-600">•</span>
              <Link
                href="/contact-us"
                className="text-sm text-accent-secondary hover:text-accent-primary transition-colors duration-200 hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-accent-primary/20 blur-2xl -z-10 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent-secondary/20 blur-2xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
