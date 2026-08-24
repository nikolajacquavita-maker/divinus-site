import { MensagemForm } from "@/components/admin/MensagemForm";

export default function NovaMensagemPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Nova mensagem</h1>
      <div className="mt-8">
        <MensagemForm />
      </div>
    </div>
  );
}
