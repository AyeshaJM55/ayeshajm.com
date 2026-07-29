# Components and Page Composition

## Component layers in this project

The project uses reusable domain components instead of a formal atoms/composites directory.

```text
src/components/domain/
├── blog/          Blog cards, metadata, prose, author UI
├── motion/        Shared page and reveal behavior
├── navigation/    Loaders, progress, scroll controls
└── site/          Reusable marketing and portfolio sections
```

Preserve this existing structure. New reusable components should enter the most relevant domain folder. Page-specific components stay under that page.

## Reuse decision

Before creating a component, ask:

1. Does an existing component already express this layout?
2. Can an existing component support it through a sensible prop?
3. Is the component used by more than one page?
4. Does it contain domain-specific copy or behavior?

Placement:

- Reused across site pages: `src/components/domain/site/`
- Reused across blog and author pages: `src/components/domain/blog/`
- Reused motion behavior: `src/components/domain/motion/`
- Reused navigation/loading behavior: `src/components/domain/navigation/`
- Used by one page only: that page's `components/` or `sections/` directory

Do not create vague `common`, `misc`, `helpers`, or `shared` dumping grounds.

## Core site components

### `PageHero`

Use for the opening section of most static pages.

Props:

- `title` required
- `description` optional
- `eyebrow` optional
- `actions` optional React node
- `image` optional
- `imageAlt` required when image exists
- `imageFit`: `cover` or `contain`
- `titleClassName` for deliberate title sizing exceptions

Default visual behavior:

- Hero surface background.
- Large single `<h1>`.
- Optional two-column image layout.
- Framer Motion entrance.

Do not place another `<h1>` later on the same page.

### `SectionHeader`

Use for standard section introductions.

Props:

- `title` required
- `eyebrow` optional
- `description` optional

It renders a semantic `<header>` and `<h2>` with the established type scale.

### `TextMediaSplit`

Use for two-column editorial sections with image and text.

Props:

- `children`
- `image`
- `imageAlt`
- `fit`: `cover` or `contain`
- `reverse`

Images are below the fold and use lazy loading.

### `ProcessSteps`

Use for four-stage or similarly concise ordered processes.

Data shape:

```js
[
  { title: 'Discover', description: '...' },
  { title: 'Build', description: '...' },
]
```

It renders a semantic ordered list and responsive grid.

### `MetricStrip`

Use for compact project facts such as client, year, services, and deliverables.

Data shape:

```js
[
  { label: 'Client', value: 'Confidential brand' },
  { label: 'Year', value: '2026' },
]
```

### `MediaGrid`

Use for 3-image showcases.

Props:

- `images`: array of image URLs
- `title`: accessible label and generated alt prefix
- `fit`: `contain` or `cover`

The first image spans both columns and uses a 16:9 frame. Remaining images are square.

### `ProjectCard`

Use for standard project collections on Portfolio, Services, and related-content sections.

It expects a complete project object from `src/data/projects.js`.

### `RelatedContent`

Use when a page needs a standard “Selected projects” section.

It composes `SectionHeader`, `StaggerGrid`, and `ProjectCard`.

### `ContactCta`

Use near the end of marketing, service, and project pages.

Props:

- `title`
- `description`
- `href`, default `/contact`
- `label`, default `Start a project`

Do not duplicate its large black CTA layout manually unless a different interaction genuinely requires a different component.

### `Breadcrumbs`

Use on detail pages before the page title.

Data shape:

```js
[
  { href: '/portfolio', label: 'Portfolio' },
  { label: project.title },
]
```

The final item has no `href` and receives `aria-current='page'`.

## Blog components

### `BlogCard`

Used for featured and standard article cards.

Props:

- `post`
- `featured`
- `imageLoading`: `eager` or `lazy`

The current Blog listing intentionally supplies eager loading for its visible cards. Do not silently change this behavior while editing article copy.

### `BlogProse`

Renders Markdown with project styling for:

- Paragraphs.
- H2 and H3 headings.
- Ordered and unordered lists.
- Tables.
- Blockquotes.
- Inline and block code.
- Links.
- Images.
- Horizontal rules.

Do not render blog Markdown with `dangerouslySetInnerHTML`.

### `BlogMeta`

Displays author, publication date, reading time, and optional updated date.

### `BlogTagList`

Displays the article tags as bordered uppercase labels.

### Author components

- `AuthorCard`: author profile header.
- `AuthorInline`: article-end author link.
- `RelatedPosts`: related article grid.

## Motion components

Wrap complete non-home pages with:

```jsx
<AnimatedPage ariaLabel='Descriptive page label'>
  ...
</AnimatedPage>
```

The Homepage currently renders its own `<main>` because its sections have older page-specific behavior. Preserve this unless deliberately refactoring the whole page.

## Page composition examples

### Standard marketing page

```jsx
<AnimatedPage ariaLabel='Example page'>
  <PageHero
    eyebrow='Example'
    title='A clear page title.'
    description='A concise explanation.'
  />

  <section className='bg-white py-20 sm:py-24 lg:py-28'>
    <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
      <SectionHeader eyebrow='Section' title='A useful section title.' />
    </div>
  </section>

  <ContactCta title='Start a project.' description='Share the useful details.' />
</AnimatedPage>
```

### Detail page

Typical order:

1. Breadcrumbs.
2. Category or number.
3. `<h1>` and summary.
4. Hero media.
5. Metric strip or overview.
6. Challenge and approach.
7. Gallery.
8. Outcome.
9. Related services or work.
10. Next item navigation.
11. Contact CTA.

## PropTypes and public contracts

Existing components use `prop-types`. Add or update PropTypes whenever a public prop changes.

Required image props should require alt text. Arrays should validate their item shape when practical.

## Avoiding duplication

Before creating a new section, search for:

```bash
grep -Rni "SectionHeader\|TextMediaSplit\|ProcessSteps\|MediaGrid\|MetricStrip\|ContactCta" src
```

If two pages contain the same structural JSX with only copy differences, extract a reusable component or feed data into the existing one.
