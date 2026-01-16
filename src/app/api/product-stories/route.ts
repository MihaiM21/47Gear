import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { 
  getProductStory, 
  getAllProductStories, 
  saveProductStory, 
  deleteProductStory 
} from "@/lib/models/product-story";

// GET /api/product-stories?handle=product-handle
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (handle) {
      // Get specific product story
      const story = await getProductStory(handle);
      // Remove MongoDB _id from response
      const cleanStory = story ? { ...story, _id: undefined } : null;
      return NextResponse.json({ story: cleanStory });
    } else {
      // Get all stories (for admin)
      const stories = await getAllProductStories();
      // Remove MongoDB _id from responses
      const cleanStories = stories.map(({ _id, ...story }) => story);
      return NextResponse.json({ stories: cleanStories });
    }
  } catch (error) {
    console.error("Error fetching product stories:", error);
    return NextResponse.json(
      { error: "Failed to fetch product stories" },
      { status: 500 }
    );
  }
}

// POST /api/product-stories (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productHandle, productTitle, story } = body;

    if (!productHandle || !story) {
      return NextResponse.json(
        { error: "Product handle and story are required" },
        { status: 400 }
      );
    }

    const productStory = {
      productHandle,
      productTitle: productTitle || productHandle,
      story,
      lastUpdated: new Date().toISOString(),
    };

    const savedStory = await saveProductStory(productStory);

    return NextResponse.json({ 
      success: true,
      story: { ...savedStory, _id: undefined }
    });
  } catch (error) {
    console.error("Error saving product story:", error);
    return NextResponse.json(
      { error: "Failed to save product story" },
      { status: 500 }
    );
  }
}

// DELETE /api/product-stories?handle=product-handle (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json(
        { error: "Product handle is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteProductStory(handle);
    
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting product story:", error);
    return NextResponse.json(
      { error: "Failed to delete product story" },
      { status: 500 }
    );
  }
}
