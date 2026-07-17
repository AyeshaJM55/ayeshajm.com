import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../layout/Container/Container";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteFooterProps {
  brand: ReactNode;
  tagline?: string;
  columns?: FooterColumn[];
  bottom?: ReactNode;
  className?: string;
}

/** Multi-column site footer with a bottom legal bar. */
export function SiteFooter({ brand, tagline, columns = [], bottom, className }: SiteFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-surface", className)}>
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-3">
            <div className="font-display text-heading font-semibold text-fg">{brand}</div>
            {tagline && <p className="max-w-xs text-body-sm text-fg-muted">{tagline}</p>}
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="font-mono text-label uppercase text-fg-subtle">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-body-sm text-fg-muted transition-colors duration-fast hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-body-sm text-fg-subtle sm:flex-row">
          {bottom}
        </div>
      </Container>
    </footer>
  );
}
