# Markdown Blog and Author Pages Plan

## Goal

Add a file-based blog system where posts and authors are maintained as Markdown files with YAML front matter.

After implementation, content updates should require only:

1. Add or edit a Markdown file.
2. Save it while `npm run dev` is running to see the change immediately through Vite HMR.
3. Run `npm run build` and redeploy for production.

No post or author should need to be manually registered in a JavaScript array.

## Proposed content structure

```text
content/
├── blog/
│   ├── product-rendering-for-ecommerce.md
│   ├── preparing-cad-files-for-cgi.md
│   └── building-a-product-launch-visual-system.md
├── authors/
│   ├── ayesha-jm.md
│   └── guest-author.md
└── media/
    ├── blog/
    │   └── product-rendering-for-ecommerce/
    │       ├── cover.jpg
    │       └── detail-01.jpg
    └── authors/
        └── ayesha-jm.jpg
```

Keep content outside `src` so editorial files are clearly separated from application code. Vite will load the Markdown files through `import.meta.glob`.

## Blog post front matter

Each blog Markdown file should begin with YAML front matter.

```md
---
slug: product-rendering-for-ecommerce
title: Product Rendering for E-commerce
description: How CGI product imagery supports clearer listings and more flexible campaigns.
publishedAt: 2026-08-10
updatedAt: 2026-08-12
author: ayesha-jm
category: Product Visualization
tags:
  - CGI
  - E-commerce
  - Product Rendering
coverImage: /content/media/blog/product-rendering-for-ecommerce/cover.jpg
coverAlt: A CGI product render prepared for an e-commerce listing
featured: true
draft: false
---

Opening paragraph for the article.

## A section heading

Normal Markdown content continues here.
```

### Required post fields

- `slug`: unique URL-safe identifier
- `title`: page and card title
- `description`: listing summary and meta description
- `publishedAt`: ISO date in `YYYY-MM-DD` format
- `author`: slug of an author Markdown file
- `coverImage`: public image path or imported content asset path
- `coverAlt`: accessible image description
- `draft`: boolean

### Optional post fields

- `updatedAt`
- `category`
- `tags`
- `featured`
- `canonicalUrl`
- `readingTimeOverride`
- `socialImage`

The filename should normally match the slug, but routing must use the `slug` field from front matter. This allows files to be renamed without changing URLs accidentally.

## Author front matter

Each author should also be a Markdown file.

```md
---
slug: ayesha-jm
name: Ayesha J.
role: 3D Product Visualization Artist
shortBio: Creating commercially useful CGI, product renders, and visual systems.
avatar: /content/media/authors/ayesha-jm.jpg
avatarAlt: Portrait of Ayesha J.
email: hello@example.com
website: https://example.com
socials:
  instagram: https://instagram.com/example
  linkedin: https://linkedin.com/in/example
  artstation: https://artstation.com/example
---

Longer author biography written in Markdown.

This section can include experience, process, specialties, and selected background information.
```

### Required author fields

- `slug`
- `name`
- `role`
- `shortBio`
- `avatar`
- `avatarAlt`

### Optional author fields

- `email`
- `website`
- `socials`
- `location`
- `featured`

## Dependencies

Add these packages:

```bash
npm install react-markdown remark-gfm gray-matter
```

Recommended responsibilities:

- `gray-matter`: parse YAML front matter
- `react-markdown`: render Markdown as React content
- `remark-gfm`: support tables, task lists, strikethrough, and other GitHub-flavored Markdown features

Do not add a CMS or runtime database. The whole point is to keep content file-based and deployable as static assets, since apparently editing text should not require a control panel with seventeen loading states.

## Content loading architecture

Create the following modules:

```text
src/content/
├── loadBlogPosts.js
├── loadAuthors.js
├── parseMarkdown.js
├── validateBlogPost.js
├── validateAuthor.js
└── content.test.js
```

### Markdown discovery

Use Vite glob imports with raw file contents:

```js
const postModules = import.meta.glob('/content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})
```

Use the same pattern for authors:

```js
const authorModules = import.meta.glob('/content/authors/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})
```

The loaders should:

1. Read every matching Markdown file automatically.
2. Parse front matter and body.
3. Validate required fields.
4. Reject duplicate slugs.
5. Normalize dates and arrays.
6. Calculate reading time when no override exists.
7. Sort published posts by date, newest first.
8. Resolve each post's author record by author slug.
9. Exclude drafts from production builds.
10. Permit drafts during development through a clearly defined rule.

Suggested draft behavior:

```js
const showDrafts = import.meta.env.DEV
```

This makes drafts visible during `npm run dev` but automatically removes them from production builds.

## Live development behavior

The implementation must support Markdown edits while `npm run dev` is running.

Expected behavior:

- Editing a post body refreshes the rendered article.
- Editing front matter refreshes cards, metadata, sorting, and routes where relevant.
- Adding a new Markdown file makes it available without manually changing JavaScript.
- Deleting a Markdown file removes it from listings after Vite detects the filesystem change.
- Editing an author updates the author page and all posts referencing that author.

`import.meta.glob` creates a build-time content map while remaining part of Vite's module graph, so Markdown changes are watched during development and bundled during production builds.

If adding or deleting a file does not reliably refresh the glob in the current Vite version, add a small custom Vite plugin in `vite.config.js` that invalidates the blog and author loader modules when files under `content/blog` or `content/authors` change. Editing existing files should work through normal HMR; the plugin is only a fallback for filesystem additions and deletions.

## Public routes

Add these routes to `src/routes/guest.js` using the existing lazy route system:

```text
/blog
/blog/:slug
/authors/:slug
```

Optional future route:

```text
/authors
```

### Route behavior

#### `/blog`

- Lists all published, non-draft posts.
- Displays featured posts first when appropriate.
- Supports category and tag filters without requiring separate generated route files.
- Uses post description, date, author, cover image, and reading time.
- Shows a useful empty state when no posts exist.

#### `/blog/:slug`

- Resolves a post by its front-matter slug.
- Renders Markdown content.
- Displays title, description, publish date, optional update date, category, tags, cover image, reading time, and author summary.
- Links the author name and avatar to `/authors/:slug`.
- Shows related posts based on shared tags or category.
- Uses the current site's persistent header, footer, lazy route loading, spinner, and page scroll progress.
- Returns the existing Not Found page for an unknown slug.

#### `/authors/:slug`

- Resolves an author by front-matter slug.
- Renders the author's Markdown biography.
- Displays avatar, name, role, short bio, links, and social profiles.
- Lists every published post written by that author.
- Returns the existing Not Found page for an unknown slug.

## Components

Create reusable components rather than putting an entire publishing platform into one heroic JSX file.

```text
src/components/domain/blog/
├── BlogCard.jsx
├── BlogMeta.jsx
├── BlogProse.jsx
├── BlogTagList.jsx
├── AuthorCard.jsx
├── AuthorInline.jsx
└── RelatedPosts.jsx
```

Suggested page structure:

```text
src/pages/guest/
├── Blog/
│   └── Blog.jsx
├── BlogDetail/
│   └── BlogDetail.jsx
└── AuthorDetail/
    └── AuthorDetail.jsx
```

## Markdown rendering rules

`BlogProse` should control all Markdown output styling.

Support:

- paragraphs
- headings
- ordered and unordered lists
- blockquotes
- links
- images
- code blocks
- inline code
- horizontal rules
- tables through `remark-gfm`

Safety and consistency rules:

- Do not allow raw HTML by default.
- External links should use `rel="noreferrer"` and open in a new tab only when that is the established site behavior.
- Heading levels should remain semantically correct.
- Images need alt text in Markdown.
- Prose widths should remain readable rather than stretching across the entire monitor like a legal disclaimer designed by a railway company.
- Add stable heading IDs for deep links only if needed.

## Images and media

Recommended first implementation:

- Store editorial images under `public/content/media`.
- Reference them with root-relative paths such as `/content/media/blog/example/cover.jpg`.
- Keep image paths in front matter.
- Use `loading="lazy"` and `decoding="async"` for article images below the fold.
- Keep the article cover eager because it is above the fold.

Using `public/content/media` avoids requiring authors to add image imports to JavaScript. It also keeps Markdown fully portable.

Final filesystem location:

```text
public/content/media/blog/
public/content/media/authors/
```

The Markdown folders themselves remain at:

```text
content/blog/
content/authors/
```

## Navigation changes

Add `Blog` to:

- primary desktop navigation
- mobile navigation
- footer page navigation

Do not add every author to global navigation. Author pages are reached through post bylines and optional author listings.

## Metadata and SEO

Extend route metadata so each post and author supplies page-specific values.

For blog posts:

- title: `${post.title} | Ayesha J.`
- description: front-matter description
- canonical URL when configured
- Open Graph title, description, image, and article type
- article published and modified dates
- author information

For author pages:

- title: `${author.name} | Author`
- description: `shortBio`
- profile image metadata

The current application only sets title and description in `App.jsx`. The implementation should either:

1. Expand route metadata support in `App.jsx`, or
2. Add a small reusable metadata component rendered by blog and author pages.

Avoid a heavy head-management dependency unless the existing metadata needs become more complicated.

## Validation

Validation should fail loudly in development and during builds.

Examples of invalid content:

- missing required front-matter fields
- duplicate post slug
- duplicate author slug
- post referencing an unknown author
- malformed publish date
- non-boolean `draft` or `featured`
- tags supplied in an unsupported format
- missing cover alt text

In development, errors should identify the exact Markdown filename and field.

During `npm run build`, invalid published content should fail the build rather than silently deploying a broken page. Humans already receive enough mysterious blank screens from perfectly ordinary software.

## Tests

Add tests for:

### Content loaders

- loads all Markdown files
- parses front matter and body
- sorts posts newest first
- excludes drafts in production mode
- resolves author references
- rejects duplicate slugs
- rejects missing authors
- handles optional fields

### Blog listing

- renders published post cards
- links cards to `/blog/:slug`
- shows post metadata
- excludes drafts

### Blog detail

- renders Markdown headings, paragraphs, lists, images, and links
- renders author attribution
- renders tags and dates
- shows Not Found for an unknown slug

### Author detail

- renders author Markdown biography
- lists posts by the author
- shows Not Found for an unknown author slug

### Routing

- `/blog` resolves correctly
- `/blog/:slug` resolves correctly
- `/authors/:slug` resolves correctly
- route changes preserve the existing fixed header and footer
- page spinner and scroll progress continue to work

## Implementation phases

### Phase 1: Content foundation

- Install Markdown dependencies.
- Create `content/blog`, `content/authors`, and public media folders.
- Add one sample author and one sample post.
- Build parsing, normalization, validation, and loader utilities.
- Add loader tests.

### Phase 2: Routes and pages

- Add lazy routes for blog listing, blog detail, and author detail.
- Implement Not Found behavior.
- Connect dynamic title and description metadata.

### Phase 3: UI components

- Add blog cards, post metadata, author components, prose rendering, tags, and related posts.
- Match existing typography, spacing, motion, buttons, scrollbar, footer, and progress-bar behavior.
- Ensure all post and author images are responsive.

### Phase 4: Development and build behavior

- Confirm edits update under `npm run dev`.
- Confirm adding and deleting Markdown files updates the content set.
- Add a Vite file-watcher fallback only if glob additions or deletions fail to refresh.
- Confirm production builds include published content and omit drafts.

### Phase 5: Quality checks

Run:

```bash
npm run lint
npm test
npm run build
```

Also run the existing project checks for:

- structure
- pages
- components
- accessibility
- styling
- correctness

## Acceptance criteria

The blog feature is complete when all of the following are true:

- A new blog post can be created by adding one Markdown file.
- A new author can be created by adding one Markdown file.
- Slugs and metadata come from YAML front matter.
- Post bodies and author biographies render from Markdown.
- Blog and author Markdown edits appear during `npm run dev`.
- New files are discovered automatically.
- Blog posts link to author pages.
- Author pages list their posts.
- Unknown post and author slugs render the existing Not Found page.
- Draft posts appear in development but not production.
- Invalid content fails clearly during development and build.
- Blog and author pages remain lazy-loaded within the existing persistent site shell.
- `npm run build` produces deployable static assets with no runtime content server.

## Example editorial workflow

To publish a new post:

1. Create `content/blog/my-new-post.md`.
2. Add valid front matter including `slug`, `title`, `publishedAt`, and `author`.
3. Write the article in Markdown.
4. Add images under `public/content/media/blog/my-new-post/`.
5. Save and review immediately under `npm run dev`.
6. Set `draft: false`.
7. Run tests and `npm run build`.
8. Redeploy the generated `dist` folder.

To update an author:

1. Edit the matching file under `content/authors/`.
2. Save and review the author page and all associated post bylines.
3. Rebuild and redeploy.
