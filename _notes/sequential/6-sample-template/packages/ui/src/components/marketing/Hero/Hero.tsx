import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../layout/Container/Container";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { MediaFrame } from "../../surfaces/MediaFrame/MediaFrame";

export interface HeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  mediaSrc?: string;
  layout?: "centered" | "split";
  className?: string;
}

/** Page hero — centered, or split with a media frame. Content via props. */
export function Hero({ eyebrow, title, subtitle, actions, mediaSrc, layout = "centered", className }: HeroProps) {
  const split = layout === "split";
  return (
    <section className={cn("relative overflow-hidden bg-app py-24 md:py-32", className)}>
      <Container>
        <div className={cn(split ? "grid items-center gap-12 lg:grid-cols-2" : "mx-auto max-w-3xl text-center")}>
          <div className={cn("flex flex-col gap-6", !split && "items-center")}>
            {eyebrow && <Eyebrow align={split ? "start" : "center"}>{eyebrow}</Eyebrow>}
            <h1 className="font-display text-display-2 font-semibold text-fg">{title}</h1>
            {subtitle && <p className={cn("text-body-lg text-fg-muted", !split && "max-w-xl")}>{subtitle}</p>}
            {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {split && <MediaFrame src={mediaSrc} ratio="video" />}
        </div>
      </Container>
    </section>
  );
}
