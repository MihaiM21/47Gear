"use client";

import { ProductReview, ProductReviews as ProductReviewsType } from "@/lib/shopify/types";
import { useEffect, useState } from "react";
import { ReviewForm } from "./review-form";
import { ProductReviews } from "./product-reviews";

interface ReviewsSectionProps {
  productId: string;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [reviewsData, setReviewsData] = useState<ProductReviewsType>({
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      if (response.ok) {
        const data = await response.json();
        setReviewsData(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = (newReview: ProductReview) => {
    // Refresh reviews after submission
    fetchReviews();
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="border-t border-white/5 pt-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/5 rounded w-1/4"></div>
          <div className="h-32 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-white/5 pt-16">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            Recenzii clienți
          </h2>
          <p className="text-white/60 text-lg">
            Află ce spun clienții noștri despre acest produs
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/25 transition-all duration-300"
        >
          {showForm ? "Anulează" : "Scrie o recenzie"}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-12">
          <ReviewForm
            productId={productId}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
      )}

      {/* Reviews Display */}
      <ProductReviews
        reviews={reviewsData.reviews}
        averageRating={reviewsData.averageRating}
        totalReviews={reviewsData.totalReviews}
      />
    </div>
  );
}
