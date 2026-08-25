import { createClient } from "@/lib/supabase/server";
import {
  deleteChallenge,
  deleteCommunityEvent,
  upsertChallenge,
  upsertCommunityEvent,
} from "@/app/admin/actions";
import type { Challenge, CommunityEvent } from "@/lib/types";

export const revalidate = 0;

export default async function AdminComunidadePage() {
  const supabase = await createClient();

  const [{ data: challengesData }, { data: eventsData }] = await Promise.all([
    supabase.from("challenges").select("*").order("sort_order", { ascending: true }),
    supabase.from("community_events").select("*").order("sort_order", { ascending: true }),
  ]);

  const challenges = (challengesData ?? []) as Challenge[];
  const events = (eventsData ?? []) as CommunityEvent[];

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-display text-3xl">Comunidade</h1>
        <p className="mt-2 text-muted-foreground">
          Desafios e encontros/campanhas mostrados em /comunidade.
        </p>
      </div>

      <section>
        <h2 className="text-xs label-caps text-muted-foreground">Desafios</h2>
        <div className="mt-4 space-y-4">
          {challenges.map((c) => (
            <form
              key={c.id}
              action={upsertChallenge}
              className="grid gap-3 border border-border p-4 sm:grid-cols-[80px_1fr_2fr_auto_auto]"
            >
              <input type="hidden" name="id" defaultValue={c.id} />
              <input
                type="number"
                name="days"
                defaultValue={c.days}
                className="admin-input"
                aria-label="Dias"
              />
              <input
                name="title"
                defaultValue={c.title}
                className="admin-input"
                aria-label="Título"
              />
              <input
                name="description"
                defaultValue={c.description}
                className="admin-input"
                aria-label="Descrição"
              />
              <label className="flex items-center gap-2 text-xs whitespace-nowrap">
                <input type="checkbox" name="is_active" defaultChecked={c.is_active} />
                Ativo
              </label>
              <div className="flex gap-2">
                <button className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent">
                  Salvar
                </button>
                <button
                  formAction={deleteChallenge.bind(null, c.id)}
                  className="border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400"
                >
                  Excluir
                </button>
              </div>
              <input type="hidden" name="sort_order" defaultValue={c.sort_order} />
            </form>
          ))}
        </div>

        <form
          action={upsertChallenge}
          className="mt-4 grid gap-3 border border-dashed border-border p-4 sm:grid-cols-[80px_1fr_2fr_auto]"
        >
          <input type="number" name="days" placeholder="Dias" required className="admin-input" />
          <input name="title" placeholder="Título" required className="admin-input" />
          <input
            name="description"
            placeholder="Descrição"
            required
            className="admin-input"
          />
          <button className="border border-accent px-4 py-2 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground">
            + Adicionar desafio
          </button>
          <input type="hidden" name="is_active" value="on" />
          <input type="hidden" name="sort_order" value={challenges.length} />
        </form>
      </section>

      <section>
        <h2 className="text-xs label-caps text-muted-foreground">Encontros e campanhas</h2>
        <div className="mt-4 space-y-4">
          {events.map((e) => (
            <form
              key={e.id}
              action={upsertCommunityEvent}
              className="grid gap-3 border border-border p-4 sm:grid-cols-[1fr_2fr_auto_auto]"
            >
              <input type="hidden" name="id" defaultValue={e.id} />
              <input
                name="title"
                defaultValue={e.title}
                className="admin-input"
                aria-label="Título"
              />
              <input
                name="description"
                defaultValue={e.description}
                className="admin-input"
                aria-label="Descrição"
              />
              <label className="flex items-center gap-2 text-xs whitespace-nowrap">
                <input type="checkbox" name="is_active" defaultChecked={e.is_active} />
                Ativo
              </label>
              <div className="flex gap-2">
                <button className="border border-border px-3 py-1.5 text-xs label-caps hover:border-accent hover:text-accent">
                  Salvar
                </button>
                <button
                  formAction={deleteCommunityEvent.bind(null, e.id)}
                  className="border border-border px-3 py-1.5 text-xs label-caps text-muted-foreground hover:border-red-400 hover:text-red-400"
                >
                  Excluir
                </button>
              </div>
              <input type="hidden" name="sort_order" defaultValue={e.sort_order} />
            </form>
          ))}
        </div>

        <form
          action={upsertCommunityEvent}
          className="mt-4 grid gap-3 border border-dashed border-border p-4 sm:grid-cols-[1fr_2fr_auto]"
        >
          <input name="title" placeholder="Título" required className="admin-input" />
          <input
            name="description"
            placeholder="Descrição"
            required
            className="admin-input"
          />
          <button className="border border-accent px-4 py-2 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground">
            + Adicionar encontro/campanha
          </button>
          <input type="hidden" name="is_active" value="on" />
          <input type="hidden" name="sort_order" value={events.length} />
        </form>
      </section>
    </div>
  );
}
