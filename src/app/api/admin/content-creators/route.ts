import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
  getAllContentCreators,
  getContentCreatorById,
  createContentCreator,
  updateContentCreator,
  deleteContentCreator,
  ContentCreatorDocument,
} from '@/lib/models/content-creator';

/**
 * GET /api/admin/content-creators
 * Get all content creators
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const creator = await getContentCreatorById(id);
      if (!creator) {
        return NextResponse.json(
          { error: 'Content creator not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ creator });
    }

    const creators = await getAllContentCreators();
    return NextResponse.json({ creators });
  } catch (error) {
    console.error('Error in GET /api/admin/content-creators:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/content-creators
 * Create a new content creator
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, bio, imageUrl, socialLinks, featured, order } = body;

    // Validation
    if (!name || !bio || !imageUrl) {
      return NextResponse.json(
        { error: 'Name, bio, and image URL are required' },
        { status: 400 }
      );
    }

    const creatorData: Omit<ContentCreatorDocument, '_id' | 'createdAt' | 'updatedAt'> = {
      name: name.trim(),
      bio: bio.trim(),
      imageUrl: imageUrl.trim(),
      socialLinks: socialLinks || {},
      featured: featured || false,
      order: order || 0,
    };

    const creatorId = await createContentCreator(creatorData);

    return NextResponse.json(
      {
        success: true,
        message: 'Content creator created successfully',
        id: creatorId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/admin/content-creators:', error);
    return NextResponse.json(
      { error: 'Failed to create content creator' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/content-creators
 * Update an existing content creator
 */
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, bio, imageUrl, socialLinks, featured, order } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Content creator ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<Omit<ContentCreatorDocument, '_id' | 'createdAt'>> = {};
    
    if (name !== undefined) updateData.name = name.trim();
    if (bio !== undefined) updateData.bio = bio.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl.trim();
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
    if (featured !== undefined) updateData.featured = featured;
    if (order !== undefined) updateData.order = order;

    const success = await updateContentCreator(id, updateData);

    if (!success) {
      return NextResponse.json(
        { error: 'Content creator not found or no changes made' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Content creator updated successfully',
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/content-creators:', error);
    return NextResponse.json(
      { error: 'Failed to update content creator' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/content-creators
 * Delete a content creator
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content creator ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteContentCreator(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Content creator not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Content creator deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/content-creators:', error);
    return NextResponse.json(
      { error: 'Failed to delete content creator' },
      { status: 500 }
    );
  }
}
