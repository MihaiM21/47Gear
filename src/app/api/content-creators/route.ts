import { NextRequest, NextResponse } from 'next/server';
import { getAllContentCreators } from '@/lib/models/content-creator';

/**
 * GET /api/content-creators
 * Public endpoint to get featured content creators
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    const creators = await getAllContentCreators(featured);

    return NextResponse.json({
      creators: creators.map(creator => ({
        id: creator._id?.toString(),
        name: creator.name,
        bio: creator.bio,
        imageUrl: creator.imageUrl,
        socialLinks: creator.socialLinks,
      })),
    });
  } catch (error) {
    console.error('Error in GET /api/content-creators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content creators' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
