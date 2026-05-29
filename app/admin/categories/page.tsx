"use client";
import { useEffect, useState } from "react";
import { AdminShell } from "../../../components/admin/AdminShell";
import { api } from "../../../lib/api";
import { getToken } from "../../../lib/auth";
import type { Category } from "../../../lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", slug: "", icon: "📦" });
  const token = getToken();

  // Load categories
  async function load() {
    try {
      const res = await api.getCategories();
      setCategories(res.categories);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Add category
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return alert("No token found");

    try {
      await api.createCategory(token, form);
      setForm({ name: "", slug: "", icon: "📦" });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  }

  // Delete category ⭐ NEW
  async function handleDelete(id: string) {
    if (!token) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await api.deleteCategory(token, id);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  }

  return (
    <AdminShell>
      <h2 className="mb-6 text-xl font-bold">Manage Categories</h2>

      {/* CATEGORY LIST */}
      <ul className="mb-8 space-y-2">
        {categories.map((c) => (
          <li
            key={c._id}
            className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
          >
            <div className="flex items-center gap-2">
              <span>{c.icon}</span>
              <span className="font-medium">{c.name}</span>
              <span className="text-gray-400">/{c.slug}</span>
            </div>

            {/* DELETE BUTTON ⭐ */}
            <button
              onClick={() => handleDelete(c._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* ADD CATEGORY FORM */}
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
          className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
        >
          Add Category
        </button>
      </form>
    </AdminShell>
  );
}
