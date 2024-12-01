import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/checkout', '/card', '/profile', '/login', '/register'], // Define routes for middleware
};

export function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;

  const privateRoutes =  ['/checkout', '/card', '/profile'];
  const publicRoutes = ['/login', '/register', '/'];

  const pathname = request.nextUrl.pathname;

  if (privateRoutes.includes(pathname)) {
    // Redirect to login if token is missing
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (publicRoutes.includes(pathname)) {
    // Redirect to dashboard if logged in
    if (token) {
      const dashboardUrl = new URL('/', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Allow access to route
  return NextResponse.next();
}
