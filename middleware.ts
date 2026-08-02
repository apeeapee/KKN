import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'banyuurip_admin_token';
const ADMIN_SECRET_TOKEN = 'banyuurip_admin_secret_session_2026';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (adminToken !== ADMIN_SECRET_TOKEN) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
