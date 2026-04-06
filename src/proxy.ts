import { NextRequest, NextResponse } from "next/server";
import { authService } from "./services/auth/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicPath =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/about" ||
    pathname.startsWith("/ideas") ||
    pathname.startsWith("/blogs");

  if (isPublicPath) return NextResponse.next();

  const { data, error } = await authService.getSession();

  if (error || !data) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  const userRole = data.user?.role;

  if (!userRole) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  const roleBasedRoutes: Record<string, string[]> = {
    "/admin/dashboard/:path*": ["ADMIN"],
    "/member/dashboard/:path*": ["MEMBER"],
    "/dashboard/:path*": ["USER"],
    "/ideas/:path*": ["ADMIN", "MEMBER", "USER"],
    "/blogs/:path*": ["ADMIN", "MEMBER", "USER"],
  };
  for (const path in roleBasedRoutes) {
    const regexStr =
      "^" + path.replace(/:[^/]+\*/g, ".*").replace(/:[^/]+/g, "[^/]+") + "$";

    const dynamicPath = new RegExp(regexStr);

    if (dynamicPath.test(pathname)) {
      if (!userRole || !roleBasedRoutes[path]!.includes(userRole)) {
        if (userRole === "ADMIN") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url),
          );
        }
        if (userRole === "MEMBER") {
          return NextResponse.redirect(
            new URL("/member/dashboard", request.url),
          );
        }

        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/member/dashboard/:path*",
    "/dashboard/:path*",
    "/ideas/:path*",
    "/blogs/:path*",
  ],
};
