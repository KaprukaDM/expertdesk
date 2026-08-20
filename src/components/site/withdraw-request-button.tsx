"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function WithdrawRequestButton({ requestId, serviceName }: { requestId: string; serviceName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleWithdraw() {
    setPending(true);
    setError(null);

    const res = await fetch(`/api/requests/${requestId}/cancel`, { method: "POST" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Try again.");
      setPending(false);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm">
            <X className="size-3.5" />
            Withdraw request
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw this request?</DialogTitle>
          <DialogDescription>
            We&rsquo;ll stop the {serviceName} brand study. You can request it again any time.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <p role="alert" className="text-critical text-sm">
            {error}
          </p>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={pending} />}>Keep it</DialogClose>
          <Button variant="destructive" disabled={pending} onClick={handleWithdraw}>
            {pending ? (
              <>
                <Spinner className="size-4" /> Withdrawing…
              </>
            ) : (
              "Withdraw"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
