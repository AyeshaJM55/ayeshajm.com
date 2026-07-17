/** Shared prop unions reused across components. */

export type Size = "sm" | "md" | "lg";
export type Tone = "brand" | "neutral" | "success" | "warning" | "danger" | "info";
export type Orientation = "horizontal" | "vertical";

/** Media (Image / Video) shared unions. */
export type MediaRatio = "video" | "square" | "wide" | "portrait" | "auto";
export type MediaFit = "cover" | "contain" | "fill";
export type MediaPosition = "center" | "top" | "bottom" | "left" | "right";
export type MediaOverlay = "none" | "subtle" | "medium" | "strong" | "vignette" | "bottom";
