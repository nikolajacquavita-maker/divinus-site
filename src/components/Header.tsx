import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sentimentos", label: "Sentimentos" },
  { href: "/leitura-dinamica", label: "Leitura Dinâmica" },
  { href: "/comunidade", label: "Comunidade" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="font-display text-lg label-caps tracking-widest sm:text-xl">
          Divinus
        </Link>
        <nav className="hidden items-center justify-center gap-10 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex justify-end">
          <span aria-hidden className="invisible hidden font-display text-lg label-caps tracking-widest sm:text-xl md:block">
            Divinus
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
