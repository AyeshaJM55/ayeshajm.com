import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-body font-medium transition-colors duration-base outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // Black label at rest in every theme (gold/indigo bg reads best with black text).
        solid: "bg-brand-500 text-black hover:bg-brand-600 active:bg-brand-700",
        // Signature primary CTA (the SRC header / hero "Get Started" effect):
        // an oversized gold→black gradient (300% size). At rest the window sits
        // on the gold end with black text; on hover the background-position
        // slides to the black end and the label turns gold. Gold border throughout.
        gradient:
          "border border-brand-500 bg-gradient-to-br from-brand-500 from-40% via-brand-700 via-55% to-black to-60% bg-[length:300%_300%] bg-left-top text-black transition-[background-position,color] duration-300 ease-out hover:bg-right-bottom hover:text-brand-400 active:bg-right-bottom",
        // Black label at rest in every theme to match solid/gradient.
        soft: "bg-brand-50 text-black hover:bg-brand-100",
        // Secondary controls: foreground text (black in light, white in dark),
        // turning gold on hover.
        outline: "border border-border-strong text-fg hover:border-brand-500 hover:text-brand-600",
        ghost: "text-fg hover:bg-brand-50 hover:text-brand-600",
        link: "text-fg underline-offset-4 hover:underline hover:text-brand-600",
        danger: "bg-danger text-fg-on-brand hover:opacity-90 active:opacity-80",
      },
      size: {
        sm: "text-body-sm px-4 py-2",
        md: "text-body-md px-5 py-2.5",
        lg: "text-body-md px-6 py-3",
      },
      block: { true: "w-full" },
    },
    compoundVariants: [{ variant: "link", class: "px-0 py-0 h-auto" }],
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/** Primary action control. Variants × sizes; supports loading, disabled, icons.
 *  `solid` / `gradient` read as primary (gradient = the gold→black hover slide);
 *  `outline` / `soft` / `ghost` as secondary. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, block, loading = false, disabled, leadingIcon, trailingIcon, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...rest}
    >
      {loading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {!loading && leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});
