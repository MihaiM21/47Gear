import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProduct } from "@/lib/shopify";
import { NextRequest, NextResponse } from "next/server";
import { 
  getAllReviews, 
  getFeaturedReviews, 
  deleteReview, 
  updateReview, 
  setReviewFeatured,
  getReviewsByProduct,
  getProductReviews,
  getPendingReviews,
  updateReviewStatus
} from "@/lib/models/review";
import { ReviewDocument } from "@/lib/models/review";

// Extract product handle from various ID formats
function extractProductHandle(productId: string): string | null {
  // If it's already a handle (no special characters), return it
  if (!productId.includes('gid') && !productId.includes('_')) {
    return productId;
  }
  
  // Try to extract from Shopify GUID format
  // Format: gid://shopify/Product/123 or gid___shopify_Product_123
  const guidMatch = productId.match(/Product[_/](\d+)/);
  if (guidMatch) {
    return null; // We have an ID but no handle
  }
  
  return null;
}

// Get product info from cache or fetch
const productCache = new Map<string, { title: string; handle: string } | null>();

async function getProductInfo(productId: string): Promise<{ title: string; handle: string } | null> {
  if (productCache.has(productId)) {
    return productCache.get(productId) || null;
  }

  try {
    // Try to find product handle from review data
    const allReviews = await getAllReviews();
    const reviewWithHandle = allReviews.find(
      r => r.productId === productId && r.productHandle
    );
    
    if (reviewWithHandle?.productHandle) {
      const product = await getProduct(reviewWithHandle.productHandle);
      if (product) {
        const info = { title: product.title, handle: product.handle };
        productCache.set(productId, info);
        return info;
      }
    }
    
    // If no handle found, return a formatted version of the ID
    const formatted = productId.replace(/gid___shopify_Product_/, 'Product #');
    const info = { title: formatted, handle: '' };
    productCache.set(productId, info);
    return info;
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
}

// GET /api/admin/reviews - Get all reviews across all products
export async function GET(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await isAdminAuthenticated(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action");

    // Get featured reviews only
    if (action === "featured") {
      const featured = await getFeaturedReviews();
      const cleanFeatured = featured.map(({ _id, ...review }) => review);
      return NextResponse.json({
        reviewIds: cleanFeatured.map(r => r.id),
        reviews: cleanFeatured
      });
    }

    // Get pending reviews only
    if (action === "pending") {
      const pending = await getPendingReviews();
      const cleanPending = pending.map(({ _id, ...review }) => review);
      return NextResponse.json({
        reviews: cleanPending,
        totalPending: cleanPending.length
      });
    }

    // Get all reviews grouped by product
    const reviewsByProduct = await getReviewsByProduct();
    
    // Get all reviews flattened
    const allReviewsRaw = await getAllReviews();
    
    // Transform to match expected format
    const products = reviewsByProduct.map(({ productId, reviews }) => ({
      productId,
      ...reviews
    }));

    const flattenedReviews = allReviewsRaw.map(({ _id, ...review }) => review);

    return NextResponse.json({
      products,
      reviews: flattenedReviews,
      totalReviews: flattenedReviews.length,
      featuredCount: flattenedReviews.filter(r => r.featured).length,
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reviews - Delete a specific review
export async function DELETE(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await isAdminAuthenticated(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");
    const reviewId = searchParams.get("reviewId");

    if (!productId || !reviewId) {
      return NextResponse.json(
        { error: "Product ID and Review ID are required" },
        { status: 400 }
      );
    }

    // Delete the review from MongoDB
    const deleted = await deleteReview(reviewId);
    
    if (!deleted) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Get updated reviews for this product
    const updatedReviews = await getProductReviews(productId);

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
      totalReviews: updatedReviews.totalReviews,
      averageRating: updatedReviews.averageRating,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/reviews - Update review (for moderation, verification, etc.)
export async function PATCH(request: NextRequest) {
  // Check authentication
  const isAuthenticated = await isAdminAuthenticated(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { productId, reviewId, updates } = body;

    if (!productId || !reviewId || !updates) {
      return NextResponse.json(
        { error: "Product ID, Review ID, and updates are required" },
        { status: 400 }
      );
    }

    // Handle featured status separately if present
    if ('featured' in updates) {
      try {
        await setReviewFeatured(reviewId, updates.featured);
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message || "Failed to update featured status" },
          { status: 400 }
        );
      }
    }

    // Update other review properties
    const updateData: Partial<ReviewDocument> = { ...updates };
    delete updateData.featured; // Remove featured since we handled it separately
    
    if (Object.keys(updateData).length > 0) {
      await updateReview(reviewId, updateData);
    }

    // Get updated reviews for this product
    const updatedReviews = await getProductReviews(productId);
    
    // Get the updated review
    const allReviews = await getAllReviews();
    const review = allReviews.find(r => r.id === reviewId);

    return NextResponse.json({
      success: true,
      review: review ? { ...review, _id: undefined } : null,
      averageRating: updatedReviews.averageRating,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
