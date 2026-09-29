// Only ever redirect to a relative, same-site path — never trust a raw
// "next" value enough to redirect to it without checking (open redirect).
export function sanitizeNextPath(next: string | null | undefined, fallback = "/"): string {
  if (!next) return fallback;
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  if (next.includes("://")) return fallback;
  return next;
}
