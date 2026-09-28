"use server";

import { redirect } from "next/navigation";
import { signupMember, loginMember, logoutMember, getCurrentMember } from "@/lib/members-data";
import { submitPrayerGroup } from "@/lib/prayer-groups-data";

export async function signup(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { error } = await signupMember(name, email, password);
  if (error) {
    redirect(`/grupo-de-oracao/cadastro?error=${encodeURIComponent(error)}`);
  }
  redirect("/grupo-de-oracao");
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { error } = await loginMember(email, password);
  if (error) {
    redirect(`/grupo-de-oracao/login?error=${encodeURIComponent(error)}`);
  }
  redirect("/grupo-de-oracao");
}

export async function logout() {
  await logoutMember();
  redirect("/grupo-de-oracao");
}

export async function submitGroup(formData: FormData) {
  const member = await getCurrentMember();
  if (!member || member.status !== "approved") {
    redirect("/grupo-de-oracao");
  }

  const uf = String(formData.get("uf") ?? "").trim();
  const cidade = String(formData.get("cidade") ?? "").trim();
  const endereco = String(formData.get("endereco") ?? "").trim();
  const horario = String(formData.get("horario") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const fotoUrl = String(formData.get("foto_url") ?? "").trim() || null;

  if (!uf || !cidade || !endereco || !horario || !descricao) {
    redirect("/grupo-de-oracao/novo?error=Preencha todos os campos.");
  }

  const { error } = await submitPrayerGroup(member.id, { uf, cidade, endereco, horario, descricao, fotoUrl });
  if (error) {
    redirect(`/grupo-de-oracao/novo?error=${encodeURIComponent(error)}`);
  }

  redirect("/grupo-de-oracao/novo?enviado=1");
}
