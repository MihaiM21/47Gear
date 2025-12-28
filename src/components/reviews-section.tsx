'use client';

import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Andrei M.",
    rating: 5,
    comment: "Cel mai bun mousepad pe care l-am avut vreodată. Precizia este incredibilă și materialul este de cea mai bună calitate.",
    product: "Gaming Pro Series",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Maria P.",
    rating: 5,
    comment: "Design superb și confort maxim. Perfect pentru sesiunile lungi de gaming. Recomand cu încredere!",
    product: "Desk Mat XL",
    date: "2024-12-10"
  },
  {
    id: 3,
    name: "Alexandru D.",
    rating: 5,
    comment: "Livrare rapidă și produs exact ca în descriere. Calitate premium, exact ce căutam pentru setup-ul meu.",
    product: "Special Edition",
    date: "2024-12-08"
  },
  {
    id: 4,
    name: "Elena S.",
    rating: 5,
    comment: "Sunt foarte mulțumită de achiziție. Mouse-ul alunecă perfect și cusăturile sunt foarte rezistente.",
    product: "Gaming Pro Series",
    date: "2024-12-05"
  }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,99,255,0.03),transparent_70%)]" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ce Spun Clienții Noștri
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-sm">5.0 din 5 stele (200+ recenzii)</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                  "{currentReview.comment}"
                </p>

                <div className="space-y-1">
                  <p className="text-white font-semibold">{currentReview.name}</p>
                  <p className="text-white/50 text-sm">{currentReview.product}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
              aria-label="Previous review"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
              aria-label="Next review"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
