import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function GET(req: NextRequest) {
  await dbConnect();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  // Inquiries per day/month/year
  const [todayCount, monthCount, yearCount] = await Promise.all([
    Inquiry.countDocuments({ createdAt: { $gte: today } }),
    Inquiry.countDocuments({ createdAt: { $gte: monthStart } }),
    Inquiry.countDocuments({ createdAt: { $gte: yearStart } }),
  ]);

  return NextResponse.json({
    today: todayCount,
    month: monthCount,
    year: yearCount,
  });
} 