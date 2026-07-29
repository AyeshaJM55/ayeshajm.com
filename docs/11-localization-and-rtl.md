# Localization and RTL

## Locale model

English is the default locale and keeps unprefixed routes. Arabic uses `/ar`. The URL always wins over stored preference.

`src/locales/locales.json` contains only:

```json
{
  "en": { "symbol": "EN", "mode": "LTR" },
  "ar": { "symbol": "AR", "mode": "RTL" }
}
```

Do not add display names or unrelated settings to registry records. Runtime code derives HTML direction and locale-specific formatting from these values.

## Content structure

English and Arabic directories have identical files, keys, arrays, and value types:

```text
src/locales/<locale>/
├── common.json
├── navigation.json
├── accessibility.json
├── seo.json
├── forms.json
├── services.json
├── projects.json
├── authors.json
├── blog.json
└── pages/*.json
```

A missing translation fails development and tests. Production components must not contain fallback English.

## Runtime usage

Use `useLocale()` inside rendered components:

```jsx
const {
  content,
  direction,
  formatDate,
  formatList,
  formatMessage,
  formatNumber,
  locale,
  localizePath,
  t,
} = useLocale()
```

Prefer structured page copy through `content.pages.<pageId>`. Use `t()` for shared keys and `formatMessage()` for named interpolation or plural objects.

Always pass the locale to entity adapters:

```js
const services = getServices(locale)
const project = getProjectBySlug(slug, locale)
const posts = getBlogPosts(locale)
```

## Paths and language switching

Stable paths and slugs remain English identifiers in both languages. This preserves links, analytics, content relationships, and future migrations.

Use `localizePath('/portfolio')` for links. Use `switchLocalePath(location, nextLocale)` when changing language. The switcher must preserve query strings and hashes.

Unsupported locale-like prefixes go to not found. Do not silently reinterpret `/fr/about` as English `/about`.

## Arabic language standard

Use direct, premium Modern Standard Arabic appropriate for Saudi business audiences. Translate intent rather than English grammar. Avoid dialect, ceremony, excessive passive voice, and unnecessarily classical phrasing.

Preferred vocabulary includes:

| English | Arabic |
| --- | --- |
| Home | الرئيسية |
| About | نبذة |
| Services | الخدمات |
| Portfolio | الأعمال |
| Blog | المدونة |
| Contact | تواصل |
| Book a call | احجز مكالمة |
| Start a project | ابدأ مشروعك |
| 3D modeling | النمذجة ثلاثية الأبعاد |
| Photorealistic renders | تصيير واقعي للمنتجات |
| Lifestyle renders | تصيير المنتجات ضمن مشاهد واقعية |
| Deliverables | المخرجات المطلوبة |
| Timeline | الجدول الزمني |
| Budget range | الميزانية المتوقعة |

Keep personal names, client names, email addresses, URLs, file extensions, and recognized platform names unchanged. Keep CGI, CAD, STEP, OBJ, FBX, STL, UV, Amazon, Instagram, LinkedIn, and ArtStation where they improve clarity.

## RTL implementation

`LocaleProvider` updates `lang`, `dir`, `data-locale`, and `data-direction` on `<html>`. Prerendering writes the same attributes before first paint.

Use logical CSS properties and Tailwind utilities. Semantic alignment uses start/end. Previous and next icons mirror according to inline direction. Breadcrumbs, pagination, carousels, reveal motion, forms, header, and footer must follow DOM order naturally in RTL.

Use `dir="ltr"` for email, URLs, and code. Use `dir="auto"` for user-entered prose. Do not apply uppercase or Latin letter spacing to Arabic.

## Typography

Arabic uses self-hosted IBM Plex Sans Arabic with 400, 500, 600, and 700 weights. Font files live under `public/fonts/ibm-plex-sans-arabic/`. Only the important 600 weight is preloaded on Arabic pages.

Review large headings for additional line height and different wrapping. Tight Latin display settings rarely survive contact with Arabic, much like most shortcuts humans call “internationalization.”

## SEO and static output

Each locale receives its own canonical URL, localized title and description, Open Graph locale, structured-data text, and sitemap entry. Alternate links include English, Arabic Saudi (`ar-SA`), and `x-default`.

Structured data uses `en-US` or `ar-SA` for `inLanguage`. Arabic article, author, service, and project text must be present in generated HTML.

## Adding another locale

1. Add a registry entry with only `symbol` and `mode`.
2. Create a fully mirrored content directory.
3. Extend prefix and SEO locale mappings.
4. Add the locale to prerender paths and sitemap alternates.
5. Add the required font and direction rules.
6. Complete translation and editorial review.
7. Run parity, audit, tests, and build checks without component-specific branching.

## Validation

Run:

```sh
npm run audit:locales
npm run lint
npm test
npm run build
```

Then inspect representative English and Arabic HTML, navigation, forms, detail pages, canonical links, hreflang tags, structured data, sitemap entries, and responsive layouts. Final Saudi Arabic editorial review remains a human responsibility, regrettably but correctly.
