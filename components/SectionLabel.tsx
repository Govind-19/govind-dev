export default function SectionLabel({
  children,
  number,
  className = "",
}: {
  children: React.ReactNode;
  number: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-baseline gap-[14px] font-mono text-[12px] uppercase tracking-[1.5px] text-muted ${className}`}
    >
      <span>{children}</span>
      {/* the leader carries the eye across to the folio, like a printed
          table of contents */}
      <span className="leader" aria-hidden="true" />
      <span className="tnum text-muted/70" aria-hidden="true">
        {number}
      </span>
    </div>
  );
}
