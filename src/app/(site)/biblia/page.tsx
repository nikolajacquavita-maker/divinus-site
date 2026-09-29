import Link from "next/link";
import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/members-data";
import { getBibleProgressSummary, getBibleProgressTotal, TOTAL_VERSICULOS_BIBLIA } from "@/lib/bible-progress-data";
import { BibliaIndex } from "@/components/BibliaIndex";

export const metadata: Metadata = {
  title: "Bíblia | Divinus",
};

export const revalidate = 0;

export default async function BibliaPage() {
  const member = await getCurrentMember();

  if (!member) {
    return (
      <div className="mx-auto max-w-md px-6 py-14 text-center sm:py-20">
        <p className="text-xs label-caps text-accent">Bíblia</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">Entre ou cadastre-se</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Pra acompanhar sua leitura e seu progresso pela Bíblia inteira,
          você precisa estar logado.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/grupo-de-oracao/login?next=%2Fbiblia"
            className="border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Entrar
          </Link>
          <Link
            href="/grupo-de-oracao/cadastro?next=%2Fbiblia"
            className="border border-border px-6 py-3 text-xs label-caps hover:border-accent transition-colors"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    );
  }

  const [total, summary] = await Promise.all([
    getBibleProgressTotal(member.id),
    getBibleProgressSummary(member.id),
  ]);

  const percent = Math.min(100, (total / TOTAL_VERSICULOS_BIBLIA) * 100);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <p className="text-xs label-caps text-accent">Bíblia</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">Sua leitura</h1>

      <div className="mt-8 border border-border p-6 sm:p-8">
        <p className="text-xs label-caps text-muted-foreground">Progresso na Bíblia inteira</p>
        <p className="font-display mt-2 text-4xl">{percent.toFixed(1)}%</p>
        <div className="mt-4 h-1.5 w-full bg-border">
          <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {total.toLocaleString("pt-BR")} de {TOTAL_VERSICULOS_BIBLIA.toLocaleString("pt-BR")} versículos lidos
        </p>
      </div>

      <div className="mt-10">
        <BibliaIndex summary={summary} />
      </div>
    </div>
  );
}
