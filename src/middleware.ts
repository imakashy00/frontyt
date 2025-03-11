import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/terms", "/privacy-policy"];
export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const accessToken = req.cookies.get("access_token")?.value || null;
  const refreshToken = req.cookies.get("refresh_token")?.value || null;
  if (
    publicRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  ) {
    return NextResponse.next();
  }

  const isProtectedRoute = path.startsWith("/dashboard");

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (path === "/" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Allow public routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
