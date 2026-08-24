"use client";

import { upsertMessage } from "@/app/admin/actions";
import { MESSAGE_CATEGORIES } from "@/lib/types";
import type { Message } from "@/lib/types";

export function MensagemForm({ message }: { message?: Message }) {
  return (
    <form action={upsertMessage} className="max-w-2xl space-y-6">
      {message && <input type="hidden" name="id" defaultValue={message.id} />}

      <Field label="Categoria">
        <select
          name="category"
          defaultValue={message?.category ?? MESSAGE_CATEGORIES[0].value}
          className="admin-input"
        >
          {MESSAGE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Versículo (citação)">
        <textarea
          name="verse_text"
          defaultValue={message?.verse_text}
          rows={2}
          required
          className="admin-input"
        />
      </Field>

      <Field label="Referência" hint='ex.: "Filipenses 4:6"'>
        <input
          name="verse_reference"
          defaultValue={message?.verse_reference}
          required
          className="admin-input"
        />
      </Field>

      <Field label="Reflexão">
        <textarea
          name="reflection"
          defaultValue={message?.reflection}
          rows={3}
          required
          className="admin-input"
        />
      </Field>

      <Field label="Ação prática">
        <textarea
          name="practical_action"
          defaultValue={message?.practical_action}
          rows={2}
          required
          className="admin-input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <Field label="Ordem">
          <input
            type="number"
            name="order_index"
            defaultValue={message?.order_index ?? 0}
            className="admin-input"
          />
        </Field>
        <label className="mt-7 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_daily"
            defaultChecked={message?.is_daily ?? true}
          />
          Entra no rodízio &quot;mensagem do dia&quot;
        </label>
        <label className="mt-7 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={message?.is_active ?? true}
          />
          Ativa (visível no site)
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
