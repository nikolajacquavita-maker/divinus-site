"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LivroData {
  id: string;
  name: string;
  chapters: string[][];
}

export function BibliaCapitulos({
  livroId,
  capitulosLidos,
}: {
  livroId: string;
  capitulosLidos: Record<number, number>;
}) {
  const [livro, setLivro] = useState<LivroData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/data/biblia/${livroId}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setLivro(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [livroId]);

  if (error) {
    return <p className="text-sm text-muted-foreground">Livro não encontrado.</p>;
  }

  if (!livro) {
    return <div className="h-40 w-full animate-pulse bg-muted" />;
  }

  return (
    <div>
      <p className="text-xs label-caps text-accent">Bíblia</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">{livro.name}</h1>
      <p className="mt-4 text-sm text-muted-foreground">Escolha um capítulo pra ler.</p>

      <div className="mt-8 grid grid-cols-5 gap-2 sm:grid-cols-8">
        {livro.chapters.map((versos, i) => {
          const capitulo = i + 1;
          const lidos = capitulosLidos[capitulo] ?? 0;
          const completo = lidos >= versos.length;
          const parcial = lidos > 0 && !completo;
          return (
            <Link
              key={capitulo}
              href={`/biblia/${livroId}/${capitulo}`}
              className={
                "flex aspect-square items-center justify-center border text-sm transition-colors " +
                (completo
                  ? "border-accent bg-accent text-accent-foreground"
                  : parcial
                    ? "border-accent text-accent"
                    : "border-border hover:border-accent")
              }
            >
              {capitulo}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
