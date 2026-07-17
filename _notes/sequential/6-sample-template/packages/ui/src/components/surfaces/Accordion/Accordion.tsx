import { useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string[];
  className?: string;
}

/** Expand/collapse list. `single` keeps one panel open; `multiple` allows many. */
export function Accordion({ items, type = "single", defaultValue = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultValue);
  const toggle = (v: string) =>
    setOpen((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : type === "single" ? [v] : [...prev, v]));

  return (
    <div className={cn("divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface", className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.value);
        return (
          <div key={it.value}>
            <button
              type="button"
              onClick={() => toggle(it.value)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-medium text-fg transition-colors duration-fast hover:bg-surface-muted"
            >
              {it.title}
              <svg viewBox="0 0 16 16" className={cn("size-4 shrink-0 text-fg-subtle transition-transform duration-base", isOpen && "rotate-180")} aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && <div className="px-5 pb-4 text-body-sm leading-relaxed text-fg-muted">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
