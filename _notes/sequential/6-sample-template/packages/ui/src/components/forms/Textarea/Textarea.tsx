import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

/** Multi-line text input with hint/error states. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className, disabled, required, rows = 4, ...rest },
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
      <textarea
        ref={ref}
        id={fid}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={hint || error ? `${fid}-msg` : undefined}
        className={cn(
          "w-full rounded-md border bg-surface px-3 py-2 font-body text-body-md text-fg outline-none transition-colors duration-fast placeholder:text-fg-subtle focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50",
          invalid ? "border-danger" : "border-border-strong focus-visible:border-brand-500",
          className,
        )}
        {...rest}
      />
      {(hint || error) && (
        <span id={`${fid}-msg`} className={cn("text-body-sm", invalid ? "text-danger-fg" : "text-fg-muted")}>
          {error ?? hint}
        </span>
      )}
    </div>
  );
});
