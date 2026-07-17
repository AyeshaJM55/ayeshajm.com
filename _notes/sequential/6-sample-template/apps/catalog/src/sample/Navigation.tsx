import { SiteHeader, SiteFooter, Button } from "@tpl/ui";
import { Page, Demo } from "../shell/Showcase";
import { NAV_LINKS, FOOTER_COLUMNS } from "../mocks/fixtures";

export function NavigationPage() {
  return (
    <Page title="Navigation" description="Site-level shells: a responsive header and a multi-column footer.">
      <Demo label="SiteHeader" plain>
        <div className="overflow-hidden rounded-lg border border-border">
          <SiteHeader brand="◆ Kit" links={NAV_LINKS} actions={<Button size="sm">Sign in</Button>} />
          <div className="bg-app p-12 text-center text-body-sm text-fg-muted">Page content scrolls beneath the sticky header.</div>
        </div>
      </Demo>
      <Demo label="SiteFooter" plain>
        <div className="overflow-hidden rounded-lg border border-border">
          <SiteFooter
            brand="◆ Kit"
            tagline="A token-driven UI template extracted from a real product."
            columns={FOOTER_COLUMNS}
            bottom={
              <>
                <span>© 2026 Example, Inc.</span>
                <span>Privacy · Terms</span>
              </>
            }
          />
        </div>
      </Demo>
    </Page>
  );
}
