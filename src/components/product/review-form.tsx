"use client";

import { ProductReview } from "@/lib/shopify/types";
import { useState, useEffect } from "react";
import { getCustomerInfo, getCustomerToken } from "@/components/auth/actions";

interface ReviewFormProps {
  productId: string;
  productName?: string;
  productHandle?: string;
  onReviewSubmitted: (review: ProductReview) => void;
}

export function ReviewForm({ productId, productName, productHandle, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const checkAuth = async () => {
    setIsCheckingAuth(true);
    try {
      // Check authentication via server-side cookies
      const customerInfo = await getCustomerInfo();

      if (customerInfo?.authenticated && customerInfo.name) {
        setCustomerName(customerInfo.name);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Get customer token from server-side cookies
      const customerToken = await getCustomerToken();
      
      if (!customerToken) {
        throw new Error("Authentication required. Please log in to submit a review.");
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          productHandle,
          rating,
          title,
          content,
          author: customerName,
          customerAccessToken: customerToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      // Reset form
      setTitle("");
      setContent("");
      setRating(5);
      setSuccess(true);

      // Call callback with new review
      onReviewSubmitted(data.review);

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Scrie o recenzie</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary"></div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Scrie o recenzie</h3>
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-white/60 mb-6">Trebuie să fii autentificat pentru a lăsa o recenzie.</p>
          
          <div className="space-y-3">
            <a
              href="https://account.47gear.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all duration-300"
            >
              Autentifică-te
            </a>
            
            <p className="text-white/50 text-sm">
              Deja autentificat? După ce te-ai logat, 
              <button
                onClick={checkAuth}
                disabled={isCheckingAuth}
                className="ml-1 text-accent-secondary hover:text-accent-primary transition-colors underline disabled:opacity-50"
              >
                {isCheckingAuth ? 'Verificare...' : 'apasă aici pentru a reîmprospăta'}
              </button>
            </p>
          </div>
          
          <p className="text-white/40 text-sm mt-6">
            Nu ai cont?{' '}
            <a href="https://account.47gear.ro/" target="_blank" rel="noopener noreferrer" className="text-accent-secondary hover:text-accent-primary transition-colors">
              Înregistrează-te aici
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Scrie o recenzie</h3>
      <p className="text-white/60 text-sm mb-6">Autentificat ca: <span className="text-accent-secondary font-medium">{customerName}</span></p>

      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
          Recenzia ta a fost trimisă cu succes!
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-white font-medium mb-3">
            Evaluarea ta
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <svg
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-white/20"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-white font-medium mb-2">
            Titlu recenzie
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all"
            placeholder="Rezumă experiența ta"
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-white font-medium mb-2"
          >
            Recenzia ta
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all resize-none"
            placeholder="Spune-ne despre experiența ta cu acest produs..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Se trimite..." : "Trimite recenzia"}
        </button>
      </form>
    </div>
  );
}
