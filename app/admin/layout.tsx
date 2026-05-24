import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[80vh] rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-6">
      {children}
    </div>
  );
}
