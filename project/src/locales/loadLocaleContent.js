import localeRegistry from './locales.json'

const modules = import.meta.glob('./*/**/*.json', { eager: true, import: 'default' })
const cache = new Map()

function setNested(target, segments, value) {
  let cursor = target
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) cursor[segment] = value
    else cursor = cursor[segment] ??= {}
  })
}

export function loadLocaleContent(locale) {
  const resolved = Object.hasOwn(localeRegistry, locale) ? locale : 'en'
  if (cache.has(resolved)) return cache.get(resolved)

  const content = {}
  Object.entries(modules).forEach(([path, value]) => {
    const match = path.match(/^\.\/([^/]+)\/(.+)\.json$/)
    if (!match || match[1] !== resolved) return
    const segments = match[2].split('/')
    setNested(content, segments, value)
  })

  cache.set(resolved, content)
  return content
}

export default loadLocaleContent
