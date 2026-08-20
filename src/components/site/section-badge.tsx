export function SectionBadge({ index, label }: { index: number; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
        {index}
      </span>
      <span className="border-border rounded-full border px-3 py-1 text-xs font-medium">{label}</span>
    </div>
  );
}
