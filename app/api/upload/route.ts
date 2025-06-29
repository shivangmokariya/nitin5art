import { NextRequest, NextResponse } from 'next/server';
import { uploadToGoogleDrive } from '@/lib/googleDriveUpload';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  // Parse multipart form data
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = file.name;
  const mimetype = file.type;

  try {
    const url = await uploadToGoogleDrive(buffer, filename, mimetype);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to upload to Google Drive',
      details: error instanceof Error ? error?.message : String(error)
    }, { status: 500 });
  }
} 