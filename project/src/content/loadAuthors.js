import { parseMarkdown } from './parseMarkdown'
import { validateAuthor } from './validateAuthor'


const authorModules = import.meta.glob('/content/authors/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

export function buildAuthors(modules = authorModules) {
  const seenSlugs = new Set()

  return Object.entries(modules).map(([sourcePath, source]) => {
    const parsed = parseMarkdown(source, sourcePath)
    const author = { ...validateAuthor(parsed.data, sourcePath), biography: parsed.content, sourcePath }

    if (seenSlugs.has(author.slug)) throw new Error(`[content] ${sourcePath}: duplicate author slug "${author.slug}".`)
    seenSlugs.add(author.slug)
    return author
  }).sort((left, right) => left.name.localeCompare(right.name))
}

export const authors = buildAuthors()
export const getAuthorBySlug = (slug) => authors.find((author) => author.slug === slug)
