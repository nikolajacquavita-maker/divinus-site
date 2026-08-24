import Link from "next/link";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/mensagem", label: "Mensagem" },
  { href: "/comunidade", label: "Comunidade" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl label-caps tracking-widest">
          Divinus
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/mensagem"
          className="hidden rounded-none border border-accent/60 px-4 py-2 text-xs label-caps text-accent hover:bg-accent hover:text-accent-foreground transition-colors md:inline-block"
        >
          Preciso de uma mensagem
        </Link>
      </div>
    </header>
  );
}
