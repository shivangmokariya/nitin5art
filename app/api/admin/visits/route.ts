import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VisitLog from '@/models/VisitLog';

export async function GET(req: NextRequest) {
  await dbConnect();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  // Unique visits per day/month/year
  const [todayUniqueIps, monthUniqueIps, yearUniqueIps] = await Promise.all([
    VisitLog.distinct('ip', { date: { $gte: startOfDay, $lt: endOfDay } }),
    VisitLog.distinct('ip', { date: { $gte: monthStart } }),
    VisitLog.distinct('ip', { date: { $gte: yearStart } }),
  ]);

  // List of unique IPs and their visit counts (all time), use visitedAt for last visit
  const ipStats = await VisitLog.aggregate([
    {
      $group: {
        _id: '$ip',
        count: { $sum: 1 },
        lastVisit: { $max: '$visitedAt' },
      },
    },
    { $sort: { count: -1, lastVisit: -1 } },
    { $limit: 1000 }, // limit for performance
  ]);

  // Convert lastVisit to IST string for each IP, fallback to '-' if invalid
  const ipStatsIST = ipStats.map(ip => {
    let lastVisitStr = "";
    if (ip.lastVisit) {
      const d = new Date(ip.lastVisit);
      lastVisitStr = isNaN(d.getTime())
        ? ""
        : d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    }
    return {
      ...ip,
      lastVisit: lastVisitStr || "-"
    };
  });

  return NextResponse.json({
    today: todayUniqueIps.length,
    month: monthUniqueIps.length,
    year: yearUniqueIps.length,
    ipStats: ipStatsIST,
  });
} 