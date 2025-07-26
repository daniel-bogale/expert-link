import { NextResponse, NextRequest } from "next/server";

const studentPrivateRoutes = ["/dashboard"];
const instructorPrivateRoutes = [
  "/courses",
  "/analytics",
  "/email-verification",
];

const sharedPrivateRoutes = ["/auth/signout", "/email-verification"];

export const middleware = (request: NextRequest) => {
  const userCookie = request.cookies.get("user");
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch {}
  }
  const { pathname } = new URL(request.url);
  const privateHomePage = "/dashboard"

  const isPrivateRoute = [
    ...studentPrivateRoutes,
    ...instructorPrivateRoutes,
    ...sharedPrivateRoutes,
  ].some((route) => pathname.startsWith(route));

  if (!user && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (user && !isPrivateRoute) {
    return NextResponse.redirect(new URL(privateHomePage, request.url));
  } else if (user && isPrivateRoute) {
    if (
      (user.type === "user" &&
        instructorPrivateRoutes.some((route) => pathname.startsWith(route))) ||
      (user.type === "instructor" &&
        studentPrivateRoutes.some((route) => pathname.startsWith(route)))
    ) {
      return NextResponse.redirect(new URL(privateHomePage, request.url));
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:path*",
    "/analytics/:path*",
    "/login",
    "/signup",
    // "/",
  ],
};
