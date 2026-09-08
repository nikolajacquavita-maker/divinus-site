import { createClient } from "@/lib/supabase/server";
import type { Challenge, CommunityEvent, Feeling, HeroMessage, Message, Product, ProductUniverse } from "@/lib/types";

const VISIBLE_STATUSES = ["active", "coming_soon"] as const;

export async function getVisibleUniverses(): Promise<ProductUniverse[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("universe_settings")
    .select("universe, is_visible");

  if (error || !data) {
    if (error) console.error("getVisibleUniverses", error);
    // se a tabela ainda não existir (migration não rodada), mostra todas
    return ["water", "performance", "essentials"];
  }

  const hidden = new Set(
    data.filter((row) => !row.is_visible).map((row) => row.universe),
  );
  return (["water", "performance", "essentials"] as ProductUniverse[]).filter(
    (u) => !hidden.has(u),
  );
}

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

  const product = data as Product | null;
  if (!product) return null;

  const visibleUniverses = await getVisibleUniverses();
  if (!visibleUniverses.includes(product.universe)) return null;

  return product;
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

export async function getRandomHeroMessage(): Promise<HeroMessage | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_messages")
    .select("*")
    .eq("is_active", true);

  if (error || !data || data.length === 0) {
    if (error) console.error("getRandomHeroMessage", error);
    return null;
  }
  return data[Math.floor(Math.random() * data.length)] as HeroMessage;
}

export async function getHeroMessageBySlug(slug: string): Promise<HeroMessage | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_messages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("getHeroMessageBySlug", error);
    return null;
  }
  return data as HeroMessage | null;
}

export async function getActiveFeelings(): Promise<Feeling[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("feelings")
    .select("*")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveFeelings", error);
    return [];
  }
  return data as Feeling[];
}

export async function getFeelingBySlug(slug: string): Promise<Feeling | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("feelings")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("getFeelingBySlug", error);
    return null;
  }
  return data as Feeling | null;
}

export async function getRandomOtherFeeling(excludeSlug: string): Promise<Feeling | null> {
  const feelings = await getActiveFeelings();
  const others = feelings.filter((f) => f.slug !== excludeSlug);
  if (others.length === 0) return null;
  return others[Math.floor(Math.random() * others.length)];
}
