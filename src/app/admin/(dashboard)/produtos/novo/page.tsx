import { ProdutoForm } from "@/components/admin/ProdutoForm";

export default function NovoProdutoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Novo produto</h1>
      <div className="mt-8">
        <ProdutoForm />
      </div>
    </div>
  );
}
