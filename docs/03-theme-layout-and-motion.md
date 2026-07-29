# Theme, Layout, and Motion

## Visual direction

The site uses a restrained editorial portfolio style:

- White and near-white surfaces.
- Black primary typography and controls.
- Large display headings with tight negative tracking.
- Thin black borders with low opacity.
- Spacious vertical rhythm.
- Product imagery generally shown with `object-contain` on white.
- Black sections used as deliberate high-contrast anchors.
- Rounded pills primarily for navigation, filters, and selected CTAs.
- Square and rectangular content blocks remain mostly unrounded.

Avoid introducing colorful gradients, generic SaaS cards, heavy rounded containers, or unrelated visual motifs. They will look like an accidental template collision, because that is what they are.

## Theme tokens

Primary tokens live in `src/theme/tokens.css`.

Important variables include:

```css
--theme-canvas: #ffffff;
--theme-foreground: #111827;
--theme-primary: #2563eb;
--theme-radius: 0.75rem;
--hero-surface: #f7f8f9;
--hero-ink: #0b2131;
--footer-surface: #000000;
--footer-ink: #ffffff;
```

Tailwind theme aliases include:

- `bg-canvas`
- `text-foreground`
- `bg-hero-surface`
- `text-hero-ink`
- `bg-site-footer`
- `text-site-footer-ink`
- `bg-featured-footer`
- Testimonial-specific colors

Use existing semantic classes whenever possible. Add a token when a visual value is intended for repeated design use.

## Global stylesheet responsibilities

`src/index.css` currently contains:

- Tailwind imports.
- Theme-token import.
- Root/body sizing.
- Scrollbar styling.
- The custom first-load snowball animation.
- The standard route spinner animation.

Do not place page-specific layouts in `src/index.css`. Page styling belongs in Tailwind classes or a component-local stylesheet such as the existing Swiper and testimonial CSS files.

## Container convention

Most full-width content sections use:

```jsx
<div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
```

Use this established container instead of creating slightly different widths for every new section.

Narrow editorial content may use `max-w-[1200px]`, `max-w-3xl`, or another deliberate reading width inside the main container.

## Vertical spacing convention

Common section spacing:

```text
py-16 sm:py-20 lg:py-24
py-20 sm:py-24 lg:py-28
py-20 sm:py-24 lg:py-32
```

New major sections should generally follow one of these rhythms. Avoid arbitrary top and bottom values unless the design has a real reason.

## Typography

### Large page title

Typical style:

```text
text-[clamp(3.25rem,8vw,8.5rem)]
font-semibold
leading-[0.9]
tracking-[-0.065em]
```

### Section title

Typical `SectionHeader` style:

```text
text-4xl sm:text-5xl lg:text-6xl
font-semibold
tracking-[-0.045em]
```

### Eyebrow

```text
text-xs
font-semibold
uppercase
tracking-[0.16em]
text-black/40 or text-black/45
```

### Body copy

Common body copy uses:

```text
text-base or text-lg
leading-7, leading-8, or leading-9
text-black/55 to text-black/65
```

Do not use fully black body copy everywhere. The hierarchy relies on opacity differences.

## Borders and surfaces

Common borders:

- `border-black/15`
- `border-black/20`
- `border-black/25`
- `border-white/15`
- `border-white/25`

Common surfaces:

- `bg-white`
- `bg-neutral-50`
- `bg-hero-surface`
- `bg-black text-white`

Grid collections often create dividers with borders rather than individually floating cards.

## Buttons and links

Primary dark action:

```text
min-h-14 bg-black px-7 or px-8 text-sm/text-base font-semibold text-white
hover:bg-black/80
focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4
```

Secondary action:

```text
border border-black bg-white text-black
```

Icon-link interactions commonly use `ArrowUpRight` with a small diagonal translation on hover.

Use an `<a>` for navigation and a `<button>` for actions. A clickable `<div>` remains a bad button no matter how confidently it is styled.

## Site layout

`SiteLayout` owns:

- Fixed responsive header.
- Route content.
- Footer.
- Scroll-to-top control.

The header becomes a compact glass pill after scrolling beyond 80 pixels. It uses refs and GSAP in `useHeaderScrollAnimation`.

The footer is black, responsive, and contains:

- Page navigation.
- Service links generated from service data.
- Social links.
- Large automatically fitted email text.
- Pointer-reactive dot canvas for fine pointers when reduced motion is not requested.

## Motion system

Shared Framer Motion values live in:

- `src/motion/constants.js`
- `src/motion/variants.js`

Current durations:

```js
fast: 0.3
base: 0.65
slow: 0.9
```

Current easing:

```js
[0.22, 1, 0.36, 1]
```

Reusable motion components:

- `AnimatedPage`: page entrance and semantic `<main>`.
- `ViewportReveal`: directional reveal when entering the viewport.
- `StaggerGrid`: staggered collection container.
- `RevealItem`: child item for staggered sequences.
- `ScrollProgress`: section-local scroll progress line.
- `PageScrollProgress`: fixed bottom page-progress bar.

## Reduced motion

`useReducedMotion()` returns true when:

- Rendering on the server.
- Running tests.
- The user requests reduced motion.

Every new Framer Motion animation must respect this hook.

GSAP code must check `prefers-reduced-motion` and either disable itself or render a stable nonanimated state.

Do not hide content in an initial animation state on SSR. Server output must remain readable and complete.

## When to use which animation tool

Use CSS transitions for:

- Hover color changes.
- Icon translations.
- Accordion height and opacity.
- Small card image scaling.

Use Framer Motion for:

- Page entrances.
- Viewport reveals.
- Staggered item sequences.
- Simple layout transitions.

Use GSAP/ScrollTrigger for:

- Scroll-scrubbed drawing.
- Pinned scroll sections.
- Header geometry driven by scroll.
- Counter or marquee behavior requiring direct coordination.

Do not import GSAP eagerly for a small hover animation. The browser already survived several decades before being asked to download a timeline engine for a three-pixel movement.

## Arabic typography and direction

Arabic pages use self-hosted IBM Plex Sans Arabic weights 400, 500, 600, and 700 from `public/fonts/ibm-plex-sans-arabic/`. The important 600 weight is preloaded only on Arabic prerendered pages.

Use logical CSS utilities and properties for semantic direction: `start`, `end`, `ps`, `pe`, `ms`, `me`, `border-s`, and `border-e`. Fixed left/right positioning is acceptable only for direction-neutral coordinate systems such as a pointer-following cursor.

Arabic text must not depend on uppercase transformations or Latin letter spacing. Email addresses, URLs, code, and file formats remain LTR with bidi isolation. Free-text fields should use `dir="auto"`; email fields use `dir="ltr"`.

Directional controls must mirror meaningfully. Previous points toward inline start and next points toward inline end. Reveal motion and carousels should derive their direction from the active locale rather than from English assumptions carved into the component like a tiny archaeological mistake.
