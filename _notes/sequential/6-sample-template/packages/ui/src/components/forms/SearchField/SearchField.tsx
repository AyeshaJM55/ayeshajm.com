import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  onClear?: () => void;
}

/** Search input with a leading magnifier and optional clear control. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { label, onClear, id, className, value, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const fid = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fid} className="font-body text-body-sm font-medium text-fg">
          {label}
        </label>
      )}
      <div className="relative">
        <svg viewBox="0 0 16 16" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={ref}
          id={fid}
          type="search"
          value={value}
          disabled={disabled}
          className={cn(
            "h-11 w-full rounded-full border border-border-strong bg-surface pl-9 pr-9 font-body text-body-md text-fg outline-none transition-colors duration-fast placeholder:text-fg-subtle focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50",
            className,
          )}
          {...rest}
        />
        {onClear && value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 grid size-5 -translate-y-1/2 place-items-center rounded-full text-fg-subtle transition-colors duration-fast hover:bg-surface-muted hover:text-fg"
          >
            <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
              <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
});
