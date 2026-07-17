import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface AlertProps {
  tone?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

const TONE = {
  info: "bg-info-bg text-info-fg border-info-border",
  success: "bg-success-bg text-success-fg border-success-border",
  warning: "bg-warning-bg text-warning-fg border-warning-border",
  danger: "bg-danger-bg text-danger-fg border-danger-border",
} as const;

/** Inline callout. */
export function Alert({ tone = "info", title, children, onClose, className }: AlertProps) {
  return (
    <div role="alert" className={cn("flex gap-3 rounded-md border p-4", TONE[tone], className)}>
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-current" aria-hidden="true" />
      <div className="flex-1">
        {title && <div className="font-medium">{title}</div>}
        {children && <div className="text-body-sm opacity-90">{children}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" className="opacity-70 transition-opacity duration-fast hover:opacity-100">
          <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
