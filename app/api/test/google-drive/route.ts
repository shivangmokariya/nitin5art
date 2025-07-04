import { NextResponse } from 'next/server';
import { testGoogleDriveConnection } from '@/lib/googleDriveUpload';

export async function GET() {
  try {
    const result = await testGoogleDriveConnection();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        details: result.details
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message,
        details: result.details
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Google Drive test endpoint error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to test Google Drive connection',
      error: error.message
    }, { status: 500 });
  }
} 