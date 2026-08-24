import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteMessage } from "@/app/admin/actions";
import { MESSAGE_CATEGORIES } from "@/lib/types";
import type { Message } from "@/lib/types";

export const revalidate = 0;

export default async function AdminMensagensPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("category", { ascending: true })
    .order("order_index", { ascending: true });

  const messages = (data ?? []) as Message[];
  const byCategory = MESSAGE_CATEGORIES.map((c) => ({
    ...c,
    items: messages.filter((m) => m.category === c.value),
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Mensagens</h1>
        <Link
          href="/admin/mensagens/novo"
          className="border border-accent px-5 py-2.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          + Nova mensagem
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">Erro: {error.message}</p>}

      <div className="mt-8 space-y-10">
        {byCategory.map((c) => (
          <div key={c.value}>
            <p className="text-xs label-caps text-muted-foreground">
              {c.label} · {c.items.length} mensagem(ns)
            </p>
            <div className="mt-3 divide-y divide-border border border-border">
              {c.items.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground">Nenhuma mensagem ainda.</p>
              )}
              {c.items.map((m) => (
                <div key={m.id} className="flex flex-wrap items-center gap-4 p-4">
                  <div className="min-w-[240px] flex-1">
                    <p className="text-sm">“{m.verse_text}”</p>
                    <p className="text-xs text-muted-foreground">{m.verse_reference}</p>
                  </div>
                  {!m.is_active && (
                    <span className="border border-border px-2 py-0.5 text-xs label-caps text-muted-foreground">
                      Inativa
                    </span>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/mensagens/${m.id}`}
                      className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent"
                    >
                      Editar
                    </Link>
                    <form action={deleteMessage.bind(null, m.id)}>
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
