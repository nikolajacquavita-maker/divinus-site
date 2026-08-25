export type ProductUniverse = "water" | "performance" | "essentials";
export type ProductStatus = "active" | "coming_soon" | "paused" | "cancelled";

export interface Product {
  id: string;
  slug: string;
  universe: ProductUniverse;
  name: string;
  short_description: string;
  full_description: string;
  price: number | null;
  images: string[];
  features: string[];
  lobway_url: string | null;
  status: ProductStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  days: number;
  title: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Message {
  id: string;
  category: string;
  verse_text: string;
  verse_reference: string;
  reflection: string;
  practical_action: string;
  is_daily: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
}

export const UNIVERSES: { value: ProductUniverse; label: string; index: string }[] = [
  { value: "water", label: "Divinus Water", index: "01" },
  { value: "performance", label: "Divinus Performance", index: "02" },
  { value: "essentials", label: "Divinus Essentials", index: "03" },
];

export const MESSAGE_CATEGORIES: { value: string; label: string }[] = [
  { value: "ansiedade", label: "Ansiedade" },
  { value: "medo", label: "Medo" },
  { value: "frustracao", label: "Frustração" },
  { value: "falta_de_direcao", label: "Falta de direção" },
  { value: "luto", label: "Luto" },
  { value: "solidao", label: "Solidão" },
  { value: "relacionamentos", label: "Relacionamentos" },
  { value: "proposito", label: "Propósito" },
  { value: "disciplina", label: "Disciplina" },
  { value: "recomeco", label: "Recomeço" },
];
