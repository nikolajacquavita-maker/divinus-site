import Link from "next/link";
import { getActiveProductsByUniverse, getRandomHeroMessage, getVisibleUniverses } from "@/lib/data";
import { UNIVERSES } from "@/lib/types";

export const revalidate = 0;

const UNIVERSE_COPY: Record<
  string,
  { tagline: string; description: string; features: string[]; image: string }
> = {
  water: {
    tagline: "Uma mensagem em cada lata.",
    description:
      "Água mineral com e sem gás em embalagens premium. Cada unidade carrega uma frase, um versículo e um QR Code que leva a uma reflexão específica — nunca à página inicial.",
    features: ["Com gás", "Sem gás", "Edições de campanha", "QR único por mensagem"],
    image: "/images/water-lata-cruz.jpg",
  },
  performance: {
    tagline: "Seu corpo corre. Seu espírito conduz.",
    description:
      "A linha que conecta desempenho e fé. Peças minimalistas, detalhes refletivos e frases posicionadas de forma estratégica.",
    features: ["Camisetas técnicas", "Manga longa", "Bonés e acessórios", "Eletrólitos e creatina em dose individual"],
    image: "/images/performance-corredor.jpg",
  },
  essentials: {
    tagline: "A mensagem na rotina.",
    description:
      "Peças para o dia comum. Cada produto tem uma história e um significado, não apenas uma descrição técnica.",
    features: ["Camisetas e moletons", "Garrafas", "Quadros e devocionais", "Edições especiais"],
    image: "/images/essentials-camiseta-garrafa.jpg",
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
  const [water, performance, essentials, heroMessage, visibleUniverses] = await Promise.all([
    getActiveProductsByUniverse("water"),
    getActiveProductsByUniverse("performance"),
    getActiveProductsByUniverse("essentials"),
    getRandomHeroMessage(),
    getVisibleUniverses(),
  ]);

  const counts: Record<string, number> = {
    water: water.length,
    performance: performance.length,
    essentials: essentials.length,
  };

  const universes = UNIVERSES.filter((u) => visibleUniverses.includes(u.value));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-corredor-estrada.jpg"
          alt="Corredor solitário ao amanhecer em uma estrada litorânea"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, oklch(14.5% 0.004 60 / 0.55) 0%, oklch(14.5% 0.004 60 / 0.75) 55%, oklch(14.5% 0.004 60 / 0.95) 100%)",
          }}
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center text-deep-foreground sm:py-36 md:py-44">
          <h1 className="font-display label-caps text-5xl sm:text-6xl md:text-7xl">Divinus</h1>
          {heroMessage ? (
            <Link
              href={`/leitura/${heroMessage.slug}`}
              className="group mt-8 max-w-xl"
            >
              <p className="text-base text-deep-foreground/85 underline decoration-deep-foreground/30 underline-offset-4 transition-colors group-hover:text-deep-foreground group-hover:decoration-deep-foreground sm:text-lg">
                {heroMessage.text}
              </p>
            </Link>
          ) : (
            <p className="mt-8 max-w-xl text-base text-deep-foreground/85 sm:text-lg">
              Você não recebeu esta mensagem por acaso.
            </p>
          )}

          <Link
            href="/sentimentos"
            className="mt-8 text-xs label-caps text-sand hover:text-sand/80 transition-colors"
          >
            Você não precisa correr sozinho →
          </Link>

          <Link
            href="/produtos"
            className="mt-10 border border-deep-foreground/30 px-6 py-3 text-xs label-caps text-deep-foreground/90 hover:border-deep-foreground transition-colors"
          >
            Explore os produtos
          </Link>
        </div>
      </section>

      {/* MOVIMENTO */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
        <p className="text-xs label-caps text-accent">Um movimento, não uma loja</p>
        <h2 className="font-display mt-4 text-3xl md:text-4xl">
          A Divinus nasceu com um propósito: levar sua mensagem espiritual além
          das fronteiras, alcançando lugares e corações inatingidos.
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
      {universes.length > 0 && (
      <section className="border-t border-border">
        <div
          className={`mx-auto grid max-w-6xl gap-px bg-border ${
            universes.length === 1
              ? ""
              : universes.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
          }`}
        >
          {universes.map((u, i) => {
            const copy = UNIVERSE_COPY[u.value];
            return (
              <Link
                key={u.value}
                href="/produtos"
                className="group block bg-background transition-colors hover:bg-card"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={copy.image}
                    alt={u.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-6 py-10 sm:px-8 sm:py-14">
                <p className="text-xs label-caps text-muted-foreground">
                  Universo {String(i + 1).padStart(2, "0")}
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
                <span className="mt-6 inline-block text-xs label-caps text-accent group-hover:underline">
                  Ver a linha →
                </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      )}

      {/* SENTIMENTOS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
          <p className="text-xs label-caps text-accent">O que você está sentindo hoje?</p>
          <h2 className="font-display mt-4 text-3xl md:text-4xl">
            Ansiedade, luto, culpa, propósito. Escolha o que pesa de verdade —
            e leia algo pensado pro seu corpo, sua mente e seu espírito.
          </h2>
          <Link
            href="/sentimentos"
            className="mt-8 inline-block border border-accent px-6 py-3 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Encontrar meu sentimento
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
          <h2 className="font-display text-3xl sm:text-4xl">
            O físico abre o digital, e o digital devolve sentido ao físico.
          </h2>
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
