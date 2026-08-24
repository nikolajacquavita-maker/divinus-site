import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProdutoForm } from "@/components/admin/ProdutoForm";
import type { Product } from "@/lib/types";

export const revalidate = 0;

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl">Editar produto</h1>
      <div className="mt-8">
        <ProdutoForm product={data as Product} />
      </div>
    </div>
  );
}
