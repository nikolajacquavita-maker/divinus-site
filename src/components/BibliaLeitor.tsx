"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { toggleVerse, markAllChapter } from "@/app/(site)/biblia/actions";

interface LivroData {
  id: string;
  name: string;
  chapters: string[][];
}

export function BibliaLeitor({
  livroId,
  capitulo,
  versiculosLidos,
}: {
  livroId: string;
  capitulo: number;
  versiculosLidos: number[];
}) {
  const [livro, setLivro] = useState<LivroData | null>(null);
  const [error, setError] = useState(false);
  const [lidos, setLidos] = useState<Set<number>>(new Set(versiculosLidos));
  const [, startTransition] = useTransition();
  const highlightRef = useRef<HTMLSpanElement>(null);
  const scrolled = useRef(false);

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

  useEffect(() => {
    if (!livro || scrolled.current) return;
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      scrolled.current = true;
    }
  }, [livro]);

  function handleToggle(versiculo: number) {
    const isLido = lidos.has(versiculo);
    setLidos((prev) => {
      const next = new Set(prev);
      if (isLido) next.delete(versiculo);
      else next.add(versiculo);
      return next;
    });
    startTransition(() => {
      toggleVerse(livroId, capitulo, versiculo, !isLido);
    });
  }

  function handleMarkAll() {
    if (!livro) return;
    const total = livro.chapters[capitulo - 1]?.length ?? 0;
    setLidos(new Set(Array.from({ length: total }, (_, i) => i + 1)));
    startTransition(() => {
      markAllChapter(livroId, capitulo, total);
    });
  }

  if (error) {
    return <p className="text-sm text-muted-foreground">Capítulo não encontrado.</p>;
  }

  if (!livro) {
    return <div className="h-60 w-full animate-pulse bg-muted" />;
  }

  const versos = livro.chapters[capitulo - 1];
  if (!versos) {
    return <p className="text-sm text-muted-foreground">Capítulo não encontrado.</p>;
  }

  const alvo =
    typeof window !== "undefined" && window.location.hash.startsWith("#v")
      ? Number(window.location.hash.slice(2))
      : null;

  const totalLidos = lidos.size;
  const completo = totalLidos >= versos.length;

  return (
    <div>
      <p className="text-xs label-caps text-accent">
        {livro.name} {capitulo}
      </p>
      <h1 className="font-display mt-2 text-2xl sm:text-3xl">
        {livro.name} {capitulo}
      </h1>

      <button
        type="button"
        onClick={handleMarkAll}
        disabled={completo}
        className="mt-6 border border-accent bg-accent px-5 py-2.5 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {completo ? "Capítulo lido ✓" : "Marcar capítulo inteiro como lido"}
      </button>

      <div className="mt-8 space-y-1">
        {versos.map((texto, i) => {
          const n = i + 1;
          const isLido = lidos.has(n);
          const isAlvo = alvo === n;
          return (
            <p
              key={n}
              id={`v${n}`}
              className={
                "flex gap-3 py-1.5 text-sm leading-relaxed transition-colors " +
                (isAlvo ? "bg-accent/10" : "")
              }
            >
              <button
                type="button"
                onClick={() => handleToggle(n)}
                aria-label={isLido ? `Desmarcar versículo ${n}` : `Marcar versículo ${n} como lido`}
                className={
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border text-[10px] " +
                  (isLido
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-transparent hover:border-accent")
                }
              >
                ✓
              </button>
              <span ref={isAlvo ? highlightRef : undefined} className={isLido ? "text-foreground" : "text-muted-foreground"}>
                <span className="text-xs text-muted-foreground">{n} </span>
                {texto}
              </span>
            </p>
          );
        })}
      </div>

      <div className="mt-10 border-t border-border pt-8 text-center">
        <Link
          href={`/biblia/${livroId}`}
          className="text-xs label-caps text-muted-foreground hover:text-accent"
        >
          Ver todos os capítulos de {livro.name}
        </Link>
      </div>
    </div>
  );
}
