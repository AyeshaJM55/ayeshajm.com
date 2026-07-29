const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

const fail = (sourcePath, field, message) => {
  throw new Error(`[content] ${sourcePath}: blog field "${field}" ${message}.`)
}

const requireString = (data, field, sourcePath) => {
  if (typeof data[field] !== 'string' || !data[field].trim()) fail(sourcePath, field, 'must be a non-empty string')
  return data[field].trim()
}

const normalizeDate = (value, field, sourcePath, required = true) => {
  if ((value === undefined || value === null || value === '') && !required) return ''
  const dateString = value instanceof Date ? value.toISOString().slice(0, 10) : String(value)
  if (!isoDatePattern.test(dateString) || Number.isNaN(Date.parse(`${dateString}T00:00:00Z`))) fail(sourcePath, field, 'must use a valid YYYY-MM-DD date')
  return dateString
}

export function validateBlogPost(data, sourcePath) {
  const slug = requireString(data, 'slug', sourcePath)
  if (!slugPattern.test(slug)) fail(sourcePath, 'slug', 'must contain lowercase letters, numbers, and hyphens only')
  if (typeof data.draft !== 'boolean') fail(sourcePath, 'draft', 'must be a boolean')
  if (data.featured !== undefined && typeof data.featured !== 'boolean') fail(sourcePath, 'featured', 'must be a boolean')
  if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== 'string' || !tag.trim()))) fail(sourcePath, 'tags', 'must be an array of non-empty strings')
  if (data.readingTimeOverride !== undefined && (!Number.isFinite(data.readingTimeOverride) || data.readingTimeOverride <= 0)) fail(sourcePath, 'readingTimeOverride', 'must be a positive number')

  return {
    ...data,
    slug,
    title: requireString(data, 'title', sourcePath),
    description: requireString(data, 'description', sourcePath),
    publishedAt: normalizeDate(data.publishedAt, 'publishedAt', sourcePath),
    updatedAt: normalizeDate(data.updatedAt, 'updatedAt', sourcePath, false),
    authorSlug: requireString(data, 'author', sourcePath),
    category: typeof data.category === 'string' && data.category.trim() ? data.category.trim() : 'Insights',
    tags: (data.tags ?? []).map((tag) => tag.trim()),
    coverImage: requireString(data, 'coverImage', sourcePath),
    coverAlt: requireString(data, 'coverAlt', sourcePath),
    featured: data.featured ?? false,
    draft: data.draft,
    canonicalUrl: typeof data.canonicalUrl === 'string' ? data.canonicalUrl.trim() : '',
    socialImage: typeof data.socialImage === 'string' ? data.socialImage.trim() : '',
  }
}
