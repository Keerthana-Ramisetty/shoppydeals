"use client";

import { Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/api";

export function TelegramFab() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.a
      href={siteConfig.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg shadow-[#229ED9]/40 md:bottom-6"
      aria-label="Join Telegram"
    >
      <Send className="h-6 w-6" />
    </motion.a>
  );
}
