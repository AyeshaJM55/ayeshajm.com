import { useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../layout/Container/Container";

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  brand: ReactNode;
  links?: NavLink[];
  actions?: ReactNode;
  className?: string;
}

/** Sticky site header with a desktop nav and a mobile disclosure. */
export function SiteHeader({ brand, links = [], actions, className }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className={cn("sticky top-0 z-40 border-b border-border bg-app/80 backdrop-blur", className)}>
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display text-heading font-semibold text-fg">{brand}</div>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-body-sm text-fg-muted transition-colors duration-fast hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">{actions}</div>
          <button
            type="button"
            className="text-fg md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 20 20" className="size-6" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="flex flex-col gap-1 pb-4 md:hidden">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="py-2 text-body-md text-fg-muted transition-colors duration-fast hover:text-fg">
                {l.label}
              </a>
            ))}
            {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
          </div>
        )}
      </Container>
    </header>
  );
}
