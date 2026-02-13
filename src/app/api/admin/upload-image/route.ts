import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Check if we should use Cloudinary
const USE_CLOUDINARY = process.env.CLOUDINARY_CLOUD_NAME && 
                       process.env.CLOUDINARY_API_KEY && 
                       process.env.CLOUDINARY_API_SECRET;

/**
 * POST /api/admin/upload-image
 * Upload an image file to Cloudinary or local filesystem
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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary if configured
    if (USE_CLOUDINARY) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      
      // Use unsigned upload (no signature needed) - simpler and works with free tier
      const uploadPreset = 'ml_default'; // Default unsigned preset
      
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Image,
            upload_preset: uploadPreset,
            folder: 'content-creators',
          }),
        }
      );

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        console.error('Cloudinary upload error:', error);
        throw new Error(`Failed to upload to Cloudinary: ${error.error?.message || 'Unknown error'}`);
      }

      const result = await uploadResponse.json();
      return NextResponse.json({
        success: true,
        imageUrl: result.secure_url,
        message: 'Image uploaded successfully to Cloudinary',
      });
    }

    // Fallback to local storage (for development)
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${originalName}`;

    const uploadDir = path.join(process.cwd(), 'public', 'content-creators');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, new Uint8Array(buffer));

    const imageUrl = `/content-creators/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      message: 'Image uploaded successfully (local storage)',
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
