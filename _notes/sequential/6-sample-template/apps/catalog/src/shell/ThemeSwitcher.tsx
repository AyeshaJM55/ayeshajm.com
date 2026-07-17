import { useTheme, BRANDS, cn } from "@tpl/ui";

const SCHEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

function Segmented({ options, value, onChange }: { options: ReadonlyArray<{ value: string; label: string }>; value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex rounded-md border border-border bg-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-sm px-3 py-1.5 text-body-sm font-medium transition-colors duration-fast",
            o.value === value ? "bg-brand-500 text-brand-foreground" : "text-fg-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Catalog header control: switch scheme + brand on the document root. */
export function ThemeSwitcher() {
  const { scheme, brand, setScheme, setBrand } = useTheme();
  const brandOptions = Object.entries(BRANDS).map(([id, b]) => ({ value: id, label: b.label }));
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Segmented options={SCHEMES} value={scheme} onChange={(v) => setScheme(v === "dark" ? "dark" : "light")} />
      <Segmented options={brandOptions} value={brand} onChange={setBrand} />
    </div>
  );
}
