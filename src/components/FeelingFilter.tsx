"use client";

import { useState } from "react";
import Link from "next/link";
import { FEELING_CATEGORIES } from "@/lib/types";
import type { Feeling, FeelingCategory } from "@/lib/types";

export function FeelingFilter({ feelings }: { feelings: Feeling[] }) {
  const [active, setActive] = useState<FeelingCategory | "todos">("todos");

  const visible =
    active === "todos" ? feelings : feelings.filter((f) => f.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActive("todos")}
          className={`border px-4 py-2 text-xs label-caps transition-colors ${
            active === "todos"
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-muted-foreground hover:border-accent hover:text-accent"
          }`}
        >
          Todos
        </button>
        {FEELING_CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setActive(c.value)}
            className={`border px-4 py-2 text-xs label-caps transition-colors ${
              active === c.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((f) => (
          <Link
            key={f.slug}
            href={`/sentimentos/${f.slug}`}
            className="group block bg-background p-6 transition-colors hover:bg-card sm:p-8"
          >
            <h3 className="font-display text-xl">{f.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{f.teaser}</p>
            <span className="mt-6 inline-block text-xs label-caps text-accent group-hover:underline">
              Ler →
            </span>
          </Link>
        ))}
        {visible.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">
            Nenhum sentimento nessa categoria ainda.
          </p>
        )}
      </div>
    </div>
  );
}
