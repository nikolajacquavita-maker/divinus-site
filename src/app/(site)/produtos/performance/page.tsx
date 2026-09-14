import Link from "next/link";
import type { Metadata } from "next";
import { getActiveProductsByUniverse } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { BrazilMap } from "@/components/BrazilMap";

export const metadata: Metadata = {
  title: "Divinus Performance — Camisetas | Divinus",
};

export const revalidate = 0;

export default async function PerformancePage() {
  const products = await getActiveProductsByUniverse("performance");

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <Link href="/produtos" className="text-xs label-caps text-muted-foreground hover:text-accent">
        ← Produtos
      </Link>

      <p className="mt-8 text-xs label-caps text-muted-foreground">Linha 02</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">Divinus Performance</h1>

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

      <div className="mt-12 border border-border p-6 sm:p-8">
        <p className="text-xs label-caps text-accent">Lançamento em breve</p>
        <p className="font-display mt-3 text-xl sm:text-2xl">Coleção 27 Estados</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Uma camiseta para cada estado brasileiro — cada uma com sua própria
          cor e data de lançamento, pensada a partir do que mais faz sentido
          pra história e a fé de cada região. Clique num estado no mapa pra
          conhecer a coleção dele.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:items-center">
          <div className="mx-auto w-full max-w-sm">
            <BrazilMap />
          </div>
          <Link href="/produtos/estados/sp" className="group block">
            <p className="text-xs label-caps text-muted-foreground">
              Modelo de exemplo — disponível agora
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/produtos/camiseta-sao-paulo-original.jpg"
              alt="Camiseta Divinus Performance — São Paulo"
              className="mt-3 w-full border border-border transition-colors group-hover:border-accent"
            />
            <p className="font-display mt-4 text-lg">São Paulo</p>
            <p className="mt-1 text-xs text-muted-foreground">a cidade que não para.</p>
            <span className="mt-2 inline-block text-xs label-caps text-accent group-hover:underline">
              Conhecer a coleção →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
