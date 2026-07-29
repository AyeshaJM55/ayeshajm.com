import { getActiveLocale, loadLocaleContent } from '../locales'

export const authorManifest = [
  { slug: 'ayesha-jm', avatar: '/content/media/authors/ayesha-jm.jpg', email: 'hello@ayeshajm.com', website: 'https://ayeshajm.com', featured: true, socials: { instagram: 'https://instagram.com/', linkedin: 'https://linkedin.com/', artstation: 'https://artstation.com/' } },
]

export function getAuthors(locale = getActiveLocale()) {
  const copy = loadLocaleContent(locale).authors
  return authorManifest.map((item) => ({ ...item, ...copy[item.slug], biography: copy[item.slug].bodyMarkdown }))
}
export const getAuthorBySlug = (slug, locale = getActiveLocale()) => getAuthors(locale).find((author) => author.slug === slug)
export const authors = getAuthors('en')
export const buildAuthors = () => authors
