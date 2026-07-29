# Blog and Author Content

## Content system

Blog articles and authors are Markdown files with YAML front matter.

```text
content/blog/*.md
content/authors/*.md
```

Vite loads them eagerly as raw text with `import.meta.glob`. The content layer then:

1. Parses YAML front matter.
2. Validates required fields.
3. Resolves author relationships.
4. Calculates reading time.
5. Filters drafts in production.
6. Sorts posts by publication date.
7. Supplies page, card, SEO, author, and related-post data.

## Blog front matter schema

Required fields:

```yaml
slug: lowercase-kebab-case

title: Human-readable article title

description: Concise card and search description

publishedAt: YYYY-MM-DD

author: existing-author-slug

coverImage: /content/media/blog/slug/cover.webp

coverAlt: Meaningful image description

draft: true or false
```

Optional fields:

```yaml
updatedAt: YYYY-MM-DD
category: Product Visualization
tags:
  - CGI
  - E-commerce
featured: false
readingTimeOverride: 8
canonicalUrl: https://example.com/original-article
socialImage: /content/media/blog/slug/social.webp
```

Defaults:

- Missing `category` becomes `Insights`.
- Missing `tags` becomes an empty array.
- Missing `featured` becomes `false`.

## Complete post template

> **Locale requirement:** stable post infrastructure belongs in the manifest. Every visitor-facing field, including title, description, category, tags, alt text, and `bodyMarkdown`, belongs in the matching slug record in every `src/locales/<locale>/blog.json` file. Add or edit all locale records together.

```md
---
slug: example-article
title: Example Article Title
description: A specific summary of what the reader will learn and why it matters.
publishedAt: 2026-08-01
updatedAt: 2026-08-01
author: ayesha-jm
category: Product Visualization
tags:
  - CGI
  - Product Rendering
coverImage: /content/media/blog/example-article/cover.webp
coverAlt: Photorealistic product render used to illustrate the article
featured: false
draft: true
---

Opening paragraph that states the practical problem.

## First useful section

Explain one idea clearly.

## Second useful section

Use examples, a short list, or a table when it improves understanding.

## Practical conclusion

End with a useful decision, checklist, or principle instead of repeating the introduction.
```

## Validation rules

The build throws an error when:

- Front matter is missing or malformed.
- A required string is empty.
- The slug contains uppercase letters, spaces, underscores, or unsupported punctuation.
- A date is not valid `YYYY-MM-DD`.
- `draft` is not a boolean.
- `featured` is present but not a boolean.
- `tags` is not an array of non-empty strings.
- `readingTimeOverride` is not a positive number.
- The slug duplicates another post.
- The author slug does not exist.

Do not quote booleans:

```yaml
draft: false      # correct
draft: "false"    # wrong, this is a string
```

## Draft behavior

- Drafts appear during development.
- Drafts are excluded from production builds.
- Draft cards and pages display a draft label in development.
- A draft does not enter production prerender paths, sitemap output, or published related posts.

Set `draft: false` only when the article is ready to publish.

## Featured article behavior

The Blog listing chooses the first post where `featured` is true.

The featured post:

- Appears in the large opening card.
- Is excluded from the paginated standard grid.

Keep only one featured post unless deliberately changing selection logic. Multiple true values create an implicit winner based on date ordering, a charming way to make editorial intent mysterious.

## Categories and tags

Categories are broad editorial sections. Use a stable vocabulary, for example:

- Product Visualization
- Production Process
- Art Direction
- E-commerce
- CGI Animation
- 3D Modeling

Tags are more specific discovery terms, for example:

- CGI
- Product Rendering
- Product Launch
- Workflow
- Lifestyle Rendering
- Material Development
- Amazon Listings

Related-post scoring gives:

- 3 points for the same category.
- 1 point per shared tag.

It then sorts by score and publication date and returns up to three posts.

Choose categories and tags truthfully because they drive visible filtering, search, related content, and article metadata.

## Blog listing search

Search currently checks:

- Title.
- Description.
- Category.
- Tags.

It does not search the full Markdown body.

The listing displays six standard posts per page after excluding the featured post.

## Writing guidelines

### Article purpose

Each article should answer a specific practical question about product visualization, CGI production, e-commerce imagery, art direction, or asset planning.

Good subjects:

- How to prepare CAD for visualization.
- When lifestyle rendering is preferable to photography.
- How to plan marketplace image hierarchies.
- What makes a reusable material library.
- How to scope stills and animation together.

Weak subjects:

- Generic inspiration with no actionable point.
- Broad “future of 3D” claims with no evidence.
- Articles written solely to repeat service-page copy.

### Structure

Recommended length is not rigid, but most useful posts should include:

1. A direct opening problem.
2. Three to six clear H2 sections.
3. Concrete examples or lists.
4. A practical conclusion.

Use H2 and H3 headings. The article title is already the page's H1.

Do not add an H1 inside Markdown.

### Paragraphs

Keep paragraphs focused. Two to five sentences is usually sufficient.

Avoid repeatedly beginning sections with “In today's digital landscape,” an opening so overworked that even the landscape has requested leave.

### Claims

Do not invent:

- Client results.
- Conversion percentages.
- Revenue improvements.
- Awards.
- Industry statistics.
- Project details not supplied by the editor.

Use conditional language when describing typical benefits.

### Links

External HTTP links automatically open in a new tab with `rel='noreferrer'`.

Use descriptive link text. Avoid “click here.”

### Markdown supported

The renderer supports:

- H2 and H3 headings.
- Paragraphs.
- Ordered and unordered lists.
- Tables.
- Blockquotes.
- Links.
- Images.
- Inline code.
- Fenced code blocks.
- Horizontal rules.

## Reading time

Reading time is calculated at 220 words per minute and rounded up, with a minimum of one minute.

Use `readingTimeOverride` only when the calculated value is misleading due to unusually visual, tabular, or code-heavy content.

## Author schema

Required author fields:

```yaml
slug: author-slug
name: Author Name
role: Author Role
shortBio: Concise author biography
avatar: /content/media/authors/author-slug.jpg
avatarAlt: Description of portrait
```

Optional fields:

```yaml
email: author@example.com
website: https://example.com
location: Country or city
featured: true
socials:
  instagram: https://instagram.com/example
  linkedin: https://linkedin.com/in/example
  artstation: https://artstation.com/example
```

The Markdown body becomes the long biography shown on the author page.

## Complete author template

> **Locale requirement:** keep the author slug, media path, and relationships stable. Add the name, role, biographies, location label, avatar alt text, and body Markdown to the same author record in every locale file.

```md
---
slug: author-slug
name: Author Name
role: 3D Visualization Artist
shortBio: A concise biography used on cards, article pages, and search metadata.
avatar: /content/media/authors/author-slug.jpg
avatarAlt: Portrait of Author Name
email: author@example.com
website: https://example.com
location: Pakistan
featured: false
socials:
  linkedin: https://linkedin.com/in/example
---

Author Name works across **product visualization and commercial CGI**.

## Areas of focus

- Product modeling
- Material development
- Art direction
```

## Publishing checklist

- [ ] Slug is unique and lowercase kebab-case.
- [ ] Author slug exists.
- [ ] Dates use `YYYY-MM-DD`.
- [ ] Description is concise and specific.
- [ ] Cover file exists.
- [ ] Cover alt text describes the visible image.
- [ ] Category and tags use consistent vocabulary.
- [ ] Article contains no H1.
- [ ] Claims are supported.
- [ ] Draft remains true until review is complete.
- [ ] `npm test` passes.
- [ ] The post or author slug has complete mirrored records in every locale.
- [ ] Localized titles, descriptions, categories, tags, alt text, and Markdown render on each locale route.
- [ ] `npm run audit:locales` and locale parity tests pass.
- [ ] `npm run build` prerenders the article and author page.

## Bilingual JSON content

Blog and author content is locale-backed. Stable infrastructure such as slugs, dates, author relationships, draft state, and media paths lives in manifests; visible metadata and Markdown strings live in `src/locales/<locale>/blog.json` and `authors.json`.

Every post and author slug in the manifest must exist in every locale. Keep the JSON shapes mirrored and preserve named fields such as `bodyMarkdown` and biography Markdown. Search and filters operate on localized titles, descriptions, categories, tags, and bodies.

Arabic content should be a genuine editorial translation in professional Modern Standard Arabic suited to Saudi commercial audiences. Keep recognized technical terms such as CGI, CAD, STEP, OBJ, FBX, and STL where clarity benefits. Run locale parity tests after every content edit.
