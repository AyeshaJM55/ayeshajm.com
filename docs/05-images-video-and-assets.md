# Images, Video, and Assets

## Two asset systems

The project uses two correct asset locations for different purposes.

### Bundled application assets

Location:

```text
src/assets/
```

Use for images and video imported by JavaScript or JSX, including:

- Homepage imagery.
- Project and service imagery.
- Shared testimonial imagery.
- Component icons not served as fixed public URLs.

Example:

```js
import productImage from '../assets/featured-work/product-name.png'
```

Benefits:

- Vite hashes the built filename.
- Missing imports fail during development or build.
- Asset references participate in module dependency tracking.

### Public content media

Location:

```text
public/content/media/
```

Use for Markdown front matter and Markdown body images because Markdown stores a stable URL string.

Example file:

```text
public/content/media/blog/example-post/cover.png
```

Reference it as:

```yaml
coverImage: /content/media/blog/example-post/cover.png
```

Do not write `/public/content/media/...` in content. The `public` directory maps to the URL root.

## Current asset organization

```text
src/assets/
├── featured-work/       Project, service, and campaign stills
├── icons/               Imported decorative icons
├── services/            Homepage service videos
└── testimonials/        Client avatar image

public/content/media/
├── authors/             Author portraits
└── blog/<slug>/         Blog cover and inline article media
```

Follow these conventions when adding media.

## Adding a blog cover image

1. Create a directory matching the post slug:

```text
public/content/media/blog/my-post-slug/
```

2. Add the image, usually named `cover.webp` or `cover.png`.
3. Reference it in front matter:

```yaml
coverImage: /content/media/blog/my-post-slug/cover.webp
coverAlt: A precise description of the visible image
```

4. Use the same path in Markdown when the image should appear inside the article:

```md
![A meaningful description](/content/media/blog/my-post-slug/cover.webp)
```

5. Run the build. A wrong public URL may not be caught by a JavaScript import, so inspect the generated page or development route.

## Adding an author portrait

Place the image at:

```text
public/content/media/authors/<author-slug>.jpg
```

Reference it in the author file:

```yaml
avatar: /content/media/authors/<author-slug>.jpg
avatarAlt: Portrait of Full Name
```

Use a square source image when possible. The UI presents author imagery in square or circular crops.

## Adding project or service images

1. Add the file to `src/assets/featured-work/` or another clearly named asset folder.
2. Import it in `src/data/projects.js` or `src/data/services.js`.
3. Assign it to `coverImage`, `gallery`, `heroMedia`, or `supportingMedia`.
4. Use descriptive import names instead of `image1` or `newFinalImage`.

Example:

```js
import bottleCampaign from '../assets/featured-work/bottle-campaign.webp'

{
  coverImage: bottleCampaign,
  gallery: [bottleCampaign, bottleDetail, bottleLifestyle],
}
```

## Image fit rules

Use `object-contain` when:

- The complete product silhouette must remain visible.
- The image has a deliberate clean background.
- It is a studio render, technical product view, or case-study gallery.

Use `object-cover` when:

- The media is an environmental or photographic scene.
- Cropping is expected and safe.
- The component is explicitly art-directed for a fixed frame.

Current project and blog imagery strongly favors `object-contain` on white backgrounds.

## Dimensions and layout stability

Every `<img>` should include `width` and `height` attributes. Existing common values include:

```jsx
width='1200' height='900'
width='1400' height='900'
width='1800' height='1000'
```

The intrinsic ratio should approximately match the actual source and visual frame. Dimensions prevent layout shift even when CSS controls the final display size.

## Alt text

Alt text should explain what a user needs to know from the image.

Good:

- `Photorealistic render of a black countertop appliance from a three-quarter angle`
- `Lifestyle product scene with a lamp on a neutral bedside table`

Weak:

- `image`
- `render`
- `product visual`
- A filename

Decorative images use:

```jsx
alt=''
aria-hidden='true'
```

Do not repeat nearby captions word-for-word unless that is genuinely the useful alternative.

## Loading behavior

### Eager images

Use eager loading for:

- Primary hero/LCP image.
- Blog detail cover.
- Featured blog card.
- Author profile header.
- Any image that is immediately visible at page load.

Some current Blog listing cards are deliberately eager. Preserve the page's explicit `imageLoading` prop unless performing a measured performance change.

### Lazy images

Use `loading='lazy'` for:

- Project grids below the fold.
- Related content.
- `TextMediaSplit` images.
- `MediaGrid` images.
- Long-page galleries.

Add `decoding='async'` where appropriate.

## Social images

Route metadata converts relative asset URLs into absolute URLs using `toAbsoluteUrl()`.

For blog posts:

- `socialImage` is optional.
- When absent, `coverImage` is used.

A dedicated social image should normally be around 1200 × 630 and preserve important content away from edges.

## Video

Homepage service videos live in:

```text
src/assets/services/
```

Current video behavior:

- Muted.
- Looped.
- `playsInline`.
- Metadata preload.
- Only the active service card plays.
- Other videos pause.
- Autoplay failure is safely ignored.

When adding or replacing video:

- Compress it for web delivery.
- Avoid huge source files when a shorter loop is sufficient.
- Keep the subject safe for `object-cover` cropping.
- Confirm mobile playback.
- Do not add audible autoplay.

## File naming

Use lowercase kebab-case:

```text
product-launch-hero.webp
material-detail-closeup.png
lifestyle-bedroom-scene.jpg
```

Avoid:

```text
FINAL IMAGE 2.png
newnewrender.jpg
Screenshot 2026-07-29.png
```

Future editors deserve at least a fighting chance.
