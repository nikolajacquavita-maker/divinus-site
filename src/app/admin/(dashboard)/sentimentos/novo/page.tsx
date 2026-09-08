import { SentimentoForm } from "@/components/admin/SentimentoForm";

export default function NovoSentimentoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Novo sentimento</h1>
      <div className="mt-8">
        <SentimentoForm />
      </div>
    </div>
  );
}
