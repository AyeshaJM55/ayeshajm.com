import localeRegistry from './locales.json'
import { authorManifest } from '../content/loadAuthors'
import { blogManifest } from '../content/loadBlogPosts'
import { projectManifest } from '../data/projects'
import { serviceManifest } from '../data/services'
import { loadLocaleContent } from './loadLocaleContent'
import { validateLocaleParity } from './validateLocaleParity'

const manifestChecks = [
  ['authors', (content) => content.authors, authorManifest],
  ['blog', (content) => content.blog.posts, blogManifest],
  ['projects', (content) => content.projects.items, projectManifest],
  ['services', (content) => content.services, serviceManifest],
]

describe('locale content', () => {
  it('keeps the locale registry deliberately minimal', () => {
    expect(localeRegistry).toEqual({
      en: { symbol: 'EN', mode: 'LTR' },
      ar: { symbol: 'AR', mode: 'RTL' },
    })
  })

  it('has complete mirrored content in every configured locale', () => {
    expect(validateLocaleParity()).toBe(true)
  })

  it.each(manifestChecks)('contains every %s manifest record in every locale', (_key, selectRecords, manifest) => {
    for (const locale of Object.keys(localeRegistry)) {
      const records = selectRecords(loadLocaleContent(locale))
      for (const item of manifest) expect(records[item.slug]).toBeTruthy()
    }
  })

  it('contains no empty localized strings', () => {
    const inspect = (value, path = '') => {
      if (typeof value === 'string') expect(value.trim(), path).not.toBe('')
      else if (Array.isArray(value)) value.forEach((item, index) => inspect(item, `${path}[${index}]`))
      else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => inspect(item, path ? `${path}.${key}` : key))
    }
    for (const locale of Object.keys(localeRegistry)) inspect(loadLocaleContent(locale), locale)
  })
})
