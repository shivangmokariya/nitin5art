import { NextRequest, NextResponse } from 'next/server';
import { migrateCategories } from '@/lib/migrateCategories';

export async function POST(request: NextRequest) {
  try {
    // Check if it's an admin request (you might want to add proper authentication)
    const { secret } = await request.json();
    
    if (secret !== (process.env.MIGRATION_SECRET || 'migrate-categories-2024')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await migrateCategories();
    
    return NextResponse.json({
      success: true,
      message: 'Category migration completed successfully'
    });
    
  } catch (error: any) {
    console.error('Migration API error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error.message },
      { status: 500 }
    );
  }
} 