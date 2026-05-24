"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getToken() ? "/admin/dashboard" : "/admin/login");
  }, [router]);

  return (
    <p className="py-12 text-center text-muted">Redirecting to admin...</p>
  );
}
