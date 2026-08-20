const PROOF_POINTS = [
  "No retainers",
  "Fixed price per package",
  "Work starts within days",
  "Direct line to your expert",
  "About half of agency pricing",
];

export function ProofStrip() {
  return (
    <div className="border-border bg-card border-t px-6 py-5">
      <div className="text-muted-foreground mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-wide">
        {PROOF_POINTS.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </div>
  );
}
