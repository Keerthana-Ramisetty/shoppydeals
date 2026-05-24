import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchContent } from "./SearchContent";

export const metadata: Metadata = {
  title: "Search Deals",
  description: "Search affiliate deals across all categories.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <p className="py-12 text-center text-muted">Searching deals...</p>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
