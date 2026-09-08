import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { UF_PATHS } from "@/lib/brazil-map-data";
import { ESTADOS_DISPONIVEIS } from "@/lib/estados-data";
import { ProductGallery } from "@/components/ProductGallery";

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
  return { title: nome ? `${nome} — Coleção 27 Estados | Divinus` : "Estado — Divinus" };
}

export default async function EstadoPage({
  params,
}: {
  params: Promise<{ uf: string }>;
}) {
  const { uf: ufParam } = await params;
  const uf = ufParam.toUpperCase();
  const nome = findNome(uf);
  if (!nome) notFound();

  const estado = ESTADOS_DISPONIVEIS[uf];

  if (!estado) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-14 text-center sm:py-20">
        <Link href="/produtos" className="text-xs label-caps text-muted-foreground hover:text-accent">
          ← Coleção 27 Estados
        </Link>
        <p className="mt-8 text-xs label-caps text-accent">Lançamento em breve</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">{nome}</h1>
        <p className="mt-6 text-muted-foreground">
          A camiseta e a história desse estado ainda estão sendo preparadas —
          cada uma com sua própria cor, pensada a partir do que mais faz
          sentido pra história e a fé de cada região.
        </p>
        <Link
          href="/produtos"
          className="mt-8 inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Ver outros estados
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <Link href="/produtos" className="text-xs label-caps text-muted-foreground hover:text-accent">
        ← Coleção 27 Estados
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <ProductGallery images={estado.images} alt={`Camiseta Divinus Performance — ${estado.nome}`} />

        <div>
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: estado.cor }}
              aria-hidden
            />
            <p className="text-xs label-caps text-muted-foreground">Coleção 27 Estados</p>
          </div>
          <h1 className="font-display mt-2 text-4xl">{estado.nome}</h1>
          <p className="mt-3 text-accent">{estado.tagline}</p>
        </div>
      </div>

      <div className="mt-4">
        <Section index="01" label="História" text={estado.historia} />
        <Section index="02" label="Economia" text={estado.economia} />
        <Section index="03" label="Curiosidades" text={estado.curiosidades} />
        <Section index="04" label="Escolha da cor" text={estado.escolhaCor} />
      </div>

      <div className="mt-4 border-t border-border pt-12 text-center">
        <Link
          href="/produtos"
          className="inline-block border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Ver outros estados
        </Link>
      </div>
    </div>
  );
}

function Section({ index, label, text }: { index: string; label: string; text: string }) {
  return (
    <div className="grid gap-3 border-t border-border py-10 sm:grid-cols-[140px_1fr] sm:gap-8">
      <div>
        <p className="text-xs label-caps text-muted-foreground">{index}</p>
        <p className="font-display mt-1 text-lg">{label}</p>
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
