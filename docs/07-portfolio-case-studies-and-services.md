# Portfolio Case Studies and Services

## Data-driven case studies

Portfolio projects live in:

```text
src/data/projects.js
```

One project record powers:

- Portfolio filters and cards.
- Homepage Featured Work.
- `/work/:slug` case-study page.
- Related project sections on service pages.
- Social metadata.
- CreativeWork structured data.
- Production prerender paths.
- Sitemap entries.
- Next-project navigation.

Do not create a separate hard-coded page for each case study. Add or edit the structured project record.

## Project schema

Every project currently contains:

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

### Field meanings

`slug`
: Lowercase kebab-case URL segment. Must be unique.

`title`
: Visible project title and metadata title source.

`category`
: Portfolio filter label and CreativeWork genre.

`summary`
: Card description, hero introduction, and route metadata description.

`challenge`
: The communication, production, or commercial problem that had to be solved.

`approach`
: How modeling, materials, lighting, composition, motion, or art direction addressed the challenge.

`outcome`
: What useful asset system or deliverable set resulted. Do not invent performance outcomes.

`services`
: Array of valid service slugs from `src/data/services.js`.

`coverImage`
: Imported bundled asset.

`gallery`
: Usually three imported images used by `MediaGrid`.

`year`
: String used in the metric strip and structured data.

`client`
: Public client name or an honest confidentiality label.

`deliverables`
: Short list displayed as a joined metric value.

`nextProjectSlug`
: Valid project slug for next-case-study navigation.

## Complete project example

```js
import newProjectCover from '../assets/featured-work/new-project-cover.webp'
import newProjectDetail from '../assets/featured-work/new-project-detail.webp'
import newProjectLifestyle from '../assets/featured-work/new-project-lifestyle.webp'

{
  slug: 'new-product-campaign',
  title: 'New Product Campaign',
  category: 'E-commerce',
  summary: 'A concise description of the visual system and its intended commercial use.',
  challenge: 'Describe the actual communication or production problem without inventing drama.',
  approach: 'Explain the modeling, art direction, lighting, material, animation, or composition decisions.',
  outcome: 'Describe the delivered asset set and how it is prepared for practical use.',
  services: ['3d-modeling', 'photorealistic-renders'],
  coverImage: newProjectCover,
  gallery: [newProjectCover, newProjectDetail, newProjectLifestyle],
  year: '2026',
  client: 'Confidential consumer brand',
  deliverables: ['3D model', 'Hero renders', 'Lifestyle images'],
  nextProjectSlug: '3d-product-design',
}
```

## Adding a project safely

1. Add optimized images under `src/assets/featured-work/`.
2. Import the images in `src/data/projects.js`.
3. Add the new project record.
4. Add its category only by using the category value. `projectCategories` is generated automatically.
5. Use valid service slugs.
6. Decide which existing project links to it through `nextProjectSlug`.
7. Set the new project's own `nextProjectSlug`.
8. Add the slug to relevant services' `relatedProjectSlugs` when appropriate.
9. Run data tests and build.
10. Inspect `/portfolio` and `/work/<slug>`.
11. Add the same project slug to every `src/locales/<locale>/projects.json` file with fully localized visible fields.
12. Inspect `/ar/portfolio` and `/ar/work/<slug>` as well as English. Confirm localized related services, alt text, SEO, and next-project labels.

## Project ordering

Array order controls several visible surfaces:

- Homepage Featured Work displays all projects in array order.
- Portfolio initially displays all projects in array order.
- Some service and homepage sections use fixed slices or project indexes.

Reordering `projects` is therefore a design/content change, not harmless housekeeping.

Review these references after reordering:

```bash
grep -Rni "projects\[\|projects.slice" src
```

Current examples include service showcase images and selected project groups.

## Case-study writing guidelines

### Summary

Write one sentence that identifies:

- The visual type.
- The practical use.
- The distinctive focus.

Example pattern:

> Conversion-focused product imagery designed to clarify features across a marketplace listing.

### Challenge

Describe a real constraint or communication need:

- Product unavailable for photography.
- Many variants requiring consistent presentation.
- Technical construction difficult to explain.
- Brand environment not physically available.
- Need for multiple ratios and campaign outputs.

Avoid generic statements such as “The challenge was to stand out.” Every project on the internet has apparently faced this same heroic ordeal.

### Approach

Name the relevant production decisions:

- Model cleanup or rebuild.
- Material reference development.
- Lighting system.
- Camera hierarchy.
- Environment design.
- Storyboard and animation rhythm.
- Variant-ready scene organization.

### Outcome

Describe actual or intended delivered value:

- Cohesive listing image set.
- Reusable 3D asset.
- Campaign-ready stills and cutdowns.
- Approved material library.
- Multi-format image system.

Do not invent sales, engagement, or conversion claims.

## Services data

Services live in:

```text
src/data/services.js
```

One service record powers:

- Services listing.
- `/services/:slug` detail page.
- Homepage service carousel.
- Footer service navigation.
- Project relationship labels.
- Service structured data.
- Prerender paths.

## Service schema

```js
{
  slug,
  number,
  title,
  shortTitle,
  description,
  intro,
  heroMedia,
  supportingMedia,
  video,
  deliverables,
  idealFor,
  process,
  faq,
  relatedProjectSlugs,
}
```

### Service content guidance

`description`
: One concise sentence used on cards and metadata.

`intro`
: A fuller overview displayed on the detail page.

`deliverables`
: Concrete output types, not vague benefits.

`idealFor`
: Situations or client needs that indicate fit.

`process`
: Four clear stages, each with title and description.

`faq`
: Real scoping questions and honest answers.

`relatedProjectSlugs`
: Valid projects demonstrating the service.

## Adding a service

A service addition is more consequential than a project addition because several layouts assume a compact service set.

Required work:

1. Add the service record and media imports.
2. Use a unique sequential `number`.
3. Add related projects.
4. Update any project `services` arrays.
5. Review the homepage Swiper behavior with the additional slide.
6. Review four-column service/process layouts.
7. Confirm footer wrapping.
8. Confirm the service route and structured data.
9. Confirm prerender count and sitemap.
10. Add or update tests.
11. Add the same service slug to every `src/locales/<locale>/services.json` file. Translate titles, descriptions, deliverables, ideal-use lists, process steps, FAQ content, and media alt text.
12. Verify the localized service listing, detail route, homepage card, footer link, SEO output, and sitemap entry.

## Updating service or project slugs

Changing a slug changes the public URL.

Before changing one:

- Search all references.
- Update relationship arrays.
- Update `nextProjectSlug` values.
- Consider a redirect strategy.
- Update any external links.
- Rebuild sitemap and prerendered pages.

Do not change a published slug merely to make it “nicer” without handling the old URL.

## Localized service and project records

Service and project manifests retain stable slugs, ordering, asset relationships, related IDs, and next-project links. All visible fields are stored in mirrored `services.json` and `projects.json` files per locale.

Components must filter by stable category IDs and service slugs, never by translated labels. Resolve records with an explicit locale. A service or project added to a manifest is incomplete until matching English and Arabic records pass locale validation.
