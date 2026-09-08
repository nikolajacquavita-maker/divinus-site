import { HeroMessageForm } from "@/components/admin/HeroMessageForm";

export default function NovaMensagemHeroPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Nova mensagem da home</h1>
      <div className="mt-8">
        <HeroMessageForm />
      </div>
    </div>
  );
}
