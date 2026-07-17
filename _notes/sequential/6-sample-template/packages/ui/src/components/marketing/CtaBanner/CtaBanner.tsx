import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../layout/Container/Container";

export interface CtaBannerProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/** Full-width call-to-action band on a brand gradient. */
export function CtaBanner({ title, description, actions, className }: CtaBannerProps) {
  return (
    <section className={cn("bg-app py-20", className)}>
      <Container>
        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-10 text-center md:p-14">
          <h2 className="font-display text-display-1 font-semibold text-brand-foreground">{title}</h2>
          {description && <p className="mx-auto mt-4 max-w-xl text-body-lg text-brand-foreground/80">{description}</p>}
          {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}
