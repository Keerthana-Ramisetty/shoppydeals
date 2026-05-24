export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="skeleton aspect-square w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
