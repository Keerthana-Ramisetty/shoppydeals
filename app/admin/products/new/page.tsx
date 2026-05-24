"use client";

import { useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <AdminShell>
      <h2 className="mb-6 text-xl font-bold">Add Product</h2>
      <ProductForm onSuccess={() => router.push("/admin/products")} />
    </AdminShell>
  );
}
