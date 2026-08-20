import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Primary marketing CTA: text rolls up to a duplicate line on hover, arrow circle rotates.
 *  Reserved for the one or two highest-intent actions per screen (hero, submit) — using it
 *  everywhere would flatten the emphasis it's meant to create. */
export function CtaButton({
  href,
  type,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  children,
  className,
}: {
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "dark" | "light";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground",
    dark: "bg-foreground text-background",
    light: "bg-card text-foreground border border-border",
  }[variant];
  const arrowStyles = {
    primary: "bg-primary-foreground text-primary",
    dark: "bg-background text-foreground",
    light: "bg-foreground text-background",
  }[variant];
  const padY = size === "lg" ? "py-2.5" : "py-2";
  const textSize = size === "lg" ? "text-sm" : "text-[13px]";
  const circleSize = size === "lg" ? "size-8" : "size-7";

  const content = (
    <span
      className={cn(
        "group/cta inline-flex shrink-0 items-center gap-3 rounded-full pl-5 pr-1.5 font-medium transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50",
        styles,
        padY,
        textSize,
        className,
      )}
    >
      <span className="h-[1.2em] overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/cta:-translate-y-1/2">
          <span className="block leading-[1.2em]">{children}</span>
          <span className="block leading-[1.2em]" aria-hidden>
            {children}
          </span>
        </span>
      </span>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/cta:-rotate-45",
          arrowStyles,
          circleSize,
        )}
      >
        <ArrowRight className="size-3.5" />
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className="inline-flex text-left">
      {content}
    </button>
  );
}
