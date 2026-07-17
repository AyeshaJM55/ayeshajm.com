import { Hero, FeatureGrid, StatStrip, CtaBanner, Faq, Steps, Spotlight, SectionHeading, Button } from "@tpl/ui";
import { Page, Demo } from "../shell/Showcase";
import { FEATURES, STATS, FAQ, STEPS } from "../mocks/fixtures";

export function MarketingPage() {
  return (
    <Page title="Marketing sections" description="Composable page regions. Content is injected via props; nothing is hard-coded. Primary CTAs use the animated gradient button.">
      <Demo label="SectionHeading · eyebrow + highlighted title">
        <SectionHeading
          eyebrow="Why us"
          title="One foundation, every surface"
          highlight="every surface"
          subtitle="Promote a component once and it lands everywhere — no copy-paste drift."
        />
      </Demo>
      <Demo label="Hero · centered" plain>
        <Hero
          eyebrow="New"
          title="Build once, theme everywhere"
          subtitle="A token-driven component template with light/dark and brand theming baked in."
          actions={
            <>
              <Button variant="gradient">Get started</Button>
              <Button variant="outline">Read docs</Button>
            </>
          }
        />
      </Demo>
      <Demo label="Hero · split" plain>
        <Hero
          layout="split"
          eyebrow="Platform"
          title="A layered UI kit"
          subtitle="Atoms to templates, all reading the same tokens."
          actions={<Button variant="gradient">Start building</Button>}
        />
      </Demo>
      <Demo label="FeatureGrid">
        <FeatureGrid features={FEATURES} />
      </Demo>
      <Demo label="StatStrip">
        <StatStrip stats={STATS} />
      </Demo>
      <Demo label="Spotlight">
        <Spotlight
          eyebrow="Why"
          title="Designed to scale"
          body="Promote a component once and every surface gets it — no copy-paste drift."
          actions={<Button variant="gradient">Learn more</Button>}
        />
      </Demo>
      <Demo label="Steps">
        <Steps steps={STEPS} />
      </Demo>
      <Demo label="Faq">
        <Faq items={FAQ} />
      </Demo>
      <Demo label="CtaBanner" plain>
        <CtaBanner title="Ready to build?" description="Install the package, apply the preset, and ship." actions={<Button variant="gradient">Get the kit</Button>} />
      </Demo>
    </Page>
  );
}
