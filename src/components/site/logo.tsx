import Link from "next/link";
import Image from "next/image";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-heading font-semibold">
      <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg">
        <Image src="/logo-mark.png" alt="" fill sizes="28px" className="object-cover" priority />
      </span>
      Expert Desk
    </Link>
  );
}
