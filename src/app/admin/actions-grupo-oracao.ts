"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MemberStatus, PrayerGroupStatus } from "@/lib/types";

export async function setMemberStatus(id: string, status: MemberStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("members")
    .update({ grupo_oracao_status: status })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/membros");
}

export async function setPrayerGroupStatus(id: string, status: PrayerGroupStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("prayer_groups").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/grupos-oracao");
  revalidatePath("/grupo-de-oracao");
}

export async function deletePrayerGroup(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("prayer_groups").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/grupos-oracao");
  revalidatePath("/grupo-de-oracao");
}
