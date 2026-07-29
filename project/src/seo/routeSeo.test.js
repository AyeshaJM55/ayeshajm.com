import siteRoutes from '../routes'
import matchRoute from '../routes/matchRoute'
import { resolveRouteSeo } from './routeSeo'

const resolve = (pathname) => {
  const { locale, params, route } = matchRoute(pathname, siteRoutes)
  return resolveRouteSeo(pathname, route, params, locale)
}

describe('localized route SEO', () => {
  it('creates reciprocal English and Arabic metadata', () => {
    const english = resolve('/services')
    const arabic = resolve('/ar/services')

    expect(english.canonical).toBe('https://ayeshajm.com/services')
    expect(english.alternates['ar-SA']).toBe('https://ayeshajm.com/ar/services')
    expect(english.ogLocale).toBe('en_US')
    expect(english.structuredData['@graph'][0].inLanguage).toBe('en-US')

    expect(arabic.canonical).toBe('https://ayeshajm.com/ar/services')
    expect(arabic.alternates.en).toBe('https://ayeshajm.com/services')
    expect(arabic.ogLocale).toBe('ar_SA')
    expect(arabic.documentTitle).toContain('الخدمات')
    expect(arabic.structuredData['@graph'][0].inLanguage).toBe('ar-SA')
  })

  it('localizes dynamic entity metadata while retaining stable slugs', () => {
    const seo = resolve('/ar/services/3d-modeling')
    expect(seo.canonical).toBe('https://ayeshajm.com/ar/services/3d-modeling')
    expect(seo.documentTitle).toContain('النمذجة ثلاثية الأبعاد')
    expect(seo.structuredData['@graph'].some((entry) => entry['@type'] === 'Service')).toBe(true)
  })

  it('prevents missing dynamic content from being indexed', () => {
    expect(resolve('/ar/services/not-a-service').robots).toBe('noindex, nofollow')
  })
})
