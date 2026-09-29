import { NextRequest, NextResponse } from "next/server";
import { exchangeGoogleCode } from "@/lib/auth/google";
import { loginWithGoogle } from "@/lib/members-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = request.cookies.get("google_oauth_state")?.value;

  const fail = (message: string) => {
    const response = NextResponse.redirect(
      new URL(`/grupo-de-oracao/login?error=${encodeURIComponent(message)}`, request.url),
    );
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    response.cookies.delete("google_oauth_state");
    return response;
  };

  if (!code) {
    return fail("O Google não retornou um código de autorização.");
  }
  if (!savedState) {
    return fail("Sua sessão de login expirou ou o cookie não chegou. Tente novamente.");
  }
  if (!state || state !== savedState) {
    return fail("Não foi possível confirmar o login com o Google.");
  }

  try {
    const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
    const profile = await exchangeGoogleCode(code, redirectUri);
    const { error } = await loginWithGoogle(profile.email, profile.name, profile.sub);
    if (error) return fail(error);
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return fail("Não foi possível entrar com o Google.");
  }

  const response = NextResponse.redirect(new URL("/grupo-de-oracao", request.url));
  response.headers.set("Cache-Control", "no-store, must-revalidate");
  response.cookies.delete("google_oauth_state");
  return response;
}
