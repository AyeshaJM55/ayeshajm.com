# UI Template

A reusable, token-themed React UI template extracted from the Saita Rewards
Corporation web project. One repository ships two artifacts:

- **`packages/ui`** — the library: design tokens, multi-brand theming, and a
  layered component set (atoms → composites → sections → templates), including
  hand-authored **SMIL SVG** charts and animated icons.
- **`apps/catalog`** — a sample app that renders every component, variant, and
  state, with live **theme** (light/dark) and **brand** (default/amber) switching.

## Principles

1. **Token-first** — no `#hex` / `px` / font literal in any component; everything
   resolves to a CSS variable via the Tailwind preset.
2. **Down-only layering** — tokens → atoms → composites → sections → templates.
3. **Generic** — no product/brand name in component source; identity is layered
   on through themes (`amber` is the SRC gold).
4. **Catalog-driven** — if a variant isn't on a sample page, it doesn't exist.
5. **Mock data only** — the catalog consumes fixtures; it never calls a backend.

## Layout

```
template/
├── packages/ui/
│   └── src/
│       ├── tokens/            # Layer 1 — pure TS, no React (+ themes/, defineTheme)
│       ├── components/
│       │   ├── atoms/ forms/ icons/                              # Layer 2
│       │   ├── surfaces/ feedback/ overlays/ data/ charts/ media/ sliders/   # Layer 3
│       │   ├── marketing/ navigation/ layout/ domain/            # Layer 4
│       │   └── templates/                                        # Layer 5
│       ├── hooks/ utils/ types/ styles/globals.css
│       └── index.ts           # public barrel — the only contract
├── apps/catalog/              # sample app (Vite + React)
│   └── src/{sample, shell, mocks, registry.ts, App.tsx}
├── tailwind.config.ts         # shared token-aware preset (re-export)
├── tsconfig.base.json  pnpm-workspace.yaml
```

## What's included

Everything needed to build an SRC-style marketing site without rebuilding common UI:

- **Atoms** — Button (`solid` / `gradient` / `soft` / `outline` / `ghost` / `link` /
  `danger`, i.e. primary & secondary CTAs), IconButton, Badge, Tag, Avatar, Spinner,
  ProgressBar, Skeleton, Divider, Link, Label, Kbd, Eyebrow, Heading, Text, Rule, and
  decorative **Corners** brackets.
- **Forms** — TextField, Textarea, Select, Checkbox, Switch, SearchField.
- **Media** — `Image` and `Video` with loading / loaded / error states, object fit +
  position, scrim overlays, decorative corners, and a mute toggle; both fall back to
  the animated `Placeholder`.
- **Sliders** — generic `Carousel` (arrows / dots / keyboard / swipe / autoplay),
  `CarouselToGrid` (rotates, then reveals a 2×2 grid in view), plus the section-level
  `HeroSlider` (full-bleed, auto-advancing) and `TabsSlider` (scroll-driven, sticky
  tabbed slider).
- **Surfaces** — Card, GradientCard, Panel, MediaFrame, MetricCard, SectionHeading,
  Tabs, Accordion, Stepper.
- **Data** — Table, Pagination, `Checklist`, `ProgressList`.
- **Feedback / Overlays** — Alert, EmptyState, Placeholder, Toast · Modal, Drawer,
  Menu, Tooltip.
- **Charts (SMIL)** — RadialGauge, SegmentBar, MilestonePath, MiniBars, OrbitField,
  FlowDiagram.
- **Sections** — Hero, HeroSlider, TabsSlider, FeatureGrid, StatStrip, CtaBanner, Faq
  (accordion), Steps, Spotlight, SiteHeader, SiteFooter, and tokenomics domain panels.
- **Templates** — SiteShell, DashboardShell, AuthShell.

Every component reads colour / spacing / type through token classes, so a brand or
light/dark switch restyles all of it with no re-render.

## Assets

The kit is brand-agnostic and ships no binary assets. Bring your own and feed them in
via props — `<Image src=… />`, `<Video src=… poster=… />`, `<HeroSlider slides=[…] />`.
Drop project images/videos under the consuming app's `public/` and reference them by
URL. Missing or failed sources degrade gracefully to the animated `Placeholder`.

## Develop

```bash
pnpm install
pnpm dev          # boots the catalog at /sample (try #/sliders, #/media)
pnpm typecheck
pnpm build        # builds the library then the catalog
```

## Consume the kit

```tsx
import { ThemeProvider, Button } from "@tpl/ui";
import "@tpl/ui/styles/globals.css";

// tailwind.config.ts → presets: [require("@tpl/ui/preset").default]

<ThemeProvider defaultScheme="dark">
  <Button variant="gradient">Get started</Button>
</ThemeProvider>;
```

Switch theme/brand by flipping `data-theme` / `data-brand` on `<html>` — no
re-render. Add a brand with `defineTheme` (override token values only);
`validateTheme` guards that all required keys are present.
