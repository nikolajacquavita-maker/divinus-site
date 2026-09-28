import "server-only";

function getClientId() {
  const id = process.env.GOOGLE_CLIENT_ID;
  if (!id) throw new Error("GOOGLE_CLIENT_ID não configurado.");
  return id;
}

function getClientSecret() {
  const secret = process.env.GOOGLE_CLIENT_SECRET;
  if (!secret) throw new Error("GOOGLE_CLIENT_SECRET não configurado.");
  return secret;
}

export function buildGoogleAuthUrl(redirectUri: string, state: string) {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", getClientId());
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("prompt", "select_account");
  return url.toString();
}

interface GoogleTokenResponse {
  id_token: string;
}

interface GoogleIdTokenPayload {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
}

export interface GoogleProfile {
  sub: string;
  email: string;
  name: string;
}

export async function exchangeGoogleCode(code: string, redirectUri: string): Promise<GoogleProfile> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: getClientId(),
      client_secret: getClientSecret(),
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    throw new Error(`Falha ao trocar código com o Google (${res.status}).`);
  }

  const tokens = (await res.json()) as GoogleTokenResponse;
  const payload = decodeIdToken(tokens.id_token);

  if (!payload.email_verified) {
    throw new Error("E-mail do Google não verificado.");
  }

  return {
    sub: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split("@")[0],
  };
}

// O id_token vem direto do endpoint HTTPS do Google via chamada
// servidor-a-servidor (nunca passa pelo cliente), então decodificar sem
// reverificar a assinatura é seguro aqui — o canal já é confiável.
function decodeIdToken(idToken: string): GoogleIdTokenPayload {
  const [, payloadB64] = idToken.split(".");
  const json = Buffer.from(payloadB64, "base64url").toString("utf8");
  return JSON.parse(json);
}
