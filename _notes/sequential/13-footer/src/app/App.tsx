import { useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "About", "Services", "Contact"];
const SOCIAL_LINKS = ["Instagram", "LinkedIn", "Behance"];

function GlobalImpact() {
  const stats = [
    {
      value: "4+",
      label: "Years Experience",
      description: "4+ years of delivering high-quality results across diverse industries",
    },
    {
      value: "400+",
      label: "Projects Completed",
      description:
        "Successfully completed 400+ projects, helping brands and sellers present their products with impact and clarity",
    },
    {
      value: "Global",
      label: "Remote Collaboration",
      description:
        "Working remotely with clients across multiple countries, delivering reliable communication and on-time results.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {stats.map((stat) => (
            <div key={stat.value} className="px-8 py-10 lg:px-12 lg:py-12 flex flex-col gap-4">
              <span
                className="text-white text-[56px] lg:text-[64px] font-bold leading-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.value}
              </span>
              <span
                className="text-white text-lg font-semibold leading-snug"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {stat.label}
              </span>
              <p
                className="text-white/70 text-base font-normal leading-relaxed"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const lerpedRef = useRef({ x: -2000, y: -2000 });
  const insideRef = useRef(false);
  const rafRef = useRef<number>();
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_SPACING = 32;
    const MAX_RADIUS = 5.5;
    const INFLUENCE = 160;
    const LERP_FACTOR = 0.12;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const ro = new ResizeObserver(() => {
      ctx.resetTransform();
      resize();
    });
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      lerpedRef.current.x += (mouseRef.current.x - lerpedRef.current.x) * LERP_FACTOR;
      lerpedRef.current.y += (mouseRef.current.y - lerpedRef.current.y) * LERP_FACTOR;

      const mx = lerpedRef.current.x;
      const my = lerpedRef.current.y;

      if (mx > -1500) {
        ctx.fillStyle = "white";
        const cols = Math.ceil(w / DOT_SPACING) + 1;
        const rows = Math.ceil(h / DOT_SPACING) + 1;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * DOT_SPACING;
            const y = r * DOT_SPACING;
            const dist = Math.hypot(x - mx, y - my);
            if (dist >= INFLUENCE) continue;
            const t = 1 - dist / INFLUENCE;
            const radius = MAX_RADIUS * t * t;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onMouseEnter = () => {
    insideRef.current = true;
  };

  const onMouseLeave = () => {
    insideRef.current = false;
    mouseRef.current = { x: -2000, y: -2000 };
  };

  return (
    <footer
      className="relative w-full min-h-[40vh] bg-black overflow-hidden flex flex-col"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* dot field canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* content — mix-blend-mode: difference inverts over white dots */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-7xl mx-auto w-full"
        style={{ mixBlendMode: "difference" }}
      >
        {/* main row */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* left — nav + social */}
          <div className="flex flex-col gap-8">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white text-lg font-medium tracking-wide hover:opacity-70 transition-opacity duration-200 w-fit"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {link}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-white/60 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200 w-fit"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* right — large email CTA */}
          <div className="flex items-start md:items-end md:justify-end flex-1">
            <a
              href="mailto:hello@yourdomain.com"
              className="text-white font-bold leading-none tracking-tight break-all text-[clamp(2rem,5vw,4.5rem)] hover:opacity-80 transition-opacity duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              hello@yourdomain.com
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p
            className="text-white/40 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            © {new Date().getFullYear()} Your Studio. All rights reserved.
          </p>
          <p
            className="text-white/40 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <GlobalImpact />
      <Footer />
    </>
  );
}
