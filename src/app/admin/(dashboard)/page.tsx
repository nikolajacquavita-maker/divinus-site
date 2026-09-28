import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: productsCount },
    { count: activeCount },
    { count: feelingsCount },
    { count: heroMessagesCount },
    { count: pendingMembersCount },
    { count: pendingGroupsCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase.from("feelings").select("*", { count: "exact", head: true }),
    supabase.from("hero_messages").select("*", { count: "exact", head: true }),
    supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("prayer_groups")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl">Painel Divinus</h1>
      <p className="mt-2 text-muted-foreground">
        Gerencie produtos (fotos, descrição, valor, link Lobway, status) e as
        mensagens do site.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
        <div className="border border-border p-6">
          <p className="text-xs label-caps text-muted-foreground">Produtos</p>
          <p className="font-display mt-2 text-4xl">{productsCount ?? 0}</p>
        </div>
        <div className="border border-border p-6">
          <p className="text-xs label-caps text-muted-foreground">Ativos no site</p>
          <p className="font-display mt-2 text-4xl">{activeCount ?? 0}</p>
        </div>
        <div className="border border-border p-6">
          <p className="text-xs label-caps text-muted-foreground">Sentimentos</p>
          <p className="font-display mt-2 text-4xl">{feelingsCount ?? 0}</p>
        </div>
        <div className="border border-border p-6">
          <p className="text-xs label-caps text-muted-foreground">Mensagens da home</p>
          <p className="font-display mt-2 text-4xl">{heroMessagesCount ?? 0}</p>
        </div>
        <div className="border border-border p-6">
          <p className="text-xs label-caps text-muted-foreground">Cadastros pendentes</p>
          <p className="font-display mt-2 text-4xl">{pendingMembersCount ?? 0}</p>
        </div>
        <div className="border border-border p-6">
          <p className="text-xs label-caps text-muted-foreground">Grupos de oração pendentes</p>
          <p className="font-display mt-2 text-4xl">{pendingGroupsCount ?? 0}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/admin/produtos"
          className="border border-accent px-6 py-3 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Gerenciar produtos
        </Link>
        <Link
          href="/admin/sentimentos"
          className="border border-accent px-6 py-3 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Gerenciar sentimentos
        </Link>
        <Link
          href="/admin/mensagens-hero"
          className="border border-border px-6 py-3 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
        >
          Gerenciar mensagens da home
        </Link>
        <Link
          href="/admin/comunidade"
          className="border border-border px-6 py-3 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
        >
          Gerenciar comunidade
        </Link>
        <Link
          href="/admin/membros"
          className="border border-border px-6 py-3 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
        >
          Aprovar cadastros
        </Link>
        <Link
          href="/admin/grupos-oracao"
          className="border border-border px-6 py-3 text-xs label-caps hover:border-accent hover:text-accent transition-colors"
        >
          Aprovar grupos de oração
        </Link>
      </div>
    </div>
  );
}
