"use client";

import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center border border-border bg-card text-xs label-caps text-muted-foreground">
        Divinus
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div>
      <div className="relative w-full border border-border bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={`${alt} — foto ${index + 1} de ${images.length}`}
          className="w-full h-auto"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-lg hover:border-accent hover:text-accent"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-lg hover:border-accent hover:text-accent"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 border border-border bg-background/80 px-2 py-0.5 text-xs text-muted-foreground">
              {index + 1}/{images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-16 w-16 shrink-0 border object-cover ${
                i === index ? "border-accent" : "border-border opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
