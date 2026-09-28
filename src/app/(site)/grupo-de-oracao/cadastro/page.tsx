import Link from "next/link";
import type { Metadata } from "next";
import { signup } from "../actions";

export const metadata: Metadata = {
  title: "Cadastro | Grupo de Oração | Divinus",
};

export default async function CadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-14 sm:py-20">
      <p className="text-xs label-caps text-accent">Grupo de Oração</p>
      <h1 className="font-display mt-2 text-3xl">Cadastre-se</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Seu acesso é liberado depois de uma aprovação.
      </p>

      <form action={signup} className="mt-8 space-y-4">
        <div>
          <label className="text-xs label-caps text-muted-foreground">Nome</label>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
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
          <label className="text-xs label-caps text-muted-foreground">CPF</label>
          <input
            type="text"
            name="cpf"
            required
            inputMode="numeric"
            placeholder="000.000.000-00"
            pattern="[\d.\-]{11,14}"
            title="Digite os 11 números do CPF"
            className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs label-caps text-muted-foreground">Telefone</label>
          <input
            type="tel"
            name="telefone"
            required
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs label-caps text-muted-foreground">Senha</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
          <p className="mt-1 text-xs text-muted-foreground">Pelo menos 8 caracteres.</p>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-2 w-full border border-accent bg-accent py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Cadastrar
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Já tem conta?{" "}
        <Link href="/grupo-de-oracao/login" className="text-accent hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
