import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href="/admin" className="font-display label-caps text-lg">
              Divinus Admin
            </Link>
            <nav className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
              <Link href="/admin/produtos" className="hover:text-foreground">Produtos</Link>
              <Link href="/admin/sentimentos" className="hover:text-foreground">Sentimentos</Link>
              <Link href="/admin/mensagens-hero" className="hover:text-foreground">Mensagens da home</Link>
              <Link href="/admin/comunidade" className="hover:text-foreground">Comunidade</Link>
              <Link href="/" className="hover:text-foreground" target="_blank">
                Ver site ↗
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button className="text-xs label-caps text-muted-foreground hover:text-foreground">
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
