import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nextBasicAuthMiddleware } from 'nextjs-basic-auth-middleware';

export function middleware(request: NextRequest) {
  const response = nextBasicAuthMiddleware(
    {
      users: [
        {
          name: process.env.AUTH_USER!,
          password: process.env.AUTH_PASS!,
        },
      ],
    },
    request
  );

  if (response) {
    return response;
  }


  const acceptHeader = request.headers.get('accept');
  if (acceptHeader && acceptHeader.includes('text/x-component')) {
    return NextResponse.next();
  }


  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
