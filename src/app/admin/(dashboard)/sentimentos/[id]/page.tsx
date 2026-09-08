import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SentimentoForm } from "@/components/admin/SentimentoForm";
import type { Feeling } from "@/lib/types";

export const revalidate = 0;

export default async function EditarSentimentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("feelings").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">Editar sentimento</h1>
      <div className="mt-8">
        <SentimentoForm feeling={data as Feeling} />
      </div>
    </div>
  );
}
