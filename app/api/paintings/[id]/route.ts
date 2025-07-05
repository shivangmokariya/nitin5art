import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Painting from '@/models/Painting';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    let painting;
    if (mongoose.Types.ObjectId.isValid(params.id)) {
      painting = await Painting.findById(params.id).lean();
    }
    if (!painting) {
      // Try fetching by slug
      painting = await Painting.findOne({ slug: params.id }).lean();
    }
    if (!painting) {
      return NextResponse.json(
        { error: 'Painting not found' },
        { status: 404 }
      );
    }
    // Increment view count
    await Painting.updateOne({ _id: painting._id }, { $inc: { views: 1 } });
    return NextResponse.json(painting);
  } catch (error) {
    console.error('Error fetching painting:', error);
    return NextResponse.json(
      { error: 'Failed to fetch painting' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const painting = await Painting.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!painting) {
      return NextResponse.json(
        { error: 'Painting not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(painting);
  } catch (error: any) {
    console.error('Error updating painting:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update painting' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const painting = await Painting.findByIdAndDelete(params.id);
    
    if (!painting) {
      return NextResponse.json(
        { error: 'Painting not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Painting deleted successfully' });
  } catch (error) {
    console.error('Error deleting painting:', error);
    return NextResponse.json(
      { error: 'Failed to delete painting' },
      { status: 500 }
    );
  }
} 