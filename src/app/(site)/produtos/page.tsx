import Link from "next/link";
import type { Metadata } from "next";
import { getActiveProductsByUniverse, getVisibleUniverses } from "@/lib/data";
import { UNIVERSES } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { BrazilMap } from "@/components/BrazilMap";

export const metadata: Metadata = {
  title: "Produtos — Água Divinus, Performance e Essentials",
};

export const revalidate = 0;

export default async function ProdutosPage() {
  const [water, performance, essentials, visibleUniverses] = await Promise.all([
    getActiveProductsByUniverse("water"),
    getActiveProductsByUniverse("performance"),
    getActiveProductsByUniverse("essentials"),
    getVisibleUniverses(),
  ]);

  const byUniverse = { water, performance, essentials };
  const universes = UNIVERSES.filter((u) => visibleUniverses.includes(u.value));

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-20">
          <p className="text-xs label-caps text-accent">Os universos da marca</p>
          <h1 className="font-display mt-4 text-3xl sm:text-4xl">Antes do preço, o propósito.</h1>
          <p className="mt-6 text-muted-foreground">
            A Divinus nasceu para levar a mensagem de Deus para lugares onde
            muitas vezes ela não chega. Na água que você bebe. Na roupa que
            você veste. No esporte. Nos momentos em que você mais precisa
            lembrar quem você é.
          </p>
        </div>
      </section>

      {universes.map((u, i) => {
        const products = byUniverse[u.value];
        return (
          <section key={u.value} className={i > 0 ? "border-t border-border" : ""}>
            <div className="mx-auto max-w-6xl px-6 py-16">
              <p className="text-xs label-caps text-muted-foreground">
                Linha {String(i + 1).padStart(2, "0")}
              </p>
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

              {u.value === "performance" && (
                <div className="mt-12 border border-border p-6 sm:p-8">
                  <p className="text-xs label-caps text-accent">Lançamento em breve</p>
                  <p className="font-display mt-3 text-xl sm:text-2xl">Coleção 27 Estados</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Uma camiseta para cada estado brasileiro — cada uma com sua
                    própria cor e data de lançamento, pensada a partir do que
                    mais faz sentido pra história e a fé de cada região.
                    Clique num estado no mapa pra conhecer a coleção dele.
                  </p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:items-center">
                    <div className="mx-auto w-full max-w-sm">
                      <BrazilMap />
                    </div>
                    <Link href="/produtos/estados/sp" className="group block">
                      <p className="text-xs label-caps text-muted-foreground">
                        Modelo de exemplo — disponível agora
                      </p>
                      <img
                        src="/images/produtos/camiseta-sao-paulo-frente.jpg"
                        alt="Camiseta Divinus Performance — São Paulo"
                        className="mt-3 w-full border border-border transition-colors group-hover:border-accent"
                      />
                      <p className="font-display mt-4 text-lg">São Paulo</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        ritmo. potência. direção.
                      </p>
                      <span className="mt-2 inline-block text-xs label-caps text-accent group-hover:underline">
                        Conhecer a coleção →
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
