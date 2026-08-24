// Falls back to harmless placeholder values when Supabase env vars aren't
// configured yet (e.g. a fresh Vercel deploy before the database is wired
// up), so the Supabase client never throws at construction time. Actual
// queries will simply fail gracefully (handled in src/lib/data.ts), letting
// the site render in a degraded "em breve" state instead of crashing.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
