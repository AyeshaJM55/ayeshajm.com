# Page Copy and Section Editing

## General editing rule

Change content at the highest existing data level that owns it.

- Project facts belong in `projects.js`.
- Service facts belong in `services.js`.
- Blog content belongs in Markdown.
- Shared site identity belongs in `site.js`.
- Page-specific editorial copy belongs in its page or section file.

Do not duplicate a service description inside three components because editing one JavaScript object felt temporarily inconvenient.

## Page anatomy and content sources

### Home

File:

```text
src/pages/guest/Home/Home.jsx
```

Sections render in this order:

1. `Hero`
2. `PartnersStrip`
3. `HighlightCards`
4. `FeaturedWork`
5. `Services`
6. `Testimonials`
7. `BookNowStrip`
8. `LeaveMessage`
9. `DrawnDivider`
10. `Faq`

#### Home Hero

File:

```text
src/pages/guest/Home/sections/Hero.jsx
```

Contains the homepage H1, lead paragraph, divider, portfolio CTA, and hero image.

SEO consideration:

- The H1 and paragraph are present in prerendered HTML.
- Keep the hero image eager with `fetchPriority='high'`.
- Do not hide the title behind client-only logic.

#### Partners Strip

File:

```text
src/pages/guest/Home/sections/PartnersStrip/PartnersStrip.jsx
```

`partnerNames` owns the visible partner/client labels. Only use names that are approved for public display.

#### Highlight Cards

File:

```text
src/pages/guest/Home/sections/HighlightCards/HighlightCards.jsx
```

The `highlights` array owns metrics and descriptions.

Do not increase numeric claims without verified information. The animation uses numeric `target`, visible `value`, suffix, and duration.

#### Featured Work

File:

```text
src/pages/guest/Home/sections/FeaturedWork/FeaturedWork.jsx
```

Project cards are generated from all `projects`. Edit project content in `src/data/projects.js`.

#### Homepage Services

Files:

```text
src/pages/guest/Home/sections/Services/
```

Service content is imported from shared service data. The homepage owns presentation and video mapping, not service copy.

#### Testimonials

Files:

```text
src/pages/guest/Home/sections/Testimonials/
```

Testimonials live in `TestimonialsData.js`.

Do not publish invented testimonials or identify a client without permission. Replace placeholder portrait media when approved assets are available.

#### Leave Message

File:

```text
src/pages/guest/Home/sections/LeaveMessage/LeaveMessage.jsx
```

The form currently provides client-side confirmation only. It does not deliver the message to a backend.

Do not change copy to claim successful delivery until a real form service is connected.

### About

File:

```text
src/pages/guest/About/About.jsx
```

The page includes:

1. Page hero.
2. Perspective text/media section.
3. Capabilities list.
4. Four-stage process.
5. Three principles on black.
6. Contact CTA.

Content arrays:

- `process`
- `capabilities`
- `principles`

#### About page prerender and SEO integrity

The About page is part of `staticPaths`, so its full content is rendered into:

```text
dist/about/index.html
```

Its route metadata comes from the `/about` record in `src/routes/guest.js`.

When editing About:

- Keep its primary heading inside `PageHero`.
- Keep meaningful biography/service language as actual text nodes.
- Do not move essential copy into canvas, CSS-generated content, or client-only effects.
- Update the `/about` route description when the page's central positioning changes.
- Keep the social image import relevant to the page.
- Run `npm run build` and inspect the generated About HTML for title, description, H1, and visible copy.

Useful check:

```bash
grep -n "<title>\|name=\"description\"\|Visualizing products\|Realism with a job" dist/about/index.html
```

### Services listing

File:

```text
src/pages/guest/Services/Services.jsx
```

The listing combines shared service data with page-specific engagement and package copy.

Page-specific arrays:

- `engagementProcess`
- `packages`
- `serviceShowcaseImages`

Be careful with `serviceShowcaseImages`: it is index-aligned with the services array.

### Service detail

File:

```text
src/pages/guest/ServiceDetail/ServiceDetail.jsx
```

Almost all visible service detail content comes from `services.js`.

Edit the data record rather than writing slug-specific conditionals in the page.

### Portfolio

File:

```text
src/pages/guest/Portfolio/Portfolio.jsx
```

Project categories are generated from project data. The page includes filters, project cards, capability links, and CTA.

### Work detail

File:

```text
src/pages/guest/WorkDetail/WorkDetail.jsx
```

Visible content comes from the matching project record and related service records.

Avoid adding case-study copy directly based on slug checks. Improve the project schema when new structured content is genuinely needed across cases.

### Blog listing

File:

```text
src/pages/guest/Blog/Blog.jsx
```

Page-level hero and empty-state copy live here. Article content, categories, tags, dates, and feature selection come from Markdown.

### Blog detail

File:

```text
src/pages/guest/BlogDetail/BlogDetail.jsx
```

Do not edit individual article copy here. This page is the common article template.

### Author detail

File:

```text
src/pages/guest/AuthorDetail/AuthorDetail.jsx
```

Author profile content comes from Markdown. This page controls only template labels and layout.

### Contact

File:

```text
src/pages/guest/Contact/Contact.jsx
```

The Contact form currently prevents default submission and displays a message directing users to email.

Required fields:

- Name
- Email
- Service
- Project details

Optional fields:

- Company
- Timeline
- Project stage
- Intended use
- Budget range

Keep the visible required `*` markers and the note explaining them.

Do not claim file upload support. It does not exist.

### Book

File:

```text
src/pages/guest/Book/Book.jsx
```

The booking provider is not connected. The page explicitly explains this and provides an email link.

Do not replace the placeholder with a fake calendar surface. Connect a real provider before changing the promise.

### Not Found

File:

```text
src/pages/guest/NotFound/NotFound.jsx
```

Keep it available without network-dependent data. Its route receives noindex metadata and a 404 server status.

## Adding a new page section

Before coding:

1. Identify the section's job.
2. Check whether `SectionHeader`, `TextMediaSplit`, `ProcessSteps`, `MetricStrip`, `MediaGrid`, `ProjectCard`, or `ContactCta` already solves it.
3. Decide whether content belongs in shared data or page-local constants.
4. Confirm heading level.
5. Confirm mobile stacking.
6. Confirm motion and reduced-motion behavior.
7. Confirm media alt text and dimensions.

## Heading hierarchy

- One H1 per page.
- Page sections normally use H2.
- Cards or sub-sections use H3.
- Do not skip from H1 to H3 merely because the desired font size looked convenient.
- Style and semantics are separate decisions.

## Copy length guidance

- Eyebrow: 1 to 4 words.
- Hero title: usually 4 to 12 words.
- Hero description: 1 to 3 sentences.
- Section title: 3 to 10 words.
- Section description: 1 to 3 sentences.
- Card summary: 1 sentence.
- Process description: 1 concise sentence.
- FAQ answer: usually 2 to 5 sentences.

## Forms

When adding a required field:

- Add the native `required` attribute.
- Add a visible `*` marker.
- Keep or update the required-field explanation.
- Ensure the `<label htmlFor>` matches the input `id`.
- Add an appropriate input `type`.
- Do not rely on placeholder text as the label.

## Responsive behavior

Review at minimum:

- 320 to 390 px mobile.
- Tablet around 768 px.
- Desktop around 1280 px.
- Wide desktop around 1600 px.

New copy can break layouts without changing a single class. Long words, titles, client names, and translations remain stubbornly physical objects once rendered.

## Editing localized page copy

Public page copy belongs in `src/locales/en/pages/*.json` and the mirrored Arabic file. Shared actions, labels, form fields, accessibility strings, and navigation belong in their focused locale files rather than in JSX.

When adding or renaming a key:

1. Apply the identical key path and value type in both locales.
2. Keep entity IDs, slugs, form values, route segments, and query values language neutral.
3. Use named placeholders such as `{title}` and plural objects rather than concatenating fragments.
4. Verify Arabic copy fits the existing composition without inheriting Latin uppercase or tracking treatments.
5. Run `npm run audit:locales`, lint, tests, and the production build.
