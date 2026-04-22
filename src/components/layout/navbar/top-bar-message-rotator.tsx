'use client';

import { useEffect, useState } from 'react';

const TOP_BAR_MESSAGES = [
  'Produse fabricate in Europa',
  'Mousepad-ul care iti face aim-ul mai consistent.',
  'Optimizat pentru CS2 & Valorant. Testeaza 15 zile fara risc.',
  'Banii inapoi daca nu simti diferenta.',
  'Stoc limitat pe lotul curent'
];

export default function TopBarMessageRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % TOP_BAR_MESSAGES.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="relative mx-auto h-4 w-full max-w-5xl overflow-hidden">
      {TOP_BAR_MESSAGES.map((message, index) => (
        <p
          key={message}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 text-center text-[11px] font-medium tracking-[0.08em] text-white/75 transition-all duration-500 ${
            index === activeIndex ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          {message}
        </p>
      ))}
      <span className="sr-only">{TOP_BAR_MESSAGES[activeIndex]}</span>
    </div>
  );
}