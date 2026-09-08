"use client";

import { upsertHeroMessage } from "@/app/admin/actions";
import type { HeroMessage } from "@/lib/types";

export function HeroMessageForm({ message }: { message?: HeroMessage }) {
  return (
    <form action={upsertHeroMessage} className="max-w-2xl space-y-6">
      {message && <input type="hidden" name="id" defaultValue={message.id} />}

      <Field label="Mensagem" hint="Curta, sem citar capítulo/versículo — contextualiza uma história bíblica de forma descomplicada">
        <textarea name="text" defaultValue={message?.text} rows={3} required className="admin-input" />
      </Field>

      <Field label="Referência" hint='ex.: "Gênesis 1" — usada só na página de leitura, não aparece na home'>
        <input name="reference" defaultValue={message?.reference} required className="admin-input" />
      </Field>

      <Field label="Slug" hint="usado na URL /leitura/slug">
        <input name="slug" defaultValue={message?.slug} required className="admin-input" />
      </Field>

      <Field label="Contexto" hint="Quem escreveu, quando, para quem, por quê">
        <textarea name="contexto" defaultValue={message?.contexto} rows={3} required className="admin-input" />
      </Field>

      <Field label="O capítulo" hint="O que a passagem/capítulo completo ensina, não só o versículo isolado">
        <textarea name="capitulo" defaultValue={message?.capitulo} rows={3} required className="admin-input" />
      </Field>

      <Field label="Aplicação" hint="Reflexão prática para a vida de quem está lendo">
        <textarea name="aplicacao" defaultValue={message?.aplicacao} rows={3} required className="admin-input" />
      </Field>

      <Field label="Conexão" hint="Outra passagem ou história relacionada, no espírito do Bible Study">
        <textarea name="conexao" defaultValue={message?.conexao} rows={3} required className="admin-input" />
      </Field>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <Field label="Ordem">
          <input
            type="number"
            name="sort_order"
            defaultValue={message?.sort_order ?? 0}
            className="admin-input"
          />
        </Field>
        <label className="mt-7 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={message?.is_active ?? true} />
          Ativa (entra no sorteio)
        </label>
      </div>

      <button
        type="submit"
        className="border border-accent bg-accent px-8 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
      >
        Salvar mensagem
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs label-caps text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}
