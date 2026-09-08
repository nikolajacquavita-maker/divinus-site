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

export type FeelingCategory =
  | "ansiedade_medo"
  | "perdas"
  | "relacoes"
  | "proposito_acao"
  | "voce_consigo_mesmo";

export interface Feeling {
  id: string;
  slug: string;
  category: FeelingCategory;
  title: string;
  teaser: string;
  corpo_question: string;
  corpo_text: string;
  corpo_video_url: string | null;
  mente_question: string;
  mente_text: string;
  mente_video_url: string | null;
  espirito_question: string;
  espirito_text: string;
  espirito_video_url: string | null;
  verse_text: string;
  verse_reference: string;
  acao_question: string;
  acao_text: string;
  acao_video_url: string | null;
  acao_cta_label: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const FEELING_CATEGORIES: { value: FeelingCategory; label: string }[] = [
  { value: "ansiedade_medo", label: "Ansiedade e medo" },
  { value: "perdas", label: "Perdas" },
  { value: "relacoes", label: "Relações" },
  { value: "proposito_acao", label: "Propósito e ação" },
  { value: "voce_consigo_mesmo", label: "Você consigo mesmo" },
];

export const FEELING_STAGES = [
  { value: "corpo", label: "Corpo", index: "01" },
  { value: "mente", label: "Mente", index: "02" },
  { value: "espirito", label: "Espírito", index: "03" },
  { value: "acao", label: "Ação", index: "04" },
] as const;

export type FeelingStage = (typeof FEELING_STAGES)[number]["value"];

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
