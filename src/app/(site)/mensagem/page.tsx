import Link from "next/link";
import type { Metadata } from "next";
import { getRandomMessageByCategory } from "@/lib/data";
import { MESSAGE_CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "Preciso de uma mensagem — Divinus",
};

export const revalidate = 0;

export default async function MensagemPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const selected = MESSAGE_CATEGORIES.find((c) => c.value === categoria);
  const message = selected ? await getRandomMessageByCategory(selected.value) : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-3xl sm:text-4xl">Preciso de uma mensagem</h1>
      <p className="mt-4 text-muted-foreground">
        O que você está enfrentando agora? Escolha uma palavra. Nós não damos
        uma resposta automática — procuramos a mensagem certa para este
        momento.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        {MESSAGE_CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={`/mensagem?categoria=${c.value}`}
            className={`border px-4 py-2 text-xs label-caps transition-colors ${
              selected?.value === c.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {selected && (
        <div className="mt-16 border-t border-border pt-12">
          <p className="text-xs label-caps text-accent">Para {selected.label.toLowerCase()}</p>

          {message ? (
            <>
              <p className="font-display mt-4 text-3xl">“{message.verse_text}”</p>
              <p className="mt-2 text-sm text-muted-foreground">{message.verse_reference}</p>
              <p className="mt-6 text-muted-foreground">{message.reflection}</p>

              <p className="mt-10 text-xs label-caps text-muted-foreground">Ação prática</p>
              <p className="mt-2 text-muted-foreground">{message.practical_action}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `"${message.verse_text}" — ${message.verse_reference} (via Divinus)`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border px-5 py-2.5 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
                >
                  Enviar para alguém
                </a>
                <Link
                  href="/comunidade"
                  className="border border-accent px-5 py-2.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Continuar em um desafio
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-4 text-muted-foreground">
              Ainda estamos preparando mensagens para essa categoria.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
