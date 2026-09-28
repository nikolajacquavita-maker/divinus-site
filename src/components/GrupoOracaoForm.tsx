"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UF_PATHS } from "@/lib/brazil-map-data";
import { submitGroup } from "@/app/(site)/grupo-de-oracao/actions";

export function GrupoOracaoForm({ error }: { error?: string }) {
  const [uf, setUf] = useState("");
  const [cidades, setCidades] = useState<string[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleUfChange(nextUf: string) {
    setUf(nextUf);
    setCidades([]);
    if (!nextUf) return;

    setLoadingCidades(true);
    try {
      const res = await fetch(`/data/municipios/${nextUf.toLowerCase()}.json`);
      const data = await res.json();
      setCidades((data.m as { n: string }[]).map((m) => m.n).sort((a, b) => a.localeCompare(b, "pt-BR")));
    } catch {
      setCidades([]);
    } finally {
      setLoadingCidades(false);
    }
  }

  async function handleFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const supabase = createClient();

    try {
      const path = `${crypto.randomUUID()}-${file.name}`;
      const { error } = await supabase.storage
        .from("grupo-oracao-fotos")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;

      const { data } = supabase.storage.from("grupo-oracao-fotos").getPublicUrl(path);
      setFotoUrl(data.publicUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Falha ao enviar a foto.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={submitGroup} className="mt-8 space-y-5">
      <div>
        <label className="text-xs label-caps text-muted-foreground">Foto da fachada</label>
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm"
        />
        {uploading && <p className="mt-1 text-xs text-muted-foreground">Enviando...</p>}
        {uploadError && <p className="mt-1 text-xs text-red-500">{uploadError}</p>}
        {fotoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fotoUrl} alt="Prévia da fachada" className="mt-3 aspect-[4/3] w-40 object-cover" />
        )}
        <input type="hidden" name="foto_url" value={fotoUrl ?? ""} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs label-caps text-muted-foreground">Estado</label>
          <select
            name="uf"
            required
            value={uf}
            onChange={(e) => handleUfChange(e.target.value)}
            className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
          >
            <option value="">Selecione</option>
            {UF_PATHS.map(({ uf: ufOpt, nome }) => (
              <option key={ufOpt} value={ufOpt}>
                {nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs label-caps text-muted-foreground">Cidade</label>
          <select
            name="cidade"
            required
            disabled={!uf || loadingCidades}
            className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent disabled:opacity-50"
          >
            <option value="">{loadingCidades ? "Carregando..." : "Selecione"}</option>
            {cidades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs label-caps text-muted-foreground">Endereço completo</label>
        <input
          type="text"
          name="endereco"
          required
          placeholder="Rua, número, bairro, CEP"
          className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="text-xs label-caps text-muted-foreground">Horário</label>
        <input
          type="text"
          name="horario"
          required
          placeholder="Ex: Quintas às 20h — oração e estudo bíblico"
          className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="text-xs label-caps text-muted-foreground">Como funciona e princípios do grupo</label>
        <textarea
          name="descricao"
          required
          rows={5}
          placeholder="Conte como o grupo funciona, o que esperar do encontro e os princípios que vocês seguem."
          className="mt-2 w-full border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="w-full border border-accent bg-accent py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        Enviar pra aprovação
      </button>
    </form>
  );
}
