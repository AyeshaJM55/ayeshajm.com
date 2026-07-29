import { getAuthorBySlug } from '../content/loadAuthors'
import { getBlogPostBySlug } from '../content/loadBlogPosts'
import { getProjectBySlug } from '../data/projects'
import { getServiceBySlug, services } from '../data/services'
import { site } from '../data/site'


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


function createStructuredData(pathname, route, params, seo) {
  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
  }

  const basePage = {
    '@type': route.path === '/blog' ? 'Blog' : 'WebPage',
    '@id': `${seo.canonical}#webpage`,
    name: seo.documentTitle,
    description: seo.description,
    url: seo.canonical,
    isPartOf: { '@id': `${site.url}/#website` },
    primaryImageOfPage: seo.socialImage ? { '@type': 'ImageObject', url: seo.socialImage } : undefined,
  }

  let page = basePage

  if (route.path === '/') {
    page = {
      ...basePage,
      '@type': ['WebPage', 'ProfessionalService'],
      name: site.name,
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
        author: {
          '@type': 'Person',
          name: post.author.name,
          url: `${site.url}/authors/${post.author.slug}`,
        },
        publisher: {
          '@type': 'Person',
          name: site.name,
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
        provider: {
          '@type': 'Person',
          name: site.name,
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
        creator: {
          '@type': 'Person',
          name: site.name,
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


export function resolveRouteSeo(pathname, route, params) {
  const title = route.getTitle ? route.getTitle(params) : route.title
  const documentTitle = route.getDocumentTitle ? route.getDocumentTitle(params) : `Ayesha J. | ${title}`
  const description = route.getDescription ? route.getDescription(params) : route.description
  const canonical = route.getCanonical
    ? route.getCanonical(params)
    : `${site.url}${pathname === '/' ? '' : pathname}`
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

  const seo = {
    authorName,
    canonical,
    description,
    documentTitle,
    imageAlt,
    modifiedAt,
    pageType,
    publishedAt,
    robots,
    section,
    socialImage,
    tags,
  }

  return {
    ...seo,
    structuredData: createStructuredData(pathname, route, params, seo),
  }
}
