import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface ToastProps {
  tone?: "neutral" | "success" | "warning" | "danger";
  title: ReactNode;
  description?: ReactNode;
  onClose?: () => void;
  className?: string;
}

const ACCENT = {
  neutral: "bg-brand-500",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
} as const;

/** A single toast notification (visual). Pair with ToastViewport for placement. */
export function Toast({ tone = "neutral", title, description, onClose, className }: ToastProps) {
  return (
    <div role="status" className={cn("flex w-80 items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-e3", className)}>
      <span className={cn("mt-1 size-2 shrink-0 rounded-full", ACCENT[tone])} aria-hidden="true" />
      <div className="flex-1">
        <div className="font-medium text-fg">{title}</div>
        {description && <div className="mt-0.5 text-body-sm text-fg-muted">{description}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" className="text-fg-subtle transition-colors duration-fast hover:text-fg">
          <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

/** Fixed bottom-right stack for toasts. */
export function ToastViewport({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2", className)} {...rest}>
      {children}
    </div>
  );
}
