"use client";

import { ProductReview } from "@/lib/shopify/types";
import { useEffect, useState } from "react";

interface ReviewWithProduct extends ProductReview {
  productId: string;
  featured?: boolean;
}

export default function AdminReviewsManager() {
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "featured">("recent");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "not-featured">("all");
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/admin/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
        setFeaturedCount(data.featuredCount || 0);
      } else {
        setError("Failed to load reviews. Please check authentication.");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Error loading reviews");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (reviewId: string, productId: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          reviewId,
          updates: {
            featured: !currentStatus,
          },
        }),
      });

      if (response.ok) {
        // Update local state
        setReviews((prev) =>
          prev.map((review) =>
            review.id === reviewId ? { ...review, featured: !currentStatus } : review
          )
        );
        setFeaturedCount((prev) => (currentStatus ? prev - 1 : prev + 1));
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update review");
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      setError("Error updating review");
    }
  };

  const deleteReview = async (reviewId: string, productId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/reviews?productId=${encodeURIComponent(productId)}&reviewId=${encodeURIComponent(reviewId)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove from local state
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Error deleting review");
    }
  };

  const getSortedAndFilteredReviews = () => {
    let filtered = [...reviews];

    // Filter by featured status
    if (filterFeatured === "featured") {
      filtered = filtered.filter((r) => r.featured);
    } else if (filterFeatured === "not-featured") {
      filtered = filtered.filter((r) => !r.featured);
    }

    // Filter by product
    if (filterProduct !== "all") {
      filtered = filtered.filter((r) => r.productId === filterProduct);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  };

  const getUniqueProducts = () => {
    const productMap = new Map<string, { id: string; name: string }>();
    
    reviews.forEach(review => {
      if (!productMap.has(review.productId)) {
        productMap.set(review.productId, {
          id: review.productId,
          name: review.productName || review.productId.replace('gid___shopify_Product_', 'Product #'),
        });
      }
    });

    return Array.from(productMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/5 rounded w-1/4"></div>
            <div className="h-64 bg-white/5 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const sortedReviews = getSortedAndFilteredReviews();
  const uniqueProducts = getUniqueProducts();
  const stats = {
    total: reviews.length,
    featured: featuredCount,
    average: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Manage Reviews</h1>
          <p className="text-white/60 mb-4">
            Select which reviews appear on the homepage
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-white/60 text-sm mb-1">Total Reviews</div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-4">
              <div className="text-accent-primary/80 text-sm mb-1">Featured</div>
              <div className="text-3xl font-bold text-accent-primary">{stats.featured}/10</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-white/60 text-sm mb-1">Average Rating</div>
              <div className="text-3xl font-bold text-white flex items-center gap-2">
                {stats.average}
                <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-white/60 text-sm mb-1">Products</div>
              <div className="text-3xl font-bold text-white">{uniqueProducts.length}</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="featured">Featured First</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Featured Status</label>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
            >
              <option value="all">All Reviews</option>
              <option value="featured">Featured Only</option>
              <option value="not-featured">Not Featured</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Product</label>
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 max-w-xs"
            >
              <option value="all">All Products</option>
              {uniqueProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {sortedReviews.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              No reviews found
            </div>
          ) : (
            sortedReviews.map((review) => (
              <div
                key={review.id}
                className={`rounded-xl border p-6 transition-all ${
                  review.featured
                    ? "border-accent-primary/50 bg-accent-primary/5"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      {review.featured && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/30">
                          Featured
                        </span>
                      )}
                      {review.verifiedBuyer && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          Verified
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {review.title}
                    </h3>
                    <p className="text-white/70 mb-3">{review.content}</p>

                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span>{review.author.name}</span>
                      <span>•</span>
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      {review.productName && (
                        <>
                          <span>•</span>
                          {review.productHandle ? (
                            <a
                              href={`/product/${review.productHandle}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-primary hover:text-accent-secondary transition-colors"
                            >
                              {review.productName}
                            </a>
                          ) : (
                            <span className="text-white/70">{review.productName}</span>
                          )}
                        </>
                      )}
                      {!review.productName && (
                        <>
                          <span>•</span>
                          <span className="text-white/40 text-xs font-mono">
                            {review.productId.replace('gid___shopify_Product_', 'ID: ')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        toggleFeatured(review.id, review.productId, !!review.featured)
                      }
                      disabled={!review.featured && featuredCount >= 10}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        review.featured
                          ? "bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/30 border border-accent-primary/30"
                          : "bg-white/5 text-white hover:bg-white/10 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                    >
                      {review.featured ? "Remove Featured" : "Set Featured"}
                    </button>

                    <button
                      onClick={() => deleteReview(review.id, review.productId)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
