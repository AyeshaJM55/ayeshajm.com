import { getActiveLocale, loadLocaleContent } from '../locales'
import { getAuthorBySlug } from './loadAuthors'
import { calculateReadingTime, parseMarkdown } from './parseMarkdown'

export const blogManifest = [
  { slug: 'building-a-launch-visual-system', publishedAt: '2026-07-05', updatedAt: '', authorSlug: 'ayesha-jm', categoryId: 'art-direction', tagIds: ['product-launch', 'cgi-animation', 'lifestyle-rendering'], coverImage: '/content/media/blog/building-a-launch-visual-system/cover.png', featured: false, draft: false },
  { slug: 'preparing-product-assets-for-cgi', publishedAt: '2026-07-12', updatedAt: '', authorSlug: 'ayesha-jm', categoryId: 'production-process', tagIds: ['3d-modeling', 'workflow', 'product-design'], coverImage: '/content/media/blog/preparing-product-assets-for-cgi/cover.png', featured: false, draft: false },
  { slug: 'product-rendering-for-ecommerce', publishedAt: '2026-07-20', updatedAt: '2026-07-25', authorSlug: 'ayesha-jm', categoryId: 'product-visualization', tagIds: ['cgi', 'ecommerce', 'product-rendering'], coverImage: '/content/media/blog/product-rendering-for-ecommerce/cover.png', featured: true, draft: false },
]

export function getBlogPosts(locale = getActiveLocale(), { showDrafts = import.meta.env.DEV } = {}) {
  const copy = loadLocaleContent(locale).blog
  return blogManifest.map((item) => {
    const translated = copy.posts[item.slug]
    return {
      ...item, ...translated, author: getAuthorBySlug(item.authorSlug, locale), content: translated.bodyMarkdown,
      category: copy.categories[item.categoryId], tags: item.tagIds.map((id) => copy.tags[id]),
      readingTime: calculateReadingTime(translated.bodyMarkdown),
    }
  }).filter((post) => showDrafts || !post.draft).sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt))
}

export const getBlogPostBySlug = (slug, locale = getActiveLocale()) => getBlogPosts(locale).find((post) => post.slug === slug)
export const getPostsByAuthor = (authorSlug, locale = getActiveLocale()) => getBlogPosts(locale).filter((post) => post.author.slug === authorSlug)
export function getRelatedPosts(post, locale = getActiveLocale(), limit = 3) {
  return getBlogPosts(locale).filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({ candidate, score: Number(candidate.categoryId === post.categoryId) * 3 + candidate.tagIds.filter((tag) => post.tagIds.includes(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || Date.parse(right.candidate.publishedAt) - Date.parse(left.candidate.publishedAt))
    .slice(0, limit).map(({ candidate }) => candidate)
}
export const blogPosts = getBlogPosts('en')
const requiredPostFields = ['slug', 'title', 'description', 'publishedAt', 'author', 'coverImage', 'coverAlt']

export function buildBlogPosts(modules, authorRecords = [], { showDrafts = import.meta.env.DEV } = {}) {
  if (!modules) return blogPosts

  const authorsBySlug = new Map(authorRecords.map((author) => [author.slug, author]))
  const seen = new Set()

  return Object.entries(modules).map(([sourcePath, source]) => {
    const { content, data } = parseMarkdown(source, sourcePath)
    for (const field of requiredPostFields) {
      if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`[content] ${sourcePath}: missing required blog field "${field}".`)
    }
    if (seen.has(data.slug)) throw new Error(`[content] ${sourcePath}: duplicate blog slug "${data.slug}".`)
    seen.add(data.slug)

    const author = authorsBySlug.get(data.author)
    if (!author) throw new Error(`[content] ${sourcePath}: unknown author slug "${data.author}".`)

    return {
      ...data,
      author,
      authorSlug: data.author,
      category: data.category ?? '',
      categoryId: data.categoryId ?? '',
      content,
      bodyMarkdown: content,
      draft: Boolean(data.draft),
      featured: Boolean(data.featured),
      readingTime: calculateReadingTime(content),
      tags: Array.isArray(data.tags) ? data.tags : [],
      tagIds: Array.isArray(data.tagIds) ? data.tagIds : [],
      updatedAt: data.updatedAt ?? '',
    }
  }).filter((post) => showDrafts || !post.draft)
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt))
}
