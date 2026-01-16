import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

/**
 * Manual revalidation endpoint for testing
 * This allows you to manually trigger cache revalidation from the admin panel
 * 
 * Usage: POST /api/admin/revalidate
 * Body: { tags: ["products", "collections"] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tags } = body;

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Tags array is required' },
        { status: 400 }
      );
    }

    // Revalidate specified tags
    const revalidated: string[] = [];
    for (const tag of tags) {
      if (Object.values(TAGS).includes(tag)) {
        revalidateTag(tag);
        revalidated.push(tag);
      }
    }

    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
      message: `Revalidated ${revalidated.length} tag(s)`
    });
  } catch (error) {
    console.error('Error in manual revalidation:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}

/**
 * Get available revalidation tags
 */
export async function GET() {
  return NextResponse.json({
    availableTags: Object.values(TAGS),
    description: 'Available cache tags for revalidation',
    usage: 'POST to this endpoint with { tags: ["products", "collections"] }'
  });
}
