import { NextRequest, NextResponse } from "next/server";
import { authService } from "./services/auth/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const publicPaths = ["/", "/login", "/signup", "/tutors", "/contact"];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const { data, error } = await authService.getSession();

  if (error || !data) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  const userRole = data.user?.role;
  console.log(userRole);

  // const roleBasedRoutes: Record<string, string[]> = {
  //   "/dashboard": ["ADMIN", "TUTOR", "STUDENT"],
  //   "/dashboard/admin/:path*": ["ADMIN"],
  //   "/dashboard/tutor/:path*": ["TUTOR"],
  //   "/dashboard/student/:path*": ["STUDENT"],
  //   "/tutors/:id": ["ADMIN", "TUTOR", "STUDENT"],
  // };

  // for (const path in roleBasedRoutes) {
  //   const regexStr =
  //     "^" + path.replace(/:[^/]+\*/g, ".*").replace(/:[^/]+/g, "[^/]+") + "$";

  //   const dynamicPath = new RegExp(regexStr);

  //   if (dynamicPath.test(pathname)) {
  //     if (!roleBasedRoutes[path].includes(userRole)) {
  //       return NextResponse.redirect(
  //         new URL(`/login?redirect=${pathname}`, request.url),
  //       );
  //     }
  //     return NextResponse.next();
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tutors/:path*"],
};
