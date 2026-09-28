import Link from "next/link";
import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/members-data";
import { UF_PATHS } from "@/lib/brazil-map-data";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Grupo de Oração | Divinus",
};

export const revalidate = 0;

export default async function GrupoOracaoPage() {
  const member = await getCurrentMember();

  if (!member) {
    return (
      <div className="mx-auto max-w-md px-6 py-14 text-center sm:py-20">
        <p className="text-xs label-caps text-accent">Grupo de Oração</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">Entre ou cadastre-se</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Essa área é restrita a cadastros aprovados. Faça login se já tem
          conta, ou cadastre-se — seu acesso é liberado após aprovação.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/grupo-de-oracao/login"
            className="border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Entrar
          </Link>
          <Link
            href="/grupo-de-oracao/cadastro"
            className="border border-border px-6 py-3 text-xs label-caps hover:border-accent transition-colors"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    );
  }

  if (member.status === "pending") {
    return (
      <div className="mx-auto max-w-md px-6 py-14 text-center sm:py-20">
        <p className="text-xs label-caps text-accent">Grupo de Oração</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">Cadastro em análise</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Olá, {member.name}. Seu cadastro ainda está sendo revisado. Assim
          que for aprovado, você poderá ver e cadastrar grupos de oração.
        </p>
        <form action={logout} className="mt-8">
          <button className="text-xs label-caps text-muted-foreground hover:text-foreground">
            Sair
          </button>
        </form>
      </div>
    );
  }

  if (member.status === "rejected") {
    return (
      <div className="mx-auto max-w-md px-6 py-14 text-center sm:py-20">
        <p className="text-xs label-caps text-accent">Grupo de Oração</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">Cadastro não aprovado</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Seu cadastro não foi aprovado para essa área. Se acha que isso foi
          um engano, entre em contato com a Divinus.
        </p>
        <form action={logout} className="mt-8">
          <button className="text-xs label-caps text-muted-foreground hover:text-foreground">
            Sair
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs label-caps text-accent">Grupo de Oração</p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl">Olá, {member.name}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Escolha um estado pra ver os grupos de oração cadastrados, ou
            cadastre o seu.
          </p>
        </div>
        <form action={logout}>
          <button className="text-xs label-caps text-muted-foreground hover:text-foreground">
            Sair
          </button>
        </form>
      </div>

      <Link
        href="/grupo-de-oracao/novo"
        className="mt-8 inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
      >
        Cadastrar meu grupo de oração
      </Link>

      <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {UF_PATHS.map(({ uf, nome }) => (
          <Link
            key={uf}
            href={`/grupo-de-oracao/${uf.toLowerCase()}`}
            className="border border-border px-4 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            {nome}
          </Link>
        ))}
      </div>
    </div>
  );
}
