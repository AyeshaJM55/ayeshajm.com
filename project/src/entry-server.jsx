import { renderToStaticMarkup } from 'react-dom/server'
import { prerender } from 'react-dom/static'

import App from './App'
import { authors } from './content/loadAuthors'
import { blogPosts } from './content/loadBlogPosts'
import { projects } from './data/projects'
import { services } from './data/services'
import {
  getLocaleDirection,
  resolveLocaleFromPath,
  setActiveLocale,
  stripLocalePath,
} from './locales'
import siteRoutes from './routes'
import matchRoute from './routes/matchRoute'
import SeoTags from './seo/SeoTags'
import { resolveRouteSeo } from './seo/routeSeo'


const staticPaths = ['/', '/about', '/services', '/portfolio', '/blog', '/contact', '/book']
const contentPaths = []

for (const post of blogPosts) contentPaths.push(`/blog/${post.slug}`)
for (const author of authors) contentPaths.push(`/authors/${author.slug}`)
for (const service of services) contentPaths.push(`/services/${service.slug}`)
for (const project of projects) contentPaths.push(`/work/${project.slug}`)

const basePaths = [...staticPaths, ...contentPaths]
export const prerenderPaths = [
  ...basePaths,
  ...basePaths.map((pathname) => pathname === '/' ? '/ar' : `/ar${pathname}`),
  '/404',
  '/ar/404',
]


const normalizePathname = (pathname) => {
  const cleanPath = pathname.split(/[?#]/)[0] || '/'
  const locale = resolveLocaleFromPath(cleanPath)
  const routePath = stripLocalePath(cleanPath)
  if (routePath === '/404') return locale === 'ar' ? '/ar/missing-page' : '/missing-page'
  return cleanPath.length > 1 ? cleanPath.replace(/\/$/, '') : cleanPath
}


export async function renderPage(pathname) {
  const normalizedPathname = normalizePathname(pathname)
  const locale = resolveLocaleFromPath(normalizedPathname)
  const routePathname = stripLocalePath(normalizedPathname)
  setActiveLocale(locale)

  const { params, route } = matchRoute(routePathname, siteRoutes)
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
