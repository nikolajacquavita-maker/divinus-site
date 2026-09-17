"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Igreja, IgrejaDenominacao } from "@/lib/types";
import { DENOMINACAO_LABEL } from "@/lib/types";

const CORES: Record<IgrejaDenominacao, string> = {
  catolica: "#8a6d3b",
  evangelica: "#3b6f8a",
  espirita: "#4f8a5b",
};

export function IgrejasMapa({ igrejas }: { igrejas: Igreja[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds(igrejas.map((i) => [i.lat, i.lng]));
      map.invalidateSize();
      map.fitBounds(bounds.pad(0.25), { maxZoom: 15 });
      requestAnimationFrame(() => {
        map.invalidateSize();
        map.fitBounds(bounds.pad(0.25), { maxZoom: 15 });
      });

      for (const igreja of igrejas) {
        const cor = CORES[igreja.denominacao];
        const icon = L.divIcon({
          className: "",
          html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${cor};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.4)"></span>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        const gmaps = `https://www.google.com/maps/search/?api=1&query=${igreja.lat},${igreja.lng}`;

        L.marker([igreja.lat, igreja.lng], { icon }).addTo(map).bindPopup(
          `<div style="font-family:inherit;min-width:190px">
            <p style="font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:${cor};margin:0 0 4px;font-weight:600">${DENOMINACAO_LABEL[igreja.denominacao]}</p>
            <p style="font-weight:600;margin:0 0 4px;font-size:14px">${igreja.nome}</p>
            <p style="font-size:12px;color:#6b6b6b;margin:0 0 8px">${igreja.endereco}</p>
            <a href="${gmaps}" target="_blank" rel="noopener noreferrer" style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:${cor};text-decoration:underline">Ver no Google Maps →</a>
          </div>`,
        );
      }
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [igrejas]);

  return (
    <div
      ref={containerRef}
      className="w-full border border-border"
      style={{ height: 420 }}
    />
  );
}
