import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeelingBySlug, getRandomOtherFeeling } from "@/lib/data";
import { StageBlock } from "@/components/StageBlock";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feeling = await getFeelingBySlug(slug);
  if (!feeling) return { title: "Sentimento — Divinus" };
  return { title: `${feeling.title} — Corpo, mente, espírito e ação | Divinus` };
}

export default async function SentimentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feeling = await getFeelingBySlug(slug);
  if (!feeling) notFound();

  const other = await getRandomOtherFeeling(slug);

  const shareText = `"${feeling.verse_text}" — ${feeling.verse_reference} (via Divinus)`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <Link
        href="/sentimentos"
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Sentimentos
      </Link>

      <p className="mt-8 text-xs label-caps text-accent">{feeling.title}</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">{feeling.teaser}</h1>

      <Link
        href={`/sentimentos/${feeling.slug}/leitura`}
        className="group mt-10 block border border-border p-6 transition-colors hover:border-accent sm:p-8"
      >
        <p className="text-xs label-caps text-muted-foreground">
          Na Bíblia · {feeling.biblico_nome} — {feeling.biblico_referencia}
        </p>
        <p className="font-display mt-3 text-xl sm:text-2xl">«{feeling.biblico_versiculo}»</p>
        <p className="mt-4 text-sm text-muted-foreground">{feeling.biblico_teaser}</p>
        <span className="mt-4 inline-block text-xs label-caps text-accent group-hover:underline">
          Aprofundar nessa passagem →
        </span>
      </Link>

      <div>
        <StageBlock
          index="01"
          label="Corpo"
          stage="corpo"
          question={feeling.corpo_question}
          text={feeling.corpo_text}
          videoUrl={feeling.corpo_video_url}
        />
        <StageBlock
          index="02"
          label="Mente"
          stage="mente"
          question={feeling.mente_question}
          text={feeling.mente_text}
          videoUrl={feeling.mente_video_url}
        />
        <StageBlock
          index="03"
          label="Espírito"
          stage="espirito"
          question={feeling.espirito_question}
          text={feeling.espirito_text}
          videoUrl={feeling.espirito_video_url}
          verse={{ text: feeling.verse_text, reference: feeling.verse_reference }}
        />
        <StageBlock
          index="04"
          label="Ação"
          stage="acao"
          question={feeling.acao_question}
          text={feeling.acao_text}
          videoUrl={feeling.acao_video_url}
        >
          <Link
            href="/comunidade"
            className="inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
          >
            {feeling.acao_cta_label}
          </Link>
        </StageBlock>
      </div>

      <div className="mt-4 border-t border-border pt-10">
        <p className="text-xs label-caps text-muted-foreground">Você não precisa terminar aqui.</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {other && (
            <Link
              href={`/sentimentos/${other.slug}`}
              className="border border-border px-5 py-2.5 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
            >
              Ver outro sentimento
            </Link>
          )}
          <Link
            href="/comunidade"
            className="border border-border px-5 py-2.5 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
          >
            Continuar em um desafio
          </Link>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border px-5 py-2.5 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
          >
            Compartilhar com alguém
          </a>
          <Link
            href="/produtos"
            className="border border-accent px-5 py-2.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Ver produtos Divinus
          </Link>
        </div>
      </div>
    </div>
  );
}
