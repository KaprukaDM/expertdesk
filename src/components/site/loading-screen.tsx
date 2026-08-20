import { Spinner } from "@/components/ui/spinner";

// Centered spinner used as the route-segment `loading.tsx` fallback — shows instantly on
// navigation while the destination server component streams in.
export function LoadingScreen({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] w-full flex-1 flex-col items-center justify-center gap-3 p-6">
      <Spinner className="text-primary size-7" />
      {label && <p className="text-muted-foreground text-sm">{label}</p>}
    </div>
  );
}
