import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/members-data";
import { getBibleProgressSummary } from "@/lib/bible-progress-data";
import { BibliaCapitulos } from "@/components/BibliaCapitulos";

export const revalidate = 0;

export default async function BibliaLivroPage({
  params,
}: {
  params: Promise<{ livro: string }>;
}) {
  const { livro } = await params;

  const member = await getCurrentMember();
  if (!member) {
    redirect("/biblia");
  }

  const summary = await getBibleProgressSummary(member.id);
  const capitulosLidos = new Map<number, number>();
  for (const row of summary) {
    if (row.livro_id === livro) capitulosLidos.set(row.capitulo, row.lidos);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <Link href="/biblia" className="text-xs label-caps text-muted-foreground hover:text-accent">
        ← Bíblia
      </Link>

      <div className="mt-8">
        <BibliaCapitulos livroId={livro} capitulosLidos={Object.fromEntries(capitulosLidos)} />
      </div>
    </div>
  );
}
