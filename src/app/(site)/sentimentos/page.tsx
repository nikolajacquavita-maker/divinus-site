import type { Metadata } from "next";
import { getActiveFeelings } from "@/lib/data";
import { FeelingFilter } from "@/components/FeelingFilter";

export const metadata: Metadata = {
  title: "Sentimentos — O que está pesando em você hoje? | Divinus",
};

export const revalidate = 0;

export default async function SentimentosPage() {
  const feelings = await getActiveFeelings();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <h1 className="font-display text-3xl sm:text-4xl">O que está pesando em você hoje?</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Não escolha o que parece bonito. Escolha o que você realmente está sentindo.
      </p>

      <div className="mt-10">
        <FeelingFilter feelings={feelings} />
      </div>
    </div>
  );
}
