import { useEffect, useState } from "react";
import { cn } from "@tpl/ui";
import { REGISTRY } from "./registry";
import { ThemeSwitcher } from "./shell/ThemeSwitcher";

function useHashId(): string {
  const read = () => window.location.hash.replace(/^#\//, "") || "foundations";
  const [id, setId] = useState(read);
  useEffect(() => {
    const on = () => setId(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return id;
}

const GROUPS = ["Foundations", "Components", "Sections", "Patterns"] as const;

export function App() {
  const id = useHashId();
  const entry = REGISTRY.find((e) => e.id === id) ?? REGISTRY[0];
  const Active = entry.Component;

  return (
    <div className="flex min-h-screen bg-app text-fg">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:block">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="border-b border-border p-5 font-display text-heading font-semibold text-fg">◆ UI Template</div>
          <nav className="flex-1 overflow-y-auto p-3">
            {GROUPS.map((group) => (
              <div key={group} className="mb-4">
                <div className="px-3 pb-1 font-mono text-label uppercase tracking-widest text-fg-subtle">{group}</div>
                {REGISTRY.filter((e) => e.group === group).map((e) => (
                  <a
                    key={e.id}
                    href={`#/${e.id}`}
                    className={cn(
                      "block rounded-md px-3 py-2 text-body-sm transition-colors duration-fast",
                      e.id === entry.id ? "bg-brand-500 text-brand-foreground" : "text-fg-muted hover:bg-surface-muted hover:text-fg",
                    )}
                  >
                    {e.title}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-app/80 px-6 py-3 backdrop-blur">
          <span className="font-mono text-label uppercase tracking-widest text-fg-subtle">/sample/{entry.id}</span>
          <ThemeSwitcher />
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 p-6 md:p-10">
          <Active />
        </main>
      </div>
    </div>
  );
}
