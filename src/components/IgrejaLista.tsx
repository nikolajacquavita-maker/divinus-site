"use client";

import { useState } from "react";
import { DENOMINACAO_LABEL, type Igreja } from "@/lib/types";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type Status = "idle" | "buscando" | "concedido" | "negado";

export function IgrejaLista({ igrejas }: { igrejas: Igreja[] }) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function pedirLocalizacao() {
    if (!("geolocation" in navigator)) {
      setStatus("negado");
      return;
    }
    setStatus("buscando");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("concedido");
      },
      () => setStatus("negado"),
      { timeout: 10000 },
    );
  }

  const ordenadas = coords
    ? [...igrejas].sort(
        (a, b) =>
          haversineKm(coords.lat, coords.lng, a.lat, a.lng) -
          haversineKm(coords.lat, coords.lng, b.lat, b.lng),
      )
    : igrejas;

  return (
    <div>
      {status !== "concedido" && (
        <button
          type="button"
          onClick={pedirLocalizacao}
          disabled={status === "buscando"}
          className="border border-accent bg-accent px-6 py-3 text-xs label-caps text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === "buscando" ? "Buscando sua localização…" : "Usar minha localização"}
        </button>
      )}
      {status === "negado" && (
        <p className="mt-3 text-xs text-muted-foreground">
          Não conseguimos acessar sua localização — mostrando a lista completa.
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {ordenadas.map((igreja, i) => (
          <div key={i} className="border border-border p-5">
            <p className="text-xs label-caps text-accent">{DENOMINACAO_LABEL[igreja.denominacao]}</p>
            <p className="font-display mt-2 text-lg">{igreja.nome}</p>
            <p className="mt-2 text-sm text-muted-foreground">{igreja.endereco}</p>
            {coords && (
              <p className="mt-2 text-xs text-muted-foreground">
                {haversineKm(coords.lat, coords.lng, igreja.lat, igreja.lng).toFixed(1)} km de você
              </p>
            )}
            {igreja.telefone && <p className="mt-1 text-xs text-muted-foreground">{igreja.telefone}</p>}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${igreja.lat},${igreja.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs label-caps text-accent hover:underline"
            >
              Ver no mapa →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
