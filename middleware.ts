import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'banyuurip_admin_token';
const ADMIN_SECRET_TOKEN = 'banyuurip_admin_secret_session_2026';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  // Protect /admin routes - redirect to /login if not authenticated
  if (pathname.startsWith('/admin')) {
    if (adminToken !== ADMIN_SECRET_TOKEN) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in as admin and visiting /login page, redirect straight to /admin
  if (pathname === '/login') {
    if (adminToken === ADMIN_SECRET_TOKEN) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
