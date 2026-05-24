"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Home, LayoutGrid, Search } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/category/electronics", label: "Deals", icon: Flame },
  { href: "/category/fashion", label: "Categories", icon: LayoutGrid },
];

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 pb-safe backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href.split("?")[0]);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 text-[10px] font-medium ${
                active ? "text-primary" : "text-slate-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
