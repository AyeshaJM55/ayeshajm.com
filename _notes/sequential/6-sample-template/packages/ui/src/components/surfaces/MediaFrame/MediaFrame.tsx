import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Placeholder } from "../../feedback/Placeholder/Placeholder";

export interface MediaFrameProps {
  src?: string;
  alt?: string;
  kind?: "image" | "video";
  ratio?: "video" | "square" | "wide";
  rounded?: boolean;
  className?: string;
}

const RATIO = { video: "aspect-video", square: "aspect-square", wide: "aspect-[21/9]" } as const;

/** Image/video frame with a fixed ratio that falls back to an animated
 *  Placeholder when no source is supplied or loading fails. */
export function MediaFrame({ src, alt = "", kind = "image", ratio = "video", rounded = true, className }: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;
  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", RATIO[ratio], rounded && "rounded-lg", className)}>
      {show ? (
        kind === "video" ? (
          <video src={src} className="size-full object-cover" muted loop playsInline autoPlay />
        ) : (
          <img src={src} alt={alt} loading="lazy" className="size-full object-cover" onError={() => setFailed(true)} />
        )
      ) : (
        <Placeholder className="absolute inset-0" />
      )}
    </div>
  );
}
