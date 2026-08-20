"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ReportUploadForm({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Attach a file first.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/admin/orders/${orderId}/report`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Upload failed. Try again.");
      setSubmitting(false);
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="border-border bg-card space-y-3 rounded-2xl border p-4">
      <label className="text-sm font-medium" htmlFor="report-file">
        Submit the finished report
      </label>
      <input
        id="report-file"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="border-border file:bg-foreground file:text-background w-full rounded-lg border px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:px-3 file:py-1.5 file:text-xs file:font-medium"
      />
      <p className="text-muted-foreground text-xs">PDF or Word document.</p>
      {error && (
        <p role="alert" className="text-critical text-sm">
          {error}
        </p>
      )}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <>
            <Spinner className="size-4" /> Submitting…
          </>
        ) : (
          "Submit report to client"
        )}
      </Button>
    </form>
  );
}
