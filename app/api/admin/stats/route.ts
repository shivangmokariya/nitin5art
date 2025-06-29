import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Painting from '@/models/Painting';
import Inquiry from '@/models/Inquiry';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get counts
    const totalPaintings = await Painting.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const featuredPaintings = await Painting.countDocuments({ featured: true });
    
    // Get total views
    const paintings = await Painting.find({}, 'views');
    const totalViews = paintings.reduce((sum, painting) => sum + (painting.views || 0), 0);
    
    return NextResponse.json({
      totalPaintings,
      totalInquiries,
      totalViews,
      featuredPaintings,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 