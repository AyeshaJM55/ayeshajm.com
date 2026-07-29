# Locale support plan: English and Arabic

## Goal

Add a future-ready localization system for English and Arabic that centralizes every visitor-facing string in mirrored JSON files, renders English left-to-right and Arabic right-to-left, preserves prerendering and SEO, and presents polished Arabic suitable for the Saudi market.

This plan treats localization as a content, layout, accessibility, routing, and SEO change rather than the usual human tradition of replacing five labels and declaring victory.

## Decisions locked by this plan

1. English remains the default locale and keeps the existing unprefixed URLs, such as `/about` and `/services/3d-modeling`.
2. Arabic uses an `/ar` prefix, such as `/ar/about` and `/ar/services/3d-modeling`.
3. Stable route segments, entity slugs, IDs, asset keys, form values, and query parameter values remain language-neutral English identifiers. Visible labels are localized.
4. The URL is the source of truth for the current locale. The selected locale is also stored for convenience, but it must never override an explicit locale in the URL.
5. Arabic content uses professional Modern Standard Arabic suited to Saudi business audiences. It should be direct, natural, premium, and commercially clear, without Egyptian, Levantine, or overly classical phrasing.
6. Arabic typography uses self-hosted **IBM Plex Sans Arabic** with fallbacks to `Noto Sans Arabic`, `Tahoma`, `Arial`, and `sans-serif`.
7. Locale metadata contains only the requested `symbol` and `mode` properties.
8. All public UI copy, accessible labels, statuses, metadata, service/project descriptions, testimonials, FAQs, author content, and blog content moves into locale JSON files.
9. Existing Markdown bodies are migrated into JSON as Markdown strings so `ReactMarkdown` can continue rendering rich article and author content while JSON remains the single content source.
10. Documentation updates are the final implementation phase and target the repository-level `docs/` directory, which is `../docs/` when commands are run from `project/`. No documentation should be created under `project/docs/`.

## Locale registry

Create `src/locales/locales.json` with no display names or extra locale metadata:

```json
{
  "en": {
    "symbol": "EN",
    "mode": "LTR"
  },
  "ar": {
    "symbol": "AR",
    "mode": "RTL"
  }
}
```

Runtime code will normalize `LTR` and `RTL` to valid HTML `dir` values, `ltr` and `rtl`.

Adding another language later should require:

1. One registry entry containing only `symbol` and `mode`.
2. One mirrored locale content directory.
3. A locale prefix and SEO locale mapping.
4. Translation parity validation passing without component changes.

## Proposed content structure

Use multiple focused JSON files rather than one giant object that eventually becomes a small, resentful database.

```text
src/locales/
├── locales.json
├── en/
│   ├── common.json
│   ├── navigation.json
│   ├── accessibility.json
│   ├── seo.json
│   ├── forms.json
│   ├── services.json
│   ├── projects.json
│   ├── authors.json
│   ├── blog.json
│   └── pages/
│       ├── home.json
│       ├── about.json
│       ├── services.json
│       ├── service-detail.json
│       ├── portfolio.json
│       ├── work-detail.json
│       ├── blog.json
│       ├── blog-detail.json
│       ├── author-detail.json
│       ├── contact.json
│       ├── book.json
│       └── not-found.json
└── ar/
    └── identical file and key structure
```

### File responsibilities

- `common.json`: site name, email display value, reusable CTA labels, generic headings, pagination words, draft labels, copyright, and shared status messages.
- `navigation.json`: primary navigation, footer navigation, header/menu labels, and locale-switcher accessibility copy.
- `accessibility.json`: loader labels, carousel labels, gallery labels, breadcrumbs, menu controls, scroll controls, form hints, and other screen-reader-only copy.
- `seo.json`: static route titles/descriptions, missing-content fallbacks, Open Graph locale values, and reusable document-title patterns.
- `forms.json`: field labels, placeholders, select options, validation/status copy, and mail subject templates.
- `services.json`: service titles, short titles, descriptions, introductions, deliverables, ideal-use lists, process steps, and FAQs keyed by stable service slug.
- `projects.json`: project titles, categories, summaries, challenge/approach/outcome copy, clients, and deliverables keyed by stable project slug.
- `authors.json`: author role, biographies, image alt copy, location display copy, and social labels keyed by author slug.
- `blog.json`: post front matter and `bodyMarkdown` keyed by post slug.
- `pages/*.json`: composition-specific headings and supporting copy that does not belong to an entity.

## JSON schema principles

1. English and Arabic must have identical key paths and data shapes.
2. Arrays that represent entities must use stable IDs or slugs rather than translated labels as keys.
3. Components must filter and compare by IDs, never by translated values such as `All` or `الكل`.
4. Asset imports remain in small JavaScript manifests because JSON cannot import bundled files.
5. JSON references assets through stable keys, for example `"heroMedia": "productDesign"`.
6. Adapter modules join translated JSON records with asset manifests at runtime.
7. No JSX component may contain visitor-facing fallback English. A missing key must fail validation in development and tests.
8. Brand names, client names, email addresses, URLs, and established platform names remain unchanged unless a deliberate Arabic display form is defined.
9. Interpolated strings use named placeholders, not concatenated sentence fragments.

Example:

```json
{
  "portfolio": {
    "results": {
      "one": "{count} project shown",
      "other": "{count} projects shown"
    }
  }
}
```

Arabic plural forms should support `zero`, `one`, `two`, `few`, `many`, and `other`, selected with `Intl.PluralRules('ar-SA')`.

## Runtime locale architecture

Create a small first-party locale layer rather than adding a heavy dependency for a two-language static site.

### New modules

```text
src/locales/
├── LocaleProvider.jsx
├── useLocale.js
├── getLocaleFromPath.js
├── localizePath.js
├── loadLocaleContent.js
├── formatMessage.js
├── formatters.js
├── validateLocaleParity.js
└── assetManifests.js
```

### `LocaleProvider` responsibilities

- Receive the initial locale from the current route during prerender and hydration.
- Expose `locale`, `symbol`, `mode`, `direction`, `content`, `setLocale`, `localizePath`, date/number formatters, and plural helpers.
- Set `<html lang>` and `<html dir>` whenever the locale changes.
- Set `data-locale` and `data-direction` on `<html>` for styling hooks.
- Keep the locale route-driven so client hydration matches prerendered HTML.
- Save a successful user selection to `localStorage` under a versioned key such as `ayeshajm.locale.v1`.
- Never read `window`, `document`, or storage during server rendering.

### Translation access

Prefer structured content access over scattering string-key calls through markup:

```jsx
const { content, formatDate, locale } = useLocale()
const copy = content.pages.home
```

Use `formatMessage` only for interpolation and pluralized strings.

This keeps arrays such as FAQs, process steps, project records, and form options naturally data-driven.

## Routing strategy

### English routes

Keep all current URLs unchanged:

```text
/
/about
/services
/services/:slug
/portfolio
/work/:slug
/blog
/blog/:slug
/authors/:slug
/contact
/book
```

### Arabic routes

Create matching routes under `/ar`:

```text
/ar
/ar/about
/ar/services
/ar/services/:slug
/ar/portfolio
/ar/work/:slug
/ar/blog
/ar/blog/:slug
/ar/authors/:slug
/ar/contact
/ar/book
```

### Route implementation

- Extend route records with locale-independent SEO/content IDs instead of embedded English copy.
- Update `matchRoute` to strip and return a supported locale prefix before matching the internal route.
- Return `{ locale, pathnameWithoutLocale, route, params }` from route matching.
- Preserve search parameters and hashes during language changes.
- `localizePath(pathname, locale)` must remove any existing locale prefix and apply the target locale prefix only when it is not the default locale.
- The 404 route must render in the requested supported locale.
- Unsupported locale-like prefixes must resolve through the normal 404 path rather than silently displaying mixed-language content.

## Prerendering and hydration

Update `src/entry-server.jsx` and `scripts/prerender.mjs` so every public route is generated in English and Arabic.

### Required behavior

- English static files retain their existing output locations.
- Arabic files output under `dist/ar/...`.
- `renderPage` receives or derives the locale and supplies it to `App` and `LocaleProvider`.
- Prerendered `<html>` receives the correct `lang` and `dir` before first paint.
- Arabic prerendered pages must not briefly render English or LTR layout before hydration.
- The existing prerender viewport guard and scroll lock must continue working for both directions.
- The client derives its initial locale from the URL before calling `hydrateRoot`.
- The site loader remains locale-neutral visually, but its accessible label comes from locale JSON.
- The simple route spinner uses a localized accessible label.

## SEO and indexing

Localization must extend the existing SEO system rather than merely translating visible headings while search engines receive English metadata, a surprisingly popular way to sabotage otherwise decent work.

### Required updates

- Localize route titles, document titles, descriptions, image alt text, article metadata, service metadata, and structured-data text.
- Set Open Graph locale to `en_US` for English and `ar_SA` for Arabic.
- Add `og:locale:alternate` for every other supported locale.
- Add reciprocal `<link rel="alternate" hreflang="en">` and `hreflang="ar-SA">` tags.
- Add an `x-default` alternate pointing to the English default URL.
- Give each locale its own canonical URL.
- Add `inLanguage` to WebSite, WebPage, BlogPosting, ProfilePage, Service, and CreativeWork structured data.
- Generate sitemap entries for both English and Arabic URLs.
- Keep entity slugs stable while localizing all displayed names and descriptions.
- Preserve article publication and modification dates across locales.
- Ensure Arabic article and author content is included in prerendered HTML rather than loaded only after hydration.

## Arabic typography

### Primary font

Use **IBM Plex Sans Arabic** for Arabic UI and content.

Reasons:

- Clear at small navigation and form sizes.
- Contemporary without feeling casual or regionally narrow.
- Suitable for professional Saudi technology, commerce, and creative-service audiences.
- Offers a useful weight range for the existing typography hierarchy.
- Pairs acceptably with the current Latin sans-serif appearance.

### Loading strategy

- Self-host only the required WOFF2 weights, likely 400, 500, 600, and 700, under `public/fonts/ibm-plex-sans-arabic/`.
- Define `@font-face` rules with `font-display: swap`.
- Preload only the most important Arabic weight on Arabic prerendered pages.
- Never fetch fonts from Google at runtime.

### Font tokens

Add direction-aware tokens:

```css
:root {
  --font-ui: Arial, Helvetica, sans-serif;
  --font-arabic: "IBM Plex Sans Arabic", "Noto Sans Arabic", Tahoma, Arial, sans-serif;
}

html[lang="ar"] {
  --font-ui: var(--font-arabic);
}
```

The monogram and proper Latin brand marks may retain their Latin font explicitly.

## Saudi Arabic translation standard

Create a translation glossary before translating files. Use professional Modern Standard Arabic with familiar Saudi commercial wording.

### Preferred terms

| English | Preferred Arabic |
| --- | --- |
| Home | الرئيسية |
| About | نبذة |
| Services | الخدمات |
| Portfolio | الأعمال |
| Blog | المدونة |
| Contact | تواصل |
| Book a call | احجز مكالمة |
| Start a project | ابدأ مشروعك |
| Discuss a project | ناقش مشروعك |
| View all projects | عرض جميع الأعمال |
| Featured work | أعمال مختارة |
| Product visualization | التصور ثلاثي الأبعاد للمنتجات |
| 3D modeling | النمذجة ثلاثية الأبعاد |
| Photorealistic renders | تصيير واقعي للمنتجات |
| CGI animation | رسوم متحركة بتقنية CGI |
| Lifestyle renders | تصيير المنتجات ضمن مشاهد واقعية |
| Project inquiry | استفسار عن مشروع |
| Project details | تفاصيل المشروع |
| Deliverables | المخرجات المطلوبة |
| Timeline | الجدول الزمني |
| Budget range | الميزانية المتوقعة |
| Previous service | الخدمة السابقة |
| Next service | الخدمة التالية |
| Related work | أعمال ذات صلة |
| Read article | قراءة المقال |
| Search | بحث |
| Clear filters | مسح عوامل التصفية |

### Translation rules

- Translate meaning and sales intent, not English sentence structure.
- Keep sentences concise enough for the current visual layouts.
- Avoid excessive passive voice and ceremonial wording.
- Use `أنت`-neutral imperative phrasing that works for mixed audiences.
- Use `ثلاثي الأبعاد` consistently rather than alternating technical forms.
- Keep `CGI`, CAD, STEP, OBJ, FBX, STL, UV, Amazon, Instagram, LinkedIn, and ArtStation in their recognized forms where that improves clarity.
- Use Arabic punctuation and spacing.
- Translate image alt text by describing the image naturally, not by copying adjacent headings.
- Do not translate personal names, client names, email addresses, file extensions, or URLs.
- Have a fluent Arabic reviewer familiar with Saudi commercial copy review the final Arabic set before release.

## Direction and layout conversion

Setting `dir="rtl"` is necessary but not remotely sufficient.

### Global direction

- Apply `lang="ar"` and `dir="rtl"` to `<html>`.
- Use CSS logical properties such as `margin-inline`, `padding-inline`, `inset-inline`, `border-inline-start`, and `text-align: start`.
- Replace directional layout utilities where semantics should flip.
- Preserve intentionally direction-neutral centered layouts.

### Audit required surfaces

- Header brand, navigation, locale switcher, CTA, and mobile menu.
- Footer columns, social links, email alignment, cursor label, and copyright row.
- Breadcrumb separators and order.
- Previous/next controls and arrow icons.
- Carousels and Swiper keyboard/a11y messages.
- Testimonial arrows and pagination labels.
- Service and project pagination.
- Scroll-to-top button positioning.
- Horizontal reveal animations and slide directions.
- Form labels, selects, placeholders, and helper text.
- Blog prose blockquotes, lists, tables, code blocks, and embedded images.
- Contact CTA borders currently expressed with left/right-specific utilities.
- Any `text-left`, `text-right`, `left-*`, `right-*`, `pl-*`, `pr-*`, `border-l`, or `border-r` use.

### Direction-sensitive icons

Create a small `DirectionalIcon` helper or derive icon selection from the locale direction.

- Previous points toward inline start.
- Next points toward inline end.
- External-link arrows may remain visually consistent if they communicate opening rather than reading direction.
- Carousel controls should reverse appropriately in Arabic.

### Bidirectional content

- Email, URLs, file formats, and code blocks use `dir="ltr"`.
- Free-text fields use `dir="auto"` where practical.
- Number/date output uses locale formatters rather than string concatenation.

## Header changes

### Desktop

- Keep the brand on the inline start.
- Reduce primary navigation size from `text-sm` to approximately `text-xs` or `text-[0.78rem]`.
- Reduce desktop navigation gaps from `gap-8` to approximately `gap-5` or `gap-6` after visual verification.
- Keep the desktop `Book a call` CTA.
- Add the reusable locale switcher at the extreme inline end, after the desktop CTA.
- The switcher displays the current locale symbol, initially `EN`, and allows changing to `AR`.

### Mobile

- Remove `Book a call` from the row beside the hamburger.
- Place the locale switcher immediately on the inline-start side of the hamburger. In English this appears to the hamburger's left; in Arabic logical layout naturally mirrors it.
- Add `Book a call` as the final prominent item inside the expanded mobile menu.
- Close the mobile menu after selecting any navigation item, CTA, or locale.
- Ensure menu radius and scroll animation behavior remain stable when Arabic labels wrap.

### Locale switcher component

Create `src/components/navigation/LocaleSwitcher/` with:

- Current locale symbol as the trigger.
- A keyboard-accessible menu of all configured locale symbols.
- `aria-expanded`, `aria-haspopup`, localized accessible label, Escape handling, outside-click handling, and visible focus.
- No hard-coded two-language toggle logic so a third locale can be added later.
- Path-preserving navigation through `localizePath`.
- Active-locale indication that does not rely on color alone.

## Data and content migration

### Shared site data

- Move visible values from `src/data/site.js` into locale JSON.
- Keep non-display infrastructure values such as the canonical base URL in a small non-localized config module if necessary.

### Navigation

- Keep route paths and active prefixes in JavaScript.
- Move labels and accessible names to JSON keyed by route ID.

### Services

- Move every visible service field from `src/data/services.js` into mirrored JSON.
- Keep asset imports, service order, slugs, and related IDs in an asset/entity manifest.
- Return localized service records through `getServices(locale)` and `getServiceBySlug(slug, locale)`.

### Projects

- Move every visible project field from `src/data/projects.js` into mirrored JSON.
- Keep images, project order, slugs, service relations, and next-project relations in a manifest.
- Categories use stable category IDs with localized labels.

### Home page data

Move the following into `pages/home.json` or dedicated entity JSON:

- Hero text and image alt.
- Partner section accessible labels.
- Highlight labels and descriptions.
- Featured-work headings, CTA labels, and helper copy.
- Service carousel headings and accessibility messages.
- Testimonials, roles, section copy, and carousel labels.
- Book-now strip text.
- Contact form labels, placeholders, options, status messages, and helper text.
- FAQs.
- Decorative-section accessibility labels where meaningful.

### Remaining pages and components

Move all visible and accessible copy from:

- About
- Services listing
- Service detail
- Portfolio
- Work detail
- Blog listing
- Blog detail
- Author detail
- Contact
- Book
- Not found
- Header
- Footer
- Loaders
- Scroll controls
- Breadcrumbs
- Media galleries
- Related content
- Reusable CTAs

### Blog and author migration

Replace locale-independent Markdown glob loading with JSON-backed localized content.

Recommended shape:

```json
{
  "product-rendering-for-ecommerce": {
    "title": "...",
    "description": "...",
    "categoryId": "product-visualization",
    "tags": ["..."],
    "coverAlt": "...",
    "bodyMarkdown": "..."
  }
}
```

Keep publication dates, slugs, author relationships, draft state, featured state, image paths, and canonical infrastructure in a non-translated content manifest when they are identical across locales.

The Arabic blog body must be a genuine editorial translation, not machine-translated filler. Technical terms should follow the glossary consistently.

## Formatting rules

Create centralized formatters:

- English dates: `en-US` with Gregorian calendar.
- Arabic dates: `ar-SA-u-ca-gregory-nu-arab` so the site uses Saudi Arabic conventions while preserving Gregorian publication dates.
- Reading time: localized label and plural handling.
- Counts: `Intl.NumberFormat` and `Intl.PluralRules`.
- Service/project indexes may remain two-digit visual numbers but must render with locale-aware digits unless a design review intentionally keeps Latin numerals.
- Copyright year uses localized number formatting.

## Styling work

- Add Arabic font tokens and font-face declarations.
- Add direction-aware letter-spacing rules. Arabic must not inherit Latin uppercase tracking values.
- Disable `uppercase` transformations for Arabic text because Arabic has no case and extra tracking degrades readability.
- Introduce utility classes or locale-aware components for eyebrow labels so Arabic uses appropriate weight and spacing.
- Review large Arabic headings for line-height and wrap behavior; Arabic generally needs more line-height than the current tightly tracked Latin display text.
- Use `text-align: start` rather than fixed left/right alignment.
- Replace directional margins, paddings, borders, and positions with logical equivalents.
- Verify the fixed header and footer fit at 320px, 375px, tablet, desktop, and wide desktop widths in both languages.

## Accessibility requirements

- Localize every `aria-label`, status message, screen-reader-only string, and carousel announcement.
- Update `<html lang>` and `dir` before first paint.
- The locale menu must work with keyboard, pointer, and screen readers.
- Announce locale changes only when useful; do not add a noisy live-region announcement on every navigation.
- Ensure Arabic focus order follows logical DOM order.
- Keep email and URL content understandable with bidi isolation using `<bdi>` or explicit direction where required.
- Use localized labels for Previous, Next, Page, Go to slide, Open project, gallery views, and loader states.
- Test color contrast and focus states after font and header sizing changes.

## Testing plan

### Locale schema tests

Add tests that:

- Validate every configured locale has a matching content directory.
- Recursively compare English and Arabic JSON key paths and value types.
- Detect missing, extra, empty, or malformed localized entries.
- Validate every service, project, author, and post manifest ID exists in every locale.
- Validate registry entries contain only `symbol` and `mode`.

### Runtime tests

- English route renders `lang="en"` and `dir="ltr"`.
- Arabic route renders `lang="ar"` and `dir="rtl"`.
- Locale switching preserves route, query string, and hash.
- Switching from an Arabic route to English removes `/ar` correctly.
- Unsupported locale prefixes render the localized or default 404 safely.
- Explicit URL locale wins over saved storage preference.
- Hydration does not emit locale or direction mismatch warnings.

### Header tests

- Desktop navigation uses the reduced text size.
- Desktop CTA remains visible.
- Desktop locale switcher is the last control.
- Mobile top row contains locale switcher and hamburger but no `Book a call` CTA.
- Mobile menu contains the localized `Book a call` item.
- Selecting a locale or mobile link closes the menu.
- Current locale is marked accessibly.

### Content tests

- Services, projects, page headings, forms, status messages, and SEO switch language completely.
- No English UI fallback appears on Arabic routes except deliberate proper nouns and technical terms.
- Arabic service/project/post records resolve by the same stable slugs.
- Blog search and filters operate on localized Arabic titles, descriptions, categories, tags, and article text where intended.
- Category filtering uses stable IDs rather than translated labels.

### Direction tests

- Previous/next icons and controls mirror.
- Breadcrumb order and separators are correct.
- Header, footer, forms, pagination, project cards, service details, carousels, and CTAs have no clipped Arabic text.
- Email, URLs, code, and file formats remain readable LTR inside Arabic pages.

### SEO/prerender tests

- All English and Arabic static paths are generated.
- Arabic output includes `lang="ar"`, `dir="rtl"`, Arabic title/description, and `og:locale=ar_SA`.
- Reciprocal hreflang, canonical, alternate locale, and x-default tags are correct.
- Sitemap includes both locale variants.
- Structured data includes localized text and `inLanguage`.
- The prerender-only viewport guard and scroll lock remain valid for both locales.

### Hard-coded copy audit

Add a focused script that scans production JSX/JS for suspicious visitor-facing string literals while allowing:

- CSS classes
- DOM attribute values
- route paths
- IDs
- technical constants
- asset paths
- structured-data vocabulary

The script should fail CI for newly introduced hard-coded public copy.

## Implementation sequence

### Phase 1: Locale foundations

1. Add `locales.json`.
2. Add mirrored English and Arabic JSON structure.
3. Add locale loading, path parsing, message formatting, date/number formatting, and parity validation.
4. Add `LocaleProvider` around the app.
5. Make locale and direction deterministic during SSR and hydration.

### Phase 2: Routing, prerendering, and SEO

1. Add `/ar` route support while preserving existing English URLs.
2. Generate Arabic prerender paths.
3. Set document language/direction in static output.
4. Localize SEO and structured data.
5. Add canonical, hreflang, Open Graph locale alternates, and bilingual sitemap entries.

### Phase 3: Shared layout and header

1. Build `LocaleSwitcher`.
2. Reduce desktop nav typography and spacing.
3. Keep desktop `Book a call` and place locale control at the extreme end.
4. Remove mobile-row `Book a call` and add it inside the hamburger menu.
5. Put locale control beside the mobile hamburger using logical ordering.
6. Localize header, footer, loader, scroll, breadcrumb, CTA, and accessibility copy.

### Phase 4: Centralize structured site content

1. Migrate site, navigation, forms, home copy, FAQs, testimonials, and shared component copy.
2. Split services and projects into stable manifests plus locale JSON.
3. Replace translated-value comparisons with stable IDs.
4. Update all pages to read localized structured data.

### Phase 5: Blog and author localization

1. Migrate author front matter and biography Markdown into JSON.
2. Migrate blog front matter and article Markdown into JSON.
3. Adapt loaders, validators, search, filters, related-post logic, and SEO.
4. Translate all existing posts and author content into Saudi-appropriate Arabic.
5. Update content authoring validation to require locale parity.

### Phase 6: RTL and typography refinement

1. Self-host IBM Plex Sans Arabic.
2. Replace directional CSS with logical properties or tested RTL variants.
3. Mirror semantic icons and navigation controls.
4. Tune Arabic tracking, line-height, weight, and heading wrapping.
5. Verify forms, tables, code, email, URLs, carousels, and motion.

### Phase 7: Verification

1. Run lint and all Vitest suites.
2. Run locale parity and hard-coded-copy audits.
3. Run frontend structure, component, accessibility, styling, and correctness checks.
4. Build client and server bundles.
5. Prerender all English and Arabic paths.
6. Inspect representative static HTML for both locales.
7. Perform manual responsive checks at mobile, tablet, desktop, and wide desktop sizes.
8. Complete fluent Saudi Arabic editorial review.

### Phase 8: Documentation

Update the repository-level `docs/` directory, accessed as `../docs/` from `project/`. Do not create `project/docs/`.

At minimum:

1. Update `../docs/README.md` with the locale system entry points.
2. Update architecture/routing documentation with default and prefixed locale routing.
3. Update theme/layout documentation with `lang`, `dir`, logical CSS, and Arabic typography rules.
4. Update components documentation with `LocaleProvider`, `LocaleSwitcher`, and localized content access.
5. Update blog/author documentation with JSON-based bilingual authoring and parity requirements.
6. Update page-copy editing documentation with the mirrored JSON structure and Saudi Arabic glossary.
7. Update SEO/prerender documentation with Arabic paths, canonical URLs, hreflang, Open Graph locales, structured data, and sitemap behavior.
8. Update quality-check documentation with locale parity, hard-coded-copy, RTL, and bilingual prerender checks.
9. Add a focused locale authoring guide describing how to add a future language using only a registry entry, mirrored JSON files, translation review, and validation.

## Acceptance criteria

The locale work is complete only when:

- Every public English string has an Arabic mapping in JSON.
- No visitor-facing production copy remains embedded in JSX, JS data records, or Markdown files outside the locale system.
- English routes render fully LTR and Arabic routes render fully RTL from prerender through hydration.
- The header matches the requested desktop and mobile behavior.
- The locale switcher displays the current symbol and changes routes without losing route context.
- Arabic typography is self-hosted, legible, and visually reviewed.
- Arabic wording has been reviewed for Saudi commercial use.
- SEO metadata, structured data, canonical URLs, hreflang, Open Graph locale, and sitemap entries work for both languages.
- All automated checks, tests, builds, and prerender validation pass.
- Repository documentation under `docs/` is updated as the final phase.
