// Rota temporária de diagnóstico — confirma se as variáveis de ambiente do
// Supabase estão chegando corretas em produção, sem expor a chave inteira.
// Remover depois de resolver o problema de login.
import { NextResponse } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    url: SUPABASE_URL,
    isPlaceholderUrl: SUPABASE_URL === "https://placeholder.supabase.co",
    keyLength: SUPABASE_ANON_KEY.length,
    keyPrefix: SUPABASE_ANON_KEY.slice(0, 14),
    isPlaceholderKey: SUPABASE_ANON_KEY === "placeholder-anon-key",
  });
}
