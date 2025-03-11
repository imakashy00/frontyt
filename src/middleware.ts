import { NextRequest, NextResponse } from 'next/server';

// const publicRoutes = ["/", "/terms", "/privacy-policy"];
export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  const accessToken = req.cookies.get("access_token")?.value || null;

  const isProtectedRoute = path.startsWith("/dashboard");

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (path === "/" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Allow public routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
