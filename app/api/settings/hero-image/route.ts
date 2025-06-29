import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSetting from '@/models/SiteSetting';

export async function GET() {
  await dbConnect();
  const setting = await SiteSetting.findOne();
  return NextResponse.json({ heroImageUrl: setting?.heroImageUrl || '' });
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { heroImageUrl } = await request.json();
  let setting = await SiteSetting.findOne();
  if (!setting) {
    setting = new SiteSetting({ heroImageUrl });
  } else {
    setting.heroImageUrl = heroImageUrl;
  }
  await setting.save();
  return NextResponse.json({ success: true, heroImageUrl });
} 