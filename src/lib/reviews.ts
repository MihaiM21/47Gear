import { ProductReview, ProductReviews } from "./shopify/types";

/**
 * Fetch reviews for a specific product
 */
export async function getProductReviews(productId: string): Promise<ProductReviews> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/reviews?productId=${encodeURIComponent(productId)}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }
}

/**
 * Submit a new review for a product
 */
export async function submitReview(data: {
  productId: string;
  rating: number;
  title: string;
  content: string;
  author: string;
}): Promise<{ success: boolean; review?: ProductReview; error?: string }> {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Failed to submit review" };
    }

    return { success: true, review: result.review };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, error: "An error occurred while submitting your review" };
  }
}

/**
 * Calculate the average rating from an array of reviews
 */
export function calculateAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Get rating distribution for displaying in charts
 */
export function getRatingDistribution(reviews: ProductReview[]): {
  stars: number;
  count: number;
  percentage: number;
}[] {
  const totalReviews = reviews.length;
  return [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      totalReviews > 0
        ? (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100
        : 0,
  }));
}

/**
 * Format a date string to a user-friendly format
 */
export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Sort reviews by different criteria
 */
export function sortReviews(
  reviews: ProductReview[],
  sortBy: "recent" | "highest" | "lowest"
): ProductReview[] {
  const sorted = [...reviews];
  switch (sortBy) {
    case "highest":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "lowest":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "recent":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

/**
 * Validate review data before submission
 */
export function validateReview(data: {
  rating: number;
  title: string;
  content: string;
  author: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push("Rating-ul trebuie să fie între 1 și 5");
  }

  if (!data.title || data.title.trim().length < 3) {
    errors.push("Titlul trebuie să aibă cel puțin 3 caractere");
  }

  if (!data.content || data.content.trim().length < 10) {
    errors.push("Recenzia trebuie să aibă cel puțin 10 caractere");
  }

  if (!data.author || data.author.trim().length < 2) {
    errors.push("Numele trebuie să aibă cel puțin 2 caractere");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
