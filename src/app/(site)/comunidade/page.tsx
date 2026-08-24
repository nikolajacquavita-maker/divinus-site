import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade Divinus — desafios, leitura e encontros",
};

const CHALLENGES = [
  { days: 7, title: "Silêncio", description: "Sete dias para desligar o ruído e ouvir o que importa." },
  { days: 21, title: "Disciplina espiritual", description: "Três semanas de constância: corpo, leitura e oração." },
  { days: 40, title: "Recomeço", description: "Quarenta dias para reconstruir hábito, direção e identidade." },
];

export default function ComunidadePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-xs label-caps text-accent">Comunidade Divinus</p>
      <h1 className="font-display mt-4 text-4xl">
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
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {CHALLENGES.map((c) => (
            <div key={c.title} className="border border-border p-6">
              <p className="font-display text-4xl text-accent">{c.days}</p>
              <h3 className="font-display mt-2 text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xs label-caps text-muted-foreground">Encontros e campanhas</h2>
        <div className="mt-6 space-y-6">
          <div className="border border-border p-6">
            <p className="font-display text-xl">Corrida Divinus — Amanhecer</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Domingos, 6h · aberto a todos os ritmos
            </p>
          </div>
          <div className="border border-border p-6">
            <p className="font-display text-xl">Encontro presencial</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Último sábado do mês · conversa e café
            </p>
          </div>
          <div className="border border-border p-6">
            <p className="font-display text-xl">Campanha solidária</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cada pack Jornada apoia distribuição de água
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
