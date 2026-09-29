import Link from "next/link";
import type { Metadata } from "next";
import { getActiveChallenges, getActiveCommunityEvents } from "@/lib/data";
import { getCurrentMember } from "@/lib/members-data";
import { getBibleProgressTotal, TOTAL_VERSICULOS_BIBLIA } from "@/lib/bible-progress-data";

export const metadata: Metadata = {
  title: "Comunidade Divinus — desafios, leitura e encontros",
};

export const revalidate = 0;

export default async function ComunidadePage() {
  const member = await getCurrentMember();

  if (!member) {
    return (
      <div className="mx-auto max-w-md px-6 py-14 text-center sm:py-20">
        <p className="text-xs label-caps text-accent">Comunidade Divinus</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">Entre ou cadastre-se</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Pra acompanhar sua jornada, seus desafios e seu progresso de
          leitura, você precisa estar logado.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/grupo-de-oracao/login?next=%2Fcomunidade"
            className="border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Entrar
          </Link>
          <Link
            href="/grupo-de-oracao/cadastro?next=%2Fcomunidade"
            className="border border-border px-6 py-3 text-xs label-caps hover:border-accent transition-colors"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    );
  }

  const [challenges, events, bibliaLida] = await Promise.all([
    getActiveChallenges(),
    getActiveCommunityEvents(),
    getBibleProgressTotal(member.id),
  ]);

  const bibliaPct = Math.min(100, (bibliaLida / TOTAL_VERSICULOS_BIBLIA) * 100);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <p className="text-xs label-caps text-accent">Comunidade Divinus</p>
      <h1 className="font-display mt-4 text-3xl sm:text-4xl">
        Não apenas consumir conteúdo. Viver uma transformação.
      </h1>
      <p className="mt-6 text-muted-foreground">
        Desafios, planos de leitura, grupos de corrida, células próximas e
        encontros presenciais. Você acompanha sua jornada num perfil simples.
      </p>

      <section className="mt-16 border border-border p-8">
        <p className="text-xs label-caps text-muted-foreground">Sua jornada</p>
        <h2 className="font-display mt-2 text-2xl">Leitura da Bíblia</h2>
        <div className="mt-4 h-1.5 w-full bg-border">
          <div className="h-full bg-accent" style={{ width: `${bibliaPct}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {bibliaPct.toFixed(1)}% concluído — {bibliaLida.toLocaleString("pt-BR")} de{" "}
          {TOTAL_VERSICULOS_BIBLIA.toLocaleString("pt-BR")} versículos
        </p>
        <Link
          href="/biblia"
          className="mt-6 inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Continuar lendo
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-xs label-caps text-muted-foreground">Desafios</h2>
        {challenges.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">Em breve.</p>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {challenges.map((c) => (
              <div key={c.id} className="border border-border p-6">
                <p className="font-display text-4xl text-accent">{c.days}</p>
                <h3 className="font-display mt-2 text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-xs label-caps text-muted-foreground">Encontros e campanhas</h2>
        {events.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">Em breve.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {events.map((e) => (
              <div key={e.id} className="border border-border p-6">
                <p className="font-display text-xl">{e.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
