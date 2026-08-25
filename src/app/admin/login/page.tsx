import { redirect } from "next/navigation";
import { login } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-display label-caps text-center text-2xl">Divinus</p>
        <p className="mt-1 text-center text-xs label-caps text-muted-foreground">
          Painel de configuração
        </p>

        <form action={login} className="mt-10 space-y-4">
          <div>
            <label className="text-xs label-caps text-muted-foreground">E-mail</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs label-caps text-muted-foreground">Senha</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">
              Não foi possível entrar: {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 w-full border border-accent bg-accent py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
