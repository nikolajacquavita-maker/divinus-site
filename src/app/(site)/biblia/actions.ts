"use server";

import { revalidatePath } from "next/cache";
import { getCurrentMember } from "@/lib/members-data";
import { markVerseRead, unmarkVerseRead, markChapterRead } from "@/lib/bible-progress-data";

export async function toggleVerse(livroId: string, capitulo: number, versiculo: number, lido: boolean) {
  const member = await getCurrentMember();
  if (!member) return { error: "É preciso estar logado." };

  const { error } = lido
    ? await markVerseRead(member.id, livroId, capitulo, versiculo)
    : await unmarkVerseRead(member.id, livroId, capitulo, versiculo);

  if (!error) {
    revalidatePath(`/biblia/${livroId}/${capitulo}`);
    revalidatePath(`/biblia/${livroId}`);
    revalidatePath("/biblia");
  }

  return { error };
}

export async function markAllChapter(livroId: string, capitulo: number, totalVersiculos: number) {
  const member = await getCurrentMember();
  if (!member) return { error: "É preciso estar logado." };

  const { error } = await markChapterRead(member.id, livroId, capitulo, totalVersiculos);

  if (!error) {
    revalidatePath(`/biblia/${livroId}/${capitulo}`);
    revalidatePath(`/biblia/${livroId}`);
    revalidatePath("/biblia");
  }

  return { error };
}
