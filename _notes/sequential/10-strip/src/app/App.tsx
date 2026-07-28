import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = ["Small Cliffs", "Golden Pets", "Savva"];
// Enough repetitions that the strip stays populated throughout the full scroll
const ITEMS = Array.from({ length: 10 }, () => PARTNERS).flat(); // 30 items

export default function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hoveredSet = useRef<Set<number>>(new Set());
  const rafRef = useRef<number>(0);

  const updateOpacities = () => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const halfWidth = containerRect.width * 0.46;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      if (hoveredSet.current.has(i)) return;
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - centerX);
      const t = Math.min(dist / halfWidth, 1);
      // Quadratic ease: center = 1, edge = 0.12
      const opacity = 0.12 + 0.88 * Math.pow(1 - t, 1.8);
      gsap.set(item, { opacity });
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 1:1 scroll — no smoothing, exact scrub
    gsap.to(track, {
      x: "-25%",
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: true, // true = no lag, exact 1:1 with scroll
        onUpdate: () => {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(updateOpacities);
        },
      },
    });

    // First pass once layout settles
    const tid = setTimeout(updateOpacities, 80);

    return () => {
      clearTimeout(tid);
      cancelAnimationFrame(rafRef.current);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseEnter = (i: number) => {
    hoveredSet.current.add(i);
    const el = itemRefs.current[i];
    if (el) gsap.to(el, { opacity: 1, duration: 0.22, ease: "power2.out", overwrite: true });
  };

  const handleMouseLeave = (i: number) => {
    hoveredSet.current.delete(i);
    // recalc position-based opacity for this item
    const container = containerRef.current;
    const item = itemRefs.current[i];
    if (!container || !item) return;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const halfWidth = containerRect.width * 0.46;
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const dist = Math.abs(itemCenter - centerX);
    const t = Math.min(dist / halfWidth, 1);
    const opacity = 0.12 + 0.88 * Math.pow(1 - t, 1.8);
    gsap.to(item, { opacity, duration: 0.3, ease: "power2.out", overwrite: true });
  };

  return (
    <div style={{ backgroundColor: "#f7f8f9" }}>
      {/* Section before */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "rgba(0,0,0,0.15)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          Section before
        </p>
      </section>

      {/* Partners strip */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          paddingTop: "26px",
          paddingBottom: "26px",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            willChange: "transform",
          }}
        >
          {ITEMS.map((name, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span
                ref={(el) => { itemRefs.current[i] = el; }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontSize: "16px",
                  color: "#1b1f28",
                  opacity: 0.12,
                  paddingLeft: "44px",
                  paddingRight: "44px",
                  whiteSpace: "nowrap",
                  cursor: "default",
                  userSelect: "none",
                  display: "block",
                }}
              >
                {name}
              </span>
              {/* dot separator */}
              <span
                style={{
                  display: "block",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(27,31,40,0.1)",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section after */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "rgba(0,0,0,0.15)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          Section after
        </p>
      </section>
    </div>
  );
}
