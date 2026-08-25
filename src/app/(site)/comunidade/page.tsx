import type { Metadata } from "next";
import { getActiveChallenges, getActiveCommunityEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Comunidade Divinus — desafios, leitura e encontros",
};

export const revalidate = 0;

export default async function ComunidadePage() {
  const [challenges, events] = await Promise.all([
    getActiveChallenges(),
    getActiveCommunityEvents(),
  ]);

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
        <h2 className="font-display mt-2 text-2xl">
          Dia 8 de 21 — Disciplina espiritual
        </h2>
        <div className="mt-4 h-1.5 w-full bg-border">
          <div className="h-full w-[38%] bg-accent" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">38% concluído</p>
        <p className="mt-6 text-sm text-muted-foreground">
          Hoje: leitura de cinco minutos, um treino leve e uma conversa que
          você vem adiando.
        </p>
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
