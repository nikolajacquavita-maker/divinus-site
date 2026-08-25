"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Páginas onde re-buscar dados do servidor mudaria o conteúdo exibido de
// forma indesejada (ex.: /mensagem sorteia um versículo novo a cada busca —
// não queremos trocar o versículo debaixo do visitante enquanto ele lê).
const SKIP_PATHS = ["/mensagem"];

/**
 * Mantém as páginas públicas atualizadas sem o visitante precisar dar F5:
 * busca o conteúdo mais recente do servidor periodicamente, e também assim
 * que a aba volta a ficar visível (ex.: usuário trocou de aba e voltou).
 * `router.refresh()` só re-busca os dados dos Server Components — não
 * recarrega a página nem perde a posição do scroll.
 */
export function AutoRefresh({ intervalMs = 45_000 }: { intervalMs?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const skip = SKIP_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (skip) return;

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, intervalMs);

    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [router, intervalMs, skip]);

  return null;
}
