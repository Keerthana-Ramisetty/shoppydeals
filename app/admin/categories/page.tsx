"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "../../../components/admin/AdminShell";
import { api } from "../../../lib/api";
import { getToken } from "../../../lib/auth";
import type { Category } from "../../../lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", slug: "", icon: "📦" });

  async function load() {
    const res = await api.getCategories();
    setCategories(res.categories);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    await api.createCategory(token, form);
    setForm({ name: "", slug: "", icon: "📦" });
    load();
  }

  return (
    <AdminShell>
      <h2 className="mb-6 text-xl font-bold">Manage Categories</h2>
      <ul className="mb-8 space-y-2">
        {categories.map((c) => (
          <li
            key={c._id}
            className="flex items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-sm"
          >
            <span>{c.icon}</span>
            <span className="font-medium">{c.name}</span>
            <span className="text-muted">/{c.slug}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="max-w-md space-y-3">
        <h3 className="font-semibold">Add Category</h3>
        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
            })
          }
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <input
          placeholder="Slug"
          required
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <input
          placeholder="Icon (emoji)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Add Category
        </button>
      </form>
    </AdminShell>
  );
}
