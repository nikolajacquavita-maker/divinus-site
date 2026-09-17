import type { Metadata } from "next";
import { IgrejasBrazilMap } from "@/components/IgrejasBrazilMap";

export const metadata: Metadata = {
  title: "Encontre uma igreja perto de você | Divinus",
};

export default function IgrejasPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-center sm:py-20">
      <p className="text-xs label-caps text-accent">Encontre uma igreja</p>
      <h1 className="font-display mt-4 text-3xl sm:text-4xl">
        A igreja mais próxima de você
      </h1>
      <p className="mt-6 text-muted-foreground">
        Escolha um estado no mapa e depois um município para ver igrejas
        católicas, evangélicas e espíritas perto de você.
      </p>

      <div className="mx-auto mt-12 w-full max-w-sm">
        <IgrejasBrazilMap />
      </div>
    </div>
  );
}
