import { useId, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface TabItem {
  value: string;
  label: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/** Controlled segmented tab list (ArrowLeft/Right navigation). Render panels yourself. */
export function Tabs({ items, value, onValueChange, className }: TabsProps) {
  const base = useId();
  const move = (dir: 1 | -1) => {
    const idx = items.findIndex((i) => i.value === value);
    const next = (idx + dir + items.length) % items.length;
    onValueChange(items[next].value);
  };
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1);
        }
      }}
      className={cn("inline-flex gap-1 rounded-lg border border-border bg-surface-muted p-1", className)}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            id={`${base}-${it.value}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onValueChange(it.value)}
            className={cn(
              "rounded-md px-4 py-2 text-body-sm font-medium outline-none transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-brand-500",
              active ? "bg-surface text-fg shadow-e1" : "text-fg-muted hover:text-fg",
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
