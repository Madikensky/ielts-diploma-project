import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const i18nMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);
  if (response) {
    return await authMiddleware(request, response);
  }
  return response;
}

export async function authMiddleware(
  request: NextRequest,
  response: NextResponse,
) {
  const access_token = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  const locale = pathname.startsWith("/ru") ? "ru" : "en";
  const path = pathname.replace(/^\/(ru|en)/, "") || "/";

  const publicPaths = ["/auth", "/"];
  const allPaths = [
    "/auth",
    "/home",
    "/profile",
    "/reading",
    "/listening",
    "/writing",
    "/speaking",
  ];
  const isPublic = publicPaths.includes(path);

  if (!access_token && !isPublic) {
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
  }

  if (access_token && path == "/auth") {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  if (access_token && !allPaths.includes(path)) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*", "/((?!_next|static|favicon.ico).*)"],
};
