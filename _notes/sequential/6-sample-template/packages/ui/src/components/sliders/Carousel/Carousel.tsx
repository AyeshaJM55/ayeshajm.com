import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { IconButton } from "../../atoms/IconButton/IconButton";

export interface CarouselProps {
  /** One node per slide. */
  items: ReactNode[];
  autoPlay?: boolean;
  /** Autoplay step in ms. */
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  ariaLabel?: string;
  /** Controlled active index. Omit for internal state. */
  index?: number;
  onIndexChange?: (index: number) => void;
  /** Class for the clipping viewport (e.g. rounding). */
  viewportClassName?: string;
  className?: string;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Generic slide carousel: keyboard (Arrow keys), pointer swipe, optional
 * autoplay (paused on hover/focus, disabled under reduced-motion), arrows and
 * dots. Controlled via `index`/`onIndexChange` or self-managed.
 */
export function Carousel({
  items,
  autoPlay = false,
  interval = 5000,
  loop = true,
  showArrows = true,
  showDots = true,
  ariaLabel = "Carousel",
  index,
  onIndexChange,
  viewportClassName,
  className,
}: CarouselProps) {
  const count = items.length;
  const [internal, setInternal] = useState(0);
  const active = index ?? internal;
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const setActive = useCallback(
    (next: number) => {
      const bounded = loop
        ? (next + count) % count
        : Math.max(0, Math.min(next, count - 1));
      if (index === undefined) setInternal(bounded);
      onIndexChange?.(bounded);
    },
    [count, loop, index, onIndexChange],
  );

  const go = useCallback((dir: 1 | -1) => setActive(active + dir), [active, setActive]);

  useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive(active + 1), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, active, count, setActive]);

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
      className={cn("relative outline-none focus-visible:ring-2 focus-visible:ring-brand-500", className)}
    >
      <div
        className={cn("relative overflow-hidden rounded-lg", viewportClassName)}
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-slow ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== active}
              className="w-full shrink-0"
            >
              {item}
            </div>
          ))}
        </div>

        {showArrows && count > 1 && (
          <>
            <IconButton
              label="Previous slide"
              icon={<Chevron dir="left" />}
              variant="solid"
              size="sm"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <IconButton
              label="Next slide"
              icon={<Chevron dir="right" />}
              variant="solid"
              size="sm"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </>
        )}
      </div>

      {showDots && count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-base",
                i === active ? "w-6 bg-brand-500" : "w-2 bg-border-strong hover:bg-fg-muted",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
