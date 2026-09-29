import { NextRequest, NextResponse } from "next/server";
import { buildGoogleAuthUrl } from "@/lib/auth/google";
import { sanitizeNextPath } from "@/lib/auth/next-path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
  const state = crypto.randomUUID();
  const next = sanitizeNextPath(new URL(request.url).searchParams.get("next"));

  const response = NextResponse.redirect(buildGoogleAuthUrl(redirectUri, state));
  response.headers.set("Cache-Control", "no-store, must-revalidate");
  response.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  response.cookies.set("google_oauth_next", next, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return response;
}
