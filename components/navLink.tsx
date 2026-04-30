"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={
        isActive
          ? "font-medium text-foreground"
          : "text-muted-foreground hover:text-foreground transition-colors"
      }
    >
      {children}
    </Link>
  );
}
