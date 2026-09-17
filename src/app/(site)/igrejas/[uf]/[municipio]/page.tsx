import Link from "next/link";
import type { Metadata } from "next";
import { getIgrejasByCidade } from "@/lib/igrejas-data";
import { CidadeNome } from "@/components/CidadeNome";
import { IgrejaLista } from "@/components/IgrejaLista";

function prettify(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uf: string; municipio: string }>;
}): Promise<Metadata> {
  const { municipio } = await params;
  return { title: `Igrejas em ${prettify(municipio)} | Divinus` };
}

export default async function IgrejasMunicipioPage({
  params,
}: {
  params: Promise<{ uf: string; municipio: string }>;
}) {
  const { uf: ufParam, municipio } = await params;
  const uf = ufParam.toLowerCase();
  const igrejas = getIgrejasByCidade(uf, municipio);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <Link
        href={`/igrejas/${uf}`}
        className="text-xs label-caps text-muted-foreground hover:text-accent"
      >
        ← Voltar pro mapa
      </Link>

      <p className="mt-8 text-xs label-caps text-muted-foreground">Encontre uma igreja</p>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl">
        <CidadeNome uf={uf} slug={municipio} fallback={prettify(municipio)} />
      </h1>

      {igrejas ? (
        <>
          <p className="mt-4 text-sm text-muted-foreground">
            Igrejas católicas, evangélicas e espíritas cadastradas nessa cidade.
          </p>
          <div className="mt-8">
            <IgrejaLista igrejas={igrejas} />
          </div>
        </>
      ) : (
        <p className="mt-6 text-muted-foreground">
          Ainda não temos igrejas cadastradas nessa cidade — estamos mapeando o
          Brasil inteiro aos poucos. Volte em breve.
        </p>
      )}
    </div>
  );
}
