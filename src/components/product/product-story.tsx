'use client';

import { useEffect, useState } from 'react';

interface ProductStoryProps {
  productHandle: string;
}

interface ProductStory {
  productHandle: string;
  productTitle: string;
  story: string;
  lastUpdated: string;
}

export function ProductStory({ productHandle }: ProductStoryProps) {
  const [story, setStory] = useState<ProductStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/product-stories?handle=${productHandle}`);
        const data = await response.json();
        setStory(data.story);
      } catch (error) {
        console.error('Error fetching product story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [productHandle]);

  if (loading) {
    return null;
  }

  if (!story) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-accent-primary/20 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 p-8 backdrop-blur-sm">
      {/* Story Icon/Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center shadow-neon-purple">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Povestea Produsului</h3>
          <p className="text-xs text-white/50">Descoperă istoria din spatele acestui mousepad</p>
        </div>
      </div>

      {/* Story Content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
          {story.story}
        </p>
      </div>

      {/* Decorative element */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>Un produs unic cu o poveste specială</span>
        </div>
      </div>
    </div>
  );
}
