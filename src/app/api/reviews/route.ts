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
    const { productId, productName, productHandle, rating, title, content, author, customerAccessToken } = body;

    // Validate customer authentication
    if (!customerAccessToken) {
      return NextResponse.json(
        { error: "Authentication required. Please log in to submit a review." },
        { status: 401 }
      );
    }

    // Verify token and get customer info from Shopify
    let verifiedCustomerName = author;
    try {
      const shopifyResponse = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
          },
          body: JSON.stringify({
            query: `
              query getCustomer($customerAccessToken: String!) {
                customer(customerAccessToken: $customerAccessToken) {
                  firstName
                  lastName
                  email
                }
              }
            `,
            variables: { customerAccessToken },
          }),
        }
      );

      const { data } = await shopifyResponse.json();

      if (!data?.customer) {
        return NextResponse.json(
          { error: "Invalid or expired session. Please log in again." },
          { status: 401 }
        );
      }

      // Use verified customer name from Shopify
      verifiedCustomerName = `${data.customer.firstName} ${data.customer.lastName}`.trim();
    } catch (err) {
      console.error('Error verifying customer token:', err);
      return NextResponse.json(
        { error: "Failed to verify authentication" },
        { status: 401 }
      );
    }

    // Validation
    if (!productId || !rating || !title || !content) {
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

    // Create new review
    const newReview: ProductReview = {
      id: `review_${Date.now()}`,
      title,
      content,
      rating,
      createdAt: new Date().toISOString(),
      author: {
        name: verifiedCustomerName,
      },
      verifiedBuyer: true, // Always true since we verified the token
      productName,
      productHandle,
    };

    // Save to MongoDB
    await createReview({
      ...newReview,
      productId,
      productName,
      productHandle,
      featured: false,
    });

    // Get updated statistics
    const updatedReviews = await getProductReviews(productId);

    return NextResponse.json(
      { 
        success: true, 
        review: newReview,
        averageRating: updatedReviews.averageRating,
        totalReviews: updatedReviews.totalReviews
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