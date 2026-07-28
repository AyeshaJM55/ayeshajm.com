import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/imports/Header/5fbb303b846b41a1c7815122b340d47c539ad4dc.png";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["About", "Services", "Portfolio", "Contact"];

function HamburgerIcon() {
  return (
    <div className="flex flex-col gap-[5px] cursor-pointer">
      <span className="block w-[32px] h-[3px] bg-black" />
      <span className="block w-[32px] h-[3px] bg-black" />
      <span className="block w-[32px] h-[3px] bg-black" />
    </div>
  );
}

function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!header || !inner) return;

    ScrollTrigger.create({
      start: "80px top",
      onEnter: () => {
        gsap.to(inner, {
          maxWidth: "880px",
          paddingLeft: "28px",
          paddingRight: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
          borderRadius: "9999px",
          backgroundColor: "rgba(247,248,249,0.6)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 2px 32px 0 rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.7) inset",
          border: "1px solid rgba(255,255,255,0.45)",
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(header, { paddingTop: "14px", duration: 0.5, ease: "power2.out" });
      },
      onLeaveBack: () => {
        gsap.to(inner, {
          maxWidth: "100%",
          paddingLeft: "76px",
          paddingRight: "60px",
          paddingTop: "22px",
          paddingBottom: "22px",
          borderRadius: "0px",
          backgroundColor: "rgba(247,248,249,1)",
          backdropFilter: "blur(0px)",
          boxShadow: "none",
          border: "1px solid transparent",
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(header, { paddingTop: "0px", duration: 0.5, ease: "power2.out" });
      },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
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
          paddingLeft: "76px",
          paddingRight: "60px",
          paddingTop: "22px",
          paddingBottom: "22px",
          borderRadius: "0px",
          backgroundColor: "rgba(247,248,249,1)",
          border: "1px solid transparent",
        }}
      >
        {/* Brand */}
        <span
          className="text-[20px] uppercase tracking-wide text-black whitespace-nowrap"
          style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
        >
          Ayesha J.
        </span>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[16px] uppercase tracking-wide text-black hover:opacity-40 transition-opacity duration-200"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hidden sm:flex items-center bg-black text-white px-5 py-3 text-[16px] uppercase tracking-wide hover:bg-neutral-800 transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600 }}
          >
            Book a call
          </a>
          <HamburgerIcon />
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#f7f8f9", fontFamily: "'Raleway', sans-serif" }}
    >
      <Header />

      {/* HERO */}
      <section
        className="relative min-h-screen overflow-hidden flex items-stretch"
        style={{ paddingTop: "98px" }}
      >
        {/* Left: text content */}
        <div className="relative z-10 flex flex-col justify-end pb-[72px] pl-[76px] pr-8 w-full lg:w-[55%]">
          {/* Heading */}
          <h1
            className="text-black leading-tight mb-8"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(38px, 4.2vw, 60px)",
              maxWidth: "651px",
            }}
          >
            3D Product Experiences for Brands &amp; E-Commerce
          </h1>

          {/* Subtext */}
          <p
            className="leading-snug mb-10"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(18px, 1.8vw, 26px)",
              color: "#0b2131",
              maxWidth: "560px",
            }}
          >
            Realistic visuals &amp; interactive 3D experiences that enhance your
            brand&apos;s online presence and drive customer trust.
          </p>

          {/* Divider */}
          <div
            className="mb-6"
            style={{ width: "140px", height: "1.5px", backgroundColor: "#0b2131" }}
          />

          {/* CTA */}
          <div>
            <a
              href="#"
              className="inline-flex items-center bg-black text-white hover:bg-neutral-800 transition-colors duration-200"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 400,
                fontSize: "22px",
                height: "68px",
                paddingLeft: "28px",
                paddingRight: "28px",
                width: "259px",
                justifyContent: "center",
              }}
            >
              View Portfolio
            </a>
          </div>
        </div>

        {/* Right: hero image oval */}
        <div className="hidden lg:flex items-center justify-center flex-1 pr-8 py-8">
          <div
            className="relative overflow-hidden"
            style={{
              width: "min(752px, 46vw)",
              height: "min(746px, 72vh)",
              borderRadius: "401.5px",
              flexShrink: 0,
            }}
          >
            <img
              src={heroImage}
              alt="3D product render"
              className="absolute max-w-none"
              style={{
                width: "215.82%",
                height: "122.31%",
                left: "-109.27%",
                top: "-7.6%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
