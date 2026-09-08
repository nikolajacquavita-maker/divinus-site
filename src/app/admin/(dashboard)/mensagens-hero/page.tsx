import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteHeroMessage } from "@/app/admin/actions";
import type { HeroMessage } from "@/lib/types";

export const revalidate = 0;

export default async function AdminHeroMessagesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_messages")
    .select("*")
    .order("sort_order", { ascending: true });

  const messages = (data ?? []) as HeroMessage[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Mensagens da home</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Uma é sorteada aleatoriamente a cada visita à página inicial. {messages.length} no total.
          </p>
        </div>
        <Link
          href="/admin/mensagens-hero/novo"
          className="border border-accent px-5 py-2.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          + Nova mensagem
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-400">Erro: {error.message}</p>}

      <div className="mt-8 divide-y divide-border border border-border">
        {messages.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">Nenhuma mensagem ainda.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="min-w-[240px] flex-1">
              <p className="text-xs label-caps text-muted-foreground">{m.reference}</p>
              <p className="text-sm">{m.text}</p>
            </div>
            {!m.is_active && (
              <span className="border border-border px-2 py-0.5 text-xs label-caps text-muted-foreground">
                Inativa
              </span>
            )}
            <div className="flex gap-2">
              <Link
                href={`/admin/mensagens-hero/${m.id}`}
                className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent"
              >
                Editar
              </Link>
              <form action={deleteHeroMessage.bind(null, m.id)}>
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
