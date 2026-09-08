import Link from "next/link";
import { UNIVERSES } from "@/lib/types";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-lg label-caps">Divinus</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Produto → mensagem → reflexão → comunidade → transformação.
          </p>
        </div>
        <div>
          <p className="text-xs label-caps text-muted-foreground">Universos</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {UNIVERSES.map((u) => (
              <li key={u.value}>{u.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs label-caps text-muted-foreground">Navegar</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Início</Link></li>
            <li><Link href="/produtos" className="hover:text-foreground">Produtos</Link></li>
            <li><Link href="/sentimentos" className="hover:text-foreground">Sentimentos</Link></li>
            <li><Link href="/comunidade" className="hover:text-foreground">Comunidade</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs label-caps text-muted-foreground">Do físico ao digital</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Todo produto Divinus tem um QR Code. Ele não leva à página inicial —
            leva à mensagem daquela peça.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Divinus — A mensagem descomplicada de Deus para você.
      </div>
    </footer>
  );
}
