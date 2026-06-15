import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

const PROTECTED_PREFIXES = ["/dashboard", "/customers"];
const PROTECTED_API_PREFIXES = ["/api/meeting-notes"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isProtectedApi(pathname: string): boolean {
  return PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  if (isProtectedApi(pathname) && !hasSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isProtectedPath(pathname) && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/customers/:path*", "/api/meeting-notes/:path*", "/login"],
};
