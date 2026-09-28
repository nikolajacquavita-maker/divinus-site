import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/members-data";
import { listPrayerGroups } from "@/lib/prayer-groups-data";
import { UF_PATHS } from "@/lib/brazil-map-data";

export const revalidate = 0;

function findNome(uf: string) {
  return UF_PATHS.find((s) => s.uf === uf)?.nome;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uf: string }>;
}): Promise<Metadata> {
  const { uf } = await params;
  const nome = findNome(uf.toUpperCase());
  return { title: nome ? `Grupos de oração — ${nome} | Divinus` : "Estado — Divinus" };
}

export default async function GrupoOracaoEstadoPage({
  params,
}: {
  params: Promise<{ uf: string }>;
}) {
  const { uf: ufParam } = await params;
  const uf = ufParam.toUpperCase();
  const nome = findNome(uf);
  if (!nome) notFound();

  const member = await getCurrentMember();
  if (!member || member.status !== "approved") {
    redirect("/grupo-de-oracao");
  }

  const groups = await listPrayerGroups(member.id, uf);
  const cidades = Array.from(new Set(groups.map((g) => g.cidade))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <Link
        href="/grupo-de-oracao"
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Todos os estados
      </Link>

      <p className="mt-8 text-xs label-caps text-muted-foreground">Grupo de Oração</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">{nome}</h1>

      {cidades.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Ainda não há grupos de oração cadastrados nesse estado.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {cidades.map((cidade) => (
            <Link
              key={cidade}
              href={`/grupo-de-oracao/${ufParam.toLowerCase()}/${encodeURIComponent(cidade)}`}
              className="border border-border px-4 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
            >
              {cidade}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
