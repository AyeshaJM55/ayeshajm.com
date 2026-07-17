import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know our custom font-size utilities
 * (text-display-2, text-heading, text-body-md, text-label, …). Without this,
 * it treats them as text-COLOR classes and drops a real color like `text-black`
 * when a size class follows it in the same string — leaving the element with an
 * inherited color. Register the sizes in the font-size group so color + size
 * coexist.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-2", "display-1", "heading", "body-lg", "body-md", "body-sm", "label"] },
      ],
    },
  },
});

/** Merge class lists with Tailwind-aware conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
