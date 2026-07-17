import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Container } from "../../layout/Container/Container";

export interface SliderTab {
  key: string;
  label: string;
  /** Accent phrase appended to the heading while this tab is active. */
  actionText?: string;
  desc?: ReactNode;
  content: ReactNode;
}

export interface TabsSliderProps {
  /** Static heading shown before the per-tab accent text. */
  heading: ReactNode;
  tabs: SliderTab[];
  className?: string;
}

function useMedia(query: string) {
  const [match, setMatch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    setMatch(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatch(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return match;
}

/** Scroll progress through a tall section drives the active tab on desktop. */
function useScrollTabs(count: number, enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const clamped = Math.max(count, 1);
  const segment = useMemo(() => 1 / clamped, [clamped]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      const next = Math.min(Math.floor(scrolled / total / segment), clamped - 1);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, segment, clamped]);

  const scrollTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const bounded = Math.max(0, Math.min(i, clamped - 1));
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      window.scrollTo({ top: el.offsetTop + total * ((bounded + 0.5) / clamped), behavior: "smooth" });
      activeRef.current = bounded;
      setActive(bounded);
    },
    [clamped],
  );

  return { ref, active, setActive, scrollTo };
}

function SpinningCorners() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 size-40 opacity-30">
        <div className="absolute left-6 top-6 size-16 animate-spin rounded-full border-2 border-brand-500 [animation-duration:20s]" />
        <div className="absolute left-12 top-12 size-12 rotate-45 animate-spin border-2 border-fg/40 [animation-duration:15s]" />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 size-40 opacity-30">
        <div className="absolute bottom-6 right-6 size-16 animate-spin rounded-full border-2 border-fg/40 [animation-duration:14s]" />
        <div className="absolute bottom-12 right-12 size-12 rotate-45 animate-spin border-2 border-brand-500 [animation-duration:19s]" />
      </div>
    </>
  );
}

/** Scroll-driven sticky tabbed slider: desktop advances the active tab with scroll
 *  (tabs anchored at top, content in one constant-height flex-1 region so it never
 *  recentres / jumps); mobile stacks every tab. Content per tab injected via props. */
export function TabsSlider({ heading, tabs, className }: TabsSliderProps) {
  const isDesktop = useMedia("(min-width: 48rem)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const enabled = isDesktop && !reduce;
  const { ref, active, setActive, scrollTo } = useScrollTabs(tabs.length, enabled);

  const onTab = (i: number) => (enabled ? scrollTo(i) : setActive(i));
  const minHeight = useMemo(() => `${100 + tabs.length * 100}vh`, [tabs.length]);
  const current = tabs[Math.max(0, Math.min(active, tabs.length - 1))];

  const tabBar = (
    <div className="-mx-1 w-full shrink-0 overflow-x-auto px-1">
      <div
        className="flex min-w-max gap-2 lg:grid lg:w-full lg:min-w-0 lg:gap-3"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onTab(i)}
              aria-current={on}
              className={cn(
                "flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-surface px-4 py-3 font-body capitalize transition-all duration-base lg:w-full",
                on
                  ? "border-b-2 border-brand-500 text-brand-500"
                  : "border border-border-subtle text-fg hover:border-brand-500",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  const headingBlock = (
    <div className="mt-6 flex w-full shrink-0 flex-col items-start">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="m-0 font-display text-display-1 font-semibold capitalize text-fg">{heading}</h2>
        {current.actionText && (
          <span className="font-display text-display-1 font-semibold capitalize text-brand-500">
            {current.actionText}
          </span>
        )}
      </div>
      {current.desc && <p className="m-0 mt-1 w-full text-body-lg text-fg-muted">{current.desc}</p>}
    </div>
  );

  return (
    <section
      ref={ref}
      className={cn("relative border-t border-border bg-app", className)}
      style={{ minHeight: enabled ? minHeight : undefined }}
    >
      <SpinningCorners />
      {isDesktop ? (
        <div className="sticky top-0 z-10 flex h-screen flex-col bg-app">
          <Container className="flex h-full flex-col py-10">
            <div className="relative z-10 flex h-full w-full flex-col">
              {tabBar}
              {headingBlock}
              <div className="mt-8 flex min-h-0 w-full flex-1 items-center justify-center">
                {current.content}
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div className="flex flex-col gap-16 px-5 py-10">
          {tabs.map((t) => (
            <div key={t.key} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className="m-0 font-display text-heading font-semibold capitalize text-fg">{heading}</h2>
                  {t.actionText && (
                    <span className="font-display text-heading font-semibold capitalize text-brand-500">
                      {t.actionText}
                    </span>
                  )}
                </div>
                {t.desc && <p className="m-0 text-body-md text-fg-muted">{t.desc}</p>}
              </div>
              {t.content}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
