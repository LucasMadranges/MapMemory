import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') || // Next.js internals
    pathname.startsWith('/api') || // API routes
    pathname.includes('.') || // Fichiers avec extension (.css, .js, .png, etc.)
    pathname.startsWith('/favicon') // Favicon
  ) {
    return NextResponse.next();
  }

  if (!token && !pathname.startsWith('/login')) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', 'unauthorized');
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Exclut les assets Next.js
  ],
};
