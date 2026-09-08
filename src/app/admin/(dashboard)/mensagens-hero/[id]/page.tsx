import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HeroMessageForm } from "@/components/admin/HeroMessageForm";
import type { HeroMessage } from "@/lib/types";

export const revalidate = 0;

export default async function EditarMensagemHeroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("hero_messages").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">Editar mensagem da home</h1>
      <div className="mt-8">
        <HeroMessageForm message={data as HeroMessage} />
      </div>
    </div>
  );
}
