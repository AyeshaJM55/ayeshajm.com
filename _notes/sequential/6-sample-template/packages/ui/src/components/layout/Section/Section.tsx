import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../Container/Container";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../atoms/Heading/Heading";

export interface SectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  bg?: "app" | "surface" | "muted";
  children?: ReactNode;
  className?: string;
}

const BG = { app: "bg-app", surface: "bg-surface", muted: "bg-surface-muted" } as const;

/** Vertical page section with an optional eyebrow + heading + description. */
export function Section({ id, eyebrow, title, description, align = "start", bg = "app", children, className }: SectionProps) {
  const centered = align === "center";
  return (
    <section id={id} className={cn("border-t border-border py-20 md:py-28", BG[bg], className)}>
      <Container>
        {(eyebrow || title || description) && (
          <header className={cn("mb-12 flex flex-col gap-4", centered && "items-center text-center")}>
            {eyebrow && <Eyebrow align={centered ? "center" : "start"}>{eyebrow}</Eyebrow>}
            {title && (
              <Heading level={2} size="display-1" align={align}>
                {title}
              </Heading>
            )}
            {description && <p className="max-w-2xl text-body-lg text-fg-muted">{description}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
