import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MensagemForm } from "@/components/admin/MensagemForm";
import type { Message } from "@/lib/types";

export const revalidate = 0;

export default async function EditarMensagemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("messages").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">Editar mensagem</h1>
      <div className="mt-8">
        <MensagemForm message={data as Message} />
      </div>
    </div>
  );
}
