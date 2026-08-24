import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/data";
import { UNIVERSES } from "@/lib/types";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} — Divinus` : "Produto — Divinus" };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const universe = UNIVERSES.find((u) => u.value === product.universe);
  const price =
    product.price != null
      ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
          product.price,
        )
      : null;

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
      <div className="grid gap-4">
        {product.images.length > 0 ? (
          product.images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={product.name}
              className="aspect-square w-full border border-border object-cover"
            />
          ))
        ) : (
          <div className="flex aspect-square w-full items-center justify-center border border-border bg-card text-xs label-caps text-muted-foreground">
            Divinus
          </div>
        )}
      </div>

      <div>
        {universe && (
          <p className="text-xs label-caps text-muted-foreground">{universe.label}</p>
        )}
        <h1 className="font-display mt-2 text-4xl">{product.name}</h1>
        <p className="mt-3 text-accent">{product.short_description}</p>
        {price && <p className="mt-6 text-2xl">{price}</p>}

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {product.full_description}
        </p>

        {product.features.length > 0 && (
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {product.features.map((f) => (
              <li key={f}>— {f}</li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          {product.lobway_url ? (
            <a
              href={product.lobway_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent bg-accent px-8 py-4 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Comprar na Lobway →
            </a>
          ) : (
            <p className="text-xs label-caps text-muted-foreground">
              Em breve disponível para compra
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Você será redirecionado ao site do nosso parceiro Lobway para
            finalizar a compra com segurança.
          </p>
        </div>
      </div>
    </div>
  );
}
