import { getAuthorBySlug } from '../content/loadAuthors'
import { getBlogPostBySlug } from '../content/loadBlogPosts'
import { getProjectBySlug } from '../data/projects'
import { getServiceBySlug, getServices } from '../data/services'
import { site } from '../data/site'
import { loadLocaleContent, localizePath, stripLocalePath } from '../locales'
import { formatMessage } from '../locales/formatMessage'
import { createFormatters } from '../locales/formatters'

const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX_ROBOTS = 'noindex, nofollow'
export const toAbsoluteUrl = (value) => value ? new URL(value, site.url).href : ''
const absoluteLocalizedUrl = (basePath, locale) => `${site.url}${localizePath(basePath, locale) === '/' ? '' : localizePath(basePath, locale)}`

const interpolate = (value, values, locale) => formatMessage(value, values, createFormatters(locale).pluralRules)

function resolveEntity(route, params, locale) {
  if (route.id === 'blogDetail') return getBlogPostBySlug(params.slug, locale)
  if (route.id === 'authorDetail') return getAuthorBySlug(params.slug, locale)
  if (route.id === 'serviceDetail') return getServiceBySlug(params.slug, locale)
  if (route.id === 'workDetail') return getProjectBySlug(params.slug, locale)
  return null
}

function createStructuredData(route, entity, seo, locale) {
  const language = locale === 'ar' ? 'ar-SA' : 'en-US'
  const website = { '@type': 'WebSite', '@id': `${site.url}/#website`, name: seo.siteName, url: site.url, inLanguage: language }
  const webPage = { '@type': route.id === 'blog' ? 'Blog' : 'WebPage', '@id': `${seo.canonical}#webpage`, name: seo.documentTitle, description: seo.description, url: seo.canonical, inLanguage: language, isPartOf: { '@id': `${site.url}/#website` }, primaryImageOfPage: seo.socialImage ? { '@type': 'ImageObject', url: seo.socialImage } : undefined }
  let main = webPage
  if (route.id === 'home') main = { ...webPage, '@type': ['WebPage', 'ProfessionalService'], email: site.email, serviceType: getServices(locale).map((service) => service.title) }
  if (route.id === 'blogDetail' && entity) main = { '@type': 'BlogPosting', '@id': `${seo.canonical}#article`, headline: entity.title, description: entity.description, image: seo.socialImage ? [seo.socialImage] : undefined, datePublished: entity.publishedAt, dateModified: entity.updatedAt || entity.publishedAt, articleSection: entity.category, keywords: entity.tags, inLanguage: language, author: { '@type': 'Person', name: entity.author.name, url: absoluteLocalizedUrl(`/authors/${entity.author.slug}`, locale) }, publisher: { '@type': 'Person', name: seo.siteName, url: site.url }, mainEntityOfPage: { '@id': `${seo.canonical}#webpage` } }
  if (route.id === 'authorDetail' && entity) main = { '@type': 'ProfilePage', '@id': `${seo.canonical}#profile`, name: seo.documentTitle, description: entity.shortBio, url: seo.canonical, inLanguage: language, mainEntity: { '@type': 'Person', name: entity.name, jobTitle: entity.role, description: entity.shortBio, image: seo.socialImage || undefined, email: entity.email || undefined, url: entity.website || seo.canonical, sameAs: Object.values(entity.socials) } }
  if (route.id === 'serviceDetail' && entity) main = { '@type': 'Service', '@id': `${seo.canonical}#service`, name: entity.title, description: entity.description, url: seo.canonical, image: seo.socialImage || undefined, inLanguage: language, provider: { '@type': 'Person', name: seo.siteName, url: site.url } }
  if (route.id === 'workDetail' && entity) main = { '@type': 'CreativeWork', '@id': `${seo.canonical}#creative-work`, name: entity.title, description: entity.summary, url: seo.canonical, image: seo.socialImage || undefined, inLanguage: language, creator: { '@type': 'Person', name: seo.siteName, url: site.url }, dateCreated: entity.year, genre: entity.category }
  return { '@context': 'https://schema.org', '@graph': [website, webPage, main].filter((item, index, items) => items.indexOf(item) === index) }
}

export function resolveRouteSeo(pathname, route, params, locale = 'en') {
  const content = loadLocaleContent(locale)
  const seoCopy = content.seo
  const entity = resolveEntity(route, params, locale)
  const staticCopy = seoCopy.routes[route.id]
  const missing = route.id === 'blogDetail' ? seoCopy.missingArticle : route.id === 'authorDetail' ? seoCopy.missingAuthor : route.id === 'serviceDetail' ? seoCopy.missingService : route.id === 'workDetail' ? seoCopy.missingProject : seoCopy.routes.notFound.description
  const title = entity?.title ?? entity?.name ?? staticCopy?.title ?? seoCopy.notFoundFallback
  const description = entity?.description ?? entity?.shortBio ?? entity?.summary ?? staticCopy?.description ?? missing
  const documentTitle = route.id === 'blogDetail' ? interpolate(seoCopy.articleTitlePattern, { title }, locale) : route.id === 'authorDetail' ? interpolate(seoCopy.authorTitlePattern, { name: title }, locale) : interpolate(seoCopy.titlePattern, { title }, locale)
  const basePathname = stripLocalePath(pathname)
  const canonical = absoluteLocalizedUrl(basePathname, locale)
  const rawImage = entity?.socialImage || entity?.coverImage || entity?.avatar || entity?.heroMedia || route.image
  const socialImage = toAbsoluteUrl(rawImage)
  const imageAlt = entity?.coverAlt || entity?.avatarAlt || entity?.title || documentTitle
  const seo = {
    alternates: { en: absoluteLocalizedUrl(basePathname, 'en'), 'ar-SA': absoluteLocalizedUrl(basePathname, 'ar'), 'x-default': absoluteLocalizedUrl(basePathname, 'en') },
    authorName: route.id === 'blogDetail' ? entity?.author?.name ?? '' : route.id === 'authorDetail' ? entity?.name ?? '' : '',
    canonical,
    description,
    documentTitle,
    imageAlt,
    locale,
    modifiedAt: entity?.updatedAt ?? '',
    ogAlternateLocales: [locale === 'ar' ? 'en_US' : 'ar_SA'],
    ogLocale: locale === 'ar' ? 'ar_SA' : 'en_US',
    pageType: route.pageType ?? 'website',
    publishedAt: entity?.publishedAt ?? '',
    robots: route.path === '*' || !entity && ['blogDetail', 'authorDetail', 'serviceDetail', 'workDetail'].includes(route.id) ? NOINDEX_ROBOTS : INDEX_ROBOTS,
    section: entity?.category ?? '',
    siteName: seoCopy.siteName,
    socialImage,
    tags: entity?.tags ?? [],
  }
  return { ...seo, structuredData: createStructuredData(route, entity, seo, locale) }
}
