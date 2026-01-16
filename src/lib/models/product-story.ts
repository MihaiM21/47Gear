import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface ProductStoryDocument {
  _id?: ObjectId;
  productHandle: string;
  productTitle: string;
  story: string;
  lastUpdated: string;
}

export async function getProductStoriesCollection(): Promise<Collection<ProductStoryDocument>> {
  const db = await getDatabase();
  return db.collection<ProductStoryDocument>('product_stories');
}

/**
 * Get a product story by handle
 */
export async function getProductStory(handle: string): Promise<ProductStoryDocument | null> {
  try {
    const collection = await getProductStoriesCollection();
    return await collection.findOne({ productHandle: handle });
  } catch (error) {
    console.error(`Error fetching story for ${handle}:`, error);
    return null;
  }
}

/**
 * Get all product stories
 */
export async function getAllProductStories(): Promise<ProductStoryDocument[]> {
  try {
    const collection = await getProductStoriesCollection();
    return await collection.find({}).sort({ lastUpdated: -1 }).toArray();
  } catch (error) {
    console.error('Error fetching all stories:', error);
    return [];
  }
}

/**
 * Save or update a product story
 */
export async function saveProductStory(story: Omit<ProductStoryDocument, '_id'>): Promise<ProductStoryDocument> {
  const collection = await getProductStoriesCollection();
  
  const result = await collection.findOneAndUpdate(
    { productHandle: story.productHandle },
    { $set: story },
    { upsert: true, returnDocument: 'after' }
  );
  
  return result as ProductStoryDocument;
}

/**
 * Delete a product story
 */
export async function deleteProductStory(handle: string): Promise<boolean> {
  const collection = await getProductStoriesCollection();
  const result = await collection.deleteOne({ productHandle: handle });
  return result.deletedCount > 0;
}
