# Project Overview

## Purpose

`ayeshajm.com` is a public portfolio and marketing website for Ayesha JM, a 3D product visualization artist. The site presents:

- 3D modeling services.
- Photorealistic product rendering.
- Product and CGI animation.
- Lifestyle rendering and art direction.
- Portfolio case studies.
- Editorial blog content.
- Author profiles.
- Contact and consultation entry points.

The brand position is practical and commercial. Copy should connect visual quality to product understanding, launch readiness, e-commerce clarity, campaign use, or reusable production assets.

## Technology

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- GSAP and ScrollTrigger for selected scroll-driven interactions
- Swiper for the homepage service carousel
- React Markdown with GitHub-flavored Markdown
- YAML front matter
- Vitest and React Testing Library
- Custom SSR development middleware and production prerendering

## Main source areas

```text
content/
├── authors/                Markdown author records
├── blog/                   Markdown blog posts
└── CONTENT_GUIDE.md        Small original content reference

public/
├── content/media/          Stable URL media used by Markdown
├── favicon.svg
├── icons.svg
└── snowball-texture.jpg

scripts/
└── prerender.mjs           Writes route HTML, sitemap, and robots.txt

src/
├── assets/                 Bundled imported images, video, and icons
├── components/domain/      Reusable site, blog, motion, and navigation UI
├── content/                Markdown loading, parsing, and validation
├── data/                   Site, navigation, services, and project records
├── hooks/                  Shared behavior hooks
├── layouts/SiteLayout/     Persistent header, footer, and scroll helpers
├── motion/                 Shared Framer Motion constants and variants
├── pages/guest/            Public pages
├── routes/                 Route records and matching
├── seo/                    Metadata and structured data
├── theme/                  Design tokens
├── App.jsx                 Navigation, loading, route composition
└── entry-server.jsx        SSR/prerender entry
```

## Content ownership map

Use the following source instead of copying data into multiple files:

| Content | Source of truth |
|---|---|
| Site name, URL, email, base description | `src/data/site.js` |
| Header and footer navigation | `src/data/navigation.js` |
| Service detail content | `src/data/services.js` |
| Portfolio and case-study content | `src/data/projects.js` |
| Blog articles | `content/blog/*.md` |
| Author profiles | `content/authors/*.md` |
| Homepage-only copy | Homepage section files |
| About page copy | `src/pages/guest/About/About.jsx` |
| Route titles and descriptions | `src/routes/guest.js` |
| Structured data rules | `src/seo/routeSeo.js` |
| Theme values | `src/theme/tokens.css` |
| Global loader and scrollbar styling | `src/index.css` |

## Current routes

Static routes:

- `/`
- `/about`
- `/services`
- `/portfolio`
- `/blog`
- `/contact`
- `/book`
- `/404` during prerender generation

Dynamic routes:

- `/blog/:slug`
- `/authors/:slug`
- `/services/:slug`
- `/work/:slug`

Unknown paths render the custom Not Found page and receive `noindex, nofollow` metadata.

## Current service records

The four service slugs are:

- `3d-modeling`
- `photorealistic-renders`
- `product-cgi-animation`
- `lifestyle-renders`

Each service record supplies the listing page, its detail route, footer links, project relationships, metadata, and homepage service content.

## Current portfolio project records

The eight project slugs are:

- `3d-product-design`
- `amazon-product-visuals`
- `lifestyle-rendering`
- `lifestyle-art-direction`
- `material-exploration`
- `photorealistic-renders`
- `product-visualization`
- `studio-renders`

Projects are not Markdown. They are structured JavaScript records in `src/data/projects.js`.

## Tone and editorial character

Preferred copy is:

- Clear, concrete, and commercially aware.
- Confident without inflated agency language.
- Specific about deliverables, workflow, and use cases.
- Written in plain English.
- Occasionally dry or lightly witty, but never at the expense of clarity.

Avoid:

- Empty superlatives such as “revolutionary,” “world-class,” or “game-changing.”
- Claims that cannot be substantiated.
- Invented client names, results, awards, or performance metrics.
- Long paragraphs that merely restate the heading.
- Treating CGI as decoration instead of a communication and production tool.
