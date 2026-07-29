import { getAuthorBySlug } from '../content/loadAuthors'
import { getBlogPostBySlug } from '../content/loadBlogPosts'
import { getProjectBySlug } from '../data/projects'
import { getServiceBySlug, services } from '../data/services'
import { site } from '../data/site'
import {
  getIntlLocale,
  localizePath,
  stripLocalePath,
  translate,
} from '../locales'


const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX_ROBOTS = 'noindex, nofollow'


export const toAbsoluteUrl = (value) => {
  if (!value) return ''
  try {
    return new URL(value, site.url).href
  } catch {
    return value
  }
}

const absoluteLocalizedUrl = (basePath, locale) => `${site.url}${localizePath(basePath, locale) === '/' ? '' : localizePath(basePath, locale)}`


function createStructuredData(pathname, route, params, seo, locale) {
  const language = getIntlLocale(locale)
  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: seo.siteName,
    url: site.url,
    inLanguage: language,
  }

  const basePage = {
    '@type': route.path === '/blog' ? 'Blog' : 'WebPage',
    '@id': `${seo.canonical}#webpage`,
    name: seo.documentTitle,
    description: seo.description,
    url: seo.canonical,
    inLanguage: language,
    isPartOf: { '@id': `${site.url}/#website` },
    primaryImageOfPage: seo.socialImage ? { '@type': 'ImageObject', url: seo.socialImage } : undefined,
  }

  let page = basePage

  if (route.path === '/') {
    page = {
      ...basePage,
      '@type': ['WebPage', 'ProfessionalService'],
      name: seo.siteName,
      email: site.email,
      serviceType: services.map((service) => service.title),
    }
  }

  if (route.path === '/blog/:slug') {
    const post = getBlogPostBySlug(params.slug)
    if (post) {
      page = {
        '@type': 'BlogPosting',
        '@id': `${seo.canonical}#article`,
        headline: post.title,
        description: post.description,
        image: seo.socialImage ? [seo.socialImage] : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        articleSection: post.category,
        keywords: post.tags,
        inLanguage: language,
        author: {
          '@type': 'Person',
          name: post.author.name,
          url: absoluteLocalizedUrl(`/authors/${post.author.slug}`, locale),
        },
        publisher: {
          '@type': 'Person',
          name: seo.siteName,
          url: site.url,
        },
        mainEntityOfPage: { '@id': `${seo.canonical}#webpage` },
      }
    }
  }

  if (route.path === '/authors/:slug') {
    const author = getAuthorBySlug(params.slug)
    if (author) {
      page = {
        '@type': 'ProfilePage',
        '@id': `${seo.canonical}#profile`,
        name: seo.documentTitle,
        description: author.shortBio,
        url: seo.canonical,
        inLanguage: language,
        mainEntity: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          description: author.shortBio,
          image: seo.socialImage || undefined,
          email: author.email || undefined,
          url: author.website || seo.canonical,
          sameAs: Object.values(author.socials),
        },
      }
    }
  }

  if (route.path === '/services/:slug') {
    const service = getServiceBySlug(params.slug)
    if (service) {
      page = {
        '@type': 'Service',
        '@id': `${seo.canonical}#service`,
        name: service.title,
        description: service.description,
        url: seo.canonical,
        image: seo.socialImage || undefined,
        inLanguage: language,
        provider: {
          '@type': 'Person',
          name: seo.siteName,
          url: site.url,
        },
      }
    }
  }

  if (route.path === '/work/:slug') {
    const project = getProjectBySlug(params.slug)
    if (project) {
      page = {
        '@type': 'CreativeWork',
        '@id': `${seo.canonical}#creative-work`,
        name: project.title,
        description: project.summary,
        url: seo.canonical,
        image: seo.socialImage || undefined,
        inLanguage: language,
        creator: {
          '@type': 'Person',
          name: seo.siteName,
          url: site.url,
        },
        dateCreated: project.year,
        genre: project.category,
      }
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [website, basePage, page].filter((item, index, items) => items.indexOf(item) === index),
  }
}


export function resolveRouteSeo(pathname, route, params, locale = 'en') {
  const basePathname = stripLocalePath(pathname)
  const routeKey = route.id ?? (route.path === '*' ? 'notFound' : '')
  const localizedStaticTitle = routeKey ? translate(`seo.routes.${routeKey}.title`, locale, '') : ''
  const localizedStaticDescription = routeKey ? translate(`seo.routes.${routeKey}.description`, locale, '') : ''
  const title = route.getTitle ? route.getTitle(params) : localizedStaticTitle || route.title
  const documentTitle = route.getDocumentTitle
    ? route.getDocumentTitle(params)
    : locale === 'ar' ? `${title} | عائشة ج.` : `Ayesha J. | ${title}`
  const description = route.getDescription ? route.getDescription(params) : localizedStaticDescription || route.description
  const canonical = absoluteLocalizedUrl(basePathname, locale)
  const rawImage = route.getImage ? route.getImage(params) : route.image
  const socialImage = toAbsoluteUrl(rawImage)
  const pageType = route.pageType ?? 'website'
  const publishedAt = route.getPublishedAt ? route.getPublishedAt(params) : ''
  const modifiedAt = route.getModifiedAt ? route.getModifiedAt(params) : ''
  const authorName = route.getAuthorName ? route.getAuthorName(params) : ''
  const imageAlt = route.getImageAlt ? route.getImageAlt(params) : documentTitle
  const section = route.getSection ? route.getSection(params) : ''
  const tags = route.getTags ? route.getTags(params) : []
  const robots = route.path === '*' ? NOINDEX_ROBOTS : INDEX_ROBOTS
  const siteName = translate('seo.siteName', locale)

  const seo = {
    alternates: {
      en: absoluteLocalizedUrl(basePathname, 'en'),
      ar: absoluteLocalizedUrl(basePathname, 'ar'),
      'x-default': absoluteLocalizedUrl(basePathname, 'en'),
    },
    authorName,
    canonical,
    description,
    documentTitle,
    imageAlt,
    locale,
    modifiedAt,
    ogAlternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
    ogLocale: locale === 'ar' ? 'ar_SA' : 'en_US',
    pageType,
    publishedAt,
    robots,
    section,
    siteName,
    socialImage,
    tags,
  }

  return {
    ...seo,
    structuredData: createStructuredData(pathname, route, params, seo, locale),
  }
}
