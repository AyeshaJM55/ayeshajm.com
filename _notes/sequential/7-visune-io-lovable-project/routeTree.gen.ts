import { motion } from "framer-motion";
import { ArrowRight, Lock, Cloud, Download } from "lucide-react";
import { brandLogos, bringToLifeCards, featured, goto, buildYourImage, whyChoose, CDN } from "./data";
import heroAsset from "@/assets/hero5.jpg.asset.json";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- HERO ---------- */
export function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroAsset.url}')` }}
      >
        <div className="flex min-h-[520px] items-center p-8 text-white sm:p-12 lg:min-h-[640px] lg:p-16">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Photorealistic <br />3D Product Visualization
            </h1>
            <p className="mt-5 max-w-md text-sm text-white/85 sm:text-base">
              Premium renders and animations for brands and e-commerce.
            </p>
            <a
              href="#book-a-call"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d2ff3a] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c4f52c]"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


/* ---------- LOGOS ---------- */
export function LogosStrip() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
      <Reveal>
        <h2 className="mx-auto max-w-3xl text-center text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          Join thousands of designers and <br className="hidden sm:block" />
          accelerate your visualisation workflow
        </h2>
      </Reveal>
      <div className="mt-10 overflow-hidden">
        <motion.div
          className="flex items-center gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...brandLogos, ...brandLogos].map((b, i) => (
            <img
              key={i}
              src={b.src}
              alt={b.name}
              className="h-8 w-auto flex-shrink-0 object-contain opacity-70 grayscale sm:h-10"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- BRING TO LIFE ---------- */
export function BringToLife() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Bring your designs to life</h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">Create market-ready product renders in minutes, not hours</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bringToLifeCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <motion.a
              href="#"
              whileHover={{ y: -6 }}
              className="group block overflow-hidden rounded-2xl bg-neutral-100"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 p-4 backdrop-blur">
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600">{c.body}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-black">
                    {c.cta} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- SUBSCRIBE ---------- */
export function SubscribeAndSave() {
  const items = [
    { icon: Download, title: "Up to 59% Discount for Individuals", body: "Save big with our offering of individual plans and get Units deposited into your account each month." },
    { icon: Lock, title: "Subscription Exclusives", body: "Get access to the highest quality resources, hand-picked by our team of artists specifically for subscribers." },
    { icon: Cloud, title: "Live Chat Support", body: "Have an issue? Keep your projects moving forward with live chat support delivered by our team of 3D artists." },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white sm:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neutral-800/60 blur-2xl" />
        <div className="relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Subscribe and Save</h2>
            <a href="#" className="inline-flex items-center gap-1 rounded-full border border-white/20 px-5 py-2 text-sm font-medium hover:bg-white/10 transition">
              Learn More <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08}>
                <it.icon className="h-8 w-8 text-white/80" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-white/70">{it.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURED GRID ---------- */
export function Featured() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Featured resources</h2>
        <p className="mt-2 text-sm text-neutral-600">Our new and most popular resources</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.slice(0, 8).map((p, i) => (
          <Reveal key={p.title + i} delay={i * 0.03}>
            <ProductCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: { title: string; tag?: string; price: string; oldPrice?: string; img: string } }) {
  return (
    <motion.a href="#" whileHover={{ y: -4 }} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        <div className="aspect-square w-full">
          <img
            src={p.img}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-black/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            {p.tag}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium leading-snug text-neutral-900">{p.title}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-neutral-600">
          <span className="font-semibold text-neutral-900">{p.price} Units</span>
          {p.oldPrice && <span className="text-neutral-400 line-through">{p.oldPrice} Units</span>}
        </div>
      </div>
    </motion.a>
  );
}

/* ---------- SYNC / COMPANION APP ---------- */
export function SyncSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-neutral-50 p-6 sm:p-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Sync straight to <br /> KeyShot and Blender
          </h2>
          <p className="mt-4 max-w-md text-sm text-neutral-600 sm:text-base">
            Install our companion app and put your Visune purchases right into KeyShot and Blender's UI, ready for drag-and-drop deployment into your scenes.
          </p>
          <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition">
            Download now <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={`${CDN}/Companion_App_Drop_Shadow_26653b58-1fe1-49b9-b2ad-d451cd399f58.jpg?v=1779349603&width=1200`}
            alt="Companion app"
            className="w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
export function Testimonials() {
  const quotes = [
    { name: "James Melia", role: "Creative Director, Blond", quote: "Visune's assets allow the team to contextualise their designs with ease and efficiency. We would highly recommend to freelance industrial designers, studios and art directors working in Keyshot." },
    { name: "Mark Reilly", role: "Co-founder, Beta Design Office", quote: "Visune library of resources has been extremely valuable to our process at beta. It saves time and cost which allows us to work more efficiently and to a higher standard." },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Supporting 10,000+ designers</h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.08}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-base font-semibold">{q.name}</h3>
              <p className="mt-1 text-xs text-neutral-500">{q.role}</p>
              <p className="mt-4 text-sm italic text-neutral-700">"{q.quote}"</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.24}>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <img
              src={`${CDN}/Visune_-_Loft_Diorama_INT152__Objects_Thumbnail_Promo_3ac8398f-0aab-47f4-a7d0-0ab4ff488315.jpg?v=1775753152&width=800`}
              alt="Interior"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- BLENDER PROMO ---------- */
export function BlenderPromo() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="relative h-full overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white sm:p-10">
            <h3 className="max-w-md text-2xl font-semibold sm:text-3xl">120+ Professional Blender Resources</h3>
            <p className="mt-4 max-w-md text-sm text-white/70">
              Our collection of Blender-compatible resources is growing fast. From eye-catching studio scenes and photo-realistic interiors to posed hands and plant decorations, we have everything you need to bring your designs to life.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition">
              Shop Blender Resources <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-2" delay={0.1}>
          <img
            src={`${CDN}/Visune_Blender_Intro.jpg?v=1737983394&width=800`}
            alt="Blender"
            className="h-full w-full rounded-3xl object-cover"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- GO-TO RESOURCES ---------- */
export function GoToResources() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Go-to Resources</h2>
        <p className="mt-2 text-sm text-neutral-600">Our top picks for industrial, furniture and automotive design</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {goto.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.03}>
            <motion.a href="#" whileHover={{ y: -4 }} className="group block">
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <div className="aspect-square">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                  {p.brand} · {p.cat}
                </div>
                <h3 className="mt-1 text-sm font-medium">{p.title}</h3>
                <div className="mt-1 text-xs font-semibold text-neutral-900">{p.price} Units</div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- INDUSTRIAL DESIGN ESSENTIALS ---------- */
export function IndustrialEssentials() {
  const rows = [
    {
      kicker: "Industrial Design Essentials",
      title: "Industrial Design Material Collection",
      body: "Overhauled for 2026, this bundle contains 120 detailed materials, in both KeyShot and Blender native formats, with accompanying textures for use in any software. This go-to starter library spans five families, delivering materials from moulded plastics and anodized metals to braided cables and neoprene.",
      cta: "Shop now",
      img: `${CDN}/Visune_-_ID_Material_Collection_Thumbnail_V4_Clean.jpg?v=1779830273&width=1600`,
      reverse: false,
    },
    {
      kicker: "Furniture Design Essentials",
      title: "Essential Studio Collection (Gen2)",
      body: "Our Essential Studio Collection is a must-have for industrial and furniture designers using KeyShot. These five scenes have been meticulously crafted by our team of artists, using our best practices from years as a visualisation agency and asset distributor.",
      cta: "Shop now",
      img: `${CDN}/gen2.jpg?v=1775832639&width=1600`,
      reverse: true,
    },
  ];
  return (
    <section className="mx-auto max-w-[1400px] space-y-6 px-4 py-12 sm:px-6 lg:px-10">
      {rows.map((r, i) => (
        <Reveal key={r.title} delay={i * 0.05}>
          <div className={`grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-neutral-900 text-white lg:grid-cols-2 ${r.reverse ? "" : ""}`}>
            <div className={`p-8 sm:p-12 ${r.reverse ? "lg:order-2" : ""}`}>
              <div className="text-xs font-medium uppercase tracking-widest text-white/60">{r.kicker}</div>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{r.title}</h3>
              <p className="mt-4 text-sm text-white/70">{r.body}</p>
              <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition">
                {r.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className={`${r.reverse ? "lg:order-1" : ""} h-[280px] w-full sm:h-[360px]`}>
              <img src={r.img} alt={r.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------- BEFORE / AFTER ---------- */
export function BeforeAfter() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">You bring the design, we bring the rest</h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          { label: "Before", img: `${CDN}/Visune_-_Loft_Diorama_INT152__Build_Your_Scene_Promo_Clay_Before.jpg?v=1776063379&width=1200` },
          { label: "After", img: `${CDN}/Visune_-_Loft_Diorama_INT152__Build_Your_Scene_Promo_After.jpg?v=1776063396&width=1200` },
        ].map((s) => (
          <div key={s.label} className="relative overflow-hidden rounded-3xl">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-medium">{s.label}</span>
            <img src={s.img} alt={s.label} className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- BUILD YOUR IMAGE ---------- */
export function BuildYourImage() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Build your image</h2>
          <p className="mt-2 text-sm text-neutral-600">Mix and match resources to create your final image</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4">
          Shop all resources <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {buildYourImage.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <motion.a href="#" whileHover={{ y: -4 }} className="group block">
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <div className="aspect-square">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
              </div>
              <h3 className="mt-3 text-sm font-medium">{p.title}</h3>
              <div className="mt-1 text-xs font-semibold text-neutral-900">{p.price} Units</div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE ---------- */
export function WhyChoose() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <Reveal className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why choose Visune?</h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {whyChoose.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.05}>
            <div className="overflow-hidden rounded-2xl bg-neutral-100">
              <div className="aspect-[4/3]">
                <img src={w.img} alt={w.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold">{w.title}</h3>
                <p className="mt-2 text-xs text-neutral-600">{w.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
export function FinalCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 items-stretch gap-4 overflow-hidden rounded-3xl bg-neutral-100 lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            We build the foundation.<br /> You create without limits.
          </h2>
          <p className="mt-4 max-w-md text-sm text-neutral-700">
            Be it client communications, portfolio refreshes or social media marketing, Visune resources are there to support you. Join our fast-growing network of designers and create the renders your designs deserve.
          </p>
          <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition">
            Shop the full collection <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="min-h-[280px]">
          <img
            src={`${CDN}/Momnt_FloatingAd_Hasselblad_Camera.jpg?v=1687456193&width=1200`}
            alt="Camera render"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  const cols = [
    { title: "Shop", links: ["Studios", "Interiors", "Materials", "Models", "Elements", "Plants"] },
    { title: "Company", links: ["About", "License", "Contact", "Careers"] },
    { title: "Support", links: ["Help Center", "Tutorials", "Companion App", "Terms", "Privacy"] },
  ];
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-bold text-white lowercase">visune</div>
            <p className="mt-4 max-w-xs text-sm text-neutral-400">
              Visune provides professional 3D assets to support designers with digital product renderings, including interior and studio scenes and drag-and-drop materials.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="mailto:support@visune.io" aria-label="Email" className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/visune" aria-label="Instagram" className="rounded-full border border-white/10 p-2 hover:bg-white/10 transition">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 p-6 sm:p-8">
          <h4 className="text-lg font-semibold text-white">Join our newsletter</h4>
          <p className="mt-1 text-sm text-neutral-400">Be the first to hear about new products and discounts.</p>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@studio.com"
              className="flex-1 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/30 focus:outline-none"
            />
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition">
              Submit
            </button>
          </form>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>Copyright © 2026 Visune.</div>
          <div>All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

// Small icon imports used above
import { Mail, Instagram } from "lucide-react";
