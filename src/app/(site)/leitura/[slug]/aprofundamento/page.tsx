import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHeroMessageBySlug } from "@/lib/data";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const message = await getHeroMessageBySlug(slug);
  if (!message) return { title: "Aprofundamento — Divinus" };
  return { title: `${message.reference} — Aprofundamento | Divinus` };
}

export default async function AprofundamentoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const message = await getHeroMessageBySlug(slug);
  if (!message) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <Link
        href={`/leitura/${message.slug}`}
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Voltar à leitura
      </Link>

      <p className="mt-8 text-xs label-caps text-accent">{message.reference}</p>
      <h1 className="font-display mt-2 text-2xl sm:text-3xl">
        {message.versiculo_completo ?? message.text}
      </h1>

      <div className="mt-8">
        <VideoPlaceholder stage="espirito" />
      </div>

      <div className="mt-4">
        <Section
          index="01"
          label="Aprofundamento teológico"
          text={
            message.teologia ??
            "Essa passagem ainda está sendo aprofundada — em breve, uma leitura teológica mais extensa entra aqui, junto com o vídeo."
          }
        />
      </div>

      <div className="mt-4 border-t border-border pt-10 text-center">
        <Link
          href={`/leitura/${message.slug}`}
          className="inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Voltar à leitura dinâmica
        </Link>
      </div>
    </div>
  );
}

function Section({ index, label, text }: { index: string; label: string; text: string }) {
  return (
    <div className="grid gap-3 border-t border-border py-10 sm:grid-cols-[140px_1fr] sm:gap-8">
      <div>
        <p className="text-xs label-caps text-muted-foreground">{index}</p>
        <p className="font-display mt-1 text-lg">{label}</p>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
