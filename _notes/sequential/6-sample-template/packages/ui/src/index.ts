// Public barrel — the only contract consumers import from.
// Deep imports (@tpl/ui/src/...) are forbidden.

// Foundation
export * from "./tokens";
export * from "./types";
export { cn } from "./utils/cn";
export { ThemeProvider, useTheme, type ThemeProviderProps } from "./hooks/useTheme";
export { useInView } from "./hooks/useInView";
export { useDisclosure } from "./hooks/useDisclosure";

// Atoms
export * from "./components/atoms/Button";
export * from "./components/atoms/IconButton";
export * from "./components/atoms/Badge";
export * from "./components/atoms/Tag";
export * from "./components/atoms/Avatar";
export * from "./components/atoms/Spinner";
export * from "./components/atoms/ProgressBar";
export * from "./components/atoms/Skeleton";
export * from "./components/atoms/Divider";
export * from "./components/atoms/Link";
export * from "./components/atoms/Label";
export * from "./components/atoms/Kbd";
export * from "./components/atoms/Eyebrow";
export * from "./components/atoms/Heading";
export * from "./components/atoms/Text";
export * from "./components/atoms/Rule";
export * from "./components/atoms/Corners";

// Forms
export * from "./components/forms/TextField";
export * from "./components/forms/Textarea";
export * from "./components/forms/Select";
export * from "./components/forms/Checkbox";
export * from "./components/forms/Switch";
export * from "./components/forms/SearchField";

// Animated icons (SMIL)
export * from "./components/icons/PulseRings";
export * from "./components/icons/SpinDiamond";
export * from "./components/icons/OrbitDot";
export * from "./components/icons/RiseBars";

// Surfaces + composites
export * from "./components/surfaces/Card";
export * from "./components/surfaces/GradientCard";
export * from "./components/surfaces/Panel";
export * from "./components/surfaces/MediaFrame";
export * from "./components/surfaces/MetricCard";
export * from "./components/surfaces/SectionHeading";
export * from "./components/surfaces/Tabs";
export * from "./components/surfaces/Accordion";
export * from "./components/surfaces/Stepper";

// Media
export * from "./components/media/Image";
export * from "./components/media/Video";

// Sliders
export * from "./components/sliders/Carousel";
export * from "./components/sliders/CarouselToGrid";

// Feedback
export * from "./components/feedback/Alert";
export * from "./components/feedback/EmptyState";
export * from "./components/feedback/Placeholder";
export * from "./components/feedback/Toast";

// Overlays
export * from "./components/overlays/Modal";
export * from "./components/overlays/Drawer";
export * from "./components/overlays/Menu";
export * from "./components/overlays/Tooltip";

// Data
export * from "./components/data/Table";
export * from "./components/data/Pagination";
export * from "./components/data/Checklist";
export * from "./components/data/ProgressList";

// SMIL charts
export * from "./components/charts/RadialGauge";
export * from "./components/charts/SegmentBar";
export * from "./components/charts/MilestonePath";
export * from "./components/charts/MiniBars";
export * from "./components/charts/OrbitField";
export * from "./components/charts/FlowDiagram";

// Layout
export * from "./components/layout/Container";
export * from "./components/layout/Section";

// Marketing sections
export * from "./components/marketing/Hero";
export * from "./components/marketing/HeroSlider";
export * from "./components/marketing/TabsSlider";
export * from "./components/marketing/FeatureGrid";
export * from "./components/marketing/StatStrip";
export * from "./components/marketing/CtaBanner";
export * from "./components/marketing/Faq";
export * from "./components/marketing/Steps";
export * from "./components/marketing/Spotlight";

// Navigation sections
export * from "./components/navigation/SiteHeader";
export * from "./components/navigation/SiteFooter";

// Domain (tokenomics) — full SMIL sections
export * from "./components/domain/tokenomics/SupplyPanel";
export * from "./components/domain/tokenomics/MilestonePanel";
export * from "./components/domain/tokenomics/EnginePanel";

// Templates
export * from "./components/templates/SiteShell";
export * from "./components/templates/DashboardShell";
export * from "./components/templates/AuthShell";
