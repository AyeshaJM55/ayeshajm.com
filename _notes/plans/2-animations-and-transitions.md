# Ayesha J. Website Animations and Transitions Plan

## 1. Objective

Extend the motion quality established on the homepage across the rest of the website without turning every page into a theme-park queue.

The animation system should:

- Make page entrances feel intentional
- Establish hierarchy as sections enter the viewport
- Give imagery a premium product-focused presentation
- Add continuity between listing and detail pages
- Improve navigation feedback and perceived responsiveness
- Support keyboard users and reduced-motion preferences
- Avoid repetitive reveal effects that make every section feel generated from the same template
- Keep animation cleanup safe and predictable
- Preserve layout stability and content readability

Motion should support the content rather than compete with it. Large product images, editorial typography, and clear page structure remain the main visual language.

---

## 2. Current Motion Audit

### Existing homepage patterns

The homepage already contains several useful motion systems:

1. **Hero staggered entrance**
   - Framer Motion variants
   - Heading, paragraph, divider, and CTA reveal sequentially
   - Hero image fades and scales into place

2. **Header compact-on-scroll transition**
   - GSAP and ScrollTrigger
   - Header changes size, width, padding, blur, and shadow after scrolling

3. **Highlight counters**
   - Scroll-triggered numerical animation
   - One-time activation

4. **Partners horizontal movement**
   - Scroll-linked translation
   - Distance-based opacity emphasis

5. **Services coverflow**
   - Scroll-pinned Swiper progression
   - Active video playback handling
   - Keyboard and pagination controls

6. **Drawn divider**
   - Scroll-scrubbed SVG reveal
   - Pen icon follows the drawing progress

7. **Hover interactions**
   - CTA lift
   - Image scaling
   - Arrow movement
   - Card focus states

### Current gap on internal pages

Internal pages are visually complete but mostly static. They currently lack:

- Shared page-enter transitions
- Consistent hero sequencing
- Section reveal behavior
- Image entrance treatment
- Project-grid staggering
- Detail-page storytelling motion
- Animated process and metadata sections
- Page-transition feedback between routes
- Distinct motion identities for different page types

The goal is not to copy homepage effects everywhere. The goal is to build a restrained motion system and then give each page one or two distinctive moments.

---

## 3. Motion Principles

### 3.1 Motion hierarchy

Use three animation levels:

#### Level 1: Global transitions

Applied consistently across the site:

- Page entrance
- Hero text reveal
- Header state transition
- Button and link feedback
- Basic section reveal

#### Level 2: Component motion

Applied to reusable content patterns:

- Project cards
- Media grids
- Process rows
- Metadata strips
- Related-content sections
- Editorial text/media splits

#### Level 3: Page-specific signature motion

One distinctive interaction per page or template:

- About: principles and capabilities progression
- Services: directional service rows and package sequence
- Portfolio: animated filtering and grid reflow
- Contact: form and next-step progression
- Book: scheduling-panel reveal
- Service detail: hero-media and process progression
- Work detail: case-study media narrative and next-project handoff
- 404: restrained missing-render treatment

### 3.2 Motion character

The overall feeling should be:

- Precise
- Smooth
- Editorial
- Product-focused
- Calm rather than playful
- Responsive rather than decorative

Avoid:

- Repeated floating cards
- Excessive scale effects
- Large rotations
- Bounce easing
- Long opacity fades that delay reading
- Animating every paragraph independently
- Multiple pinned sections on one page
- Scroll hijacking outside the existing homepage service section

### 3.3 Timing and easing

Recommended defaults:

```js
export const motionEase = [0.22, 1, 0.36, 1]
export const fastDuration = 0.3
export const baseDuration = 0.65
export const slowDuration = 0.9
export const staggerDelay = 0.08
```

Use:

- `0.25–0.35s` for hover and control feedback
- `0.55–0.75s` for section entrances
- `0.8–1s` for major hero media
- `0.06–0.12s` between staggered items

---

## 4. Shared Motion Architecture

Create a centralized motion layer instead of embedding fresh GSAP setup into every page until the codebase resembles an archaeological site.

### Proposed structure

```text
src/
  components/
    domain/
      motion/
        AnimatedPage/
        RevealGroup/
        RevealItem/
        ScrollProgress/
        StaggerGrid/
        ViewportReveal/
  hooks/
    useGsapReveal.js
    useMediaReveal.js
    useReducedMotion.js
    useStaggerReveal.js
    usePageTransition.js
  motion/
    constants.js
    variants.js
```

### 4.1 `useReducedMotion.js`

Responsibilities:

- Read `prefers-reduced-motion`
- Return a stable boolean
- Update if the preference changes
- Avoid duplicating `matchMedia` logic across components

### 4.2 `motion/constants.js`

Centralize:

- Durations
- Easing curves
- Stagger values
- Viewport margins
- Translation distances

### 4.3 `motion/variants.js`

Reusable Framer Motion variants:

- Fade upward
- Fade from left
- Fade from right
- Scale and fade media
- Clip reveal
- Stagger container
- Navigation underline

Variants should accept reduced-motion overrides where needed.

### 4.4 `AnimatedPage`

Wrap each route page with a consistent entrance:

- Initial opacity from `0` to `1`
- Optional subtle vertical movement of `8–12px`
- Duration around `0.35–0.45s`
- No exit animation unless route handling is upgraded to support it cleanly
- Reduced motion should use opacity only or no animation

Because the current router is pathname-based and performs normal navigation, full exit transitions are not necessary in this phase. A clean entrance is preferable to pretending the lightweight router is something it is not.

### 4.5 `ViewportReveal`

Reusable wrapper for sections and content blocks:

Props:

```js
{
  children,
  direction,
  delay,
  distance,
  duration,
  once,
  amount,
}
```

Behavior:

- Uses Framer Motion viewport detection for ordinary reveals
- Defaults to `once: true`
- Does not hide critical content when JavaScript is unavailable
- Reduced-motion mode renders immediately

### 4.6 `StaggerGrid`

For project grids, service rows, and related content:

- Parent controls stagger
- Children reveal with opacity and small vertical shift
- New items created by portfolio filters animate into place
- Existing items should not all replay unnecessarily

### 4.7 GSAP usage boundary

Use GSAP only for:

- Scroll-scrubbed progress
- Mask or clip-path progress tied to scroll
- Complex media sequencing
- Horizontal movement
- One-time counters
- Existing homepage pinned services

Use Framer Motion for:

- Page entrances
- Viewport reveals
- Hover interactions
- Layout transitions
- Filtered project-grid reflow
- Accordion and content state changes

---

## 5. Global Transitions

## 5.1 Page entrance

Apply `AnimatedPage` to:

- About
- Services
- Portfolio
- Contact
- Book
- Service detail
- Work detail
- 404

Sequence:

1. Page surface fades in quickly
2. Hero eyebrow appears
3. Hero heading reveals
4. Supporting copy and actions follow
5. Hero media enters last where present

Avoid delaying the heading longer than approximately `150ms`.

## 5.2 Shared hero animation

Update `PageHero` to support motion by default.

Suggested behavior:

- Eyebrow: opacity and `y: 12`
- Heading: opacity and `y: 24`
- Description: opacity and `y: 18`
- Actions: opacity and `y: 12`
- Media: opacity, `scale: 0.965`, and optional clip reveal

Hero media should use overflow clipping so the image can scale subtly without affecting layout.

Add props for page-specific control:

```js
{
  animated = true,
  mediaMotion = 'scale',
  textStagger = true,
}
```

## 5.3 Section-header reveal

Update `SectionHeader` so the eyebrow, title, and description reveal as a grouped unit.

Do not animate every line separately. The heading should feel composed, not assembled by a nervous robot.

## 5.4 CTA interactions

Standardize hover and focus behavior:

- Buttons lift by `2–3px`
- Arrows move diagonally by `3–5px`
- Background transitions remain under `350ms`
- Focus rings remain immediate and visible
- Reduced motion disables spatial movement but preserves color feedback

## 5.5 Contact CTA reveal

Update `ContactCta`:

- Text content reveals from below
- Arrow panel reveals using a horizontal clip or border progression
- Arrow responds to hover as it currently does
- Black panel should not scale as a whole

---

## 6. Shared Component Animation Updates

## 6.1 `TextMediaSplit`

Behavior:

- Text enters from the side nearest the page edge
- Media enters from the opposite side
- Direction automatically flips when `reverse` is true
- Movement limited to `30–48px`
- Media can use clip-path reveal rather than repeated scale animation

Recommended desktop behavior:

- Text reveal begins first
- Media follows after `100–150ms`

Mobile behavior:

- Both reveal upward
- Avoid horizontal movement that could create overflow

## 6.2 `ProjectCard`

Enhancements:

- Card enters with opacity and `y: 24`
- Image gently scales from `0.985` to `1`
- Metadata follows without a separate long delay
- Existing hover arrow and image response remain
- Keyboard focus receives the same visual state as hover

## 6.3 `MediaGrid`

Behavior:

- First large image reveals with a vertical clip
- Secondary images enter in a short stagger
- Images remain fully visible with `object-contain` and white backgrounds
- Avoid parallax inside contained product images because empty margins would make the movement look accidental

Optional case-study enhancement:

- A very small `y` translation of the image wrapper, not the image itself

## 6.4 `MetricStrip`

Replace generic simultaneous reveal with a horizontal sequence:

- Border line draws from left to right
- Items fade in sequentially
- No numerical count-up because values are mostly labels and text

## 6.5 `ProcessSteps`

For locations still using the shared grid:

- Animate the outer border first
- Reveal each step in order
- Step number appears slightly before title and description
- Keep animation one-time only

For the newer editorial process lists on Services and Contact:

- Animate the horizontal divider
- Reveal row number, title, and description as one group
- Use a short stagger between rows

## 6.6 Breadcrumbs

Use only a light entrance:

- Fade in with the hero eyebrow
- No individual separator animation

## 6.7 Related content

- Reveal section heading first
- Stagger project cards
- Avoid replaying card entrances when navigating with browser back if possible

---

# 7. Page-by-Page Motion Plan

## 7.1 About Page

### Hero

- Shared hero stagger
- Portrait or product image reveals through a vertical clip
- Availability/status label can fade in with the eyebrow if added later

### Background and perspective

- Text and image enter from opposing sides using `TextMediaSplit`
- Image should settle without continuous parallax

### Capabilities list

Create a custom list progression:

- Top border draws across
- Each capability row enters as the user scrolls
- Row text shifts from `y: 12` to `0`
- Divider lines reveal with each row
- Optional desktop hover: capability text moves right by `6px`

### Working process

- Timeline line draws from left to right on desktop
- Steps reveal as the line reaches them
- Mobile version reveals top to bottom
- Use GSAP for line progress or Framer Motion if a one-time reveal is sufficient

### Principles

- Three dark editorial blocks reveal in sequence
- Number appears first
- Heading and copy follow
- Avoid scaling the entire black section

### Closing CTA

- Use shared `ContactCta` motion

---

## 7.2 Services Overview Page

### Hero

- Shared hero motion
- CTA lifts subtly on hover

### Service rows

Each service row receives a directional reveal:

- Text side enters from outside toward the center
- Media uses an opposing clip reveal
- Direction alternates with row layout
- Service number appears before title
- Deliverable rules draw in after the main content
- “Explore service” arrow animates on hover and focus

Do not pin this section. The homepage already owns the theatrical service interaction.

### Combined engagements

Current four-column package layout can be enhanced with:

- Shared top rule draw
- Package labels reveal sequentially
- On hover, a thin black underline expands beneath the title
- No card lift or scale

### Process section

Use the current editorial rows:

- Section heading reveals first
- Each process row enters with a horizontal divider animation
- Row content moves only `12–16px`

### Related work

- Stagger project cards
- Images use contained white-background presentation

### CTA

- Shared CTA reveal

---

## 7.3 Portfolio Page

### Hero

- Shared hero entrance

### Filter controls

Enhance filters with Framer Motion:

- Active pill background moves using a shared layout indicator where practical
- Buttons retain native semantics
- Filter selection gives immediate visual response
- Reduced motion switches active state without movement

### Project-grid transitions

Use `AnimatePresence` and Framer Motion layout animation:

- Cards smoothly reposition when filters change
- Removed cards fade out quickly
- New cards fade and rise in
- Reflow should not create large vertical jumps
- Keep duration around `0.35–0.45s`

Suggested card transition:

```js
{
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.985 },
}
```

### Capability cross-links

Current editorial rows should animate as a sequence:

- Divider line reveals
- Number and service name appear together
- Description follows slightly later
- Arrow movement remains hover-only

### CTA

- Shared CTA reveal

---

## 7.4 Contact Page

### Hero

- Use the smaller contact-specific heading size already established
- Shared hero entrance with tighter timing because the heading is long
- Email CTA appears last

### Inquiry section

- Section heading reveals once
- Form fields animate in by row, not individually one at a time
- First row appears together
- Second row follows
- Details field and submit area appear last
- Keep total sequence under `600ms`

Focus behavior:

- Label color transitions slightly when its input receives focus
- Bottom border animates from muted gray to black
- Validation and status text appear without vertical jumping

### Next steps

Use scroll-linked row progression:

- Top border reveals
- Rows enter sequentially
- Number opacity rises first
- Title and description follow together
- No cards, no icon circles, no generic timeline dots

---

## 7.5 Book a Call Page

### Hero

- Shared hero entrance

### Scheduling placeholder

Distinctive reveal:

- Outer dashed border draws in or fades from low opacity
- Placeholder content appears after the border
- Email CTA lifts slightly on hover
- Avoid pulsing or faux loading animation because no scheduler exists yet

### Preparation list

- Use sequential editorial-row reveals
- Each item enters from below with a short stagger

---

## 7.6 Service Detail Template

### Hero

Sequence:

1. Breadcrumbs and service number
2. Service title
3. Description and inquiry CTA
4. Hero image clip reveal

The contained image should reveal within its white surface. Avoid zooming beyond the image bounds.

### Introduction

- Left section label reveals first
- Main statement follows with a subtle upward movement

### Deliverables and ideal-for columns

- Column rules draw downward
- List rows reveal in parallel between both columns
- Avoid individual item delays longer than `60ms`

### Process

- Step progression reveals in service-specific order
- Optional progress line animates once

### Visual showcase

- Large first image uses a vertical clip reveal
- Secondary images stagger
- Product images retain white backgrounds

### Related projects

- Stagger cards

### FAQ

- Questions reveal as a grouped list
- If converted to accordions later, animate height and opacity with Framer Motion

### Previous/next service navigation

- Reveal both halves together
- Hover causes arrow movement and a subtle background sweep
- Avoid page-wide slide transitions

### CTA

- Shared CTA motion

---

## 7.7 Work Detail Template

### Hero

- Breadcrumbs and category reveal first
- Title follows with a slightly slower duration
- Summary appears next

### Cover image

Use a case-study opening reveal:

- White image surface appears first
- Image fades and scales from `0.985` to `1`
- Optional clip from bottom to top
- No `object-cover`; preserve contained presentation

### Metadata strip

- Top border reveals
- Metadata cells enter from left to right
- Values should not count or type themselves out

### Challenge and approach

- Two columns reveal from opposite sides on desktop
- On mobile, reveal upward in reading order
- Keep movement modest

### Media story

Create the strongest case-study motion moment here:

- First image reveals through a large clip
- Following images stagger as they enter
- Optional scroll progress indicator along the section edge
- Do not pin the gallery
- No parallax on contained product artwork

### Outcome

- Label and heading reveal first
- Outcome paragraph follows from below

### Related services

- Pills or links enter as a group
- Hover states remain restrained

### Next project

Improve the handoff:

- Text reveals as the block enters
- Image fades in from the right on desktop
- Arrow moves on hover
- Optional background wipe from black to near-black, not a dramatic color change

### CTA

- Shared CTA motion

---

## 7.8 404 Page

Use one restrained signature effect:

- “404” or heading fades upward
- Supporting sentence follows
- Navigation buttons stagger in
- Optional dot-field opacity drift, but no looping animation that distracts from navigation

Reduced-motion mode shows all content immediately.

---

# 8. Navigation and Route Feedback

## 8.1 Header active state

Enhance the current active state with:

- Animated underline or opacity transition
- Shared-layout underline where possible
- No moving indicator on initial server/static render that causes layout shift

## 8.2 Internal link feedback

Before full navigation:

- Buttons can depress slightly on tap
- Avoid delaying navigation to play exit animations

## 8.3 Scroll restoration

Add explicit behavior:

- New route loads at the top
- Browser back should preserve expected browser behavior where possible
- Hash links continue to scroll to their section

A lightweight `usePageTransition` or route effect can call `window.scrollTo(0, 0)` only for standard forward navigations if needed. Test carefully before overriding browser defaults.

---

# 9. Reduced Motion Strategy

Every animation must respect `prefers-reduced-motion: reduce`.

Reduced-motion behavior:

- Remove scroll scrubbing outside essential homepage behavior
- Disable scale, translation, and clip-path motion
- Use immediate visibility or a short opacity transition
- Disable smooth scrolling triggered programmatically
- Pause autoplaying decorative video where practical
- Preserve carousel keyboard behavior without forced motion
- Do not hide content while animation setup is skipped

Implementation requirements:

- Shared `useReducedMotion` hook
- Framer Motion `useReducedMotion` may be used internally, but expose one project-level abstraction
- GSAP hooks should branch before creating timelines
- Tests should mock both normal and reduced-motion states

---

# 10. Performance Requirements

Animations must not noticeably degrade page performance.

Use primarily:

- `transform`
- `opacity`
- `clip-path` only on limited major elements

Avoid animating:

- Width and height repeatedly during scroll
- Large box shadows
- Filter blur on several simultaneous elements
- Background position across full-screen surfaces
- Layout properties in large project grids

Additional rules:

- Lazy-load GSAP where it is not already statically required
- Do not add GSAP to pages that only need simple reveal motion
- Keep viewport observers reusable
- Set `will-change` only during or immediately before motion
- Remove `will-change` after long-running animations where possible
- Maintain fixed image aspect ratios to prevent layout shifts

---

# 11. Accessibility Requirements

Motion implementation must preserve:

- Semantic reading order
- Keyboard focus order
- Immediate access to all content
- Visible focus indicators
- Native button and link behavior
- Screen-reader announcements for portfolio filters
- No essential information revealed only on hover
- No focus movement caused by layout animation
- No unexpected scroll jumps

Portfolio filtering:

- Maintain `aria-pressed`
- Keep live project count announcement
- Ensure exiting cards are removed correctly from the accessibility tree

Forms:

- Animation must not delay error or status messages
- Focus should remain on the relevant control

---

# 12. Testing Plan

## Shared motion tests

Verify:

- Shared animated wrappers render children
- Reduced-motion mode renders final states immediately
- Viewport reveal components do not hide content during tests
- Component props select the expected motion direction

## Page tests

Update tests to confirm:

- Page content still renders without waiting for animation
- Hero headings remain available immediately to assistive technology
- Project filters still work during layout transitions
- Form controls remain operable
- Service and work detail pages retain all links and content

## Animation cleanup tests

Where GSAP is used:

- Ensure timelines and ScrollTriggers are reverted on unmount
- Avoid duplicate triggers after remount
- Skip browser-only animation setup in test mode

## Manual review sizes

Review at:

- 320px
- 390px
- 768px
- 1024px
- 1440px
- 1920px

Review conditions:

- Normal motion
- Reduced motion
- Keyboard-only navigation
- Slow device emulation
- Browser back and forward navigation

## Validation suite

Continue running:

```sh
npm run lint
npm test
npm run build
python3 ../.agents/skills/frontend-dev/scripts/check-structure.py src
python3 ../.agents/skills/frontend-dev/scripts/check-pages.py src/pages
python3 ../.agents/skills/frontend-dev/scripts/check-components.py src
python3 ../.agents/skills/frontend-dev/scripts/check-a11y.py src
python3 ../.agents/skills/frontend-dev/scripts/check-styling.py src
python3 ../.agents/skills/frontend-dev/scripts/check-correctness.py src
```

---

# 13. Implementation Order

## Phase 1: Motion foundation

1. Add motion constants and variants
2. Add shared reduced-motion hook
3. Add `AnimatedPage`
4. Add `ViewportReveal`
5. Add `StaggerGrid`
6. Add GSAP reveal hook only where Framer Motion is insufficient

## Phase 2: Shared component upgrades

1. `PageHero`
2. `SectionHeader`
3. `TextMediaSplit`
4. `ProjectCard`
5. `MediaGrid`
6. `MetricStrip`
7. `ProcessSteps`
8. `ContactCta`
9. `RelatedContent`
10. Breadcrumb entrance

## Phase 3: Primary pages

1. About
2. Services overview
3. Portfolio filtering and layout transitions
4. Contact
5. Book a Call
6. 404

## Phase 4: Detail templates

1. Service detail hero and section sequencing
2. Service gallery and pagination transitions
3. Work detail hero and metadata progression
4. Work gallery storytelling
5. Next-project handoff

## Phase 5: Navigation polish

1. Active header indicator
2. Button and link interactions
3. Scroll restoration review
4. Focus behavior review

## Phase 6: Performance and accessibility

1. Reduced-motion verification
2. Trigger cleanup audit
3. Mobile overflow review
4. Layout-shift review
5. Slow-device review
6. Full validation suite

---

# 14. Definition of Done

The animation update is complete when:

- Every internal page has a polished entrance
- Shared heroes use one consistent stagger system
- Static content sections reveal with restrained viewport motion
- Portfolio filtering animates smoothly without harming accessibility
- Service and work detail pages have distinct narrative motion
- Contained product imagery remains on white backgrounds throughout animation
- No page uses animation simply because an element happened to exist
- Motion is disabled or simplified for reduced-motion users
- Keyboard navigation and focus states remain correct
- No new layout shifts or horizontal overflow are introduced
- GSAP and observer cleanup works on unmount
- Lint, tests, build, accessibility, styling, structure, and correctness checks pass

---

# 15. Recommended Scope Boundary

Implement the shared animation foundation and page-specific sequences described above.

Do not add in this phase:

- Full SPA route exit transitions
- WebGL page transitions
- Cursor-following effects
- Global smooth-scroll libraries
- Multiple pinned sections per page
- Decorative perpetual loops
- Motion that delays content or navigation

The site should feel more alive, not more impatient.
