"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function PerformanceShowcase({ products }: { products: Product[] }) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="group relative mt-8 block w-full overflow-hidden border border-border text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/produtos/camisetas-performance-hero.jpg"
        alt="Camisetas Divinus Performance — preta e off-white em uso"
        className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent p-6 sm:p-8">
        <div>
          <p className="text-xs label-caps text-accent">Preta e off-white</p>
          <span className="mt-2 inline-block text-sm label-caps text-foreground group-hover:underline">
            Ver as duas camisetas →
          </span>
        </div>
      </div>
    </button>
  );
}
