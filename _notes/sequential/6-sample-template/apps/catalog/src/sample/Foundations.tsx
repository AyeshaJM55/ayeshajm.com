import { Page, Demo, Grid } from "../shell/Showcase";

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className={`h-14 ${className}`} />
      <div className="bg-surface px-2 py-1 font-mono text-label text-fg-muted">{name}</div>
    </div>
  );
}

const BRAND = ["bg-brand-50", "bg-brand-100", "bg-brand-200", "bg-brand-300", "bg-brand-400", "bg-brand-500", "bg-brand-600", "bg-brand-700", "bg-brand-800", "bg-brand-900"];
const ACCENT = ["bg-accent-50", "bg-accent-100", "bg-accent-200", "bg-accent-300", "bg-accent-400", "bg-accent-500", "bg-accent-600", "bg-accent-700", "bg-accent-800", "bg-accent-900"];
const SURFACE = ["bg-app", "bg-surface", "bg-surface-muted"];
const SEMANTIC = ["bg-success", "bg-warning", "bg-danger", "bg-info"];

export function FoundationsPage() {
  return (
    <Page title="Foundations" description="The token layer every component reads. Switch theme and brand in the header — these swatches restyle with no re-mount.">
      <Demo label="Brand ramp">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
          {BRAND.map((c) => (
            <Swatch key={c} name={c.replace("bg-", "")} className={c} />
          ))}
        </div>
      </Demo>
      <Demo label="Accent ramp">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
          {ACCENT.map((c) => (
            <Swatch key={c} name={c.replace("bg-", "")} className={c} />
          ))}
        </div>
      </Demo>
      <Demo label="Surface + semantic">
        <Grid cols={4}>
          {[...SURFACE, ...SEMANTIC].map((c) => (
            <Swatch key={c} name={c.replace("bg-", "")} className={c} />
          ))}
        </Grid>
      </Demo>
      <Demo label="Typography scale">
        <div className="flex flex-col gap-3">
          <p className="font-display text-display-2 text-fg">Display 2</p>
          <p className="font-display text-display-1 text-fg">Display 1</p>
          <p className="font-display text-heading text-fg">Heading</p>
          <p className="text-body-lg text-fg">Body large — the quick brown fox.</p>
          <p className="text-body-md text-fg-muted">Body medium — the quick brown fox.</p>
          <p className="text-body-sm text-fg-subtle">Body small — the quick brown fox.</p>
          <p className="font-mono text-label uppercase text-fg-muted">Label · mono</p>
        </div>
      </Demo>
      <Demo label="Radii + elevation">
        <div className="flex flex-wrap gap-5">
          {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-full"].map((r) => (
            <div key={r} className={`grid size-20 place-items-center border border-border bg-surface-muted font-mono text-label text-fg-muted ${r}`}>{r.replace("rounded-", "")}</div>
          ))}
          {["shadow-e1", "shadow-e2", "shadow-e3", "shadow-e4"].map((s) => (
            <div key={s} className={`grid size-20 place-items-center rounded-lg bg-surface font-mono text-label text-fg-muted ${s}`}>{s.replace("shadow-", "")}</div>
          ))}
        </div>
      </Demo>
    </Page>
  );
}
