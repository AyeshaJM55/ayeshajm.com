import { useEffect, useState } from "react";
import type { MediaFit, MediaOverlay, MediaPosition, MediaRatio } from "../../../types";
import { cn } from "../../../utils/cn";
import { Placeholder } from "../../feedback/Placeholder/Placeholder";
import { Corners, type CornerTone } from "../../atoms/Corners/Corners";

export interface ImageProps {
  src?: string;
  alt?: string;
  /** Fixed aspect box; `auto` lets the parent set the height. */
  ratio?: MediaRatio;
  fit?: MediaFit;
  position?: MediaPosition;
  overlay?: MediaOverlay;
  rounded?: boolean;
  corners?: boolean;
  cornerTone?: CornerTone;
  /** Animated placeholder while loading (default true). */
  showLoader?: boolean;
  className?: string;
}

const RATIO: Record<MediaRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  auto: "",
};

const FIT: Record<MediaFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
};

const POSITION: Record<MediaPosition, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

const OVERLAY: Record<MediaOverlay, string> = {
  none: "",
  subtle: "bg-black/20",
  medium: "bg-black/40",
  strong: "bg-black/60",
  vignette: "bg-gradient-to-t from-black/70 via-transparent to-black/20",
  bottom: "bg-gradient-to-t from-black/80 to-transparent",
};

/**
 * Image with loading / loaded / error states, object fit + position, an
 * optional scrim overlay, and decorative corners. Falls back to an animated
 * Placeholder while loading or when the source is missing / fails.
 */
export function Image({
  src,
  alt = "",
  ratio = "video",
  fit = "cover",
  position = "center",
  overlay = "none",
  rounded = true,
  corners = false,
  cornerTone = "brand",
  showLoader = true,
  className,
}: ImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(src ? "loading" : "error");

  useEffect(() => {
    setStatus(src ? "loading" : "error");
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-muted",
        RATIO[ratio],
        rounded && "rounded-lg",
        className,
      )}
    >
      {src && status !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "size-full transition-opacity duration-base",
            FIT[fit],
            POSITION[position],
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {showLoader && status === "loading" && (
        <Placeholder className="absolute inset-0 rounded-none border-0" />
      )}
      {status === "error" && (
        <Placeholder label="Image" className="absolute inset-0 rounded-none border-0" />
      )}

      {overlay !== "none" && status === "loaded" && (
        <div className={cn("pointer-events-none absolute inset-0", OVERLAY[overlay])} />
      )}
      {corners && status === "loaded" && <Corners tone={cornerTone} />}
    </div>
  );
}
