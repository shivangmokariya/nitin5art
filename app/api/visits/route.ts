import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VisitLog from '@/models/VisitLog';

// Simple in-memory rate limiter (per IP, per minute)
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 10; // max 10 requests per minute per IP

function getClientIp(req: NextRequest): string {
  // Try to get the real IP from headers (for proxies), fallback to remote address
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.ip ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const ip = getClientIp(req);
  const userAgent = req.headers.get('user-agent') || '';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // --- Rate limiting ---
  const rl = rateLimitMap.get(ip) || { count: 0, lastRequest: 0 };
  const nowTs = Date.now();
  if (nowTs - rl.lastRequest < 60 * 1000) {
    if (rl.count >= RATE_LIMIT) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    rl.count++;
  } else {
    rl.count = 1;
    rl.lastRequest = nowTs;
  }
  rateLimitMap.set(ip, rl);
  // --- End rate limiting ---

  // Only log if not already logged today
  try {
    await VisitLog.updateOne(
      { ip, date: today },
      { $setOnInsert: { ip, userAgent, date: today } },
      { upsert: true }
    );
  } catch (err) {
    // Ignore duplicate key errors (already logged today)
  }

  // Return stats
  const [todayCount, monthCount, yearCount] = await Promise.all([
    VisitLog.countDocuments({ date: today }),
    VisitLog.countDocuments({
      date: { $gte: new Date(now.getFullYear(), now.getMonth(), 1) },
    }),
    VisitLog.countDocuments({
      date: { $gte: new Date(now.getFullYear(), 0, 1) },
    }),
  ]);

  return NextResponse.json({
    success: true,
    ip,
    today: todayCount,
    month: monthCount,
    year: yearCount,
  });
} 