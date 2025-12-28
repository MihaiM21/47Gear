import { ProductReview, ProductReviews } from "@/lib/shopify/types";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

const REVIEWS_DIR = join(process.cwd(), "data", "reviews");

// Ensure reviews directory exists
if (!existsSync(REVIEWS_DIR)) {
  mkdirSync(REVIEWS_DIR, { recursive: true });
}

function getReviewsFilePath(productId: string): string {
  // Sanitize product ID for use in filename
  const sanitizedId = productId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return join(REVIEWS_DIR, `${sanitizedId}.json`);
}

function getProductReviews(productId: string): ProductReviews {
  const filePath = getReviewsFilePath(productId);
  
  if (!existsSync(filePath)) {
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }

  try {
    const data = readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading reviews:", error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }
}

function saveProductReviews(productId: string, reviews: ProductReviews): void {
  const filePath = getReviewsFilePath(productId);
  writeFileSync(filePath, JSON.stringify(reviews, null, 2));
}

function calculateAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
}

// GET /api/reviews?productId=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const reviews = getProductReviews(productId);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, rating, title, content, author } = body;

    // Validation
    if (!productId || !rating || !title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Get existing reviews
    const productReviews = getProductReviews(productId);

    // Create new review
    const newReview: ProductReview = {
      id: `review_${Date.now()}`,
      title,
      content,
      rating,
      createdAt: new Date().toISOString(),
      author: {
        name: author,
      },
      verifiedBuyer: false, // Could integrate with order history later
    };

    // Add new review to the beginning of array
    productReviews.reviews.unshift(newReview);
    productReviews.totalReviews = productReviews.reviews.length;
    productReviews.averageRating = calculateAverageRating(productReviews.reviews);

    // Save updated reviews
    saveProductReviews(productId, productReviews);

    return NextResponse.json(
      { 
        success: true, 
        review: newReview,
        averageRating: productReviews.averageRating,
        totalReviews: productReviews.totalReviews
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}