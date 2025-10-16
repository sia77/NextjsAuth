import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define routes that don't require authentication
  const publicPaths = ['/login', '/signup', '/verifyemail', '/forgotpassword']

  // Read token from cookies
  const token = request.cookies.get('token')?.value

  const isPublicPath = publicPaths.includes(path)
  const isAuthPath = !isPublicPath

  //If user is logged in and tries to visit a public route → redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is not logged in and tries to visit a protected route → redirect to login
  if (!token && isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  //Allow the request
  return NextResponse.next()
}

// Apply middleware to selected routes
export const config = {
  matcher: [
    '/', 
    '/profile/:path*', 
    '/login', 
    '/signup', 
    '/verifyemail', 
    '/forgotpassword'
  ],
}
