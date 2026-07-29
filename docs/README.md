# AyeshaJM.com Editing and Development Guide

This directory is the source of truth for maintaining `ayeshajm.com` with a human editor or an LLM-assisted coding workflow.

The documentation describes the project as it exists now. Generic frontend advice must not override the established architecture merely because an enthusiastic model has discovered a different folder convention five minutes ago.

## Start here

Read these files in order before making broad changes:

1. [`01-project-overview.md`](./01-project-overview.md)
2. [`02-architecture-routing-and-rendering.md`](./02-architecture-routing-and-rendering.md)
3. [`03-theme-layout-and-motion.md`](./03-theme-layout-and-motion.md)
4. [`04-components-and-page-composition.md`](./04-components-and-page-composition.md)
5. [`05-images-video-and-assets.md`](./05-images-video-and-assets.md)
6. [`06-blog-and-author-content.md`](./06-blog-and-author-content.md)
7. [`07-portfolio-case-studies-and-services.md`](./07-portfolio-case-studies-and-services.md)
8. [`08-page-copy-and-section-editing.md`](./08-page-copy-and-section-editing.md)
9. [`09-seo-prerendering-and-indexing.md`](./09-seo-prerendering-and-indexing.md)
10. [`10-quality-checks-and-llm-workflows.md`](./10-quality-checks-and-llm-workflows.md)

## What these docs enable

A content editor can give this directory to an LLM and request tasks such as:

- Create a new blog article and author page.
- Update an existing article without breaking front matter, metadata, related-post behavior, or styling.
- Add a portfolio case study and have it appear in the portfolio, homepage work grid, related service pages, SEO output, sitemap, and prerendered HTML.
- Update About, Services, Contact, Home, or another static page while preserving the visual system.
- Add images or video using the correct asset location and loading behavior.
- Add a new reusable section without duplicating existing components.
- Review changes using the same checks expected by the project.

## Non-negotiable preservation rules

- Preserve the single persistent `SiteLayout` mounted by `App.jsx`.
- Preserve the first-load-only full-screen site loader and the simple in-layout route spinner.
- Preserve route-specific SSR/prerendered HTML and metadata.
- Preserve one meaningful `<h1>` per page.
- Preserve semantic elements, keyboard access, focus styles, image dimensions, and alt text.
- Reuse existing components before creating new ones.
- Keep project content in its established data source instead of scattering duplicate copy through components.
- Run validation after every meaningful change.

## Current validation command

```bash
npm run lint
npm test
npm run build
python3 ../.agents/skills/frontend-dev/scripts/check-components.py src
python3 ../.agents/skills/frontend-dev/scripts/check-a11y.py src
python3 ../.agents/skills/frontend-dev/scripts/check-correctness.py src
```

A successful build currently prerenders 24 routes. That number changes automatically when Markdown authors/posts, services, or projects are added, and manually when a new static route is introduced.

## Localization and RTL

The site supports unprefixed English routes and Arabic routes under `/ar`. Start with [`11-localization-and-rtl.md`](./11-localization-and-rtl.md) before editing public copy, routing, metadata, forms, services, projects, blog posts, or author biographies.

Primary entry points:

- `project/src/locales/locales.json`: locale registry containing only `symbol` and `mode`.
- `project/src/locales/en/` and `project/src/locales/ar/`: mirrored public content.
- `project/src/locales/LocaleProvider.jsx` and `useLocale.js`: runtime locale access.
- `project/src/components/navigation/LocaleSwitcher/`: route-preserving language control.
- `project/scripts/audit-localized-copy.mjs`: hard-coded public-copy audit.

Run `npm run audit:locales` with lint, tests, and build validation. Humans have historically demonstrated that untranslated error messages are somehow invisible until production, so the audit is not decorative.
