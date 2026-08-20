import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { listServices } from "@/lib/services";

const COMPANY_LINKS = [
  { label: "Sign in", href: "/login" },
  { label: "Explore services", href: "/services" },
];

export async function SiteFooter() {
  const services = await listServices();
  return (
    // `dark` flips this footer to the app's own dark palette (see globals.css), independent of
    // the page's own theme — a deliberate dark band, not a light/dark mode toggle.
    <footer className="dark bg-background text-foreground px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[1fr_auto_auto]">
        <div className="max-w-xs space-y-3">
          <Logo />
          <p className="text-muted-foreground text-sm text-pretty">
            Agency-quality marketing for Sri Lankan SMEs — done by real experts, priced
            upfront, delivered on a deadline.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-eyebrow">Services</p>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-eyebrow">Company</p>
          <ul className="space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border text-muted-foreground mx-auto mt-12 flex max-w-5xl flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Expert Desk. Built for Sri Lankan SMEs.</span>
        <span>
          Powered by{" "}
          <a
            href="https://www.kapruka.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium hover:underline"
          >
            Kapruka
          </a>
        </span>
      </div>
    </footer>
  );
}
