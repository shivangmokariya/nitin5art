import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Painting from '@/models/Painting';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '12');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    let query: any = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const paintings = await Painting.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Painting.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      paintings,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching paintings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paintings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const painting = await Painting.create(body);
    
    return NextResponse.json(painting, { status: 201 });
  } catch (error: any) {
    console.error('Error creating painting:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create painting' },
      { status: 500 }
    );
  }
} 