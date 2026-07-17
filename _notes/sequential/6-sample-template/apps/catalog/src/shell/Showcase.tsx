import type { ReactNode } from "react";
import { cn } from "@tpl/ui";

/** Page wrapper with a title + description. */
export function Page({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-display-1 font-semibold text-fg">{title}</h1>
        {description && <p className="max-w-2xl text-body-md text-fg-muted">{description}</p>}
      </header>
      {children}
    </div>
  );
}

/** A labelled demo block. */
export function Demo({ label, children, plain = false }: { label?: string; children: ReactNode; plain?: boolean }) {
  return (
    <section className="flex flex-col gap-3">
      {label && <div className="font-mono text-label uppercase tracking-widest text-fg-subtle">{label}</div>}
      <div className={cn(!plain && "rounded-lg border border-border bg-surface p-6")}>{children}</div>
    </section>
  );
}

/** Horizontal wrap of items (variant/size strips). */
export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-4", className)}>{children}</div>;
}

/** Responsive grid for cards/cells. */
export function Grid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
  return <div className={cn("grid gap-4", map[cols])}>{children}</div>;
}

/** Read-only public-API / notes block. */
export function Spec({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface-muted p-4 font-mono text-body-sm text-fg-muted">
      {children}
    </pre>
  );
}
