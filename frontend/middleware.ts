import { NextResponse, NextRequest } from "next/server";
import { 
  isProtectedRoute, 
  isAuthRoute, 
  isPublicRoute, 
  shouldSkipMiddleware,
  getRouteType
} from "./src/config/routes";

export const middleware = (request: NextRequest) => {
  const { pathname } = new URL(request.url);
  
  // Skip middleware for static files, API routes, and system files
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next();
  }

  // Check for authentication token in multiple places
  const token = 
    request.cookies.get("token")?.value || 
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    request.headers.get("x-auth-token");

  // Check if user is authenticated (has token)
  const isAuthenticated = !!token;
  
  // Debug logging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Middleware] ${pathname} - Type: ${getRouteType(pathname)}, Auth: ${isAuthenticated}`);
  }
  
  // Handle public routes first - allow access to everyone
  if (isPublicRoute(pathname)) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Middleware] Allowing access to public route: ${pathname}`);
    }
    return NextResponse.next();
  }

  // Handle auth routes - allow access to everyone, but redirect authenticated users to dashboard
  if (isAuthRoute(pathname)) {
    if (isAuthenticated) {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Middleware] Redirecting authenticated user from ${pathname} to /dashboard`);
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Middleware] Allowing access to auth route: ${pathname}`);
      }
      return NextResponse.next();
    }
  }

  // Handle protected routes - require authentication
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Middleware] Redirecting unauthenticated user from ${pathname} to /login`);
    }
    // Store the intended destination for redirect after login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("redirectTo", pathname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300 // 5 minutes
    });
    return response;
  }

  // For any other routes, allow access but let client-side handle auth
  // This allows for dynamic routes and API calls
  if (process.env.NODE_ENV === "development") {
    console.log(`[Middleware] Allowing access to unknown route: ${pathname}`);
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
