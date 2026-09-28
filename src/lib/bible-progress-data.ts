import "server-only";
import { createClient } from "@/lib/supabase/server";

export const TOTAL_VERSICULOS_BIBLIA = 31106;

export async function markVerseRead(memberId: string, livroId: string, capitulo: number, versiculo: number) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_verse_read", {
    p_member_id: memberId,
    p_livro_id: livroId,
    p_capitulo: capitulo,
    p_versiculo: versiculo,
  });
  return { error: error?.message ?? null };
}

export async function unmarkVerseRead(memberId: string, livroId: string, capitulo: number, versiculo: number) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("unmark_verse_read", {
    p_member_id: memberId,
    p_livro_id: livroId,
    p_capitulo: capitulo,
    p_versiculo: versiculo,
  });
  return { error: error?.message ?? null };
}

export async function markChapterRead(
  memberId: string,
  livroId: string,
  capitulo: number,
  totalVersiculos: number,
) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("mark_chapter_read", {
    p_member_id: memberId,
    p_livro_id: livroId,
    p_capitulo: capitulo,
    p_total_versiculos: totalVersiculos,
  });
  return { error: error?.message ?? null };
}

export async function getChapterProgress(memberId: string, livroId: string, capitulo: number) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_chapter_progress", {
    p_member_id: memberId,
    p_livro_id: livroId,
    p_capitulo: capitulo,
  });
  if (error) {
    console.error(error);
    return new Set<number>();
  }
  return new Set<number>((data ?? []) as number[]);
}

export async function getBibleProgressTotal(memberId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_bible_progress_total", { p_member_id: memberId });
  if (error) return 0;
  return Number(data ?? 0);
}

export interface ChapterProgressRow {
  livro_id: string;
  capitulo: number;
  lidos: number;
}

export async function getBibleProgressSummary(memberId: string): Promise<ChapterProgressRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_bible_progress_summary", { p_member_id: memberId });
  if (error) return [];
  return (data ?? []) as ChapterProgressRow[];
}
