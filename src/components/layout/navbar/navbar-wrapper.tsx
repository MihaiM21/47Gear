'use client';

import { useEffect, useState } from 'react';

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
      isScrolled 
        ? 'mt-4 px-4 md:px-8 lg:px-16' 
        : 'mt-0 px-0'
    }`}>
      <div className={`transition-all duration-500 ${
        isScrolled 
          ? 'max-w-[90%] mx-auto rounded-2xl shadow-2xl backdrop-blur-2xl bg-black/60 border border-white/10' 
          : 'w-full rounded-none backdrop-blur-xl bg-black/80 border-b border-white/5'
      }`}>
        {children}
      </div>
    </div>
  );
}
