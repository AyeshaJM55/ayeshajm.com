import { useEffect, useState } from "react";
import { cn } from "../../../utils/cn";
import { useInView } from "../../../hooks/useInView";
import { Image } from "../../media/Image/Image";
import { Corners } from "../../atoms/Corners/Corners";

export interface GridTile {
  key: string;
  src?: string;
  alt?: string;
  label?: string;
}

export interface CarouselToGridProps {
  /** Up to four tiles are used. */
  items: GridTile[];
  /** Rotate step (ms) before the block scrolls into view. */
  interval?: number;
  corners?: boolean;
  className?: string;
}

/** Stagger delays so tiles cascade into the grid. */
const DELAY = ["delay-0", "delay-100", "delay-200", "delay-300"] as const;

/**
 * A single rotating tile (carousel) that blossoms into a 2×2 grid once it
 * scrolls into view. Pure CSS transitions — no animation dependency.
 */
export function CarouselToGrid({ items, interval = 2200, corners = true, className }: CarouselToGridProps) {
  const tiles = items.slice(0, 4);
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (inView || interval <= 0 || tiles.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % tiles.length), interval);
    return () => clearInterval(id);
  }, [inView, interval, tiles.length]);

  return (
    <div ref={ref} className={cn("relative mx-auto grid w-full max-w-md grid-cols-2 gap-3", className)}>
      {corners && <Corners size="lg" inset="out" />}
      {tiles.map((t, i) => {
        const visible = inView || i === active;
        return (
          <div
            key={t.key}
            className={cn(
              "relative transition-all duration-slow ease-out",
              DELAY[i],
              inView ? "col-auto row-auto" : i === active ? "col-span-2 row-span-2" : "hidden",
              visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
            )}
          >
            <Image
              src={t.src}
              alt={t.alt ?? ""}
              ratio="square"
              overlay={t.label ? "bottom" : "none"}
            />
            {t.label && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 truncate p-3 text-body-sm font-medium text-white">
                {t.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
