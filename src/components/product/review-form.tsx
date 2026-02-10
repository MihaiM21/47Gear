"use client";

import { ProductReview } from "@/lib/shopify/types";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!name.trim()) {
      setError("Te rugăm să introduci numele tău");
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError("Te rugăm să introduci o adresă de email validă");
      return;
    }

    if (!title.trim() || title.trim().length < 3) {
      setError("Titlul trebuie să aibă cel puțin 3 caractere");
      return;
    }

    if (title.trim().length > 100) {
      setError("Titlul nu poate depăși 100 de caractere");
      return;
    }

    if (!content.trim() || content.trim().length < 10) {
      setError("Recenzia trebuie să aibă cel puțin 10 caractere");
      return;
    }

    if (content.trim().length > 1000) {
      setError("Recenzia nu poate depăși 1000 de caractere");
      return;
    }

    setIsSubmitting(true);

    try {
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
          author: {
            name: name.trim(),
            email: email.trim(),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      // Reset form
      setName("");
      setEmail("");
      setTitle("");
      setContent("");
      setRating(5);
      setSuccess(true);

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Hide success message after 8 seconds
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Scrie o recenzie</h3>

      {/* Success Message */}

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

        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Nume <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all"
              placeholder="Numele tău"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all"
              placeholder="adresa@email.ro"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-white font-medium mb-2">
            Titlu recenzie <span className="text-red-400">*</span>
            <span className="text-white/40 text-xs ml-2">({title.length}/100 caractere, min. 3)</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
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
            Recenzia ta <span className="text-red-400">*</span>
            <span className="text-white/40 text-xs ml-2">({content.length}/1000 caractere, min. 10)</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={1000}
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
