"use client";

import { useEffect, useState } from "react";
import type { MunicipiosFile } from "@/lib/types";

export function CidadeNome({ uf, slug, fallback }: { uf: string; slug: string; fallback: string }) {
  const [nome, setNome] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch(`/data/municipios/${uf}.json`)
      .then((res) => res.json())
      .then((data: MunicipiosFile) => {
        const match = data.m.find((mun) => mun.s === slug);
        if (!cancelled && match) setNome(match.n);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [uf, slug]);

  return <>{nome}</>;
}
