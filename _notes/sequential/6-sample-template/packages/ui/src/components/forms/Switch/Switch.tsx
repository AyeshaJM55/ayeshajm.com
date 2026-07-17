import { cn } from "../../../utils/cn";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/** Accessible on/off toggle (role="switch"). Controlled. */
export function Switch({ checked, onCheckedChange, label, disabled, className }: SwitchProps) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5 text-body-md text-fg", disabled && "cursor-not-allowed opacity-50", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-base outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app",
          checked ? "bg-brand-500" : "bg-surface-muted",
        )}
      >
        <span
          className={cn(
            "inline-block size-5 rounded-full bg-surface shadow-e1 transition-transform duration-base",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
      {label}
    </label>
  );
}
