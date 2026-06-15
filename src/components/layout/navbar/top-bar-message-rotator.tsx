'use client';

import { useEffect, useState } from 'react';

const TOP_BAR_MESSAGES_DESKTOP = [
  'Produse fabricate in Europa',
  'Mousepad-ul care iti face aim-ul mai consistent.',
  'Optimizat pentru CS2 & Valorant. Testeaza 14 zile fara risc.',
  'Banii inapoi daca nu simti diferenta.',
  'Stoc limitat pe lotul curent'
];

const TOP_BAR_MESSAGES_MOBILE = [
  'Fabricate in Europa',
  'Aim-ul mai consistent',
  'CS2 & Valorant - 14 zile fara risc',
  'Banii inapoi 100%',
  'Stoc limitat'
];

export default function TopBarMessageRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % TOP_BAR_MESSAGES_DESKTOP.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Desktop Messages */}
      <div className="hidden sm:block relative mx-auto h-4 w-full overflow-hidden px-2">
        {TOP_BAR_MESSAGES_DESKTOP.map((message, index) => (
          <p
            key={`desktop-${message}`}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 text-center text-[11px] font-medium tracking-[0.08em] text-white/75 transition-all duration-500 line-clamp-1 ${
              index === activeIndex ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            {message}
          </p>
        ))}
      </div>

      {/* Mobile Messages */}
      <div className="block sm:hidden relative mx-auto h-3 w-full overflow-hidden px-2">
        {TOP_BAR_MESSAGES_MOBILE.map((message, index) => (
          <p
            key={`mobile-${message}`}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 text-center text-[9px] font-medium tracking-[0.08em] text-white/75 transition-all duration-500 line-clamp-1 ${
              index === activeIndex ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
          >
            {message}
          </p>
        ))}
      </div>

      <span className="sr-only">
        {activeIndex < TOP_BAR_MESSAGES_DESKTOP.length ? TOP_BAR_MESSAGES_DESKTOP[activeIndex] : ''}
      </span>
    </>
  );
}