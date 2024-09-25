import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request?.url?.includes("customer-order")) {
    if (request?.cookies?.get("user_type")?.value === "customer") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/customer/login', request.url))
    }
  } else if (request?.cookies?.get("token")?.value && request?.cookies?.get("user_type")?.value === "restaurant" && !request?.url?.includes("super")) {
    return NextResponse.next();
  } else if (request?.cookies?.get("token")?.value && request?.cookies?.get("user_type")?.value === "SUPERADMIN" && request?.url?.includes("super")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: [
    '/admin',
    '/admin/(.*)',
    '/admin/:path*',
    '/superadmin',
    '/superadmin/(.*)',
    '/superadmin/:path*',
    '/customer-order'
  ]
}