"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

interface ProductGridProps {
  initialProducts?: Product[];
  query?: Record<string, string | number | boolean>;
  showLoadMore?: boolean;
}

export function ProductGrid({
  initialProducts = [],
  query = {},
  showLoadMore = true,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      const res = await api.getProducts({ ...query, page: pageNum, limit: 12 });
      setProducts((prev) =>
        append ? [...prev, ...res.products] : res.products
      );
      setHasMore(res.pagination.hasMore);
      setPage(pageNum);
    },
    [query]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ ...query, page: 1, limit: 12 });
        if (!cancelled) {
          setProducts(res.products);
          setHasMore(res.pagination.hasMore);
          setPage(1);
        }
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(query)]);

  async function loadMore() {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      await fetchPage(page + 1, true);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="py-12 text-center text-muted">
       No deals available. New offers coming soon! 
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p._id} product={p} index={i % 12} />
        ))}
      </div>
      {showLoadMore && hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary disabled:opacity-60"
          >
            {loadingMore ? "Loading..." : "Load More Deals"}
          </button>
        </div>
      )}
    </div>
  );
}
