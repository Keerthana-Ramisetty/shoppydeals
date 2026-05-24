"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Send } from "lucide-react";
import { siteConfig } from "@/lib/api";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow ${
        scrolled ? "border-slate-200 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/branding_logo.jpg"
          alt="Logo"
          width={36}
          height={36}
          />
          <div className="leading-tight">
            <span className="block text-base font-bold text-slate-900">
              {siteConfig.name}
            </span>
            <span className="hidden text-[10px] text-muted sm:block">
              Best Online Deals
            </span>
          </div>
        </Link>

        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals, mobiles, fashion..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <a
          href={siteConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a8bc4]"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Join Telegram</span>
          <span className="sm:hidden">Telegram</span>
        </a>
      </div>
    </header>
  );
}
