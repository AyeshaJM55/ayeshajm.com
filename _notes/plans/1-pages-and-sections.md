# Ayesha J. Website Pages and Sections Plan

## 1. Objective

Expand the current single-page portfolio into a complete multi-page website while preserving the visual language already established on the homepage:

- Predominantly black-and-white palette
- Large, tightly tracked typography
- Generous whitespace
- Full-width and full-viewport sections
- Square-cornered editorial cards where appropriate
- Rounded pill buttons and compact navigation controls
- Product imagery as the primary visual focus
- Scroll-linked GSAP motion used selectively
- Framer Motion for smaller entrance and hover interactions
- Accessible semantic structure and keyboard navigation
- Responsive behavior from 320px upward

The homepage remains the visual reference. New pages should feel related without simply repeating the homepage section-for-section.

---

## 2. Proposed Site Map

### Primary pages

| Route | Page title | Purpose |
|---|---|---|
| `/` | Ayesha J. \| Home | Existing homepage and primary overview |
| `/about` | Ayesha J. \| About | Background, approach, process, and values |
| `/services` | Ayesha J. \| Services | Overview of all services |
| `/portfolio` | Ayesha J. \| Portfolio | Filterable/indexed collection of work |
| `/contact` | Ayesha J. \| Contact | Project inquiry and contact details |
| `/book` | Ayesha J. \| Book a Call | Dedicated call-booking page |

### Service detail pages

| Route | Page title |
|---|---|
| `/services/3d-modeling` | Ayesha J. \| 3D Modeling |
| `/services/photorealistic-renders` | Ayesha J. \| Photorealistic Renders |
| `/services/product-cgi-animation` | Ayesha J. \| Product & CGI Animation |
| `/services/lifestyle-renders` | Ayesha J. \| Lifestyle Renders |

### Work detail pages

| Route | Page title |
|---|---|
| `/work/3d-product-design` | Ayesha J. \| 3D Product Design |
| `/work/amazon-product-visuals` | Ayesha J. \| Amazon Product Visuals |
| `/work/lifestyle-rendering` | Ayesha J. \| Lifestyle Rendering |
| `/work/lifestyle-art-direction` | Ayesha J. \| Lifestyle Art Direction |
| `/work/material-exploration` | Ayesha J. \| Material Exploration |
| `/work/photorealistic-renders` | Ayesha J. \| Photorealistic Renders Project |
| `/work/product-visualization` | Ayesha J. \| Product Visualization |
| `/work/studio-renders` | Ayesha J. \| Studio Renders |

### Supporting route

| Route | Page title | Purpose |
|---|---|---|
| `*` | Ayesha J. \| Page Not Found | Branded 404 page with navigation back to useful destinations |

---

## 3. Shared Architecture

### 3.1 Route data

Replace repeated route declarations with route data containing:

```js
{
  path,
  title,
  Page,
  description,
}
```

Use the route title to update `document.title` consistently.

For dynamic service and work pages, resolve the page from a slug in shared data instead of creating nearly identical route logic for every entry.

Because the current application uses a lightweight pathname lookup rather than React Router, choose one of these approaches:

1. Keep the current routing method and add slug-aware matching.
2. Introduce React Router if nested routes, active links, and future navigation complexity justify the dependency.

Recommended: keep the lightweight router for this phase, but centralize path matching in a dedicated utility so it does not become a collection of increasingly desperate string comparisons.

### 3.2 Shared data files

Create centralized data modules:

```text
src/data/
  services.js
  projects.js
  navigation.js
  site.js
```

#### `services.js`

Each service should include:

```js
{
  slug,
  title,
  shortTitle,
  description,
  intro,
  heroMedia,
  supportingMedia,
  deliverables,
  idealFor,
  process,
  faq,
  relatedProjectSlugs,
}
```

#### `projects.js`

Each project should include:

```js
{
  slug,
  title,
  category,
  summary,
  challenge,
  approach,
  outcome,
  services,
  coverImage,
  gallery,
  year,
  client,
  deliverables,
  nextProjectSlug,
}
```

The existing homepage `services` and `featuredProjects` arrays should be migrated into these shared files so the homepage, listing pages, detail pages, header links, footer links, and related-content sections all use one source of truth.

### 3.3 Shared page components

Create reusable components for recurring layout patterns:

```text
src/components/site/
  PageHero/
  SectionHeader/
  TextMediaSplit/
  MediaGrid/
  ProjectCard/
  ServiceCard/
  RelatedContent/
  ProcessSteps/
  MetricStrip/
  ContactCta/
  PageIntro/
  Breadcrumbs/
  EmptyState/
```

These components should provide consistent geometry and spacing while allowing each page to compose them differently.

### 3.4 Shared animation utilities

Create reusable hooks for:

- Scroll-reveal text and media
- Staggered card entrances
- Horizontal scrub sections
- Reduced-motion handling
- Cleanup-safe GSAP contexts

Suggested structure:

```text
src/hooks/
  useScrollReveal.js
  useStaggerReveal.js
  useHorizontalScrub.js
  usePageTitle.js
```

Avoid adding GSAP independently inside every page. Humans already invented copy-paste bugs; there is no need to celebrate them.

---

## 4. Global Navigation Plan

## 4.1 Header

Keep the current header appearance and compact-on-scroll behavior.

Primary links:

- About → `/about`
- Services → `/services`
- Portfolio → `/portfolio`
- Contact → `/contact`
- Book a call → `/book`

Additional behavior:

- Brand link always returns to `/`
- Show an active state for the current primary page
- Treat service detail pages as part of Services
- Treat work detail pages as part of Portfolio
- Close the mobile menu after navigation
- Preserve visible keyboard focus states
- Add `aria-current="page"` to the active link

Do not place every service and project directly in the main header. The mobile menu is not a storage unit.

Optional desktop enhancement:

- Services dropdown listing the four service pages
- Portfolio dropdown listing project categories, not every individual project

This enhancement should be deferred until the main pages are complete.

## 4.2 Footer

Update footer navigation to real routes:

- Home → `/`
- About → `/about`
- Services → `/services`
- Portfolio → `/portfolio`
- Contact → `/contact`
- Book a call → `/book`

Add a compact services group:

- 3D Modeling
- Photorealistic Renders
- Product & CGI Animation
- Lifestyle Renders

Keep the existing email and social links.

Footer layout proposal:

1. Primary navigation column
2. Services column
3. Social links
4. Large email link
5. Copyright row

On small screens, stack these groups with clear spacing rather than compressing them into an ornamental knot.

---

## 5. Homepage Link Updates

Update existing homepage links so they lead to the new pages:

- Hero “View Portfolio” → `/portfolio`
- Featured work cards → matching `/work/:slug`
- “View all projects” → `/portfolio`
- Service cards or service titles → matching `/services/:slug`
- Book Now strip → `/book`
- Header CTA → `/book`
- Contact-related CTA → `/contact`

Keep homepage sections as summaries. Full explanations should live on their dedicated pages.

---

# 6. Page-by-Page Plan

## 6.1 About Page

### Purpose

Explain who Ayesha is, how she works, and why clients should trust the process.

### Proposed sections

#### 1. About hero

- Large heading: “Visualizing products before they exist in the world”
- Short first-person introduction
- Editorial portrait, studio image, or one strong product visual
- Small availability/status label
- Minimal entrance animation

#### 2. Background and perspective

- Two-column editorial layout
- Career summary
- Product visualization philosophy
- Emphasis on clarity, realism, and commercial usefulness

#### 3. Capabilities strip

Compact list of strengths:

- Product visualization
- Material development
- Lighting and art direction
- Commercial rendering
- Animation
- E-commerce imagery

Use large typography and thin dividers rather than generic icon cards.

#### 4. Working process

Four-stage process:

1. Discover
2. Build
3. Refine
4. Deliver

Use a horizontal desktop timeline and stacked mobile layout.

#### 5. Principles

Three custom editorial blocks:

- Detail with purpose
- Clear collaboration
- Visuals built for use

#### 6. Selected client feedback

Reuse the testimonial data but render it as one or two large static quotes instead of reusing the homepage carousel.

#### 7. Closing CTA

- “Have a product in mind?”
- Links to `/contact` and `/portfolio`

### Custom work required

Most of this page should be newly composed. Reuse only:

- Site layout
- Section header typography
- CTA button styles
- Testimonial data

---

## 6.2 Services Overview Page

### Purpose

Present the full service offering and direct visitors toward the correct service detail page.

### Proposed sections

#### 1. Services hero

- Large heading
- Short explanation of end-to-end product visualization
- Background video or full-width product render
- Service index links

#### 2. Services index

Four large alternating media/text blocks:

1. 3D Modeling
2. Photorealistic Renders
3. Product & CGI Animation
4. Lifestyle Renders

Each block includes:

- Number
- Service title
- Summary
- Key deliverables
- “Explore service” link
- Relevant image or video

Do not reuse the homepage coverflow carousel here. The overview page should be easier to scan and less theatrical.

#### 3. Combined engagements

Explain that services can be combined into packages such as:

- Product launch package
- E-commerce image suite
- Campaign CGI package
- Animation and stills package

#### 4. Process preview

Condensed process steps with a link to the full process on the About page.

#### 5. Related work grid

Show one or two relevant projects for each service category.

#### 6. Service FAQ

Use service-specific questions rather than duplicating the homepage FAQ exactly.

#### 7. CTA

- “Not sure which service fits?”
- Link to `/contact`

---

## 6.3 Service Detail Page Template

All four service pages should share a structural template but use distinct content, media, deliverables, and visual arrangements.

### Common sections

#### 1. Service hero

- Breadcrumbs: Services / Current service
- Service number
- Large service title
- Concise value proposition
- Primary media
- Inquiry CTA

#### 2. Service introduction

- What the service is
- Why it matters commercially
- When a client should use it

#### 3. Deliverables

List tangible outputs, for example:

- Final still renders
- Transparent-background images
- Multiple aspect ratios
- Web-ready exports
- Source files where agreed

#### 4. Process

A service-specific workflow with 4–6 steps.

#### 5. Visual showcase

Use a custom gallery pattern appropriate to the service:

- Modeling: wireframe, clay, and final progression
- Photorealistic renders: detail crops and lighting variations
- Animation: video reels, storyboard frames, motion stages
- Lifestyle renders: environment boards and final scenes

#### 6. Ideal for

Examples of client or project types suited to the service.

#### 7. Related projects

Three matching work cards.

#### 8. Service FAQ

Questions unique to that service.

#### 9. Next service navigation

- Previous service
- Next service

#### 10. Contact CTA

Direct link to `/contact` with the service preselected where practical.

---

## 6.4 3D Modeling Page

### Page-specific direction

Focus on accuracy, construction, and production-ready geometry.

### Suggested sections

- Hero with wireframe-to-render transition
- “From references to precise digital form” introduction
- Inputs accepted: CAD, sketches, measurements, photography
- Modeling stages
- Detail comparison panel
- Deliverables and file formats
- Related product-design projects
- FAQ about missing CAD, revisions, and source files

---

## 6.5 Photorealistic Renders Page

### Page-specific direction

Focus on materials, lighting, realism, and marketing output.

### Suggested sections

- Hero with strong final render
- Material and lighting breakdown
- Before/after or clay-to-final comparison
- Studio, hero, detail, and packshot deliverables
- E-commerce and campaign use cases
- Related rendering projects
- FAQ about resolution, backgrounds, variants, and retouching

---

## 6.6 Product & CGI Animation Page

### Page-specific direction

Focus on motion, storytelling, and feature demonstration.

### Suggested sections

- Autoplay-muted hero reel
- Animation use cases
- Storyboard-to-final progression
- Motion design process
- Deliverables by duration and format
- Social, website, launch, and advertising outputs
- Related motion projects
- FAQ about duration, sound, aspect ratios, and revisions

Ensure videos pause when offscreen and respect reduced-motion preferences.

---

## 6.7 Lifestyle Renders Page

### Page-specific direction

Focus on environment, atmosphere, art direction, and context.

### Suggested sections

- Full-bleed lifestyle hero
- Environment and mood development
- Art-direction boards
- Scene-building process
- Product placement and composition considerations
- Deliverable variations
- Related lifestyle projects
- FAQ about locations, props, seasonal campaigns, and image sets

---

## 6.8 Portfolio Page

### Purpose

Provide a browsable overview of all projects.

### Proposed sections

#### 1. Portfolio hero

- Large heading
- Short statement
- Total project/category summary

#### 2. Filter controls

Categories:

- All
- Product Design
- E-commerce
- Photorealistic
- Lifestyle
- Animation
- Material Studies

Use accessible buttons with a clear active state.

#### 3. Project grid

- Responsive 1/2/3-column layout
- Mixed card spans on large screens for editorial rhythm
- Consistent hover/focus treatment
- Each card links to `/work/:slug`
- Use current featured-work assets initially

#### 4. Capability cross-links

A slim section connecting portfolio categories to service pages.

#### 5. CTA

- “Need visuals like these?”
- Link to `/contact`

### Behavior

- Filters should update locally without a page reload
- Preserve keyboard accessibility
- Avoid hiding all context from screen readers
- Motion should be subtle and avoid layout jumps

---

## 6.9 Work Detail Page Template

Every project gets a real page rather than linking eight cards back to `/`, the digital equivalent of sending visitors in circles.

### Common sections

#### 1. Project hero

- Project title
- Category
- Short summary
- Full-width cover image

#### 2. Project metadata

- Client
- Year
- Services
- Deliverables

Only show fields that have real data.

#### 3. Challenge

Explain the product or communication problem.

#### 4. Approach

Explain modeling, lighting, material, animation, or art-direction decisions.

#### 5. Media story

Flexible gallery supporting:

- Full-width image
- Two-column image pair
- Detail crop row
- Video
- Before/after comparison
- Captioned process image

#### 6. Outcome

Describe how the final visuals were intended to be used.

Avoid invented performance metrics unless the client provides them.

#### 7. Related services

Links to the service pages used in the project.

#### 8. Next project

Large visual link to the next work page.

#### 9. Project inquiry CTA

Link to `/contact` with the project category included where practical.

---

## 6.10 Individual Work Pages

Use the shared project template but vary gallery rhythm and emphasis.

### 3D Product Design

- Focus on geometry and form development
- Show design details and construction progression

### Amazon Product Visuals

- Focus on listing clarity and conversion-oriented compositions
- Show hero, feature, infographic-style, and detail image types

### Lifestyle Rendering

- Focus on believable context and product placement
- Use broad environment imagery

### Lifestyle Art Direction

- Focus on mood, composition, and campaign storytelling
- Include visual-direction notes and scene variants

### Material Exploration

- Focus on texture, finish, roughness, reflections, and variations
- Use close crops and comparison layouts

### Photorealistic Renders

- Focus on lighting and high-fidelity detail
- Include clay-to-final progression

### Product Visualization

- Focus on commercial presentation and product features
- Use a balanced studio/gallery layout

### Studio Renders

- Focus on minimal composition and premium presentation
- Use restrained layouts with generous whitespace

---

## 6.11 Contact Page

### Purpose

Make project inquiry straightforward while showing enough guidance to improve inquiry quality.

### Proposed sections

#### 1. Contact hero

- “Let’s make the product clear before it reaches the customer.”
- Email and expected response note

#### 2. Inquiry form

Reuse the homepage Leave Message form logic, but expand it with:

- Name
- Email
- Company
- Service
- Project stage
- Intended use
- Timeline
- Budget range, optional
- Project details
- File-upload guidance, without implementing uploads until backend support exists

#### 3. What happens next

Three steps:

1. Brief review
2. Scope and estimate
3. Production start

#### 4. Direct contact

- Email
- Social profiles
- Availability or timezone note

#### 5. FAQ preview

Include only inquiry-related questions.

### Technical note

The form should eventually connect to a real backend or form service. Until then, clearly avoid pretending submission succeeded when nothing was delivered.

---

## 6.12 Book a Call Page

### Purpose

Provide a focused scheduling destination for all “Book a call” CTAs.

### Proposed sections

#### 1. Compact hero

- “Book a project call”
- Short explanation of who the call is for

#### 2. Scheduling area

Reserve an embed container for the selected scheduling provider.

Until a provider is selected:

- Show a clear placeholder
- Provide a fallback email link
- Do not imitate a booking system that cannot actually book anything

#### 3. Call preparation

Brief list of useful things to have ready:

- Product overview
- Intended deliverables
- Timeline
- Available CAD or references

#### 4. Alternative contact CTA

Link to `/contact` for people who prefer written inquiries.

---

## 6.13 404 Page

### Proposed design

- Large “404” or “This render is missing” heading
- One concise sentence
- Buttons to Home, Portfolio, and Contact
- Optional subtle grid or dot-field background inspired by the footer
- Correct title: `Ayesha J. | Page Not Found`

---

# 7. Content Reuse Strategy

## Reuse directly

- `SiteLayout`
- Header
- Footer
- Existing button styles
- Existing color tokens
- Existing media assets
- Testimonials data
- FAQ interaction pattern
- Leave Message form structure
- Drawn divider where editorially useful

## Rework into shared components

- Homepage featured project cards
- Homepage service data
- Homepage service cards
- Section headings
- CTA strips
- Media/text split layouts

## Create mostly new

- About page sections
- Services overview layout
- Service detail content
- Portfolio filtering layout
- Work detail galleries
- Contact process section
- Book page
- 404 page

The goal is visual consistency, not cloning. Reusing every homepage section would create several pages that feel like the same page wearing different name tags.

---

# 8. Visual System Rules

## Typography

- Continue the current sans-serif family
- Use large headings with negative tracking
- Keep body copy readable at 16–18px on content-heavy pages
- Limit line length to roughly 60–75 characters
- Use uppercase labels sparingly for metadata and section indices

## Spacing

- Use the existing maximum content width of `1600px`
- Keep the current responsive horizontal padding pattern
- Default section spacing:
  - Mobile: 64–80px
  - Tablet: 80–96px
  - Desktop: 96–128px

## Color

- White primary canvas
- Black primary text and controls
- Neutral grays for support text and surfaces
- Use imagery for visual variety instead of adding arbitrary accent colors

## Shape

- Pill buttons and compact rounded controls
- Square or minimally rounded media panels
- Avoid excessive rounded cards

## Motion

- Page entrance motion should be brief and restrained
- Scroll-scrub animation only where it explains progression
- Avoid pinning multiple large sections on one page
- Respect `prefers-reduced-motion`
- Ensure animation cleanup on unmount

---

# 9. Accessibility Requirements

Every page must include:

- One clearly labeled `<main>` region
- Logical heading hierarchy
- Descriptive link labels
- Visible focus states
- `aria-current` on active navigation
- Alt text based on image purpose
- Decorative images marked appropriately
- Keyboard-operable filters, accordions, and galleries
- Reduced-motion fallbacks
- Sufficient color contrast
- Form labels connected with `htmlFor` and `id`
- Clear validation and submission feedback

Project galleries should not rely on hover to expose essential information.

---

# 10. SEO and Metadata Plan

For every route:

- Unique document title
- Unique meta description
- Canonical URL when deployment domain is finalized
- Open Graph title, description, and image
- Social sharing image per major page where available

Service and work data should include metadata fields so titles and descriptions remain centralized.

Suggested title format:

```text
Ayesha J. | Page Name
```

Suggested work title format:

```text
Ayesha J. | Project Name
```

---

# 11. Testing Plan

## Route tests

Verify:

- Every route resolves to the expected page
- Unknown paths render the 404 page
- Document titles update correctly
- Detail slugs resolve from shared data

## Navigation tests

Verify:

- Header links point to real routes
- Footer links point to real routes
- Book CTA points to `/book`
- Active navigation receives `aria-current="page"`
- Mobile menu closes after navigation

## Page tests

Each page should have at least one test covering:

- Main region
- Primary heading
- Critical CTA
- Key section presence

## Data integrity tests

Verify:

- Every service has a unique slug
- Every project has a unique slug
- Related project slugs exist
- Next-project slugs exist
- Every listed item has a valid route

## Existing validation suite

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

# 12. Implementation Order

## Phase 1: Foundation

1. Create centralized service, project, navigation, and site data
2. Add slug-aware route matching
3. Add shared page-title and metadata handling
4. Add branded 404 page
5. Update header and footer navigation architecture
6. Add active navigation states

## Phase 2: Shared Components

1. PageHero
2. SectionHeader
3. TextMediaSplit
4. ProjectCard
5. ServiceSummary
6. ProcessSteps
7. RelatedContent
8. ContactCta
9. MediaGrid
10. Breadcrumbs

## Phase 3: Primary Pages

1. About
2. Services overview
3. Portfolio
4. Contact
5. Book a Call

## Phase 4: Service Pages

1. 3D Modeling
2. Photorealistic Renders
3. Product & CGI Animation
4. Lifestyle Renders

## Phase 5: Work Pages

1. Build shared work-detail template
2. Add all eight project data entries
3. Configure gallery composition per project
4. Add previous/next project navigation
5. Connect related services

## Phase 6: Homepage Integration

1. Point project cards to work detail pages
2. Point services to service detail pages
3. Point portfolio CTA to `/portfolio`
4. Point booking CTAs to `/book`
5. Point inquiry CTAs to `/contact`

## Phase 7: Polish

1. Responsive review at 320px, 390px, 768px, 1024px, 1440px, and 1920px
2. Reduced-motion review
3. Keyboard navigation review
4. Image loading and video playback optimization
5. Metadata and favicon verification
6. Final test and build pass

---

# 13. File Structure Target

```text
src/
  components/
    site/
      Breadcrumbs/
      ContactCta/
      MediaGrid/
      PageHero/
      ProcessSteps/
      ProjectCard/
      RelatedContent/
      SectionHeader/
      ServiceSummary/
      TextMediaSplit/
  data/
    navigation.js
    projects.js
    services.js
    site.js
  hooks/
    useHorizontalScrub.js
    usePageMetadata.js
    useScrollReveal.js
    useStaggerReveal.js
  pages/
    guest/
      About/
        About.jsx
        sections/
      Book/
        Book.jsx
        sections/
      Contact/
        Contact.jsx
        sections/
      Home/
        Home.jsx
        sections/
      NotFound/
        NotFound.jsx
      Portfolio/
        Portfolio.jsx
        sections/
      Services/
        Services.jsx
        sections/
      ServiceDetail/
        ServiceDetail.jsx
        sections/
      WorkDetail/
        WorkDetail.jsx
        sections/
  routes/
    guest.js
    index.js
    matchRoute.js
```

---

# 14. Definition of Done

The page expansion is complete when:

- All primary routes render complete themed pages
- All four services have dedicated detail pages
- All eight featured projects have dedicated work pages
- Header and footer links lead to valid destinations
- Homepage cards and CTAs use the new routes
- Page titles and metadata update correctly
- Unknown routes render a branded 404 page
- Shared content is data-driven rather than duplicated
- Mobile, tablet, and desktop layouts are polished
- Keyboard and reduced-motion behavior work correctly
- Lint, tests, production build, accessibility, styling, structure, and correctness checks all pass
