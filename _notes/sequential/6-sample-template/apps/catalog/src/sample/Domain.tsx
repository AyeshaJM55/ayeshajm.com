import { SupplyPanel, MilestonePanel, EnginePanel } from "@tpl/ui";
import { Page, Demo } from "../shell/Showcase";
import { SUPPLY_SEGMENTS, SUPPLY_FACTS, MILESTONES, ENGINE_TARGETS } from "../mocks/fixtures";

export function DomainPage() {
  return (
    <Page title="Domain · Tokenomics" description="Full SMIL-animated sections assembled from the generic charts and fed by fixtures. Domain naming is allowed at this layer.">
      <Demo label="SupplyPanel" plain>
        <SupplyPanel
          eyebrow="Tokenomics"
          title="Supply & distribution"
          gauge={{ value: 87.5, label: "87.5%", sublabel: "circulating" }}
          note="No tokens are permanently allocated yet — allocation is strategic and transparent."
          taxTitle="Tax split"
          segments={SUPPLY_SEGMENTS}
          facts={SUPPLY_FACTS}
        />
      </Demo>
      <Demo label="MilestonePanel" plain>
        <MilestonePanel
          eyebrow="Milestones"
          title="Rewards as the cap grows"
          description="Each milestone triggers a one-time, snapshot-based distribution to holders."
          points={MILESTONES}
          unit="%"
          footnote="Distributions are non-recurring and proportional to holdings."
        />
      </Demo>
      <Demo label="EnginePanel" plain>
        <EnginePanel
          eyebrow="Distribution"
          title="The reward engine"
          description="A flat tax is split four ways and routed automatically to fund ecosystem rewards."
          sourceLabel="5%"
          sourceSub="TAX"
          targets={ENGINE_TARGETS}
          facts={[
            { label: "Buy / Sell", value: "5% / 5%" },
            { label: "Transfer", value: "0%" },
            { label: "Contracts", value: "6" },
            { label: "Execution", value: "Auto + manual" },
          ]}
        />
      </Demo>
    </Page>
  );
}
