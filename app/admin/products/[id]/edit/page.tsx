"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    api.getProduct(id).then((res) => setProduct(res.product)).catch(() => {});
  }, [id]);

  return (
    <AdminShell>
      <h2 className="mb-6 text-xl font-bold">Edit Product</h2>
      {product ? (
        <ProductForm
          product={product}
          onSuccess={() => router.push("/admin/products")}
        />
      ) : (
        <p className="text-muted">Loading product...</p>
      )}
    </AdminShell>
  );
}
