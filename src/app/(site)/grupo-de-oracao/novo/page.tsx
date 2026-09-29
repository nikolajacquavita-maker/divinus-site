import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/members-data";
import { GrupoOracaoForm } from "@/components/GrupoOracaoForm";

export const metadata: Metadata = {
  title: "Cadastrar grupo de oração | Divinus",
};

export const revalidate = 0;

export default async function NovoGrupoOracaoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; enviado?: string }>;
}) {
  const { error, enviado } = await searchParams;

  const member = await getCurrentMember();
  if (!member || member.grupo_oracao_status !== "approved") {
    redirect("/grupo-de-oracao");
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-14 sm:py-20">
      <Link
        href="/grupo-de-oracao"
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Grupo de Oração
      </Link>

      <p className="mt-8 text-xs label-caps text-accent">Grupo de Oração</p>
      <h1 className="font-display mt-2 text-3xl">Cadastrar meu grupo</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Depois de enviado, seu grupo passa por uma aprovação antes de
        aparecer para as outras pessoas.
      </p>

      {enviado && (
        <p className="mt-6 border border-accent p-4 text-sm text-accent">
          Grupo enviado! Assim que for aprovado, ele aparece na lista da sua
          cidade.
        </p>
      )}

      <GrupoOracaoForm error={error} />
    </div>
  );
}
