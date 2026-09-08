"use client";

import { upsertFeeling } from "@/app/admin/actions";
import { FEELING_CATEGORIES } from "@/lib/types";
import type { Feeling } from "@/lib/types";

export function SentimentoForm({ feeling }: { feeling?: Feeling }) {
  return (
    <form action={upsertFeeling} className="max-w-2xl space-y-6">
      {feeling && <input type="hidden" name="id" defaultValue={feeling.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Título">
          <input name="title" defaultValue={feeling?.title} required className="admin-input" />
        </Field>
        <Field label="Slug" hint='ex.: "ansiedade" (usado na URL /sentimentos/slug)'>
          <input name="slug" defaultValue={feeling?.slug} required className="admin-input" />
        </Field>
      </div>

      <Field label="Categoria">
        <select
          name="category"
          defaultValue={feeling?.category ?? FEELING_CATEGORIES[0].value}
          className="admin-input"
        >
          {FEELING_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Teaser" hint="Frase reflexiva mostrada no card e no topo da página">
        <textarea name="teaser" defaultValue={feeling?.teaser} rows={2} required className="admin-input" />
      </Field>

      <div className="border border-border p-5">
        <p className="text-xs label-caps text-accent">Fundamentação bíblica (Leitura Dinâmica)</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Aparece antes do bloco &ldquo;01 · Corpo&rdquo; na página, e leva à página de
          aprofundamento com os 4 passos do método.
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <Field label="Pessoa / momento bíblico" hint='ex.: "Elias no deserto"'>
            <input name="biblico_nome" defaultValue={feeling?.biblico_nome} required className="admin-input" />
          </Field>
          <Field label="Referência" hint='ex.: "1 Reis 19:1-18"'>
            <input
              name="biblico_referencia"
              defaultValue={feeling?.biblico_referencia}
              required
              className="admin-input"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Versículo (citação)">
            <textarea
              name="biblico_versiculo"
              defaultValue={feeling?.biblico_versiculo}
              rows={2}
              required
              className="admin-input"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Teaser" hint="Frase curta mostrada na página principal do sentimento">
            <textarea
              name="biblico_teaser"
              defaultValue={feeling?.biblico_teaser}
              rows={2}
              required
              className="admin-input"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="1 · Contexto histórico">
            <textarea
              name="biblico_contexto"
              defaultValue={feeling?.biblico_contexto}
              rows={3}
              required
              className="admin-input"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="2 · O capítulo" hint="O passo mais extenso — narre o capítulo completo com o máximo de embasamento possível">
            <textarea
              name="biblico_capitulo"
              defaultValue={feeling?.biblico_capitulo}
              rows={8}
              required
              className="admin-input"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="3 · Aplicação prática">
            <textarea
              name="biblico_aplicacao"
              defaultValue={feeling?.biblico_aplicacao}
              rows={3}
              required
              className="admin-input"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="4 · Conexão com outras passagens">
            <textarea
              name="biblico_conexao"
              defaultValue={feeling?.biblico_conexao}
              rows={3}
              required
              className="admin-input"
            />
          </Field>
        </div>
      </div>

      <Stage
        title="01 · Corpo"
        prefix="corpo"
        questionLabel="Pergunta"
        defaultQuestion={feeling?.corpo_question}
        defaultText={feeling?.corpo_text}
        defaultVideoUrl={feeling?.corpo_video_url}
      />
      <Stage
        title="02 · Mente"
        prefix="mente"
        questionLabel="Pergunta"
        defaultQuestion={feeling?.mente_question}
        defaultText={feeling?.mente_text}
        defaultVideoUrl={feeling?.mente_video_url}
      />
      <Stage
        title="03 · Espírito"
        prefix="espirito"
        questionLabel="Pergunta"
        defaultQuestion={feeling?.espirito_question}
        defaultText={feeling?.espirito_text}
        defaultVideoUrl={feeling?.espirito_video_url}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Versículo (citação)">
            <textarea
              name="verse_text"
              defaultValue={feeling?.verse_text}
              rows={2}
              required
              className="admin-input"
            />
          </Field>
          <Field label="Referência" hint='ex.: "Mateus 6.34"'>
            <input
              name="verse_reference"
              defaultValue={feeling?.verse_reference}
              required
              className="admin-input"
            />
          </Field>
        </div>
      </Stage>
      <Stage
        title="04 · Ação"
        prefix="acao"
        questionLabel="Pergunta"
        defaultQuestion={feeling?.acao_question}
        defaultText={feeling?.acao_text}
        defaultVideoUrl={feeling?.acao_video_url}
      >
        <Field label="Texto do botão de ação">
          <input
            name="acao_cta_label"
            defaultValue={feeling?.acao_cta_label ?? "Eu aceito o desafio"}
            required
            className="admin-input"
          />
        </Field>
      </Stage>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <Field label="Ordem">
          <input
            type="number"
            name="sort_order"
            defaultValue={feeling?.sort_order ?? 0}
            className="admin-input"
          />
        </Field>
        <label className="mt-7 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_active" defaultChecked={feeling?.is_active ?? true} />
          Ativo (visível no site)
        </label>
      </div>

      <button
        type="submit"
        className="border border-accent bg-accent px-8 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
      >
        Salvar sentimento
      </button>
    </form>
  );
}

function Stage({
  title,
  prefix,
  questionLabel,
  defaultQuestion,
  defaultText,
  defaultVideoUrl,
  children,
}: {
  title: string;
  prefix: string;
  questionLabel: string;
  defaultQuestion?: string;
  defaultText?: string;
  defaultVideoUrl?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="border border-border p-5">
      <p className="text-xs label-caps text-accent">{title}</p>
      <div className="mt-4 space-y-4">
        <Field label={questionLabel}>
          <input name={`${prefix}_question`} defaultValue={defaultQuestion} required className="admin-input" />
        </Field>
        <Field label="Texto">
          <textarea name={`${prefix}_text`} defaultValue={defaultText} rows={3} required className="admin-input" />
        </Field>
        <Field label="URL do vídeo" hint="Opcional — deixe em branco pra manter “vídeo em breve”">
          <input
            name={`${prefix}_video_url`}
            defaultValue={defaultVideoUrl ?? ""}
            className="admin-input"
          />
        </Field>
        {children}
      </div>
    </div>
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
