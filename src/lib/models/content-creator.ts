import { Collection, ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface ContentCreatorDocument {
  _id?: ObjectId;
  name: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    youtube?: string;
    twitch?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getContentCreatorsCollection(): Promise<Collection<ContentCreatorDocument>> {
  const db = await getDatabase();
  return db.collection<ContentCreatorDocument>('content-creators');
}

/**
 * Get all content creators
 */
export async function getAllContentCreators(featuredOnly: boolean = false): Promise<ContentCreatorDocument[]> {
  try {
    const collection = await getContentCreatorsCollection();
    const query = featuredOnly ? { featured: true } : {};
    
    const creators = await collection
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return creators;
  } catch (error) {
    console.error('Error fetching content creators:', error);
    return [];
  }
}

/**
 * Get a content creator by ID
 */
export async function getContentCreatorById(id: string): Promise<ContentCreatorDocument | null> {
  try {
    const collection = await getContentCreatorsCollection();
    const creator = await collection.findOne({ _id: new ObjectId(id) });
    return creator;
  } catch (error) {
    console.error('Error fetching content creator:', error);
    return null;
  }
}

/**
 * Create a new content creator
 */
export async function createContentCreator(
  data: Omit<ContentCreatorDocument, '_id' | 'createdAt' | 'updatedAt'>
): Promise<ObjectId> {
  try {
    const collection = await getContentCreatorsCollection();
    const now = new Date();
    
    const result = await collection.insertOne({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    return result.insertedId;
  } catch (error) {
    console.error('Error creating content creator:', error);
    throw error;
  }
}

/**
 * Update a content creator
 */
export async function updateContentCreator(
  id: string,
  data: Partial<Omit<ContentCreatorDocument, '_id' | 'createdAt'>>
): Promise<boolean> {
  try {
    const collection = await getContentCreatorsCollection();
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating content creator:', error);
    throw error;
  }
}

/**
 * Delete a content creator
 */
export async function deleteContentCreator(id: string): Promise<boolean> {
  try {
    const collection = await getContentCreatorsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting content creator:', error);
    throw error;
  }
}
