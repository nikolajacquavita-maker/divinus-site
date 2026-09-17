"use client";

import { useEffect, useRef, useState } from "react";
import type { MunicipiosFile } from "@/lib/types";

const MAX_ZOOM = 12;

export function MunicipioMap({ uf }: { uf: string }) {
  const [data, setData] = useState<MunicipiosFile | null>(null);
  const [error, setError] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    moved: boolean;
    pointerId: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/data/municipios/${uf}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((json: MunicipiosFile) => {
        if (cancelled) return;
        setData(json);
        setBox({ x: 0, y: 0, w: json.w, h: json.h });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [uf]);

  function clampBox(next: { x: number; y: number; w: number; h: number }) {
    if (!data) return next;
    const w = Math.min(data.w, Math.max(data.w / MAX_ZOOM, next.w));
    const h = w * (data.h / data.w);
    let x = next.x;
    let y = next.y;
    x = Math.min(Math.max(x, 0), data.w - w);
    y = Math.min(Math.max(y, 0), data.h - h);
    return { x, y, w, h };
  }

  function zoomAt(factor: number, cx: number, cy: number) {
    setBox((prev) => {
      if (!prev || !data) return prev;
      const w = prev.w * factor;
      const h = prev.h * factor;
      const px = (cx - prev.x) / prev.w;
      const py = (cy - prev.y) / prev.h;
      const x = cx - px * w;
      const y = cy - py * h;
      return clampBox({ x, y, w, h });
    });
  }

  function handleWheel(e: React.WheelEvent<SVGSVGElement>) {
    if (!box || !svgRef.current) return;
    e.preventDefault();
    const rect = svgRef.current.getBoundingClientRect();
    const px = box.x + ((e.clientX - rect.left) / rect.width) * box.w;
    const py = box.y + ((e.clientY - rect.top) / rect.height) * box.h;
    zoomAt(e.deltaY > 0 ? 1.25 : 0.8, px, py);
  }

  const DRAG_THRESHOLD = 6;

  function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
    dragging.current = {
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      moved: false,
      pointerId: e.pointerId,
    };
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const drag = dragging.current;
    if (!drag || !box || !svgRef.current) return;

    if (!drag.moved) {
      const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
      if (dist < DRAG_THRESHOLD) return;
      drag.moved = true;
      svgRef.current.setPointerCapture(drag.pointerId);
    }

    const rect = svgRef.current.getBoundingClientRect();
    const dx = ((e.clientX - drag.lastX) / rect.width) * box.w;
    const dy = ((e.clientY - drag.lastY) / rect.height) * box.h;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
    setBox((prev) => (prev ? clampBox({ ...prev, x: prev.x - dx, y: prev.y - dy }) : prev));
  }

  function handlePointerUp() {
    dragging.current = null;
  }

  function resetZoom() {
    if (data) setBox({ x: 0, y: 0, w: data.w, h: data.h });
  }

  if (error) {
    return <p className="text-sm text-muted-foreground">Não foi possível carregar o mapa desse estado.</p>;
  }

  if (!data || !box) {
    return <div className="aspect-[4/3] w-full animate-pulse bg-muted" />;
  }

  const zoom = data.w / box.w;
  const labelSize = 130 / Math.sqrt(zoom);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mapa de municípios — clique numa cidade"
        className="w-full cursor-grab touch-none select-none active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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
        {data.m.map((mun) => (
          <text
            key={`label-${mun.c}`}
            x={mun.x}
            y={mun.y}
            fontSize={labelSize}
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none fill-foreground/70"
            style={{ paintOrder: "stroke", stroke: "var(--background)", strokeWidth: labelSize / 6 }}
          >
            {mun.n}
          </text>
        ))}
      </svg>

      <div className="absolute right-2 top-2 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => box && zoomAt(0.7, box.x + box.w / 2, box.y + box.h / 2)}
          className="flex h-8 w-8 items-center justify-center border border-border bg-background text-sm hover:bg-muted"
          aria-label="Aproximar"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => box && zoomAt(1.4, box.x + box.w / 2, box.y + box.h / 2)}
          className="flex h-8 w-8 items-center justify-center border border-border bg-background text-sm hover:bg-muted"
          aria-label="Afastar"
        >
          −
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="flex h-8 w-8 items-center justify-center border border-border bg-background text-[10px] hover:bg-muted"
          aria-label="Restaurar zoom"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}
