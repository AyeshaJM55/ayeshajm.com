import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  leadingIcon?: ReactNode;
}

const FIELD = { sm: "h-9 text-body-sm", md: "h-11 text-body-md", lg: "h-12 text-body-md" } as const;

/** Labelled text input with hint/error and invalid + disabled states. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, size = "md", leadingIcon, required, id, className, disabled, ...rest },
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
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-fg-subtle">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={fid}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={hint || error ? `${fid}-msg` : undefined}
          className={cn(
            "w-full rounded-md border bg-surface px-3 font-body text-fg outline-none transition-colors duration-fast placeholder:text-fg-subtle focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50",
            FIELD[size],
            leadingIcon && "pl-9",
            invalid ? "border-danger" : "border-border-strong focus-visible:border-brand-500",
            className,
          )}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span id={`${fid}-msg`} className={cn("text-body-sm", invalid ? "text-danger-fg" : "text-fg-muted")}>
          {error ?? hint}
        </span>
      )}
    </div>
  );
});
