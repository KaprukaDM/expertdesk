import { cn } from "@/lib/utils";

// Brand-neutral ring spinner. Colour follows `currentColor`, so set text-* on a parent (or
// via className) to tint it. Sized via className (defaults to size-5).
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent align-[-0.125em]",
        className,
      )}
    />
  );
}
