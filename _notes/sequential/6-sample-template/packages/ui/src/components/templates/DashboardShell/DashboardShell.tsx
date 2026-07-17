import { useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface DashboardShellProps {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** App shell: collapsible sidebar + topbar + scrollable main. Slots only. */
export function DashboardShell({ sidebar, topbar, children, className }: DashboardShellProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("flex min-h-screen bg-app", className)}>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-surface transition-transform duration-base md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebar}
      </aside>
      {open && <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-overlay/60 md:hidden" />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center gap-3 border-b border-border bg-surface px-4">
          <button type="button" className="text-fg md:hidden" aria-label="Toggle sidebar" onClick={() => setOpen((v) => !v)}>
            <svg viewBox="0 0 20 20" className="size-6" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">{topbar}</div>
        </div>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
