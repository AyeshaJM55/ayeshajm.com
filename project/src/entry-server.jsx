import { renderToStaticMarkup } from 'react-dom/server'
import { prerender } from 'react-dom/static'

import App from './App'
import { authors } from './content/loadAuthors'
import { blogPosts } from './content/loadBlogPosts'
import { projects } from './data/projects'
import { services } from './data/services'
import siteRoutes from './routes'
import matchRoute from './routes/matchRoute'
import SeoTags from './seo/SeoTags'
import { resolveRouteSeo } from './seo/routeSeo'


const staticPaths = ['/', '/about', '/services', '/portfolio', '/blog', '/contact', '/book']

export const prerenderPaths = [
  ...staticPaths,
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  ...authors.map((author) => `/authors/${author.slug}`),
  ...services.map((service) => `/services/${service.slug}`),
  ...projects.map((project) => `/work/${project.slug}`),
  '/404',
]


const normalizePathname = (pathname) => {
  const cleanPath = pathname.split(/[?#]/)[0] || '/'
  if (cleanPath === '/404') return '/missing-page'
  return cleanPath.length > 1 ? cleanPath.replace(/\/$/, '') : cleanPath
}


export async function renderPage(pathname) {
  const normalizedPathname = normalizePathname(pathname)
  const { params, route } = matchRoute(normalizedPathname, siteRoutes)
  await route.loadPage()

  const seo = resolveRouteSeo(normalizedPathname, route, params)
  const rendered = await prerender(
    <App includeSeo={false} initialLocation={normalizedPathname} initialRouteReady />,
  )
  const html = await new Response(rendered.prelude).text()
  const head = renderToStaticMarkup(<SeoTags seo={seo} />)

  return {
    canonical: seo.canonical,
    head,
    html,
    modifiedAt: seo.modifiedAt || seo.publishedAt || '',
    status: route.path === '*' ? 404 : 200,
  }
}
