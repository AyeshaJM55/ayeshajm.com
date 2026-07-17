import { useEffect, useRef, useState } from "react";
import type { MediaFit, MediaOverlay, MediaPosition, MediaRatio } from "../../../types";
import { cn } from "../../../utils/cn";
import { Placeholder } from "../../feedback/Placeholder/Placeholder";
import { Corners, type CornerTone } from "../../atoms/Corners/Corners";

export interface VideoProps {
  src?: string;
  poster?: string;
  ratio?: MediaRatio;
  fit?: MediaFit;
  position?: MediaPosition;
  overlay?: MediaOverlay;
  rounded?: boolean;
  corners?: boolean;
  cornerTone?: CornerTone;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Native browser controls. When false you may opt into `volumeToggle`. */
  controls?: boolean;
  /** Floating mute/unmute button (ignored when `controls` is on). */
  volumeToggle?: boolean;
  /** Playback rate; 1 = normal. */
  speed?: number;
  onReady?: () => void;
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

function SpeakerOn() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4z" strokeLinejoin="round" />
      <path d="M19 5a10 10 0 0 1 0 14M16 8a5 5 0 0 1 0 8" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4z" strokeLinejoin="round" />
      <path d="m17 9 6 6M23 9l-6 6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Autoplaying (muted, looping) background/feature video with a loading
 * Placeholder, object fit + position, optional scrim overlay, decorative
 * corners, and an optional mute toggle.
 */
export function Video({
  src,
  poster,
  ratio = "video",
  fit = "cover",
  position = "center",
  overlay = "none",
  rounded = true,
  corners = false,
  cornerTone = "brand",
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  volumeToggle = false,
  speed = 1,
  onReady,
  className,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);

  useEffect(() => {
    setReady(false);
  }, [src]);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = speed;
  }, [speed, ready]);

  const handleReady = () => {
    setReady(true);
    if (ref.current) ref.current.playbackRate = speed;
    onReady?.();
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-muted",
        RATIO[ratio],
        rounded && "rounded-lg",
        className,
      )}
    >
      {!ready && <Placeholder className="absolute inset-0 rounded-none border-0" />}

      {src ? (
        <video
          ref={ref}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controls={controls}
          preload="metadata"
          onCanPlay={handleReady}
          className={cn(
            "size-full transition-opacity duration-base",
            FIT[fit],
            POSITION[position],
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={src} />
        </video>
      ) : (
        <Placeholder label="Video" className="absolute inset-0 rounded-none border-0" />
      )}

      {overlay !== "none" && ready && (
        <div className={cn("pointer-events-none absolute inset-0", OVERLAY[overlay])} />
      )}
      {corners && ready && <Corners tone={cornerTone} />}

      {volumeToggle && src && ready && !controls && (
        <button
          type="button"
          onClick={toggle}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur transition-colors duration-fast hover:border-brand-500 hover:text-brand-400"
        >
          {isMuted ? <SpeakerOff /> : <SpeakerOn />}
        </button>
      )}
    </div>
  );
}
