import type { ComponentType } from "react";
import { FoundationsPage } from "./sample/Foundations";
import { AtomsPage } from "./sample/Atoms";
import { FormsPage } from "./sample/Forms";
import { FeedbackPage } from "./sample/Feedback";
import { SurfacesPage } from "./sample/Surfaces";
import { MediaPage } from "./sample/Media";
import { SlidersPage } from "./sample/Sliders";
import { OverlaysPage } from "./sample/Overlays";
import { DataPage } from "./sample/Data";
import { ChartsPage } from "./sample/Charts";
import { MarketingPage } from "./sample/Marketing";
import { NavigationPage } from "./sample/Navigation";
import { DomainPage } from "./sample/Domain";
import { TemplatesPage } from "./sample/Templates";

export interface CatalogEntry {
  id: string;
  title: string;
  group: "Foundations" | "Components" | "Sections" | "Patterns";
  Component: ComponentType;
}

/** Single source of truth for catalog navigation + routing. */
export const REGISTRY: CatalogEntry[] = [
  { id: "foundations", title: "Foundations", group: "Foundations", Component: FoundationsPage },
  { id: "atoms", title: "Atoms", group: "Components", Component: AtomsPage },
  { id: "forms", title: "Forms", group: "Components", Component: FormsPage },
  { id: "feedback", title: "Feedback", group: "Components", Component: FeedbackPage },
  { id: "surfaces", title: "Surfaces", group: "Components", Component: SurfacesPage },
  { id: "media", title: "Media", group: "Components", Component: MediaPage },
  { id: "sliders", title: "Sliders", group: "Components", Component: SlidersPage },
  { id: "overlays", title: "Overlays", group: "Components", Component: OverlaysPage },
  { id: "data", title: "Data", group: "Components", Component: DataPage },
  { id: "charts", title: "Charts", group: "Components", Component: ChartsPage },
  { id: "marketing", title: "Marketing", group: "Sections", Component: MarketingPage },
  { id: "navigation", title: "Navigation", group: "Sections", Component: NavigationPage },
  { id: "domain", title: "Domain", group: "Sections", Component: DomainPage },
  { id: "templates", title: "Templates", group: "Patterns", Component: TemplatesPage },
];
