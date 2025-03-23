import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import next from "next";

function authMiddleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token");
  const locale = request.nextUrl.pathname.slice(0, 3);
  const pathname = request.nextUrl.pathname.slice(3);

  if (!access_token && pathname !== "/auth" && pathname !== "") {
    return NextResponse.redirect(new URL(`${locale}/auth`, request.url));
  }

  if ((pathname === "/auth" || pathname == "") && access_token) {
    return NextResponse.redirect(new URL(`${locale}/home`, request.url));
  }

  return NextResponse.next();
}

const i18nMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const authResponse = authMiddleware(request);
  if (authResponse) return authResponse;

  return i18nMiddleware(request);
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*", "/((?!_next|static|favicon.ico).*)"],
};
