import Link from "next/link";
import { Plus } from "lucide-react";
import { listServicesForAdmin } from "@/lib/services";

export default async function AdminServicesPage() {
  const services = await listServicesForAdmin();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Services</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage the service catalog and pricing.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="bg-foreground text-background inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          <Plus className="size-4" />
          Add service
        </Link>
      </div>

      <div className="border-border overflow-hidden rounded-2xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Pricing (Basic → Premium)</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y bg-card">
            {services.map((service) => (
              <tr key={service.slug} className="hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{service.name}</p>
                  <p className="text-muted-foreground text-xs">/{service.slug}</p>
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {service.packages.map((p) => p.price).join(" → ")}
                </td>
                <td className="px-4 py-3">
                  <span className="text-muted-foreground text-xs">{service.isCustom ? "Custom" : "Built-in"}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      service.overrideActive ? "bg-good-soft text-good" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {service.overrideActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${service.slug}`} className="text-primary font-medium">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
