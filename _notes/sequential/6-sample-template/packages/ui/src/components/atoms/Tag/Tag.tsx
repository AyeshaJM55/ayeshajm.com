import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  /** When provided, renders a remove control. */
  onRemove?: () => void;
}

/** Dismissible chip — e.g. a selected filter or token. */
export function Tag({ className, children, onRemove, ...rest }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-body-sm text-fg",
        className,
      )}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="grid size-4 place-items-center rounded-full text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg"
        >
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>
      )}
    </span>
  );
}
