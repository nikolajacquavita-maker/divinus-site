"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { FeelingCategory, ProductStatus, ProductUniverse } from "@/lib/types";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const DIACRITICS = /[̀-ͯ]/g;

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function upsertProduct(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "") || null;
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const imagesRaw = String(formData.get("images") ?? "").trim();
  const featuresRaw = String(formData.get("features") ?? "").trim();

  const payload = {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    universe: String(formData.get("universe")) as ProductUniverse,
    short_description: String(formData.get("short_description") ?? ""),
    full_description: String(formData.get("full_description") ?? ""),
    price: priceRaw ? Number(priceRaw.replace(",", ".")) : null,
    images: imagesRaw
      ? imagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    features: featuresRaw
      ? featuresRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    lobway_url: String(formData.get("lobway_url") ?? "").trim() || null,
    status: String(formData.get("status")) as ProductStatus,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function setProductStatus(id: string, status: ProductStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
}

export async function upsertMessage(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "") || null;
  const payload = {
    category: String(formData.get("category") ?? ""),
    verse_text: String(formData.get("verse_text") ?? ""),
    verse_reference: String(formData.get("verse_reference") ?? ""),
    reflection: String(formData.get("reflection") ?? ""),
    practical_action: String(formData.get("practical_action") ?? ""),
    is_daily: formData.get("is_daily") === "on",
    is_active: formData.get("is_active") === "on",
    order_index: Number(formData.get("order_index") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("messages").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("messages").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/mensagens");
  revalidatePath("/mensagem");
  revalidatePath("/");
  redirect("/admin/mensagens");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/mensagens");
  revalidatePath("/mensagem");
}

export async function upsertFeeling(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "") || null;
  const slugInput = String(formData.get("slug") ?? "").trim();
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const optionalField = (name: string) => field(name) || null;

  const payload = {
    slug: slugify(slugInput),
    category: String(formData.get("category")) as FeelingCategory,
    title: field("title"),
    teaser: field("teaser"),
    corpo_question: field("corpo_question"),
    corpo_text: field("corpo_text"),
    corpo_video_url: optionalField("corpo_video_url"),
    mente_question: field("mente_question"),
    mente_text: field("mente_text"),
    mente_video_url: optionalField("mente_video_url"),
    espirito_question: field("espirito_question"),
    espirito_text: field("espirito_text"),
    espirito_video_url: optionalField("espirito_video_url"),
    verse_text: field("verse_text"),
    verse_reference: field("verse_reference"),
    acao_question: field("acao_question"),
    acao_text: field("acao_text"),
    acao_video_url: optionalField("acao_video_url"),
    acao_cta_label: field("acao_cta_label") || "Eu aceito o desafio",
    biblico_nome: field("biblico_nome"),
    biblico_referencia: field("biblico_referencia"),
    biblico_versiculo: field("biblico_versiculo"),
    biblico_teaser: field("biblico_teaser"),
    biblico_contexto: field("biblico_contexto"),
    biblico_capitulo: field("biblico_capitulo"),
    biblico_aplicacao: field("biblico_aplicacao"),
    biblico_conexao: field("biblico_conexao"),
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("feelings").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("feelings").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/sentimentos");
  revalidatePath("/sentimentos");
  revalidatePath("/");
  redirect("/admin/sentimentos");
}

export async function deleteFeeling(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("feelings").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/sentimentos");
  revalidatePath("/sentimentos");
}

export async function upsertHeroMessage(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "") || null;
  const slugInput = String(formData.get("slug") ?? "").trim();
  const payload = {
    text: String(formData.get("text") ?? "").trim(),
    slug: slugify(slugInput),
    reference: String(formData.get("reference") ?? "").trim(),
    contexto: String(formData.get("contexto") ?? "").trim(),
    capitulo: String(formData.get("capitulo") ?? "").trim(),
    aplicacao: String(formData.get("aplicacao") ?? "").trim(),
    conexao: String(formData.get("conexao") ?? "").trim(),
    desafio: String(formData.get("desafio") ?? "").trim(),
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("hero_messages").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("hero_messages").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/mensagens-hero");
  revalidatePath("/");
  redirect("/admin/mensagens-hero");
}

export async function deleteHeroMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("hero_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/mensagens-hero");
  revalidatePath("/");
}

export async function setUniverseVisibility(universe: string, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("universe_settings")
    .update({ is_visible: isVisible })
    .eq("universe", universe);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produtos");
  revalidatePath("/produtos");
  revalidatePath("/");
}

export async function upsertChallenge(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "") || null;
  const payload = {
    days: Number(formData.get("days") ?? 0),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("challenges").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("challenges").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/comunidade");
  revalidatePath("/comunidade");
  redirect("/admin/comunidade");
}

export async function deleteChallenge(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("challenges").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/comunidade");
  revalidatePath("/comunidade");
}

export async function upsertCommunityEvent(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") ?? "") || null;
  const payload = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    const { error } = await supabase.from("community_events").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("community_events").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/comunidade");
  revalidatePath("/comunidade");
  redirect("/admin/comunidade");
}

export async function deleteCommunityEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("community_events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/comunidade");
  revalidatePath("/comunidade");
}
