"use client";

import { useEffect, useState } from "react";
import type { MunicipiosFile } from "@/lib/types";

export function MunicipioMap({ uf }: { uf: string }) {
  const [data, setData] = useState<MunicipiosFile | null>(null);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/data/municipios/${uf}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [uf]);

  if (error) {
    return <p className="text-sm text-muted-foreground">Não foi possível carregar o mapa desse estado.</p>;
  }

  if (!data) {
    return <div className="aspect-[4/3] w-full animate-pulse bg-muted" />;
  }

  return (
    <svg
      viewBox={`0 0 ${data.w} ${data.h}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Mapa de municípios — clique numa cidade`}
      className="w-full"
    >
      {data.m.map((mun) => (
        <a key={mun.c} href={`/igrejas/${uf}/${mun.s}`}>
          <path
            d={mun.d}
            className={
              hover === mun.c
                ? "fill-accent stroke-accent transition-colors"
                : "fill-card stroke-border transition-colors hover:fill-accent/60"
            }
            strokeWidth={80}
            onMouseEnter={() => setHover(mun.c)}
            onMouseLeave={() => setHover(null)}
          >
            <title>{mun.n}</title>
          </path>
        </a>
      ))}
    </svg>
  );
}
