import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VisitLog from '@/models/VisitLog';

export async function GET(req: NextRequest) {
  await dbConnect();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  // Visits per day/month/year
  const [todayCount, monthCount, yearCount] = await Promise.all([
    VisitLog.countDocuments({ date: today }),
    VisitLog.countDocuments({ date: { $gte: monthStart } }),
    VisitLog.countDocuments({ date: { $gte: yearStart } }),
  ]);

  // List of unique IPs and their visit counts
  const ipStats = await VisitLog.aggregate([
    {
      $group: {
        _id: '$ip',
        count: { $sum: 1 },
        lastVisit: { $max: '$date' },
      },
    },
    { $sort: { count: -1, lastVisit: -1 } },
    { $limit: 1000 }, // limit for performance
  ]);

  return NextResponse.json({
    today: todayCount,
    month: monthCount,
    year: yearCount,
    ipStats,
  });
} 