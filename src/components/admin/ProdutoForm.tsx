"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { upsertProduct } from "@/app/admin/actions";
import { UNIVERSES } from "@/lib/types";
import type { Product } from "@/lib/types";

export function ProdutoForm({ product }: { product?: Product }) {
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    const supabase = createClient();

    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const path = `${crypto.randomUUID()}-${file.name}`;
        const { error } = await supabase.storage
          .from("product-images")
          .upload(path, file, { cacheControl: "3600", upsert: false });

        if (error) throw error;

        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Falha ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  return (
    <form action={upsertProduct} className="max-w-3xl space-y-8">
      {product && <input type="hidden" name="id" defaultValue={product.id} />}
      <input type="hidden" name="images" value={images.join("\n")} readOnly />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nome">
          <input
            name="name"
            defaultValue={product?.name}
            required
            className="admin-input"
          />
        </Field>
        <Field label="Slug (URL)" hint="deixe em branco para gerar a partir do nome">
          <input name="slug" defaultValue={product?.slug} className="admin-input" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="Universo">
          <select
            name="universe"
            defaultValue={product?.universe ?? "water"}
            className="admin-input"
          >
            {UNIVERSES.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            name="status"
            defaultValue={product?.status ?? "paused"}
            className="admin-input"
          >
            <option value="active">Ativo — à venda</option>
            <option value="coming_soon">Em breve — visível, sem comprar</option>
            <option value="paused">Pausado — some do site</option>
          </select>
        </Field>
        <Field label="Ordem de exibição">
          <input
            type="number"
            name="sort_order"
            defaultValue={product?.sort_order ?? 0}
            className="admin-input"
          />
        </Field>
      </div>

      <Field label="Descrição curta">
        <input
          name="short_description"
          defaultValue={product?.short_description}
          className="admin-input"
        />
      </Field>

      <Field label="Descrição completa">
        <textarea
          name="full_description"
          defaultValue={product?.full_description}
          rows={4}
          className="admin-input"
        />
      </Field>

      <Field label="Características" hint="uma por linha">
        <textarea
          name="features"
          defaultValue={product?.features.join("\n")}
          rows={4}
          className="admin-input"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Preço (R$)" hint="exibição apenas — a compra acontece na Lobway">
          <input
            name="price"
            defaultValue={product?.price ?? ""}
            placeholder="0,00"
            className="admin-input"
          />
        </Field>
        <Field label="Link do produto na Lobway">
          <input
            name="lobway_url"
            defaultValue={product?.lobway_url ?? ""}
            placeholder="https://lobway.com/..."
            className="admin-input"
          />
        </Field>
      </div>

      <div>
        <p className="text-xs label-caps text-muted-foreground">Fotos</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((url) => (
            <div key={url} className="relative h-24 w-24 border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute -right-2 -top-2 h-6 w-6 border border-border bg-background text-xs hover:border-red-400 hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <label className="mt-4 inline-block cursor-pointer border border-border px-4 py-2 text-xs label-caps hover:border-accent hover:text-accent">
          {uploading ? "Enviando..." : "+ Adicionar fotos"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
        {uploadError && <p className="mt-2 text-xs text-red-400">{uploadError}</p>}
      </div>

      <button
        type="submit"
        className="border border-accent bg-accent px-8 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity"
      >
        Salvar produto
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
