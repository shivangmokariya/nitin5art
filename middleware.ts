import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude /admin/login and /admin/migrate from auth check
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    pathname !== '/admin/migrate'
  ) {
    const token = request.cookies.get('auth-token');
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 