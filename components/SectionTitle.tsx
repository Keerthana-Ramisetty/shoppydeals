interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
