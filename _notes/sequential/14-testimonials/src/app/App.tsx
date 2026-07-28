import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgAvatar from "@/imports/Testimonials/2ee7b3e73841c663b39356e69a1b8b2baa572e24.png";

// ─── Shared font helpers ──────────────────────────────────────────────────────
const raleway = { fontFamily: "'Raleway', sans-serif" } as const;
const inter = { fontFamily: "'Inter', sans-serif" } as const;

// ─── GlobalImpact ─────────────────────────────────────────────────────────────

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

function GlobalImpact() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {stats.map((stat) => (
            <div key={stat.value} className="px-8 py-10 lg:px-12 lg:py-12 flex flex-col gap-4">
              <span className="text-white text-[56px] lg:text-[64px] font-bold leading-none" style={inter}>
                {stat.value}
              </span>
              <span className="text-white text-lg font-semibold leading-snug" style={raleway}>
                {stat.label}
              </span>
              <p className="text-white/70 text-base font-normal leading-relaxed" style={raleway}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    quote:
      "I hired Ayesha for 3D assets with animation for my personal design agency, and she delivered an outstanding job. Her work was creative, detailed, and aligned perfectly with the vision I had in mind. She was professional, easy to work with, and met all expectations with great attention to quality. I would highly recommend her to anyone looking for reliable and high-quality 3D asset development.",
    name: "Small Cliffs",
    role: "Design Agency",
    avatar: imgAvatar as string,
  },
  {
    id: 2,
    quote:
      "Working with this studio was a seamless experience from start to finish. The 3D product renders exceeded anything we had imagined, and our launch campaign received incredible feedback from customers.",
    name: "Marcus Reid",
    role: "E-commerce Brand",
    avatar: imgAvatar as string,
  },
  {
    id: 3,
    quote:
      "Exceptional quality and quick turnaround. The visualizations brought our Kickstarter campaign to life and we exceeded our funding goal by 200%. I would not hesitate to work together again.",
    name: "Priya Sharma",
    role: "Product Startup",
    avatar: imgAvatar as string,
  },
  {
    id: 4,
    quote:
      "Professional, creative, and incredibly detail-oriented. Every asset exceeded our expectations and the whole process was smooth and collaborative. Highly recommended to any brand looking for top-tier 3D work.",
    name: "Tom Nakamura",
    role: "Creative Director",
    avatar: imgAvatar as string,
  },
  {
    id: 5,
    quote:
      "Outstanding visual storytelling. The 3D work transformed our product pages and directly improved conversion rates. A true professional who understands both design and business impact.",
    name: "Sofia Bianchi",
    role: "Marketing Studio",
    avatar: imgAvatar as string,
  },
];

// Stack config
const OFFSET = 20; // px each back card peeks upward
const SCALE_STEP = 0.03;
const MAX_VISIBLE = 4;
const STACK_PEEK = (MAX_VISIBLE - 1) * OFFSET; // top padding needed for overflowing back cards

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          className="text-center text-[#2c3847] font-semibold text-[40px] sm:text-[52px] lg:text-[60px] leading-tight mb-14"
          style={raleway}
        >
          Trusted by Clients
        </h2>

        {/* Stack wrapper — arrows are absolute, centered vertically on the card */}
        <div className="relative flex justify-center">
          {/* Card stack — 70vw */}
          <div className="w-full min-w-0" style={{ maxWidth: "70vw", paddingTop: STACK_PEEK }}>
            {/*
              Grid trick: all cards share the same cell so the front card's
              content sets the container height. Cards overflow upward into paddingTop.
            */}
            <div style={{ display: "grid" }}>
              {testimonials.map((t, i) => {
                const relIdx = (i - current + total) % total;
                const hidden = relIdx >= MAX_VISIBLE;
                const isFront = relIdx === 0;

                return (
                  <motion.div
                    key={t.id}
                    style={{
                      gridRow: 1,
                      gridColumn: 1,
                      transformOrigin: "bottom center",
                      pointerEvents: isFront ? "auto" : "none",
                    }}
                    animate={{
                      y: -(relIdx * OFFSET),
                      scale: 1 - relIdx * SCALE_STEP,
                      opacity: hidden ? 0 : relIdx === MAX_VISIBLE - 1 ? 0.35 : 1,
                      zIndex: MAX_VISIBLE - relIdx,
                      filter: `brightness(${1 - relIdx * 0.13})`,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(46,33,61,0.08)] p-8 lg:p-10"
                  >
                    {/* Opening quote */}
                    <div
                      className="text-[#2c3847] text-[72px] leading-none select-none -mb-2"
                      style={raleway}
                      aria-hidden
                    >
                      "
                    </div>

                    {/* Quote body */}
                    <p
                      className="text-[#454545] text-[17px] sm:text-[19px] leading-[1.75] italic mt-1 mb-8"
                      style={raleway}
                    >
                      {t.quote}
                    </p>

                    {/* Attribution */}
                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 bg-[#ececf0]"
                      />
                      <div>
                        <p
                          className="text-[#171c2c] text-[16px] font-semibold leading-tight"
                          style={raleway}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-[#9598a0] text-[14px] font-medium leading-tight mt-0.5"
                          style={raleway}
                        >
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Prev — absolute, vertically centered on the card area */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[#2c3847]/30 flex items-center justify-center text-[#2c3847] hover:border-[#2c3847] hover:bg-[#2c3847] hover:text-white transition-all duration-200 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next — absolute, vertically centered on the card area */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#2c3847] border border-[#2c3847] flex items-center justify-center text-white hover:opacity-75 transition-all duration-200 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot pagination — below the stack */}
        <div className="flex items-center justify-center gap-[10px] mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-[10px] rounded-full transition-all duration-300 ${
                i === current ? "bg-[#2c3847] w-8" : "bg-[#c2c2c2] w-[10px]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Work", "About", "Services", "Contact"];
const SOCIAL_LINKS = ["Instagram", "LinkedIn", "Behance"];

function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const lerpedRef = useRef({ x: -2000, y: -2000 });
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

  return (
    <footer
      className="relative w-full min-h-[40vh] bg-black overflow-hidden flex flex-col"
      onMouseMove={(e) => {
        if (reducedMotion.current) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: -2000, y: -2000 };
      }}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />
      <div
        className="relative z-10 flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-7xl mx-auto w-full"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-8">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white text-lg font-medium tracking-wide hover:opacity-70 transition-opacity duration-200 w-fit"
                  style={raleway}
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
                  style={raleway}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-start md:items-end md:justify-end flex-1">
            <a
              href="mailto:hello@yourdomain.com"
              className="text-white font-bold leading-none tracking-tight break-all hover:opacity-80 transition-opacity duration-300"
              style={{ ...inter, fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              hello@yourdomain.com
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/40 text-xs tracking-widest uppercase" style={raleway}>
            © {new Date().getFullYear()} Your Studio. All rights reserved.
          </p>
          <p className="text-white/40 text-xs tracking-widest uppercase" style={raleway}>
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <GlobalImpact />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
