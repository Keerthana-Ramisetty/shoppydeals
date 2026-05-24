import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { siteConfig } from "@/lib/api";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoTelugu = Noto_Sans_Telugu({
  variable: "--font-noto-telugu",
  subsets: ["telugu", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Best Online Deals in Telugu`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "deals",
    "affiliate",
    "Amazon offers",
    "Flipkart deals",
    "Telugu deals",
    "online shopping",
  ],
  openGraph: {
    type: "website",
    locale: "te_IN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="te" className={`${notoSans.variable} ${notoTelugu.variable}`}>
      <body className="min-h-screen bg-white pb-20 text-foreground md:pb-0">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
