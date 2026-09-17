import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UF_PATHS } from "@/lib/brazil-map-data";
import { MunicipioMap } from "@/components/MunicipioMap";

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
  return { title: nome ? `Igrejas em ${nome} | Divinus` : "Estado — Divinus" };
}

export default async function IgrejasEstadoPage({
  params,
}: {
  params: Promise<{ uf: string }>;
}) {
  const { uf: ufParam } = await params;
  const uf = ufParam.toUpperCase();
  const nome = findNome(uf);
  if (!nome) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <Link href="/igrejas" className="text-xs label-caps text-muted-foreground hover:text-accent">
        ← Todos os estados
      </Link>

      <p className="mt-8 text-xs label-caps text-muted-foreground">Encontre uma igreja</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">{nome}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Clique num município pra ver as igrejas dessa cidade.
      </p>

      <div className="mx-auto mt-10 w-full max-w-2xl">
        <MunicipioMap uf={ufParam.toLowerCase()} />
      </div>
    </div>
  );
}
