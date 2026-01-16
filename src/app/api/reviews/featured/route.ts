import { NextRequest, NextResponse } from "next/server";
import { getFeaturedReviews } from "@/lib/models/review";

// GET /api/reviews/featured
export async function GET(request: NextRequest) {
  try {
    const reviews = await getFeaturedReviews();
    
    // Remove MongoDB-specific fields and keep only review data
    const cleanedReviews = reviews.map(({ _id, productId, productName, productHandle, featured, ...review }) => ({
      ...review,
      productId,
      productName,
      productHandle,
    }));
    
    return NextResponse.json({
      reviews: cleanedReviews,
      total: cleanedReviews.length,
    });
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured reviews" },
      { status: 500 }
    );
  }
}
