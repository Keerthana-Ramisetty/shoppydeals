"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
} from "lucide-react";
import { api } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add Product", icon: Plus },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    api
      .getMe(token)
      .then(() => setReady(true))
      .catch(() => {
        clearToken();
        router.replace("/admin/login");
      });
  }, [router]);

  function logout() {
    clearToken();
    router.push("/admin/login");
  }

  if (!ready) {
    return <p className="py-12 text-center text-muted">Loading admin...</p>;
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="shrink-0 lg:w-56">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 text-sm text-red-600 hover:underline lg:hidden"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
        <nav className="flex flex-wrap gap-2 lg:flex-col">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === href || pathname.startsWith(href + "/")
                  ? "bg-primary text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-white"
          >
            <BarChart3 className="h-4 w-4" />
            View Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 lg:flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 rounded-xl bg-white p-4 shadow-sm sm:p-6">
        {children}
      </div>
    </div>
  );
}
