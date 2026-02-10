import { ProductReview } from "@/lib/shopify/types";
import { NextRequest, NextResponse } from "next/server";
import { getProductReviews, createReview } from "@/lib/models/review";

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

    const reviews = await getProductReviews(productId);
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
    const { productId, productName, productHandle, rating, title, content, author } = body;

    // Validation
    if (!productId || !rating || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!author || !author.name || !author.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (title.length < 3 || title.length > 100) {
      return NextResponse.json(
        { error: "Title must be between 3 and 100 characters" },
        { status: 400 }
      );
    }

    if (content.length < 10 || content.length > 1000) {
      return NextResponse.json(
        { error: "Review must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Create new review (will be pending approval)
    const newReview: ProductReview = {
      id: `review_${Date.now()}`,
      title,
      content,
      rating,
      createdAt: new Date().toISOString(),
      author: {
        name: author.name,
        email: author.email,
      },
      verifiedBuyer: false,
      productName,
      productHandle,
      status: 'pending', // Reviews require admin approval
    };

    // Save to MongoDB
    await createReview({
      ...newReview,
      productId,
      productName,
      productHandle,
      featured: false,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Review submitted successfully and pending approval",
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