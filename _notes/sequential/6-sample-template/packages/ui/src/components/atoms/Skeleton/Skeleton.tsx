import { cn } from "../../../utils/cn";

export interface SkeletonProps {
  className?: string;
}

/** Loading placeholder block. Size it with layout classes (h-*, w-*). */
export function Skeleton({ className }: SkeletonProps) {
  return <span aria-hidden="true" className={cn("block animate-pulse rounded-md bg-surface-muted", className)} />;
}
