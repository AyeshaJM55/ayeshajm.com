import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface Column<Row> {
  key: string;
  header: ReactNode;
  align?: "left" | "center" | "right";
  render?: (row: Row) => ReactNode;
}

export interface TableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string | number;
  state?: "default" | "loading" | "empty";
  emptyLabel?: string;
  className?: string;
}

const alignClass = (a?: "left" | "center" | "right") =>
  a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

/** Generic data table driven by `columns` + `rows`. Has loading + empty states. */
export function Table<Row>({ columns, rows, getRowKey, state = "default", emptyLabel = "No data", className }: TableProps<Row>) {
  const showEmpty = state === "empty" || (state === "default" && rows.length === 0);
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      <table className="w-full border-collapse text-body-sm">
        <thead>
          <tr className="border-b border-border bg-surface-muted">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-4 py-3 font-medium text-fg-muted", alignClass(c.align))}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state === "loading" &&
            [0, 1, 2, 3].map((r) => (
              <tr key={`sk-${r}`} className="border-b border-border last:border-0">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                    <span className="block h-3 w-24 animate-pulse rounded bg-surface-muted" />
                  </td>
                ))}
              </tr>
            ))}
          {showEmpty && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-fg-muted">
                {emptyLabel}
              </td>
            </tr>
          )}
          {state === "default" &&
            rows.map((row, i) => (
              <tr key={getRowKey(row, i)} className="border-b border-border transition-colors duration-fast last:border-0 hover:bg-surface-muted">
                {columns.map((c) => {
                  const raw = (row as Record<string, unknown>)[c.key];
                  return (
                    <td key={c.key} className={cn("px-4 py-3 text-fg", alignClass(c.align))}>
                      {c.render ? c.render(row) : String(raw ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
