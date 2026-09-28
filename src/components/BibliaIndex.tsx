"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BibleBookIndexEntry } from "@/lib/types";
import type { ChapterProgressRow } from "@/lib/bible-progress-data";

function BookGrid({
  books,
  lidosPorLivro,
}: {
  books: BibleBookIndexEntry[];
  lidosPorLivro: Map<string, number>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {books.map((b) => {
        const totalVersiculos = b.chapters.reduce((a, c) => a + c, 0);
        const lidos = lidosPorLivro.get(b.id) ?? 0;
        const pct = totalVersiculos > 0 ? Math.min(100, (lidos / totalVersiculos) * 100) : 0;
        return (
          <Link
            key={b.id}
            href={`/biblia/${b.id}`}
            className="border border-border px-4 py-3 hover:border-accent transition-colors"
          >
            <p className="text-sm">{b.name}</p>
            <div className="mt-2 h-1 w-full bg-border">
              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function BibliaIndex({ summary }: { summary: ChapterProgressRow[] }) {
  const [index, setIndex] = useState<BibleBookIndexEntry[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/biblia/index.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIndex(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!index) {
    return <div className="h-40 w-full animate-pulse bg-muted" />;
  }

  const lidosPorLivro = new Map<string, number>();
  for (const row of summary) {
    lidosPorLivro.set(row.livro_id, (lidosPorLivro.get(row.livro_id) ?? 0) + row.lidos);
  }

  const antigo = index.filter((b) => b.testamento === "AT");
  const novo = index.filter((b) => b.testamento === "NT");

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xs label-caps text-muted-foreground">Antigo Testamento</h2>
        <div className="mt-4">
          <BookGrid books={antigo} lidosPorLivro={lidosPorLivro} />
        </div>
      </div>
      <div>
        <h2 className="text-xs label-caps text-muted-foreground">Novo Testamento</h2>
        <div className="mt-4">
          <BookGrid books={novo} lidosPorLivro={lidosPorLivro} />
        </div>
      </div>
    </div>
  );
}
