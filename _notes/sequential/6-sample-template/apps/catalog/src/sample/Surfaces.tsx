import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  GradientCard,
  Panel,
  MediaFrame,
  MetricCard,
  Tabs,
  Accordion,
  Stepper,
  Button,
  Badge,
} from "@tpl/ui";
import { Page, Demo, Grid } from "../shell/Showcase";

export function SurfacesPage() {
  const [tab, setTab] = useState("overview");
  return (
    <Page title="Surfaces" description="Containers and composites: cards, panels, media, metrics, tabs, accordion, stepper.">
      <Demo label="Card · with slots + interactive">
        <Grid cols={3}>
          <Card>
            <CardHeader>
              <h3 className="font-display text-heading text-fg">Plan</h3>
              <p className="text-body-sm text-fg-muted">Everything to start.</p>
            </CardHeader>
            <CardBody>
              <p className="text-body-sm text-fg-muted">Cards compose header, body, and footer slots.</p>
            </CardBody>
            <CardFooter>
              <Button size="sm">Choose</Button>
              <Badge tone="success">Popular</Badge>
            </CardFooter>
          </Card>
          <GradientCard glow className="p-6">
            <h3 className="font-display text-heading text-fg">GradientCard</h3>
            <p className="mt-2 text-body-sm text-fg-muted">Brand-tinted surface with optional glow.</p>
          </GradientCard>
          <Card interactive>
            <CardBody>
              <p className="text-body-sm text-fg-muted">Interactive card — hover to lift.</p>
            </CardBody>
          </Card>
        </Grid>
      </Demo>
      <Demo label="Panel + Metrics">
        <div className="flex flex-col gap-4">
          <Panel title="Usage" actions={<Button size="sm" variant="ghost">Export</Button>}>
            <p className="text-body-sm text-fg-muted">Panels group content under a titled bar.</p>
          </Panel>
          <Grid cols={3}>
            <MetricCard label="Revenue" value="$48.2k" delta={{ value: "12%", direction: "up" }} />
            <MetricCard label="Churn" value="1.8%" delta={{ value: "0.3%", direction: "down" }} />
            <MetricCard label="Users" value="12,943" />
          </Grid>
        </div>
      </Demo>
      <Demo label="MediaFrame · states">
        <Grid cols={3}>
          <MediaFrame src="https://picsum.photos/seed/tpl/640/360" alt="Demo" />
          <MediaFrame ratio="video" />
          <MediaFrame ratio="square" />
        </Grid>
      </Demo>
      <Demo label="Tabs (controlled)">
        <div className="flex flex-col gap-4">
          <Tabs
            value={tab}
            onValueChange={setTab}
            items={[
              { value: "overview", label: "Overview" },
              { value: "activity", label: "Activity" },
              { value: "settings", label: "Settings" },
            ]}
          />
          <p className="text-body-sm text-fg-muted">Active tab: {tab}</p>
        </div>
      </Demo>
      <Demo label="Accordion + Stepper">
        <div className="flex flex-col gap-6">
          <Accordion
            items={[
              { value: "a", title: "What is included?", content: "All components, tokens, and a sample catalog." },
              { value: "b", title: "Can I theme it?", content: "Yes — light/dark plus brand overrides." },
              { value: "c", title: "Is it accessible?", content: "Keyboard and ARIA are built in." },
            ]}
          />
          <Stepper current={1} steps={[{ label: "Account" }, { label: "Profile" }, { label: "Review" }]} />
        </div>
      </Demo>
    </Page>
  );
}
