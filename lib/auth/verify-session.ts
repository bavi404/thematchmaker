import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export function verifySession(request: NextRequest): boolean {
  return request.cookies.has(SESSION_COOKIE_NAME);
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
