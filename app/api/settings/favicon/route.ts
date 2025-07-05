import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteSetting from '@/models/SiteSetting';

export async function GET() {
  await dbConnect();
  const settings = await SiteSetting.findOne();
  return NextResponse.json({ faviconUrl: settings?.faviconUrl || '' });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { faviconUrl } = await req.json();
  console.log(faviconUrl,"<faviconUrl")
  let settings = await SiteSetting.findOne();
  // console.log(settings,"<settings")
  if (!settings) {
    settings = new SiteSetting({ faviconUrl });
  } else {
    settings.faviconUrl = faviconUrl;
  }
  console.log(settings,"<settings")
  await settings.save();
  return NextResponse.json({ success: true, faviconUrl });
} 