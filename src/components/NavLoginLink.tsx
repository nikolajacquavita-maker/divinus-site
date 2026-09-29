"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLoginLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const href = `/grupo-de-oracao/login?next=${encodeURIComponent(pathname || "/")}`;

  return (
    <Link href={href} onClick={onClick} className={className}>
      Login
    </Link>
  );
}
