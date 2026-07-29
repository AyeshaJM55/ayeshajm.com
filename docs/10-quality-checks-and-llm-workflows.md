# Quality Checks and LLM Workflows

## Required workflow before editing

For structural or component work, an LLM should first read:

- This `docs/` directory.
- `../.agents/skills/frontend-dev/SKILL.md`.
- Relevant files under `../.agents/skills/frontend-dev/details/`.
- The current implementation being changed.

The frontend skill provides general standards. This documentation records project-specific decisions and intentional exceptions. Preserve the project architecture where the two differ unless the requested task is an explicit migration.

## Required workflow after editing

Run:

```bash
npm run lint
npm test
npm run build
python3 ../.agents/skills/frontend-dev/scripts/check-components.py src
python3 ../.agents/skills/frontend-dev/scripts/check-a11y.py src
python3 ../.agents/skills/frontend-dev/scripts/check-correctness.py src
```

Use additional focused checks when changing routes, pages, structure, or styling:

```bash
python3 ../.agents/skills/frontend-dev/scripts/check-routing.py src/routes
python3 ../.agents/skills/frontend-dev/scripts/check-pages.py src/pages
python3 ../.agents/skills/frontend-dev/scripts/check-structure.py src
python3 ../.agents/skills/frontend-dev/scripts/check-styling.py src
```

## Existing test stack

- Vitest
- React Testing Library
- jsdom
- Co-located component and page tests

Current tests cover:

- App routing and metadata behavior.
- Static pages.
- Blog and author pages.
- Homepage sections.
- Header and footer.
- Motion reduced-motion behavior.
- Site and route loaders.
- Content parsing and validation.
- Project and service data.

## Test expectations by change type

### Blog-only content change

At minimum:

```bash
npm test -- src/content/content.test.js src/pages/guest/BlogPages.test.jsx
npm run build
```

A full validation remains preferable before publishing.

### Project or service data change

Run:

```bash
npm test -- src/data/data.test.js src/pages/guest/SitePages.test.jsx
npm run build
```

Inspect listing and detail HTML.

### Shared component change

- Update or add the component test.
- Test keyboard behavior.
- Test required states.
- Run accessibility and correctness scripts.
- Review every page importing the component.

### Route or rendering change

- Update `App.test.jsx`.
- Run full build.
- Inspect nested output paths.
- Test initial hydration and internal navigation.
- Confirm persistent layout and loader behavior.

## Accessibility checklist

- [ ] One H1 per page.
- [ ] Heading levels are sequential.
- [ ] Images have meaningful alt text or are explicitly decorative.
- [ ] Images include width and height.
- [ ] Inputs have associated labels.
- [ ] Required inputs use native `required`.
- [ ] Buttons perform actions; links navigate.
- [ ] Icon-only controls have accessible names.
- [ ] Keyboard focus is visible.
- [ ] Accordions expose `aria-expanded`.
- [ ] Navigation has descriptive `aria-label` values.
- [ ] Status messages use `aria-live` where appropriate.
- [ ] Motion respects reduced-motion preferences.

## Integrity checklist

- [ ] Content was changed in its source of truth.
- [ ] No duplicate project or service records were introduced.
- [ ] Slugs remain unique.
- [ ] Relationships reference valid slugs.
- [ ] No existing public URL changed accidentally.
- [ ] Layout remains persistent during route transitions.
- [ ] Snowball loader remains site-load-only.
- [ ] Route loader remains a simple spinner.
- [ ] No forced delay was added to route navigation.
- [ ] SEO and prerender paths remain complete.
- [ ] Forms do not claim unsupported delivery or upload behavior.

## Performance checklist

- [ ] Hero/LCP image is eager.
- [ ] Below-the-fold images are lazy unless the existing page deliberately specifies otherwise.
- [ ] Images have intrinsic dimensions.
- [ ] Imported assets are reasonably compressed.
- [ ] Heavy modules are dynamically loaded when practical.
- [ ] GSAP is not added for trivial interactions.
- [ ] Animations use transform and opacity where possible.
- [ ] A new list is paginated or constrained when it can grow substantially.

## Prompt template: create a blog article

```text
Read docs/README.md, docs/06-blog-and-author-content.md,
docs/05-images-video-and-assets.md, docs/09-seo-prerendering-and-indexing.md,
and the existing content/blog examples.

Create a new blog article about: <topic>.
Use author: <slug>.
Use publication date: <YYYY-MM-DD>.
Use category: <category>.
Use these verified facts only: <facts>.

Create the Markdown file and media directory reference.
Keep draft: true.
Do not invent statistics, clients, or outcomes.
Preserve the site's editorial voice and Markdown conventions.
Run content tests and the production build.
Report the new route and generated HTML path.
```

## Prompt template: edit a blog article

```text
Read docs/06-blog-and-author-content.md and the target Markdown file.
Update <article slug> to accomplish: <goal>.
Preserve its slug unless explicitly instructed otherwise.
Update updatedAt to <YYYY-MM-DD>.
Keep front matter valid.
Preserve factual claims and do not add unsupported numbers.
Check headings, links, alt text, category, and tags.
Run content tests and build.
```

## Prompt template: add a case study

```text
Read docs/07-portfolio-case-studies-and-services.md,
docs/05-images-video-and-assets.md,
docs/09-seo-prerendering-and-indexing.md,
and the current src/data/projects.js.

Add a new project using these supplied facts:
<facts and deliverables>

Use these asset files:
<asset paths>

Do not invent a client, result, metric, or challenge.
Add valid service relationships and next-project navigation.
Update related service project slugs where appropriate.
Preserve project array ordering intentionally.
Run data tests, page tests, and build.
Verify the portfolio card, case-study page, structured data, sitemap,
and prerendered HTML.
```

## Prompt template: update a page section

```text
Read docs/03-theme-layout-and-motion.md,
docs/04-components-and-page-composition.md,
docs/08-page-copy-and-section-editing.md,
and the target page implementation.

Update the <section name> on <route> with this approved content:
<content>

Reuse existing components and container conventions.
Preserve one H1, heading hierarchy, responsive behavior, focus styles,
reduced-motion behavior, and SSR-visible text.
Update route metadata if the page's purpose changes.
Run relevant tests, accessibility/correctness checks, and build.
Inspect the prerendered route HTML.
```

## Prompt template: add images

```text
Read docs/05-images-video-and-assets.md and inspect the component or content file.
Add these images:
<paths and intended usage>

Choose src/assets for imported application media and public/content/media for
Markdown URL media.
Use descriptive names, correct alt text, width and height, appropriate
object-contain/object-cover behavior, and correct eager/lazy loading.
Do not replace existing media relationships without checking every consumer.
Run build and inspect the relevant routes.
```

## Prompt template: comprehensive content update

```text
Study all files in docs/ before editing.
Also read ../.agents/skills/frontend-dev/SKILL.md and the relevant detail files.

Task:
<requested changes>

Constraints:
- Preserve the current custom routing and persistent SiteLayout architecture.
- Preserve first-load-only SiteLoader and simple RouteLoader behavior.
- Change content in its existing source of truth.
- Reuse existing components.
- Preserve theme, spacing, typography, motion, accessibility, SEO, and prerendering.
- Do not invent facts.
- Add or update tests where behavior changes.

After editing, run lint, tests, build, component, accessibility, and correctness checks.
Report changed files, routes affected, generated prerender paths, and validation results.
```

## Final review questions for an LLM

Before declaring a task complete, answer internally:

1. Did I edit the correct source of truth?
2. Did I duplicate an existing component or data record?
3. Did I change a public URL?
4. Did I preserve one H1 and semantic landmarks?
5. Did I provide alt text and dimensions for images?
6. Did I preserve reduced motion?
7. Does the page still prerender complete content?
8. Is metadata still correct?
9. Did I run the relevant tests and build?
10. Did I verify the generated output rather than merely admire the JSX?
