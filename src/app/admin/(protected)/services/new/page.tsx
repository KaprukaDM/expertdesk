import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ServiceEditForm } from "@/components/admin/service-edit-form";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Link href="/admin/services" className="text-muted-foreground mb-4 inline-flex items-center gap-1 text-sm">
        <ChevronLeft className="size-4" />
        Back to services
      </Link>

      <h1 className="font-heading mb-6 text-xl font-medium">Add a new service</h1>

      <ServiceEditForm mode="create" />
    </div>
  );
}
