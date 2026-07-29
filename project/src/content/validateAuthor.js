const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const fail = (sourcePath, field, message) => {
  throw new Error(`[content] ${sourcePath}: author field "${field}" ${message}.`)
}

const requireString = (data, field, sourcePath) => {
  if (typeof data[field] !== 'string' || !data[field].trim()) fail(sourcePath, field, 'must be a non-empty string')
  return data[field].trim()
}

export function validateAuthor(data, sourcePath) {
  const slug = requireString(data, 'slug', sourcePath)
  if (!slugPattern.test(slug)) fail(sourcePath, 'slug', 'must contain lowercase letters, numbers, and hyphens only')

  if (data.featured !== undefined && typeof data.featured !== 'boolean') fail(sourcePath, 'featured', 'must be a boolean')
  if (data.socials !== undefined && (typeof data.socials !== 'object' || Array.isArray(data.socials) || data.socials === null)) fail(sourcePath, 'socials', 'must be an object')

  const socials = Object.fromEntries(Object.entries(data.socials ?? {}).map(([network, url]) => {
    if (typeof url !== 'string' || !url.trim()) fail(sourcePath, `socials.${network}`, 'must be a non-empty string')
    return [network, url.trim()]
  }))

  return {
    ...data,
    slug,
    name: requireString(data, 'name', sourcePath),
    role: requireString(data, 'role', sourcePath),
    shortBio: requireString(data, 'shortBio', sourcePath),
    avatar: requireString(data, 'avatar', sourcePath),
    avatarAlt: requireString(data, 'avatarAlt', sourcePath),
    email: typeof data.email === 'string' ? data.email.trim() : '',
    website: typeof data.website === 'string' ? data.website.trim() : '',
    location: typeof data.location === 'string' ? data.location.trim() : '',
    featured: data.featured ?? false,
    socials,
  }
}
