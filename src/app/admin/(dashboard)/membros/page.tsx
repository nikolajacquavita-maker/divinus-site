import { createClient } from "@/lib/supabase/server";
import { setMemberStatus } from "@/app/admin/actions-grupo-oracao";
import type { Member } from "@/lib/types";

export const revalidate = 0;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function AdminMembrosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select("id, name, email, grupo_oracao_status, created_at, cpf, telefone")
    .order("created_at", { ascending: false });

  const members = (data ?? []) as (Member & {
    created_at: string;
    cpf: string | null;
    telefone: string | null;
  })[];
  const pending = members.filter((m) => m.grupo_oracao_status === "pending");
  const others = members.filter((m) => m.grupo_oracao_status !== "pending");

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-display text-3xl">Autorizações — Grupo de Oração</h1>
        <p className="mt-2 text-muted-foreground">
          Contas que podem acessar a área de grupos de oração. A conta em si já é
          criada automaticamente — essa aprovação libera só o Grupo de Oração.
        </p>
      </div>

      <section>
        <h2 className="text-xs label-caps text-muted-foreground">
          Pendentes ({pending.length})
        </h2>
        <div className="mt-4 space-y-3">
          {pending.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum cadastro pendente.</p>
          )}
          {pending.map((m) => (
            <div
              key={m.id}
              className="grid gap-3 border border-border p-4 sm:grid-cols-[1.5fr_auto_auto]"
            >
              <div>
                <p className="text-sm">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.email}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.cpf ?? "CPF não informado"} · {m.telefone ?? "telefone não informado"}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(m.created_at)}</p>
              <div className="flex gap-2">
                <form action={setMemberStatus.bind(null, m.id, "approved")}>
                  <button className="border border-accent px-3 py-1.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground">
                    Aprovar
                  </button>
                </form>
                <form action={setMemberStatus.bind(null, m.id, "rejected")}>
                  <button className="border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400">
                    Rejeitar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs label-caps text-muted-foreground">Todos os cadastros</h2>
        <div className="mt-4 space-y-3">
          {others.map((m) => (
            <div
              key={m.id}
              className="grid gap-3 border border-border p-4 sm:grid-cols-[1.5fr_auto_auto]"
            >
              <div>
                <p className="text-sm">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.email}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {m.cpf ?? "CPF não informado"} · {m.telefone ?? "telefone não informado"}
                </p>
              </div>
              <p className="text-xs label-caps text-muted-foreground">{m.grupo_oracao_status}</p>
              <div className="flex gap-2">
                {m.grupo_oracao_status !== "approved" && (
                  <form action={setMemberStatus.bind(null, m.id, "approved")}>
                    <button className="border border-accent px-3 py-1.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground">
                      Aprovar
                    </button>
                  </form>
                )}
                {m.grupo_oracao_status !== "rejected" && (
                  <form action={setMemberStatus.bind(null, m.id, "rejected")}>
                    <button className="border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400">
                      Rejeitar
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
