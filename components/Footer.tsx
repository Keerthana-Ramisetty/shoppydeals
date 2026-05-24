import Link from "next/link";
import { siteConfig } from "@/lib/api";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-muted">
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#229ED9] hover:underline"
          >
            Telegram
          </a>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="hover:text-slate-800 hover:underline"
          >
            Contact
          </a>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-slate-500">
          <strong>Disclaimer:</strong> Shoppy Deals is an affiliate deals
          platform. We do not sell products directly. Prices and availability
          are subject to change on partner stores (Amazon, Flipkart, Myntra,
          etc.). We may earn a commission when you purchase through our links.
        </p>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
