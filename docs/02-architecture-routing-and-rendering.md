# Architecture, Routing, and Rendering

## Established architecture

The application uses a custom lightweight route matcher rather than React Router.

`src/routes/guest.js` contains route records. Each record includes:

- A static `path` or dynamic `pattern`.
- A lazy `Page` component.
- A `loadPage()` function used before rendering and during prerendering.
- Static or computed metadata values.

`src/routes/matchRoute.js` resolves a pathname to a route and route parameters.

`src/App.jsx` is the only runtime route compositor. Do not add a second router or place navigation state inside individual pages.

## Important project-specific exception

The generic frontend skill recommends that each page import its layout. This project deliberately keeps `SiteLayout` mounted in `App.jsx` so the header and footer remain stable during internal route loading.

Preserve the current arrangement:

```jsx
<SiteLayout pathname={pathname}>
  {isRouteReady ? <Page /> : <RouteLoader />}
</SiteLayout>
```

Do not move `SiteLayout` into every page unless performing an intentional architecture migration with matching tests, SSR changes, and route-loading behavior.

## Client navigation flow

`App.jsx` intercepts same-origin anchor clicks that:

- Use the primary mouse button.
- Have no modifier keys.
- Are not downloads.
- Do not target another browsing context.
- Are not `mailto:`, `tel:`, JavaScript, or fragment-only links.

It then:

1. Pushes the new URL to browser history.
2. Marks the route as not ready.
3. Keeps `SiteLayout` mounted.
4. Displays the simple `RouteLoader` in the content region.
5. Calls the route's `loadPage()` promise.
6. Renders the lazy page when ready.
7. Resets document scroll position.

Back and forward navigation is handled with `popstate`.

## Loading behavior

There are two distinct loaders. They must remain distinct.

### Site loader

Files:

- `src/components/domain/navigation/SiteLoader.jsx`
- `src/components/domain/navigation/SnowBallLoadingSpinner.jsx`
- Site-loader CSS in `src/index.css`

Behavior:

- Full viewport.
- White background.
- Custom snowball orbit and `A.` monogram.
- Appears only for the initial site load.
- Has a minimum duration of 1.5 seconds, which is half of the 3-second animation cycle.
- Remains longer when the browser `load` event takes longer.
- Locks body scrolling while visible.

Do not use the snowball loader for page-to-page navigation.

### Route loader

File:

- `src/components/domain/navigation/RouteLoader.jsx`

Behavior:

- Simple standard circular spinner.
- Renders inside the persistent layout.
- Does not cover the header or footer.
- Has no artificial minimum delay.
- Disappears as soon as the page module is ready.

## Client entry

`main.jsx` checks whether the root already contains prerendered markup.

- Existing HTML uses `hydrateRoot`.
- An empty root uses `createRoot`.
- `initialRouteReady` is true for prerendered pages.
- `initialLoaderVisible` is true so the first-load site overlay appears over the already-rendered page content.

This arrangement prevents an empty SEO shell while still displaying the branded loader to users with JavaScript.

## Server and development rendering

`src/entry-server.jsx`:

1. Normalizes the requested pathname.
2. Matches the route.
3. Awaits `route.loadPage()`.
4. Resolves route SEO.
5. Prerenders the complete React application.
6. Returns HTML, metadata markup, status, canonical URL, and modification date.

`vite.config.js` includes a development middleware named `seo-html-rendering`. It performs the same operation for HTML requests during development, so viewing page source in development returns route-specific content instead of a blank root.

## Production prerendering

`scripts/prerender.mjs`:

- Imports the SSR bundle.
- Renders every path exported by `entry-server.jsx`.
- Writes nested `index.html` files.
- Writes `404.html`.
- Builds `sitemap.xml`.
- Writes `robots.txt`.
- Removes the temporary `dist-ssr` directory.

## Prerender path sources

`entry-server.jsx` contains static paths and derives dynamic paths from data:

```js
for (const post of blogPosts) contentPaths.push(`/blog/${post.slug}`)
for (const author of authors) contentPaths.push(`/authors/${author.slug}`)
for (const service of services) contentPaths.push(`/services/${service.slug}`)
for (const project of projects) contentPaths.push(`/work/${project.slug}`)
```

Consequences:

- Adding a valid published blog file automatically adds its prerender route.
- Adding an author automatically adds the author route.
- Adding a service or project data record automatically adds its detail route.
- Adding a new standalone static page requires adding its path to `staticPaths`.

## Adding a static page

A complete static page addition usually requires:

1. Create `src/pages/guest/PageName/PageName.jsx`.
2. Add a lazy page record to `src/routes/guest.js`.
3. Add route title, description, and social image.
4. Add the pathname to `staticPaths` in `src/entry-server.jsx`.
5. Add navigation only when the page should be discoverable from the header or footer.
6. Add a page integration test.
7. Build and inspect the generated HTML.

## Adding a dynamic content type

Do not invent another dynamic content system casually. Blog authors/posts, services, and work projects already cover the site's current domains.

A new dynamic type requires:

- A data loader or validated data file.
- Route matching.
- Page component.
- SEO metadata resolver.
- Structured data decision.
- Prerender path generation.
- Listing or discovery surface.
- Tests.

Humans enjoy adding a route and forgetting the other seven pieces. The build will not always save them from themselves.
