import { getActiveLocale, loadLocaleContent } from '../locales'

import { parseMarkdown } from './parseMarkdown'

export const authorManifest = [
  { slug: 'ayesha-jm', avatar: '/content/media/authors/ayesha-jm.jpg', email: 'hello@ayeshajm.com', website: 'https://ayeshajm.com', featured: true, socials: { instagram: 'https://instagram.com/', linkedin: 'https://linkedin.com/', artstation: 'https://artstation.com/' } },
]

export function getAuthors(locale = getActiveLocale()) {
  const copy = loadLocaleContent(locale).authors
  return authorManifest.map((item) => ({ ...item, ...copy[item.slug], biography: copy[item.slug].bodyMarkdown }))
}
export const getAuthorBySlug = (slug, locale = getActiveLocale()) => getAuthors(locale).find((author) => author.slug === slug)
export const authors = getAuthors('en')
const requiredAuthorFields = ['slug', 'name', 'role', 'shortBio', 'avatar', 'avatarAlt']

export function buildAuthors(modules) {
  if (!modules) return authors

  const seen = new Set()
  return Object.entries(modules).map(([sourcePath, source]) => {
    const { content, data } = parseMarkdown(source, sourcePath)
    for (const field of requiredAuthorFields) {
      if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`[content] ${sourcePath}: missing required author field "${field}".`)
    }
    if (seen.has(data.slug)) throw new Error(`[content] ${sourcePath}: duplicate author slug "${data.slug}".`)
    seen.add(data.slug)

    return {
      ...data,
      biography: content,
      bodyMarkdown: content,
      email: data.email ?? '',
      featured: Boolean(data.featured),
      socials: data.socials && typeof data.socials === 'object' ? data.socials : {},
      website: data.website ?? '',
    }
  })
}
