"use client";

import { ProductReview } from "@/lib/shopify/types";
import { useState } from "react";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: (review: ProductReview) => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          title,
          content,
          author,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      // Reset form
      setTitle("");
      setContent("");
      setAuthor("");
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

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Scrie o recenzie</h3>

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

        {/* Name */}
        <div>
          <label
            htmlFor="author"
            className="block text-white font-medium mb-2"
          >
            Numele tău
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all"
            placeholder="Introdu numele tău"
          />
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
