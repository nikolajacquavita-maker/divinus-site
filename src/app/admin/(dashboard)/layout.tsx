import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display label-caps text-lg">
              Divinus Admin
            </Link>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/admin/produtos" className="hover:text-foreground">Produtos</Link>
              <Link href="/admin/mensagens" className="hover:text-foreground">Mensagens</Link>
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
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
