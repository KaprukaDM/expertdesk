"use client";

import { useEffect, useState } from "react";

function formatRemaining(msRemaining: number) {
  if (msRemaining <= 0) return null;
  const totalSeconds = Math.floor(msRemaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function OrderCountdown({ deadlineAt }: { deadlineAt: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const interval = setInterval(tick, 1000);
    // First tick deferred to a frame instead of called synchronously in the effect body —
    // avoids a hydration mismatch (server has no Date.now()) while still painting near-instantly.
    const frame = requestAnimationFrame(tick);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (now === null) return null;

  const remaining = formatRemaining(new Date(deadlineAt).getTime() - now);

  if (!remaining) {
    return <p className="text-warning text-sm font-medium">Delivery window has passed — your specialist has been notified.</p>;
  }

  const units = [
    { label: "days", value: remaining.days },
    { label: "hrs", value: remaining.hours },
    { label: "min", value: remaining.minutes },
    { label: "sec", value: remaining.seconds },
  ];

  return (
    <div className="flex items-center gap-3">
      {units.map((unit) => (
        <div key={unit.label} className="border-border bg-card flex min-w-14 flex-col items-center rounded-xl border py-2">
          <span className="font-mono text-xl font-semibold tabular-nums">{String(unit.value).padStart(2, "0")}</span>
          <span className="text-muted-foreground text-[10px] uppercase tracking-wide">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
