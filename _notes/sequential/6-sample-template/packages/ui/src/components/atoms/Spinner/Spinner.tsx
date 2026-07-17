import { cn } from "../../../utils/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const SIZE = { sm: "size-4", md: "size-6", lg: "size-8" } as const;

/** Indeterminate loading spinner. */
export function Spinner({ size = "md", label = "Loading", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-brand-500",
        SIZE[size],
        className,
      )}
    />
  );
}
