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
      className={`flex items-center justify-between font-mono text-[12px] uppercase tracking-[1.5px] text-muted ${className}`}
    >
      <span>{children}</span>
      <span className="text-muted/70" aria-hidden="true">
        {number}
      </span>
    </div>
  );
}
