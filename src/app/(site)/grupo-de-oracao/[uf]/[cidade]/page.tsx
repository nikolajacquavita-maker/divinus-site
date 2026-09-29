import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/members-data";
import { listPrayerGroups } from "@/lib/prayer-groups-data";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uf: string; cidade: string }>;
}): Promise<Metadata> {
  const { cidade } = await params;
  return { title: `Grupos de oração em ${decodeURIComponent(cidade)} | Divinus` };
}

export default async function GrupoOracaoCidadePage({
  params,
}: {
  params: Promise<{ uf: string; cidade: string }>;
}) {
  const { uf: ufParam, cidade: cidadeParam } = await params;
  const uf = ufParam.toUpperCase();
  const cidade = decodeURIComponent(cidadeParam);

  const member = await getCurrentMember();
  if (!member || member.grupo_oracao_status !== "approved") {
    redirect("/grupo-de-oracao");
  }

  const groups = await listPrayerGroups(member.id, uf, cidade);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <Link
        href={`/grupo-de-oracao/${ufParam.toLowerCase()}`}
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Voltar
      </Link>

      <p className="mt-8 text-xs label-caps text-muted-foreground">Grupo de Oração</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">{cidade}</h1>

      {groups.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Nenhum grupo de oração encontrado aqui.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id} className="border border-border">
              {group.foto_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={group.foto_url}
                  alt={`Fachada — grupo de oração em ${group.endereco}`}
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
              <div className="p-5">
                <p className="text-sm">{group.endereco}</p>
                <p className="mt-2 text-xs label-caps text-accent">{group.horario}</p>
                <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line">
                  {group.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
