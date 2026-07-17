// Catalog fixtures. Deterministic mock data only.
// NOTE: only `import type` from the kit is allowed here — fixtures never depend
// on the kit at runtime (components depend on fixtures, never the reverse).
import type { BarSegment, Feature, FlowTarget, MilestonePoint, MiniBar, Stat, Step } from "@tpl/ui";

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited" | "Disabled";
}

export const USERS: UserRow[] = [
  { id: "u1", name: "Ada Lovelace", email: "ada@example.test", role: "Owner", status: "Active" },
  { id: "u2", name: "Alan Turing", email: "alan@example.test", role: "Admin", status: "Active" },
  { id: "u3", name: "Grace Hopper", email: "grace@example.test", role: "Editor", status: "Invited" },
  { id: "u4", name: "Katherine Johnson", email: "katherine@example.test", role: "Viewer", status: "Disabled" },
];

export const FEATURES: Feature[] = [
  { title: "Token-first", description: "Every color, space, and type value is a token that themes can rebind." },
  { title: "Layered", description: "Atoms compose into composites, sections, and page templates — down only." },
  { title: "Themeable", description: "Flip light/dark and brand on the root; no component knows the difference." },
  { title: "Catalog-driven", description: "Every variant and state lives on a sample page like this one." },
  { title: "Accessible", description: "Keyboard, focus rings, and ARIA are built into the primitives." },
  { title: "Animated", description: "Hand-built SMIL SVG visuals instead of heavyweight chart libraries." },
];

export const STATS: Stat[] = [
  { value: "67", label: "Components" },
  { value: "5", label: "Layers" },
  { value: "4", label: "Themes" },
  { value: "100%", label: "Tokenized" },
];

export const FAQ = [
  { question: "How do I theme the kit?", answer: "Wrap your app in ThemeProvider and flip data-theme / data-brand. Components read tokens via classes." },
  { question: "Can I add a brand?", answer: "Yes — call defineTheme extending a base theme and override token values only. validateTheme guards required keys." },
  { question: "How are charts drawn?", answer: "As hand-authored SMIL SVG (RadialGauge, SegmentBar, MilestonePath, MiniBars, OrbitField, FlowDiagram) — no chart dependency." },
];

export const STEPS: Step[] = [
  { title: "Install", description: "Add the package and apply the Tailwind preset + globals.css." },
  { title: "Wrap", description: "Mount <ThemeProvider> at the root of your app." },
  { title: "Compose", description: "Import components from the package root and feed them your data." },
];

export const NAV_LINKS = [
  { label: "Components", href: "#/atoms" },
  { label: "Charts", href: "#/charts" },
  { label: "Sections", href: "#/marketing" },
  { label: "Templates", href: "#/templates" },
];

export const FOOTER_COLUMNS = [
  { title: "Product", links: [{ label: "Overview", href: "#/foundations" }, { label: "Components", href: "#/atoms" }] },
  { title: "Resources", links: [{ label: "Charts", href: "#/charts" }, { label: "Sections", href: "#/marketing" }] },
  { title: "Company", links: [{ label: "About", href: "#/foundations" }, { label: "Contact", href: "#/foundations" }] },
];

// ── Tokenomics demo data (generic SMIL chart inputs) ──────────
export const SUPPLY_SEGMENTS: BarSegment[] = [
  { label: "Rewards portfolio", value: 2, tone: "brand" },
  { label: "Reflections", value: 1, tone: "accent" },
  { label: "Treasury / Dev", value: 1, tone: "muted" },
];

export const SUPPLY_FACTS = [
  { label: "Symbol", value: "DEMO" },
  { label: "Network", value: "Example Chain" },
  { label: "Buy tax", value: "4%" },
  { label: "Sell tax", value: "3%" },
];

export const MILESTONES: MilestonePoint[] = [
  { label: "$500K", value: 2 },
  { label: "$50M", value: 4 },
  { label: "$500M", value: 6 },
  { label: "$1B", value: 8 },
  { label: "$10B", value: 12 },
];

export const ENGINE_TARGETS: FlowTarget[] = [
  { label: "Treasury", value: "2%", note: "Funds rewards", tone: "brand" },
  { label: "Reflections", value: "1%", note: "Back to holders", tone: "accent" },
  { label: "Auto-burn", value: "1%", note: "Removed", tone: "muted" },
  { label: "Buyback", value: "1%", note: "Configurable", tone: "neutral" },
];

export const APR_TIERS: MiniBar[] = [
  { label: "60d", value: 4 },
  { label: "90d", value: 6 },
  { label: "180d", value: 8 },
  { label: "365d", value: 10 },
];

export const PORTFOLIO = ["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "USDT", "USDC", "LINK", "AVAX", "DOT", "ATOM", "NEAR", "OP", "ARB"];
