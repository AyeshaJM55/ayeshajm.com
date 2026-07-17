import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
}

/** Native select with a custom chevron and hint/error states. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, options, id, className, disabled, required, ...rest },
  ref,
) {
  const autoId = useId();
  const fid = id ?? autoId;
  const invalid = Boolean(error);
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fid} className="font-body text-body-sm font-medium text-fg">
          {label}
          {required && <span className="ml-0.5 text-danger" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={fid}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          className={cn(
            "h-11 w-full appearance-none rounded-md border bg-surface pl-3 pr-9 font-body text-body-md text-fg outline-none transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50",
            invalid ? "border-danger" : "border-border-strong focus-visible:border-brand-500",
            className,
          )}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 16 16" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {(hint || error) && <span className={cn("text-body-sm", invalid ? "text-danger-fg" : "text-fg-muted")}>{error ?? hint}</span>}
    </div>
  );
});
