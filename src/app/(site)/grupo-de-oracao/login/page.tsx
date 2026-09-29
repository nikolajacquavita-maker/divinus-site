import Link from "next/link";
import type { Metadata } from "next";
import { login } from "../actions";
import { sanitizeNextPath } from "@/lib/auth/next-path";

export const metadata: Metadata = {
  title: "Entrar | Divinus",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next: rawNext } = await searchParams;
  const next = sanitizeNextPath(rawNext);

  return (
    <div className="mx-auto max-w-sm px-6 py-14 sm:py-20">
      <p className="text-xs label-caps text-accent">Login</p>
      <h1 className="font-display mt-2 text-3xl">Entrar</h1>

      <form action={login} className="mt-8 space-y-4">
        <input type="hidden" name="next" value={next} />
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

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-2 w-full border border-accent bg-accent py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Entrar
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <a
        href={`/api/auth/google/login?next=${encodeURIComponent(next)}`}
        className="mt-6 flex w-full items-center justify-center gap-2 border border-border py-3 text-xs label-caps hover:border-accent transition-colors"
      >
        Entrar com Google
      </a>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          href={`/grupo-de-oracao/cadastro?next=${encodeURIComponent(next)}`}
          className="text-accent hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
