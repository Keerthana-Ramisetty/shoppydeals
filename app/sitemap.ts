import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/api";

const CATEGORIES = [
  "mobiles",
  "electronics",
  "fashion",
  "kitchen",
  "beauty",
  "gadgets",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "hourly", priority: 1 },
    {
      url: `${base}/search`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...CATEGORIES.map((slug) => ({
      url: `${base}/category/${slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
