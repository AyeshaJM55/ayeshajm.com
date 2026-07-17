import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils/cn";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title?: ReactNode;
  children?: ReactNode;
}

/** Edge-anchored panel rendered in a portal. */
export function Drawer({ open, onClose, side = "right", title, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-overlay/70" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={cn(
          "absolute top-0 flex h-full w-80 max-w-full animate-fade-up flex-col border-border bg-surface shadow-e4",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
        )}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-heading text-fg">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-fg-subtle transition-colors duration-fast hover:text-fg">
            <svg viewBox="0 0 14 14" className="size-4" aria-hidden="true">
              <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}
