import { cn } from "../../../utils/cn";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function pages(page: number, count: number): (number | "...")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const out: (number | "...")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(count - 1, page + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < count - 1) out.push("...");
  out.push(count);
  return out;
}

/** Windowed page navigation. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const go = (p: number) => p >= 1 && p <= pageCount && p !== page && onPageChange(p);
  const items = pages(page, pageCount);
  const navBtn = "grid h-9 min-w-9 place-items-center rounded-md border border-border px-2 text-body-sm text-fg transition-colors duration-fast hover:bg-surface-muted disabled:opacity-40 disabled:hover:bg-transparent";
  return (
    <nav className={cn("flex items-center gap-1.5", className)} aria-label="Pagination">
      <button type="button" className={navBtn} onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">
        ‹
      </button>
      {items.map((it, i) =>
        it === "..." ? (
          <span key={`gap-${i}`} className="px-1 text-fg-subtle">
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            onClick={() => go(it)}
            aria-current={it === page ? "page" : undefined}
            className={cn(navBtn, it === page && "border-brand-500 bg-brand-500 text-brand-foreground hover:bg-brand-600")}
          >
            {it}
          </button>
        ),
      )}
      <button type="button" className={navBtn} onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label="Next page">
        ›
      </button>
    </nav>
  );
}
