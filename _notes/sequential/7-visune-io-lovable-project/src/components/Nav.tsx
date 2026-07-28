import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Instagram, Menu, ChevronDown, ArrowUp } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-black text-white text-xs">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <a href="mailto:support@visune.io" aria-label="Email" className="opacity-80 hover:opacity-100 transition">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/visune" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <button className="flex items-center gap-1 opacity-90 hover:opacity-100 transition">
            <span>Country/region</span>
            <span className="font-medium">United States (USD $)</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 bg-white/90 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : ""}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <a href="/" className="text-2xl font-bold tracking-tight text-black lowercase">
            visune
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink label="Resources" hasCaret />
            <NavLink label="Pricing" />
            <NavLink label="Companion App" />
            <NavLink label="Tutorials" />
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Search" className="rounded-full p-2 hover:bg-neutral-100 transition">
              <Search className="h-5 w-5" />
            </button>
            <a
              href="#login"
              className="hidden rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-black hover:bg-neutral-50 transition md:inline-block"
            >
              Log in
            </a>
            <a
              href="#signup"
              className="hidden rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition md:inline-block"
            >
              Sign up
            </a>
            <button aria-label="Open menu" className="rounded-full p-2 hover:bg-neutral-100 transition md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function NavLink({ label, hasCaret }: { label: string; hasCaret?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-1 text-sm font-medium text-neutral-900 hover:text-black transition">
      <span>{label}</span>
      {hasCaret && <ChevronDown className="h-3 w-3" />}
    </a>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-neutral-800 transition"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}
