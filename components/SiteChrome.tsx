"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { TelegramFab } from "@/components/TelegramFab";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100">
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-6">{children}</main>
      <Footer />
      <MobileNav />
      <TelegramFab />
    </>
  );
}
