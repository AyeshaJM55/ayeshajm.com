import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

/** Keyboard key hint. */
export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-sm border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-label text-fg-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
