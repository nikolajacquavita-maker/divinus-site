import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHeroMessageBySlug, getRandomHeroMessage } from "@/lib/data";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const message = await getHeroMessageBySlug(slug);
  if (!message) return { title: "Leitura — Divinus" };
  return { title: `${message.reference} — Leitura dinâmica | Divinus` };
}

export default async function LeituraPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const message = await getHeroMessageBySlug(slug);
  if (!message) notFound();

  const other = await getRandomHeroMessage();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <Link href="/" className="text-xs label-caps text-muted-foreground hover:text-accent">
        ← Início
      </Link>

      <p className="mt-8 text-xs label-caps text-accent">{message.reference}</p>
      <h1 className="font-display mt-2 text-2xl sm:text-3xl">{message.text}</h1>

      <div className="mt-4">
        <Section index="01" label="Contexto" text={message.contexto} />
        <Section index="02" label="O capítulo" text={message.capitulo} />
        <Section index="03" label="Aplicação" text={message.aplicacao} />
        <Section index="04" label="Conexão" text={message.conexao} />
      </div>

      <div className="mt-4 border-t border-border pt-10 text-center">
        <p className="font-display text-xl sm:text-2xl">Você não precisa correr sozinho.</p>
        <Link
          href="/sentimentos"
          className="mt-6 inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          O que você está sentindo hoje?
        </Link>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {other && (
            <Link
              href={`/leitura/${other.slug}`}
              className="border border-border px-5 py-2.5 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
            >
              Ler outra mensagem
            </Link>
          )}
          <Link
            href="/produtos"
            className="border border-border px-5 py-2.5 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
          >
            Ver produtos Divinus
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ index, label, text }: { index: string; label: string; text: string }) {
  return (
    <div className="grid gap-3 border-t border-border py-10 sm:grid-cols-[100px_1fr] sm:gap-8">
      <div>
        <p className="text-xs label-caps text-muted-foreground">{index}</p>
        <p className="font-display mt-1 text-lg">{label}</p>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
