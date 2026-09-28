import { createClient } from "@/lib/supabase/server";
import { setPrayerGroupStatus, deletePrayerGroup } from "@/app/admin/actions-grupo-oracao";
import type { PrayerGroup } from "@/lib/types";

export const revalidate = 0;

type Row = PrayerGroup & { members: { name: string; email: string } | null };

function GroupCard({ group }: { group: Row }) {
  return (
    <div className="grid gap-4 border border-border p-4 sm:grid-cols-[120px_1fr_auto]">
      {group.foto_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={group.foto_url} alt="Fachada" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="aspect-[4/3] w-full bg-muted" />
      )}
      <div>
        <p className="text-xs label-caps text-muted-foreground">
          {group.cidade} — {group.uf}
        </p>
        <p className="mt-1 text-sm">{group.endereco}</p>
        <p className="mt-1 text-xs text-accent">{group.horario}</p>
        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{group.descricao}</p>
        {group.members && (
          <p className="mt-2 text-xs text-muted-foreground">
            Enviado por {group.members.name} ({group.members.email})
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {group.status !== "approved" && (
          <form action={setPrayerGroupStatus.bind(null, group.id, "approved")}>
            <button className="w-full border border-accent px-3 py-1.5 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground">
              Aprovar
            </button>
          </form>
        )}
        {group.status !== "rejected" && (
          <form action={setPrayerGroupStatus.bind(null, group.id, "rejected")}>
            <button className="w-full border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400">
              Rejeitar
            </button>
          </form>
        )}
        <form action={deletePrayerGroup.bind(null, group.id)}>
          <button className="w-full border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400">
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function AdminGruposOracaoPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("prayer_groups")
    .select("*, members(name, email)")
    .order("created_at", { ascending: false });

  const groups = (data ?? []) as Row[];
  const pending = groups.filter((g) => g.status === "pending");
  const others = groups.filter((g) => g.status !== "pending");

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-display text-3xl">Grupos de Oração</h1>
        <p className="mt-2 text-muted-foreground">
          Grupos enviados pelos membros, aguardando ou já revisados.
        </p>
      </div>

      <section>
        <h2 className="text-xs label-caps text-muted-foreground">
          Pendentes ({pending.length})
        </h2>
        <div className="mt-4 space-y-4">
          {pending.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum grupo pendente.</p>
          )}
          {pending.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs label-caps text-muted-foreground">Todos os grupos</h2>
        <div className="mt-4 space-y-4">
          {others.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))}
        </div>
      </section>
    </div>
  );
}
