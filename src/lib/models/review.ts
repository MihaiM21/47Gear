import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';
import { ProductReview, ProductReviews } from '../shopify/types';

export interface ReviewDocument extends ProductReview {
  _id?: ObjectId;
  productId: string;
  productName?: string;
  productHandle?: string;
  featured?: boolean;
}

export async function getReviewsCollection(): Promise<Collection<ReviewDocument>> {
  const db = await getDatabase();
  return db.collection<ReviewDocument>('reviews');
}

/**
 * Get all reviews for a specific product (only approved reviews)
 */
export async function getProductReviews(productId: string): Promise<ProductReviews> {
  try {
    const collection = await getReviewsCollection();
    const reviews = await collection
      .find({ 
        productId,
        $or: [
          { status: 'approved' },
          { status: { $exists: false } } // Include old reviews without status field
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();

    const reviewsWithoutId = reviews.map(({ _id, productId, productName, productHandle, featured, ...review }) => review as ProductReview);

    const averageRating = calculateAverageRating(reviewsWithoutId);

    return {
      reviews: reviewsWithoutId,
      averageRating,
      totalReviews: reviewsWithoutId.length,
    };
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }
}

/**
 * Create a new review
 */
export async function createReview(review: Omit<ReviewDocument, '_id'>): Promise<ReviewDocument> {
  const collection = await getReviewsCollection();
  const result = await collection.insertOne(review);
  return { ...review, _id: result.insertedId };
}

/**
 * Update a review
 */
export async function updateReview(reviewId: string, updates: Partial<ReviewDocument>): Promise<boolean> {
  const collection = await getReviewsCollection();
  const result = await collection.updateOne(
    { id: reviewId },
    { $set: updates }
  );
  return result.modifiedCount > 0;
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string): Promise<boolean> {
  const collection = await getReviewsCollection();
  const result = await collection.deleteOne({ id: reviewId });
  return result.deletedCount > 0;
}

/**
 * Get all reviews across all products
 */
export async function getAllReviews(): Promise<ReviewDocument[]> {
  const collection = await getReviewsCollection();
  return await collection.find({}).sort({ createdAt: -1 }).toArray();
}

/**
 * Get pending reviews (awaiting admin approval)
 */
export async function getPendingReviews(): Promise<ReviewDocument[]> {
  const collection = await getReviewsCollection();
  return await collection.find({ status: 'pending' }).sort({ createdAt: -1 }).toArray();
}

/**
 * Update review status (approve/reject)
 */
export async function updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Promise<boolean> {
  const collection = await getReviewsCollection();
  const result = await collection.updateOne(
    { id: reviewId },
    { $set: { status, updatedAt: new Date().toISOString() } }
  );
  return result.modifiedCount > 0;
}

/**
 * Get featured reviews
 */
export async function getFeaturedReviews(): Promise<ReviewDocument[]> {
  const collection = await getReviewsCollection();
  return await collection.find({ featured: true }).sort({ createdAt: -1 }).limit(10).toArray();
}

/**
 * Set featured status for a review
 */
export async function setReviewFeatured(reviewId: string, featured: boolean): Promise<boolean> {
  const collection = await getReviewsCollection();
  
  // If setting to featured, check if we already have 10 featured reviews
  if (featured) {
    const featuredCount = await collection.countDocuments({ featured: true });
    if (featuredCount >= 10) {
      throw new Error('Maximum 10 featured reviews allowed');
    }
  }
  
  const result = await collection.updateOne(
    { id: reviewId },
    { $set: { featured } }
  );
  
  return result.modifiedCount > 0;
}

/**
 * Calculate average rating
 */
function calculateAverageRating(reviews: ProductReview[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Get reviews grouped by product
 */
export async function getReviewsByProduct(): Promise<Array<{ productId: string; reviews: ProductReviews }>> {
  const collection = await getReviewsCollection();
  const allReviews = await collection.find({}).toArray();
  
  // Group by productId
  const grouped = allReviews.reduce((acc, review) => {
    if (!acc[review.productId]) {
      acc[review.productId] = [];
    }
    acc[review.productId].push(review);
    return acc;
  }, {} as Record<string, ReviewDocument[]>);
  
  // Transform to desired format
  return Object.entries(grouped).map(([productId, reviews]) => {
    const reviewsWithoutId = reviews.map(({ _id, productId, productName, productHandle, featured, ...review }) => review as ProductReview);
    return {
      productId,
      reviews: {
        reviews: reviewsWithoutId,
        averageRating: calculateAverageRating(reviewsWithoutId),
        totalReviews: reviewsWithoutId.length,
      },
    };
  });
}
