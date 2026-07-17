import { useState } from "react";
import {
  Carousel,
  CarouselToGrid,
  HeroSlider,
  TabsSlider,
  Image,
  Button,
  Checklist,
  type GridTile,
  type HeroSlide,
  type SliderTab,
} from "@tpl/ui";
import { Page, Demo } from "../shell/Showcase";

const PHOTO = (s: string) => `https://picsum.photos/seed/${s}/900/600`;

const TILES: GridTile[] = [
  { key: "a", src: PHOTO("tpl-a"), label: "Rewards" },
  { key: "b", src: PHOTO("tpl-b"), label: "Sentinel" },
  { key: "c", src: PHOTO("tpl-c"), label: "Assistant" },
  { key: "d", src: PHOTO("tpl-d"), label: "Token" },
];

const SLIDES: HeroSlide[] = [
  {
    key: "s1",
    eyebrow: "Platform",
    title: "Build once, theme everywhere",
    subtitle: "A token-driven kit with light/dark and brand theming baked in.",
    mediaSrc: PHOTO("tpl-hero-1"),
    actions: (
      <>
        <Button variant="gradient">Get started</Button>
        <Button variant="outline">Read docs</Button>
      </>
    ),
  },
  {
    key: "s2",
    eyebrow: "Components",
    title: "Sixty-plus building blocks",
    subtitle: "Atoms to templates, every variant on a catalog page.",
    mediaSrc: PHOTO("tpl-hero-2"),
    align: "start",
    actions: <Button variant="gradient">Explore</Button>,
  },
];

const TABS: SliderTab[] = [
  {
    key: "rewards",
    label: "Rewards",
    actionText: "Everywhere",
    desc: "Earn across the whole ecosystem with a single balance.",
    content: <Image src={PHOTO("tpl-tab-1")} alt="Rewards" ratio="wide" corners />,
  },
  {
    key: "sentinel",
    label: "Sentinel",
    actionText: "On Guard",
    desc: "Always-on monitoring with instant alerts.",
    content: (
      <Checklist
        columns={2}
        items={["Real-time signals", "Threshold alerts", "Audit trail", "Configurable rules"]}
      />
    ),
  },
  {
    key: "assistant",
    label: "Assistant",
    actionText: "On Demand",
    desc: "Answers, summaries, and actions in context.",
    content: <Image src={PHOTO("tpl-tab-3")} alt="Assistant" ratio="wide" corners />,
  },
];

export function SlidersPage() {
  const [i, setI] = useState(0);
  return (
    <Page
      title="Sliders"
      description="The slider family: a generic Carousel, a CarouselToGrid reveal, a full-bleed HeroSlider, and the scroll-driven TabsSlider."
    >
      <Demo label="Carousel · arrows + dots + autoplay (controlled index)">
        <div className="flex flex-col gap-3">
          <Carousel
            index={i}
            onIndexChange={setI}
            autoPlay
            items={[
              <Image key="1" src={PHOTO("car-1")} alt="One" ratio="video" rounded={false} />,
              <Image key="2" src={PHOTO("car-2")} alt="Two" ratio="video" rounded={false} />,
              <Image key="3" src={PHOTO("car-3")} alt="Three" ratio="video" rounded={false} />,
            ]}
          />
          <span className="text-body-sm text-fg-muted">Active slide: {i + 1}</span>
        </div>
      </Demo>

      <Demo label="Carousel · panels, no autoplay">
        <Carousel
          showArrows
          items={["Plan", "Build", "Ship"].map((t) => (
            <div key={t} className="flex aspect-[21/9] items-center justify-center bg-surface-muted">
              <span className="font-display text-display-1 font-semibold text-fg">{t}</span>
            </div>
          ))}
        />
      </Demo>

      <Demo label="CarouselToGrid · rotates, then reveals a 2×2 grid in view">
        <CarouselToGrid items={TILES} />
      </Demo>

      <Demo label="HeroSlider · full-bleed, auto-advancing" plain>
        <HeroSlider slides={SLIDES} />
      </Demo>

      <Demo label="TabsSlider · scroll-driven on desktop, stacked on mobile" plain>
        <TabsSlider heading="Earn Rewards" tabs={TABS} />
      </Demo>
    </Page>
  );
}
