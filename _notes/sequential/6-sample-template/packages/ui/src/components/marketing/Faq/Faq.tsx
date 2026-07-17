import { cn } from "../../../utils/cn";
import { Accordion, type AccordionItem } from "../../surfaces/Accordion/Accordion";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqProps {
  items: FaqEntry[];
  className?: string;
}

/** FAQ list built on the Accordion composite. */
export function Faq({ items, className }: FaqProps) {
  const entries: AccordionItem[] = items.map((q, i) => ({
    value: `q-${i}`,
    title: q.question,
    content: q.answer,
  }));
  return (
    <div className={cn("mx-auto max-w-3xl", className)}>
      <Accordion items={entries} type="single" />
    </div>
  );
}
