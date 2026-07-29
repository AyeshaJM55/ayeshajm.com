# SEO, Prerendering, and Indexing

## SEO architecture

SEO is resolved from route records and content data.

Files:

```text
src/routes/guest.js
src/seo/routeSeo.js
src/seo/SeoTags.jsx
src/entry-server.jsx
scripts/prerender.mjs
vite.config.js
```

## Metadata output

`SeoTags` renders:

- `<title>`
- Description
- Robots and Googlebot directives
- Optional author
- Canonical URL
- Open Graph title, description, type, URL, image, and image alt
- Twitter card metadata
- Article publication and modification dates
- Article author, section, and tags
- JSON-LD structured data

Do not manually insert duplicate title or description tags into page components.

## Route metadata

Static route records include values such as:

```js
{
  path: '/about',
  image: aboutSocialImage,
  title: 'About',
  description: 'About Ayesha J. and the process behind clear, commercially useful 3D product visuals.',
  ...aboutPage,
}
```

Dynamic routes use getters:

```js
getTitle: ({ slug }) => getProjectBySlug(slug)?.title ?? 'Page Not Found'
getDescription: ({ slug }) => getProjectBySlug(slug)?.summary ?? '...'
getImage: ({ slug }) => getProjectBySlug(slug)?.coverImage
```

## Document title convention

Default static title format:

```text
Ayesha J. | Page Title
```

Blog and author pages define more natural custom formats.

Keep titles concise and readable. Do not stuff every service and location into the title.

## Descriptions

Descriptions should:

- Accurately summarize the page.
- Include the primary service or topic naturally.
- Be useful even when shown without surrounding page context.
- Avoid unverified claims.

When substantially changing a static page's focus, update its route description.

## Canonical URLs

Default canonical URLs are built from:

```js
site.url + pathname
```

Blog posts may override canonical with front matter:

```yaml
canonicalUrl: https://example.com/original-article
```

Use this only when the content's preferred canonical genuinely lives elsewhere.

## Social images

Static routes specify an imported image.

Dynamic sources:

- Blog: `socialImage` or `coverImage`.
- Author: avatar.
- Project: cover image.
- Service: currently inherits route image behavior and structured data source.

`toAbsoluteUrl()` converts relative URLs to absolute URLs using `https://ayeshajm.com`.

## Robots behavior

Normal routes receive:

```text
index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
```

The wildcard Not Found route receives:

```text
noindex, nofollow
```

Do not make legitimate pages noindex without an explicit publishing decision.

## Structured data

All pages include a `WebSite` entity and a base page entity.

Special page types:

### Homepage

- `WebPage`
- `ProfessionalService`
- Includes email and service types.

### Blog listing

- `Blog`

### Blog article

- `BlogPosting`
- Headline
- Description
- Image
- Publication and modification dates
- Category and keywords
- Author Person
- Publisher Person

### Author

- `ProfilePage`
- Main Person entity
- Role
- Description
- Image
- Email
- Website
- Social profiles

### Service

- `Service`
- Name
- Description
- Image
- Provider Person

### Work project

- `CreativeWork`
- Name
- Description
- Image
- Creator Person
- Year
- Category/genre

If a new content type is added, decide whether its structured-data type should change. Do not blindly call everything a WebPage when a more accurate schema exists, nor invent a schema type because it sounds impressive.

## Prerendered content

Every production route receives full HTML, not merely metadata.

This includes:

- Header and footer.
- Page headings and body copy.
- Images and links.
- Blog article Markdown output.
- Author biography.
- About page sections.
- Service and case-study content.
- Site loader overlay markup.

The site loader is hidden by `<noscript>` so non-JavaScript visitors and crawlers are not blocked by a permanent overlay.

## About page SEO requirement

The About page must continue to prerender its complete content.

Verify after editing:

```bash
npm run build
grep -n "Ayesha J. | About" dist/about/index.html
grep -n "Visualizing products" dist/about/index.html
grep -n "Realism with a job" dist/about/index.html
```

Also verify:

- Canonical is `https://ayeshajm.com/about`.
- Robots allow indexing.
- Description reflects the current page positioning.
- Social image is present.
- The H1 is in the generated HTML.

## Blog SEO behavior

Blog Markdown automatically supplies:

- Article title.
- Description.
- Canonical override when supplied.
- Publication date.
- Update date.
- Author.
- Category.
- Tags.
- Social image.
- BlogPosting structured data.

Updating an article date or title therefore changes HTML metadata and sitemap modification data after rebuild.

## Sitemap

`scripts/prerender.mjs` writes `dist/sitemap.xml` from successful non-404 prerender results.

`lastmod` uses:

1. `modifiedAt`
2. `publishedAt`
3. Nothing when neither exists

Blog posts therefore receive useful modification dates. Static pages currently do not have explicit modification dates.

## Robots file

Production build writes:

```text
User-agent: *
Allow: /

Sitemap: https://ayeshajm.com/sitemap.xml
```

## SEO checklist for a new page

- [ ] Route title is present.
- [ ] Route description is specific.
- [ ] Relevant social image is assigned.
- [ ] Canonical URL is correct.
- [ ] One H1 exists.
- [ ] Important copy appears in prerendered HTML.
- [ ] Page is included in static or dynamic prerender paths.
- [ ] Structured data type is appropriate.
- [ ] Not Found still returns 404 and noindex.
- [ ] Sitemap includes the route.

## Inspecting generated output

Useful commands:

```bash
npm run build
find dist -name index.html | sort
grep -Rni "<title>" dist --include='*.html'
grep -Rni "application/ld+json" dist --include='*.html'
grep -n "<loc>" dist/sitemap.xml
cat dist/robots.txt
```

Never judge prerender integrity solely from the live hydrated DOM. Inspect the generated source, because search systems do not owe anyone the courtesy of executing every animation library first.

## Localized SEO and prerender output

Every route has an English canonical URL and an Arabic canonical URL under `/ar`. SEO output includes reciprocal `hreflang="en"`, `hreflang="ar-SA"`, and `x-default` links, plus `og:locale` and `og:locale:alternate` values.

Structured data uses localized entity text and clean language identifiers: `en-US` or `ar-SA`. Dynamic blog, author, service, and work routes resolve entities with the current locale. Missing dynamic entities are `noindex, nofollow`.

The sitemap contains both locale variants and reciprocal alternates. Arabic HTML must contain Arabic visible content and metadata during prerendering, not only after hydration. Inspect `dist/index.html`, `dist/ar/index.html`, representative detail pages, and `dist/sitemap.xml` after production builds.
