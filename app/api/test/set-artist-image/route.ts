import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSetting from '@/models/SiteSetting';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Set a test artist image using one of the existing images
    const testImageUrl = '/uploads/1751200282162-download.jpg';
    
    let setting = await SiteSetting.findOne();
    if (!setting) {
      setting = new SiteSetting({ 
        artistImageUrl: testImageUrl,
        artistName: 'Test Artist',
        artistExperience: '5+ Years Experience',
        aboutText: 'This is a test artist profile for debugging purposes.'
      });
    } else {
      setting.artistImageUrl = testImageUrl;
      setting.artistName = 'Test Artist';
      setting.artistExperience = '5+ Years Experience';
      setting.aboutText = 'This is a test artist profile for debugging purposes.';
    }
    
    await setting.save();
    
    console.log('Test artist image set:', setting);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Test artist image set successfully',
      artistImageUrl: setting.artistImageUrl
    });
  } catch (error) {
    console.error('Error setting test artist image:', error);
    return NextResponse.json(
      { error: 'Failed to set test artist image' },
      { status: 500 }
    );
  }
} 