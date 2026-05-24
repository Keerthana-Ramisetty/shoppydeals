"use client";

import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionTitle } from "@/components/SectionTitle";

export function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() || "";
  const category = searchParams.get("category")?.trim() || "";

  const query: Record<string, string> = {};
  if (q) query.search = q;
  if (category) query.category = category;

  return (
    <div className="space-y-6">
      <SectionTitle
        title={q ? `Results for "${q}"` : "Search Deals"}
        telugu={q ? `"${q}" కోసం ఫలితాలు` : "డీల్స్ వెతకండి"}
        subtitle={
          category ? `Filtered by ${category}` : "Find products across all stores"
        }
      />
      <ProductGrid query={query} showLoadMore />
    </div>
  );
}
