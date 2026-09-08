"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sentimentos", label: "Sentimentos" },
  { href: "/comunidade", label: "Comunidade" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-border"
      >
        <span
          className={`h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="fixed inset-0 top-[65px] z-30 bg-background">
          <nav className="flex flex-col gap-6 px-6 py-10 text-lg">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/sentimentos"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block border border-accent px-4 py-3 text-center text-xs label-caps text-accent"
            >
              Preciso de uma mensagem
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
