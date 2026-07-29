import { authors } from './loadAuthors'
import { calculateReadingTime, parseMarkdown } from './parseMarkdown'
import { validateBlogPost } from './validateBlogPost'


const postModules = import.meta.glob('/content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

export function buildBlogPosts(modules = postModules, authorRecords = authors, { showDrafts = import.meta.env.DEV } = {}) {
  const authorMap = new Map(authorRecords.map((author) => [author.slug, author]))
  const seenSlugs = new Set()

  return Object.entries(modules).map(([sourcePath, source]) => {
    const parsed = parseMarkdown(source, sourcePath)
    const data = validateBlogPost(parsed.data, sourcePath)

    if (seenSlugs.has(data.slug)) throw new Error(`[content] ${sourcePath}: duplicate blog slug "${data.slug}".`)
    seenSlugs.add(data.slug)

    const author = authorMap.get(data.authorSlug)
    if (!author) throw new Error(`[content] ${sourcePath}: unknown author slug "${data.authorSlug}".`)

    return {
      ...data,
      author,
      content: parsed.content,
      readingTime: data.readingTimeOverride ?? calculateReadingTime(parsed.content),
      sourcePath,
    }
  }).filter((post) => showDrafts || !post.draft)
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt))
}

export const blogPosts = buildBlogPosts()
export const getBlogPostBySlug = (slug) => blogPosts.find((post) => post.slug === slug)
export const getPostsByAuthor = (authorSlug) => blogPosts.filter((post) => post.author.slug === authorSlug)

export function getRelatedPosts(post, limit = 3) {
  return blogPosts.filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: Number(candidate.category === post.category) * 3
        + candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || Date.parse(right.candidate.publishedAt) - Date.parse(left.candidate.publishedAt))
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
