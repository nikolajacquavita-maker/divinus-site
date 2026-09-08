import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteFeeling } from "@/app/admin/actions";
import { FEELING_CATEGORIES } from "@/lib/types";
import type { Feeling } from "@/lib/types";

export const revalidate = 0;

export default async function AdminSentimentosPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("feelings")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  const feelings = (data ?? []) as Feeling[];
  const byCategory = FEELING_CATEGORIES.map((c) => ({
    ...c,
    items: feelings.filter((f) => f.category === c.value),
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Sentimentos</h1>
        <Link
          href="/admin/sentimentos/novo"
          className="border border-accent px-5 py-2.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          + Novo sentimento
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">Erro: {error.message}</p>}

      <div className="mt-8 space-y-10">
        {byCategory.map((c) => (
          <div key={c.value}>
            <p className="text-xs label-caps text-muted-foreground">
              {c.label} · {c.items.length} sentimento(s)
            </p>
            <div className="mt-3 divide-y divide-border border border-border">
              {c.items.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground">Nenhum sentimento ainda.</p>
              )}
              {c.items.map((f) => (
                <div key={f.id} className="flex flex-wrap items-center gap-4 p-4">
                  <div className="min-w-[240px] flex-1">
                    <p className="text-sm">{f.title}</p>
                    <p className="text-xs text-muted-foreground">/sentimentos/{f.slug}</p>
                  </div>
                  {!f.is_active && (
                    <span className="border border-border px-2 py-0.5 text-xs label-caps text-muted-foreground">
                      Inativo
                    </span>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/sentimentos/${f.id}`}
                      className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent"
                    >
                      Editar
                    </Link>
                    <form action={deleteFeeling.bind(null, f.id)}>
                      <button className="border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400">
                        Excluir
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
