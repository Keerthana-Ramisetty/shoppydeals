"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

interface CategoryChipsProps {
  categories: Category[];
}

export function CategoryChips({ categories }: CategoryChipsProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Link
        href="/"
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
          pathname === "/"
            ? "bg-primary text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => {
        const active = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat._id}
            href={`/category/${cat.slug}`}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
