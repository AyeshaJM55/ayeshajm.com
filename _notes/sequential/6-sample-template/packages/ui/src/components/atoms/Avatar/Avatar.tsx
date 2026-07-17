import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted font-body font-medium text-fg-muted",
  {
    variants: { size: { sm: "size-8 text-body-sm", md: "size-10 text-body-md", lg: "size-14 text-heading" } },
    defaultVariants: { size: "md" },
  },
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  /** Name used for the alt text and initials fallback. */
  name: string;
  status?: "online" | "offline" | "busy";
  className?: string;
}

const STATUS_CLASS: Record<NonNullable<AvatarProps["status"]>, string> = {
  online: "bg-success",
  offline: "bg-neutral-400",
  busy: "bg-danger",
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** User avatar with image, initials fallback, and optional status dot. */
export function Avatar({ src, name, status, size, className }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-surface",
            STATUS_CLASS[status],
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}
