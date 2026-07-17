import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Carousel } from "../../sliders/Carousel/Carousel";
import { Image } from "../../media/Image/Image";
import { Video } from "../../media/Video/Video";
import { Container } from "../../layout/Container/Container";

export interface HeroSlide {
  key: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** CTA buttons / links. */
  actions?: ReactNode;
  mediaSrc?: string;
  mediaKind?: "image" | "video";
  align?: "start" | "center";
}

export interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * Full-bleed, auto-advancing hero carousel. Each slide layers copy + CTAs over
 * a darkened image or video. Built on the generic Carousel (arrows / dots /
 * keyboard / swipe inherited).
 */
export function HeroSlider({ slides, autoPlay = true, interval = 6000, className }: HeroSliderProps) {
  const items = slides.map((s) => {
    const centered = (s.align ?? "center") === "center";
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0">
          {s.mediaKind === "video" ? (
            <Video src={s.mediaSrc} ratio="auto" overlay="strong" rounded={false} className="size-full" />
          ) : (
            <Image src={s.mediaSrc} ratio="auto" overlay="strong" rounded={false} className="size-full" />
          )}
        </div>
        <Container className="relative flex h-full flex-col justify-center">
          <div className={cn("flex max-w-2xl flex-col gap-5", centered && "mx-auto items-center text-center")}>
            {s.eyebrow && (
              <span className="font-body text-label font-medium uppercase tracking-widest text-white/80">
                {s.eyebrow}
              </span>
            )}
            <h2 className="font-display text-display-2 font-semibold text-white">{s.title}</h2>
            {s.subtitle && <p className="text-body-lg text-white/85">{s.subtitle}</p>}
            {s.actions && (
              <div className={cn("mt-2 flex flex-wrap gap-3", centered && "justify-center")}>{s.actions}</div>
            )}
          </div>
        </Container>
      </div>
    );
  });

  return (
    <Carousel
      items={items}
      autoPlay={autoPlay}
      interval={interval}
      ariaLabel="Featured highlights"
      viewportClassName="rounded-lg"
      className={cn("overflow-hidden", className)}
    />
  );
}
