import type { Metadata } from "next";
import { getActiveProductsByUniverse } from "@/lib/data";
import { UNIVERSES } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Produtos — Divinus Water, Performance e Essentials",
};

export const revalidate = 0;

export default async function ProdutosPage() {
  const [water, performance, essentials] = await Promise.all([
    getActiveProductsByUniverse("water"),
    getActiveProductsByUniverse("performance"),
    getActiveProductsByUniverse("essentials"),
  ]);

  const byUniverse = { water, performance, essentials };

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-20">
          <p className="text-xs label-caps text-accent">Os universos da marca</p>
          <h1 className="font-display mt-4 text-3xl sm:text-4xl">Antes do preço, o propósito.</h1>
          <p className="mt-6 text-muted-foreground">
            Toda página de produto Divinus começa pelo motivo da peça existir.
            Depois vêm as fotografias, a história da criação, o significado da
            frase e só então as características técnicas.
          </p>
        </div>
      </section>

      {UNIVERSES.map((u, i) => {
        const products = byUniverse[u.value];
        return (
          <section key={u.value} className={i > 0 ? "border-t border-border" : ""}>
            <div className="mx-auto max-w-6xl px-6 py-16">
              <p className="text-xs label-caps text-muted-foreground">Linha {u.index}</p>
              <h2 className="font-display mt-2 text-3xl">{u.label}</h2>
              {products.length === 0 ? (
                <p className="mt-8 text-sm text-muted-foreground">
                  Em breve — os produtos dessa linha estão sendo preparados.
                </p>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
