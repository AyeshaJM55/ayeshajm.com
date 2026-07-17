import { type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { useDisclosure } from "../../../hooks/useDisclosure";

export interface MenuItem {
  label: string;
  onSelect?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface MenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  align?: "start" | "end";
}

/** Click-to-open dropdown menu. Closes on select, outside click, or Escape. */
export function Menu({ trigger, items, align = "start" }: MenuProps) {
  const { isOpen, toggle, close } = useDisclosure();

  return (
    <div className="relative inline-block" onKeyDown={(e) => e.key === "Escape" && close()}>
      <button type="button" onClick={toggle} aria-haspopup="menu" aria-expanded={isOpen} className="outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md">
        {trigger}
      </button>
      {isOpen && (
        <>
          <button type="button" aria-hidden="true" tabIndex={-1} onClick={close} className="fixed inset-0 z-40 cursor-default" />
          <div
            role="menu"
            className={cn(
              "absolute z-50 mt-2 min-w-44 animate-fade-up overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-e3",
              align === "end" ? "right-0" : "left-0",
            )}
          >
            {items.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect?.();
                  close();
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-body-sm text-fg transition-colors duration-fast hover:bg-surface-muted disabled:opacity-50"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
