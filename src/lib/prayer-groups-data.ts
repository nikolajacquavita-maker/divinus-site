import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { PrayerGroup } from "@/lib/types";

export async function submitPrayerGroup(
  memberId: string,
  input: {
    uf: string;
    cidade: string;
    endereco: string;
    horario: string;
    descricao: string;
    fotoUrl: string | null;
  },
) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_prayer_group", {
    p_member_id: memberId,
    p_uf: input.uf,
    p_cidade: input.cidade,
    p_endereco: input.endereco,
    p_horario: input.horario,
    p_descricao: input.descricao,
    p_foto_url: input.fotoUrl,
  });

  return { error: error?.message ?? null };
}

export async function listPrayerGroups(memberId: string, uf?: string, cidade?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("list_prayer_groups", {
    p_member_id: memberId,
    p_uf: uf ?? null,
    p_cidade: cidade ?? null,
  });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as PrayerGroup[];
}
