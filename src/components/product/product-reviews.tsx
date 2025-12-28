"use client";

import { ProductReview } from "@/lib/shopify/types";
import { useState } from "react";

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "acum câteva secunde";
  if (diffInSeconds < 3600) return `acum ${Math.floor(diffInSeconds / 60)} minute`;
  if (diffInSeconds < 86400) return `acum ${Math.floor(diffInSeconds / 3600)} ore`;
  if (diffInSeconds < 2592000) return `acum ${Math.floor(diffInSeconds / 86400)} zile`;
  if (diffInSeconds < 31536000) return `acum ${Math.floor(diffInSeconds / 2592000)} luni`;
  return `acum ${Math.floor(diffInSeconds / 31536000)} ani`;
}

export function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent");

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      totalReviews > 0
        ? (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100
        : 0,
  }));

  if (totalReviews === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
        <p className="text-white/60">
          Încă nu există recenzii pentru acest produs. Fii primul care lasă o recenzie!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overall Rating Summary */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-white/20"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="text-white/60">
              Bazat pe {totalReviews} {totalReviews === 1 ? "recenzie" : "recenzii"}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-white/70">{stars}</span>
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-secondary to-accent-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-white/60 w-12 text-right">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          Toate recenziile ({totalReviews})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all"
        >
          <option value="recent">Cele mai recente</option>
          <option value="highest">Rating cel mai mare</option>
          <option value="lowest">Rating cel mai mic</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center border border-white/10">
                    <span className="text-white font-semibold">
                      {review.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {review.author.name}
                      </span>
                      {review.verifiedBuyer && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          Verificat
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-white/40">
                      {formatTimeAgo(review.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-white/20"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>

            <h4 className="text-white font-semibold mb-2">{review.title}</h4>
            <p className="text-white/70 leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
