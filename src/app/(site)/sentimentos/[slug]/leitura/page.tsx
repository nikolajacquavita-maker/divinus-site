import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFeelingBySlug } from "@/lib/data";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feeling = await getFeelingBySlug(slug);
  if (!feeling) return { title: "Leitura — Divinus" };
  return { title: `${feeling.biblico_nome} — Leitura dinâmica | Divinus` };
}

export default async function SentimentoLeituraPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feeling = await getFeelingBySlug(slug);
  if (!feeling) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <Link
        href={`/sentimentos/${feeling.slug}`}
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← {feeling.title}
      </Link>

      <p className="mt-8 text-xs label-caps text-accent">
        {feeling.biblico_nome} · {feeling.biblico_referencia}
      </p>
      <h1 className="font-display mt-2 text-2xl sm:text-3xl">«{feeling.biblico_versiculo}»</h1>

      <div className="mt-8">
        <VideoPlaceholder stage="espirito" />
      </div>

      <div className="mt-4">
        <Section index="01" label="Contexto histórico" text={feeling.biblico_contexto} />
        <Section index="02" label="O capítulo" text={feeling.biblico_capitulo} />
        <Section index="03" label="Aplicação prática" text={feeling.biblico_aplicacao} />
        <Section index="04" label="Conexão" text={feeling.biblico_conexao} />
      </div>

      <div className="mt-4 border-t border-border pt-10 text-center">
        <Link
          href={`/sentimentos/${feeling.slug}`}
          className="inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Voltar para {feeling.title.toLowerCase()}
        </Link>
        <div className="mt-6">
          <Link
            href="/leitura-dinamica"
            className="text-xs label-caps text-muted-foreground hover:text-accent"
          >
            Como funciona essa metodologia →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ index, label, text }: { index: string; label: string; text: string }) {
  return (
    <div className="grid gap-3 border-t border-border py-10 sm:grid-cols-[130px_1fr] sm:gap-8">
      <div>
        <p className="text-xs label-caps text-muted-foreground">{index}</p>
        <p className="font-display mt-1 text-lg">{label}</p>
      </div>
      <p className="whitespace-pre-line text-muted-foreground">{text}</p>
    </div>
  );
}
