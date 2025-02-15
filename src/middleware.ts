import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/'

  const token = request.cookies.get('token')?.value || ''

  // Redirect to login if accessing protected route without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to features if accessing auth pages with valid token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/features', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/features',
    '/features/:path*',
    '/login',
    '/signup'
  ]
} 