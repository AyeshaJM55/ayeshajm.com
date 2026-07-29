import { renderToStaticMarkup } from 'react-dom/server'
import { prerender } from 'react-dom/static'

import App from './App'
import { authorManifest } from './content/loadAuthors'
import { blogManifest } from './content/loadBlogPosts'
import { projectManifest } from './data/projects'
import { serviceManifest } from './data/services'
import { getLocaleDirection } from './locales'
import siteRoutes from './routes'
import matchRoute from './routes/matchRoute'
import SeoTags from './seo/SeoTags'
import { resolveRouteSeo } from './seo/routeSeo'

const staticPaths = ['/', '/about', '/services', '/portfolio', '/blog', '/contact', '/book']
const contentPaths = [
  ...blogManifest.map((post) => `/blog/${post.slug}`),
  ...authorManifest.map((author) => `/authors/${author.slug}`),
  ...serviceManifest.map((service) => `/services/${service.slug}`),
  ...projectManifest.map((project) => `/work/${project.slug}`),
]
const basePaths = [...staticPaths, ...contentPaths]

export const prerenderPaths = [
  ...basePaths,
  ...basePaths.map((pathname) => pathname === '/' ? '/ar' : `/ar${pathname}`),
  '/404',
  '/ar/404',
]

const normalizePathname = (pathname) => {
  const cleanPath = pathname.split(/[?#]/)[0] || '/'
  if (cleanPath === '/404') return '/missing-page'
  if (cleanPath === '/ar/404') return '/ar/missing-page'
  return cleanPath.length > 1 ? cleanPath.replace(/\/$/, '') : cleanPath
}

export async function renderPage(pathname) {
  const normalizedPathname = normalizePathname(pathname)
  const { locale, params, route } = matchRoute(normalizedPathname, siteRoutes)
  await route.loadPage()

  const seo = resolveRouteSeo(normalizedPathname, route, params, locale)
  const rendered = await prerender(
    <App includeSeo={false} initialLoaderVisible initialLocation={normalizedPathname} initialPrerendered initialRouteReady />,
  )
  const html = await new Response(rendered.prelude).text()
  const head = renderToStaticMarkup(<SeoTags seo={seo} />)

  return {
    alternates: seo.alternates,
    canonical: seo.canonical,
    direction: getLocaleDirection(locale),
    head,
    html,
    locale,
    modifiedAt: seo.modifiedAt || seo.publishedAt || '',
    status: route.path === '*' ? 404 : 200,
  }
}
