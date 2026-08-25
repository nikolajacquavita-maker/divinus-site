import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct, setProductStatus } from "@/app/admin/actions";
import { UNIVERSES } from "@/lib/types";
import type { Product, ProductStatus } from "@/lib/types";

export const revalidate = 0;

const STATUS_LABEL: Record<ProductStatus, string> = {
  active: "Ativo",
  coming_soon: "Em breve",
  paused: "Pausado",
  cancelled: "Cancelado",
};

const STATUS_CLASS: Record<ProductStatus, string> = {
  active: "text-accent border-accent/60",
  coming_soon: "text-amber-400 border-amber-400/40",
  paused: "text-muted-foreground border-border",
  cancelled: "text-red-400 border-red-400/40",
};

export default async function AdminProdutosPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("universe", { ascending: true })
    .order("sort_order", { ascending: true });

  const products = (data ?? []) as Product[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="border border-accent px-5 py-2.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          + Novo produto
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">Erro: {error.message}</p>}

      <div className="mt-8 divide-y divide-border border border-border">
        {products.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">Nenhum produto cadastrado.</p>
        )}
        {products.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-4 p-5">
            <div className="h-14 w-14 shrink-0 border border-border bg-card">
              {p.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
              )}
            </div>

            <div className="min-w-[200px] flex-1">
              <p className="font-display text-lg">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {UNIVERSES.find((u) => u.value === p.universe)?.label} · /{p.slug}
                {p.price != null &&
                  ` · ${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(p.price)}`}
              </p>
            </div>

            <span
              className={`border px-3 py-1 text-xs label-caps ${STATUS_CLASS[p.status]}`}
            >
              {STATUS_LABEL[p.status]}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/admin/produtos/${p.id}`}
                className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent"
              >
                Editar
              </Link>

              {p.status !== "active" && (
                <form action={setProductStatus.bind(null, p.id, "active")}>
                  <button className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent">
                    Ativar
                  </button>
                </form>
              )}
              {p.status !== "coming_soon" && (
                <form action={setProductStatus.bind(null, p.id, "coming_soon")}>
                  <button className="border border-border px-3 py-1.5 text-xs label-caps hover:border-amber-400 hover:text-amber-400">
                    Em breve
                  </button>
                </form>
              )}
              {p.status !== "paused" && (
                <form action={setProductStatus.bind(null, p.id, "paused")}>
                  <button className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent">
                    Pausar
                  </button>
                </form>
              )}
              <form action={deleteProduct.bind(null, p.id)}>
                <button className="border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400">
                  Excluir
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
