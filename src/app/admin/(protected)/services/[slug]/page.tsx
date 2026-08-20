import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ServiceEditForm } from "@/components/admin/service-edit-form";
import { listServicesForAdmin } from "@/lib/services";

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await listServicesForAdmin();
  const found = services.find((s) => s.slug === slug);
  if (!found) notFound();
  // icon is a component reference and can't cross the server -> client boundary as a prop.
  const { icon: _icon, ...service } = found;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Link href="/admin/services" className="text-muted-foreground mb-4 inline-flex items-center gap-1 text-sm">
        <ChevronLeft className="size-4" />
        Back to services
      </Link>

      <h1 className="font-heading mb-6 text-xl font-medium">Edit {service.name}</h1>

      <ServiceEditForm mode="edit" service={service} />
    </div>
  );
}
