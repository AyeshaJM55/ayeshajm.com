import {
  RadialGauge,
  SegmentBar,
  MiniBars,
  MilestonePath,
  OrbitField,
  FlowDiagram,
  PulseRings,
  SpinDiamond,
  OrbitDot,
  RiseBars,
} from "@tpl/ui";
import { Page, Demo, Grid } from "../shell/Showcase";
import { SUPPLY_SEGMENTS, APR_TIERS, MILESTONES, ENGINE_TARGETS, PORTFOLIO } from "../mocks/fixtures";

export function ChartsPage() {
  return (
    <Page title="Charts (SMIL)" description="Hand-authored SVG visuals — no chart library. Each animates when scrolled into view.">
      <Demo label="RadialGauge + SegmentBar + MiniBars">
        <Grid cols={3}>
          <div className="flex justify-center">
            <RadialGauge value={87.5} label="87.5%" sublabel="circulating" />
          </div>
          <div className="self-center">
            <SegmentBar segments={SUPPLY_SEGMENTS} total={4} />
          </div>
          <div className="self-center">
            <MiniBars data={APR_TIERS} max={12} unit="%" />
          </div>
        </Grid>
      </Demo>
      <Demo label="MilestonePath">
        <MilestonePath points={MILESTONES} unit="%" />
      </Demo>
      <Demo label="OrbitField + FlowDiagram">
        <Grid cols={2}>
          <div className="flex justify-center">
            <OrbitField items={PORTFOLIO} centerLabel="15+" centerSub="ASSETS" />
          </div>
          <div className="self-center">
            <FlowDiagram sourceLabel="5%" sourceSub="TAX" targets={ENGINE_TARGETS} />
          </div>
        </Grid>
      </Demo>
      <Demo label="Animated icons">
        <div className="flex flex-wrap items-center gap-8 text-brand-500">
          <div className="flex flex-col items-center gap-2">
            <PulseRings />
            <span className="font-mono text-label text-fg-muted">PulseRings</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SpinDiamond />
            <span className="font-mono text-label text-fg-muted">SpinDiamond</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <OrbitDot />
            <span className="font-mono text-label text-fg-muted">OrbitDot</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RiseBars />
            <span className="font-mono text-label text-fg-muted">RiseBars</span>
          </div>
        </div>
      </Demo>
    </Page>
  );
}
