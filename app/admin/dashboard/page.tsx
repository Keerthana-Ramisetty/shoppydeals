"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { api, formatPrice } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { DashboardStats, Product } from "@/lib/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [clicksByStore, setClicksByStore] = useState<
    { store: string; count: number }[]
  >([]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    api.getDashboard(token).then((data) => {
      setStats(data.stats);
      setTopProducts(data.topProducts as Product[]);
      setClicksByStore(data.clicksByStore);
    });
  }, []);

  return (
    <AdminShell>
      <h2 className="mb-6 text-xl font-bold">Dashboard Analytics</h2>
      {stats ? (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Products", value: stats.totalProducts },
              { label: "Total Clicks", value: stats.totalClicks },
              { label: "Clicks Today", value: stats.clicksToday },
              { label: "Clicks (7 days)", value: stats.clicksThisWeek },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-xs text-muted">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold">Top Products by Clicks</h3>
              <ul className="space-y-2">
                {topProducts.map((p) => (
                  <li
                    key={p._id}
                    className="flex justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm"
                  >
                    <span className="line-clamp-1 flex-1">{p.title}</span>
                    <span className="ml-2 font-medium text-primary">
                      {p.clicks} clicks
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Clicks by Store</h3>
              <ul className="space-y-2">
                {clicksByStore.map((s) => (
                  <li
                    key={s.store}
                    className="flex justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm"
                  >
                    <span>{s.store}</span>
                    <span className="font-medium">{s.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {topProducts[0] && (
            <p className="mt-6 text-xs text-muted">
              Top deal price example: {formatPrice(topProducts[0].dealPrice)}
            </p>
          )}
        </>
      ) : (
        <p className="text-muted">Loading analytics...</p>
      )}
    </AdminShell>
  );
}
