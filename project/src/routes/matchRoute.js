import { DEFAULT_LOCALE, getLocaleFromPath, isSupportedLocale, stripLocalePath } from '../locales/getLocaleFromPath'

const localeLikePattern = /^[a-z]{2}(?:-[a-z]{2})?$/i

function matchRoute(pathname, routes) {
  const cleanPathname = (pathname.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/'
  const firstSegment = cleanPathname.split('/')[1]
  const unsupportedLocalePrefix = localeLikePattern.test(firstSegment || '') && !isSupportedLocale(firstSegment)
  const locale = unsupportedLocalePrefix ? DEFAULT_LOCALE : getLocaleFromPath(cleanPathname)
  const pathnameWithoutLocale = unsupportedLocalePrefix ? cleanPathname : stripLocalePath(cleanPathname)
  const notFound = routes.find((route) => route.path === '*')

  if (unsupportedLocalePrefix) return { locale, pathnameWithoutLocale, params: {}, route: notFound }

  for (const route of routes) {
    if (route.path === pathnameWithoutLocale) return { locale, pathnameWithoutLocale, params: {}, route }
    if (!route.pattern) continue
    const match = pathnameWithoutLocale.match(route.pattern)
    if (match) return { locale, pathnameWithoutLocale, params: match.groups ?? {}, route }
  }

  return { locale, pathnameWithoutLocale, params: {}, route: notFound }
}

export default matchRoute
