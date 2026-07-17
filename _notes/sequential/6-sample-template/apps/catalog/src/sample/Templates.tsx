import { SiteShell, DashboardShell, AuthShell, SiteHeader, SiteFooter, Button, TextField } from "@tpl/ui";
import { Page, Demo } from "../shell/Showcase";
import { NAV_LINKS, FOOTER_COLUMNS } from "../mocks/fixtures";

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="h-[520px] overflow-hidden rounded-lg border border-border">{children}</div>;
}

const SidebarNav = (
  <nav className="flex flex-col gap-1 p-4">
    <div className="mb-4 font-display text-heading font-semibold text-fg">◆ Console</div>
    {["Dashboard", "Projects", "Members", "Settings"].map((l) => (
      <a key={l} href="#/templates" className="rounded-md px-3 py-2 text-body-sm text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg">
        {l}
      </a>
    ))}
  </nav>
);

export function TemplatesPage() {
  return (
    <Page title="Page templates" description="Slot-only layouts that own page structure but no content. Previewed in clipped frames.">
      <Demo label="SiteShell" plain>
        <Frame>
          <SiteShell
            header={<SiteHeader brand="◆ Kit" links={NAV_LINKS} actions={<Button size="sm">Sign in</Button>} />}
            footer={<SiteFooter brand="◆ Kit" columns={FOOTER_COLUMNS} bottom={<span>© 2026 Example</span>} />}
          >
            <div className="p-12 text-center text-body-md text-fg-muted">Marketing content area</div>
          </SiteShell>
        </Frame>
      </Demo>
      <Demo label="DashboardShell" plain>
        <Frame>
          <DashboardShell sidebar={SidebarNav} topbar={<span className="font-medium text-fg">Dashboard</span>}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-surface p-6 text-body-sm text-fg-muted">Widget A</div>
              <div className="rounded-lg border border-border bg-surface p-6 text-body-sm text-fg-muted">Widget B</div>
              <div className="rounded-lg border border-border bg-surface p-6 text-body-sm text-fg-muted">Widget C</div>
            </div>
          </DashboardShell>
        </Frame>
      </Demo>
      <Demo label="AuthShell" plain>
        <Frame>
          <AuthShell brand="◆ Kit" aside={<p className="max-w-xs text-center text-body-lg">“The fastest way to ship a consistent product.”</p>}>
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-heading text-fg">Welcome back</h2>
              <TextField label="Email" placeholder="you@example.test" />
              <TextField label="Password" type="password" placeholder="••••••••" />
              <Button block>Sign in</Button>
            </div>
          </AuthShell>
        </Frame>
      </Demo>
    </Page>
  );
}
