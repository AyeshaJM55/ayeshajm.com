import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Returns a ref + a boolean that flips true once the element scrolls into view.
 * SMIL-animated subtrees gate on this so they begin when reached, not at load.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.3,
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
