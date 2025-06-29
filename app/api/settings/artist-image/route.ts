import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSetting from '@/models/SiteSetting';
import { checkDatabase } from '@/lib/checkDb';

export async function GET() {
  try {
    await dbConnect();
    
    // Debug: Check database contents
    const dbCheck = await checkDatabase();
    console.log('Database check result:', dbCheck);
    
    const setting = await SiteSetting.findOne();
    console.log('SiteSetting from database:', setting); // Debug log
    
    const response = {
      artistImageUrl: setting?.artistImageUrl || '/uploads/default-artist.jpg',
      artistName: setting?.artistName || 'Professional Artist',
      artistExperience: setting?.artistExperience || '15+ Years Experience',
      aboutText: setting?.aboutText || 'With over 15 years of experience in paint sketch artistry, I\'ve dedicated my life to capturing the world\'s beauty through color and texture. Each piece is created with passion and attention to detail, ensuring that every artwork tells a unique story.'
    };
    
    console.log('API response:', response); // Debug log
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching artist image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist image' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { artistImageUrl, artistName, artistExperience, aboutText } = await request.json();
    console.log('POST request data:', { artistImageUrl, artistName, artistExperience, aboutText }); // Debug log
    
    let setting = await SiteSetting.findOne();
    if (!setting) {
      setting = new SiteSetting({ 
        artistImageUrl, 
        artistName, 
        artistExperience, 
        aboutText 
      });
    } else {
      if (artistImageUrl !== undefined) setting.artistImageUrl = artistImageUrl;
      if (artistName !== undefined) setting.artistName = artistName;
      if (artistExperience !== undefined) setting.artistExperience = artistExperience;
      if (aboutText !== undefined) setting.aboutText = aboutText;
    }
    await setting.save();
    
    const response = { 
      success: true, 
      artistImageUrl: setting.artistImageUrl,
      artistName: setting.artistName,
      artistExperience: setting.artistExperience,
      aboutText: setting.aboutText
    };
    
    console.log('POST response:', response); // Debug log
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating artist image:', error);
    return NextResponse.json(
      { error: 'Failed to update artist image' },
      { status: 500 }
    );
  }
} 