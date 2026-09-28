import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentMember } from "@/lib/members-data";
import { getChapterProgress } from "@/lib/bible-progress-data";
import { BibliaLeitor } from "@/components/BibliaLeitor";

export const revalidate = 0;

export default async function BibliaCapituloPage({
  params,
}: {
  params: Promise<{ livro: string; capitulo: string }>;
}) {
  const { livro, capitulo: capituloParam } = await params;
  const capitulo = Number(capituloParam);
  if (!Number.isInteger(capitulo) || capitulo < 1) notFound();

  const member = await getCurrentMember();
  if (!member) {
    redirect("/biblia");
  }

  const lidos = await getChapterProgress(member.id, livro, capitulo);

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <Link
        href={`/biblia/${livro}`}
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Voltar
      </Link>

      <div className="mt-8">
        <BibliaLeitor livroId={livro} capitulo={capitulo} versiculosLidos={Array.from(lidos)} />
      </div>
    </div>
  );
}
