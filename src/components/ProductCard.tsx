import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group block border border-border transition-colors hover:border-accent/60"
    >
      <div className="aspect-square w-full bg-card">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs label-caps text-muted-foreground">
            Divinus
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.short_description}</p>
        {product.price != null && (
          <p className="mt-3 text-sm text-accent">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
              product.price,
            )}
          </p>
        )}
      </div>
    </Link>
  );
}
