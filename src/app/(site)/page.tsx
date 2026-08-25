import Link from "next/link";
import { getActiveProductsByUniverse, getDailyMessage } from "@/lib/data";
import { UNIVERSES } from "@/lib/types";

const UNIVERSE_COPY: Record<
  string,
  { tagline: string; description: string; features: string[] }
> = {
  water: {
    tagline: "Uma mensagem em cada lata.",
    description:
      "Água mineral com e sem gás em embalagens premium. Cada unidade carrega uma frase, um versículo e um QR Code que leva a uma reflexão específica — nunca à página inicial.",
    features: ["Com gás", "Sem gás", "Edições de campanha", "QR único por mensagem"],
  },
  performance: {
    tagline: "Seu corpo corre. Seu espírito conduz.",
    description:
      "A linha que conecta desempenho e fé. Peças minimalistas, detalhes refletivos e frases posicionadas de forma estratégica.",
    features: ["Camisetas técnicas", "Manga longa", "Bonés e acessórios", "Eletrólitos e creatina em dose individual"],
  },
  essentials: {
    tagline: "A mensagem na rotina.",
    description:
      "Peças para o dia comum. Cada produto tem uma história e um significado, não apenas uma descrição técnica.",
    features: ["Camisetas e moletons", "Garrafas", "Quadros e devocionais", "Edições especiais"],
  },
};

const TESTIMONIALS = [
  {
    quote:
      "Eu comprei uma água no posto e a frase da lata respondeu exatamente ao que eu estava vivendo naquela semana.",
    author: "Marina, 29 — Belo Horizonte",
  },
  {
    quote:
      "Corri 21 km com a frase nas costas. No quilômetro 17 eu lembrei que não estava correndo sozinho.",
    author: "Tiago, 34 — Curitiba",
  },
  {
    quote:
      "Escaneei a etiqueta da camiseta esperando um site de loja. Encontrei uma oração curta que eu precisava ler.",
    author: "Ana Clara, 22 — Recife",
  },
];

export default async function HomePage() {
  const [water, performance, essentials, daily] = await Promise.all([
    getActiveProductsByUniverse("water"),
    getActiveProductsByUniverse("performance"),
    getActiveProductsByUniverse("essentials"),
    getDailyMessage(),
  ]);

  const counts: Record<string, number> = {
    water: water.length,
    performance: performance.length,
    essentials: essentials.length,
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 20%, oklch(24% 0.02 75 / 0.5), transparent), radial-gradient(80% 60% at 80% 100%, oklch(20% 0.01 60 / 0.6), transparent)",
          }}
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-28 md:py-32">
          <h1 className="font-display label-caps text-5xl sm:text-6xl md:text-7xl">Divinus</h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            A mensagem descomplicada de Deus para você.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/mensagem"
              className="border border-accent px-6 py-3 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Conheça a mensagem
            </Link>
            <Link
              href="/produtos"
              className="border border-border px-6 py-3 text-xs label-caps text-foreground hover:border-foreground transition-colors"
            >
              Explore os produtos
            </Link>
          </div>
        </div>
      </section>

      {/* MOVIMENTO */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
        <p className="text-xs label-caps text-accent">Um movimento, não uma loja</p>
        <h2 className="font-display mt-4 text-3xl md:text-4xl">
          A Divinus nasceu para levar a mensagem de Deus para lugares onde muitas
          vezes ela não chega.
        </h2>
        <p className="mt-6 text-muted-foreground">
          Na água que você bebe. Na roupa que você veste. No esporte. Na rotina. Nos
          momentos em que você mais precisa lembrar quem você é.
        </p>
        <p className="mt-2 text-muted-foreground">
          A Divinus não vende apenas produtos. Vende objetos que carregam uma
          mensagem.
        </p>
      </section>

      {/* UNIVERSOS */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-3">
          {UNIVERSES.map((u) => {
            const copy = UNIVERSE_COPY[u.value];
            return (
              <article key={u.value} className="bg-background px-6 py-10 sm:px-8 sm:py-14">
                <p className="text-xs label-caps text-muted-foreground">
                  Universo {u.index}
                </p>
                <h3 className="font-display mt-3 text-2xl">{u.label}</h3>
                <p className="mt-2 text-accent">{copy.tagline}</p>
                <p className="mt-4 text-sm text-muted-foreground">{copy.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {copy.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground">
                  {counts[u.value]} produto(s) disponível(is) agora
                </p>
                <Link
                  href="/produtos"
                  className="mt-6 inline-block text-xs label-caps text-accent hover:underline"
                >
                  Ver a linha →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* MENSAGEM DO DIA */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          <p className="text-xs label-caps text-accent">Sua mensagem de hoje</p>
          {daily ? (
            <>
              <p className="font-display mt-4 text-2xl md:text-3xl">
                “{daily.verse_text}”
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{daily.verse_reference}</p>
            </>
          ) : (
            <h2 className="font-display mt-4 text-3xl">
              Você não recebeu esta mensagem por acaso.
            </h2>
          )}
          <Link
            href="/mensagem"
            className="mt-8 inline-block border border-accent px-6 py-3 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Receber a mensagem
          </Link>
        </div>
      </section>

      {/* HISTÓRIAS REAIS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <p className="text-center text-xs label-caps text-accent">Histórias reais</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-2xl sm:text-3xl">
            O produto é apenas o meio. O verdadeiro produto é a mensagem.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author} className="border border-border p-6">
                <p className="text-sm text-muted-foreground">“{t.quote}”</p>
                <footer className="mt-4 text-xs label-caps text-accent">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* PROPÓSITO / QR */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          <h2 className="font-display text-3xl">
            Existe um propósito por trás desta peça.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Toda lata, etiqueta e embalagem traz um QR Code que leva de volta ao
            significado daquela coleção. O físico abre o digital, e o digital
            devolve sentido ao físico.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs label-caps text-muted-foreground">
            <span>Produto</span>
            <span>Mensagem</span>
            <span>Reflexão</span>
            <span>Comunidade</span>
            <span>Transformação</span>
          </div>
        </div>
      </section>
    </>
  );
}
