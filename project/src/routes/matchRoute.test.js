import siteRoutes from '.'
import matchRoute from './matchRoute'

describe('matchRoute locale handling', () => {
  it.each([
    ['/', 'en', '/', 'home'],
    ['/about', 'en', '/about', 'about'],
    ['/ar', 'ar', '/', 'home'],
    ['/ar/about', 'ar', '/about', 'about'],
    ['/ar/services/3d-modeling', 'ar', '/services/3d-modeling', 'serviceDetail'],
  ])('matches %s', (pathname, locale, pathnameWithoutLocale, routeId) => {
    expect(matchRoute(pathname, siteRoutes)).toMatchObject({
      locale,
      pathnameWithoutLocale,
      route: { id: routeId },
    })
  })

  it('ignores query strings and hashes while matching', () => {
    expect(matchRoute('/ar/blog?topic=cgi#articles', siteRoutes)).toMatchObject({
      locale: 'ar',
      pathnameWithoutLocale: '/blog',
      route: { id: 'blog' },
    })
  })

  it('routes unsupported locale-like prefixes to not found', () => {
    expect(matchRoute('/fr/about', siteRoutes)).toMatchObject({
      locale: 'en',
      pathnameWithoutLocale: '/fr/about',
      route: { id: 'notFound' },
    })
  })
})
