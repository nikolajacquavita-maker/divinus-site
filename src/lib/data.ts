import { createClient } from "@/lib/supabase/server";
import type { Challenge, CommunityEvent, Message, Product, ProductUniverse } from "@/lib/types";

const VISIBLE_STATUSES = ["active", "coming_soon"] as const;

export async function getActiveProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("status", VISIBLE_STATUSES)
    .order("universe", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveProducts", error);
    return [];
  }
  return data as Product[];
}

export async function getActiveProductsByUniverse(
  universe: ProductUniverse,
): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("status", VISIBLE_STATUSES)
    .eq("universe", universe)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveProductsByUniverse", error);
    return [];
  }
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .in("status", VISIBLE_STATUSES)
    .maybeSingle();

  if (error) {
    console.error("getProductBySlug", error);
    return null;
  }
  return data as Product | null;
}

function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  const diff = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  return Math.floor(diff / 86_400_000) + 1;
}

export async function getDailyMessage(): Promise<Message | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("is_active", true)
    .eq("is_daily", true)
    .order("order_index", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error("getDailyMessage", error);
    return null;
  }

  const idx = dayOfYear(new Date()) % data.length;
  return data[idx] as Message;
}

export async function getMessagesByCategory(category: string): Promise<Message[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("is_active", true)
    .eq("category", category)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("getMessagesByCategory", error);
    return [];
  }
  return data as Message[];
}

export async function getActiveChallenges(): Promise<Challenge[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveChallenges", error);
    return [];
  }
  return data as Challenge[];
}

export async function getActiveCommunityEvents(): Promise<CommunityEvent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("community_events")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveCommunityEvents", error);
    return [];
  }
  return data as CommunityEvent[];
}

export async function getRandomMessageByCategory(
  category: string,
): Promise<Message | null> {
  const messages = await getMessagesByCategory(category);
  if (messages.length === 0) return null;
  return messages[Math.floor(Math.random() * messages.length)];
}
