import localeRegistry from './locales.json'

export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = Object.keys(localeRegistry)

const cleanPathname = (value = '/') => {
  const pathname = value.split(/[?#]/)[0] || '/'
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale)
}

export function getLocaleFromPath(pathname = '/') {
  const segment = cleanPathname(pathname).split('/')[1]
  return isSupportedLocale(segment) && segment !== DEFAULT_LOCALE ? segment : DEFAULT_LOCALE
}

export function stripLocalePath(value = '/') {
  const suffix = value.match(/[?#].*$/)?.[0] ?? ''
  const cleanPath = cleanPathname(value)
  const segment = cleanPath.split('/')[1]
  if (!isSupportedLocale(segment) || segment === DEFAULT_LOCALE) return `${cleanPath}${suffix}`
  const stripped = cleanPath.slice(segment.length + 1) || '/'
  return `${stripped.startsWith('/') ? stripped : `/${stripped}`}${suffix}`
}
