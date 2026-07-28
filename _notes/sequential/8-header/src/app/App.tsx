import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["About", "Services", "Portfolio", "Contact"];

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!header || !inner) return;

    // Scrolled state: shrink inner to pill, apply glass
    ScrollTrigger.create({
      start: "80px top",
      onEnter: () => {
        gsap.to(inner, {
          maxWidth: "860px",
          paddingLeft: "28px",
          paddingRight: "12px",
          paddingTop: "8px",
          paddingBottom: "8px",
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 2px 32px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6) inset",
          border: "1px solid rgba(255,255,255,0.4)",
          duration: 0.45,
          ease: "power2.out",
        });
        gsap.to(header, {
          paddingTop: "12px",
          duration: 0.45,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(inner, {
          maxWidth: "100%",
          paddingLeft: "40px",
          paddingRight: "24px",
          paddingTop: "18px",
          paddingBottom: "18px",
          borderRadius: "0px",
          backgroundColor: "rgba(255,255,255,1)",
          backdropFilter: "blur(0px)",
          boxShadow: "none",
          border: "1px solid transparent",
          duration: 0.45,
          ease: "power2.out",
        });
        gsap.to(header, {
          paddingTop: "0px",
          duration: 0.45,
          ease: "power2.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Raleway',sans-serif]">
      {/* HEADER */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: "0px" }}
      >
        <div
          ref={innerRef}
          className="w-full flex items-center justify-between"
          style={{
            maxWidth: "100%",
            paddingLeft: "40px",
            paddingRight: "24px",
            paddingTop: "18px",
            paddingBottom: "18px",
            borderRadius: "0px",
            backgroundColor: "rgba(255,255,255,1)",
            border: "1px solid transparent",
          }}
        >
          {/* Brand */}
          <span className="text-[20px] font-semibold tracking-wide uppercase text-black whitespace-nowrap">
            Ayesha J.
          </span>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] font-semibold uppercase tracking-[0.08em] text-black hover:opacity-50 transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#"
            className="flex items-center gap-2 bg-black text-white text-[14px] font-semibold uppercase tracking-[0.06em] px-5 py-3 hover:bg-neutral-800 transition-colors duration-200 whitespace-nowrap"
          >
            Book a call
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="rotate-[-45deg]"
            >
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* SCROLL CONTENT */}
      <main>
        {/* Hero section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Creative Portfolio
          </p>
          <h1 className="text-[clamp(48px,8vw,120px)] font-semibold leading-[0.95] tracking-tight text-black uppercase mb-8">
            Ayesha<br />Javid
          </h1>
          <p className="text-[16px] text-neutral-500 max-w-md leading-relaxed">
            Designer & strategist crafting experiences that move people — and products that move markets.
          </p>
          <div className="mt-12 flex items-center gap-2 text-[13px] text-neutral-400 animate-bounce">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M7 12l-4-4M7 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Scroll down
          </div>
        </section>

        {/* About */}
        <section className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6">About</p>
            <h2 className="text-[clamp(32px,5vw,64px)] font-semibold leading-tight tracking-tight text-black mb-8">
              Building with intention,<br />designing with soul.
            </h2>
            <p className="text-[16px] text-neutral-500 leading-relaxed">
              Based in New York, I partner with founders and studios to create brand identities, digital products, and campaigns that feel unmistakably right. Six years, forty-plus projects, zero templates.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl w-full">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-12">Services</p>
            <div className="divide-y divide-neutral-100">
              {["Brand Identity", "UI / UX Design", "Motion & Animation", "Creative Direction", "Web Development"].map((s, i) => (
                <div key={s} className="flex items-center justify-between py-6 group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] text-neutral-300 font-semibold tabular-nums">0{i + 1}</span>
                    <span className="text-[clamp(22px,3vw,36px)] font-semibold text-black tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-300">{s}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-neutral-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">
                    <path d="M2 14L14 2M14 2H6M14 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-600 mb-6">Contact</p>
            <h2 className="text-[clamp(40px,7vw,96px)] font-semibold text-white leading-none tracking-tight uppercase mb-10">
              Let's work<br />together.
            </h2>
            <a
              href="mailto:hello@ayeshaj.com"
              className="inline-flex items-center gap-3 border border-white/20 text-white text-[14px] font-semibold uppercase tracking-[0.08em] px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Book a call
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
