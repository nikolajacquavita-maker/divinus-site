import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createMemberSession, getSessionMemberId, clearMemberSession } from "@/lib/auth/session";
import type { Member } from "@/lib/types";

export async function signupMember(name: string, email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("member_signup", {
    p_name: name,
    p_email: email,
    p_password: password,
  });

  if (error) {
    return { error: error.message };
  }

  const row = data?.[0];
  if (row?.id) {
    await createMemberSession(row.id);
  }

  return { error: null };
}

export async function loginMember(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("member_login", {
    p_email: email,
    p_password: password,
  });

  if (error) {
    return { error: error.message };
  }

  const row = data?.[0];
  if (!row?.id) {
    return { error: "E-mail ou senha incorretos." };
  }

  await createMemberSession(row.id);
  return { error: null };
}

export async function logoutMember() {
  await clearMemberSession();
}

export async function getCurrentMember(): Promise<Member | null> {
  const memberId = await getSessionMemberId();
  if (!memberId) return null;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_member", { p_id: memberId });
  if (error || !data?.[0]) return null;

  return data[0] as Member;
}
